import React, { Component } from 'react';
import { Button, Row, Col, InputNumber, message, notification, Input, Divider } from 'antd';
import axios from 'axios';
import async from 'async';

class AutoRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'localRushFrequent': window.localStorage.getItem('localRushFrequent') || 100,
      'articlesList': [],
      'sellerid': window.localStorage.getItem('sellerid') || '',
      'lotteryCount': window.localStorage.getItem('lotteryCount') || ''
    };
  }

  requestArticles = () => {
    let lastid = 0;
    this.state.articlesList.length > 0 && (lastid = this.state.articlesList[this.state.articlesList.length - 1].feedid);
    let formData = new FormData();
    let arr={
      lang: window.localStorage.getItem('locale'),
      token: window.localStorage.getItem('token'),
      uid: window.localStorage.getItem('uid')
    };
    for (var i in arr)
    formData.append(i, arr[i]);
    if(!window.localStorage.getItem('sellerid')){
      message.error('请输入卖方ID');
      return false;
    }
    formData.append("ivoid", window.localStorage.getItem('sellerid'));
    formData.append("lastid", lastid);
    axios.post('https://api.iveryone.wuyan.cn/Api/Feed/GetUser', formData, {emulateJSON: !0})
    .then((resData) => {
      if (resData.data.data.feeds.length > 0) {
        this.setState({
          articlesList: this.state.articlesList.concat(resData.data.data.feeds)
        }, () => {
          this.requestArticles();
        });
      } else {
        notification.open({
          message: '成功扫描：' + this.state.articlesList.length,
          duration: 0
        });
        this.requestArticleDetails();
      }
    })
    .catch(err =>{
      message.error(err);
    })
  }

  requestArticleDetails = () => {
    let cond = {};
    async.mapLimit(this.state.articlesList, 2, (item, callback) => {
      cond = {
        feedid: item.feedid,
        lang: window.localStorage.getItem('locale'),
        token: window.localStorage.getItem('token'),
        uid: window.localStorage.getItem('uid'),
        tid: item.content_id
      };
      axios.get('https://api.iveryone.wuyan.cn/Api/Thread/Details', {params: cond})
      .then((res) =>{
        setTimeout(() => {
          res.data.feedid = item.feedid;
          callback('', res.data);
        }, 1000)
      })
      .catch((err)=>{
        if(err){
          message.error('细节获取失败：' + err);
        }        
      })
    }, (err, res) => {
      if(err){
        message.error('细节获取失败：' + err);
      }
      let fail= [];
      let unAuth= [];
      for(let idx=0; idx < res.length; idx++){
        if(res[idx].errmsg !== ''){
          fail.push(res[idx].data);
        }else{
          if(!res[idx].data.authorized){
            unAuth.push(res[idx].feedid);
          }
        }
      }
      this.requestReadArticles(unAuth);
      notification.open({
        message: '失败:' + fail.length + '; 成功未授权:' + unAuth.length,
        duration: 0
      });      
    })
  }

  requestReadArticles = (list) => {
    let formData = new FormData();
    let arr={
      lang: window.localStorage.getItem('locale'),
      token: window.localStorage.getItem('token'),
      uid: window.localStorage.getItem('uid')
    };
    for (var i in arr)
    formData.append(i, arr[i]);
    async.mapLimit(list, 1, (item, callback) => {
      formData.append("feedid", item);
      axios.post('https://api.iveryone.wuyan.cn/DataCenter/Authorize/RequestThread', formData, {emulateJSON: !0})
      .then((res) => {
        if(res.data.errno === 4222){
          notification.open({
            message: '本次阅读完成',
            duration: 0
          });
          callback({
            errmsg: '本次阅读完成'
          });
        }
        setTimeout(() => {
          callback('', res.data);
        }, 1000);
      })
      .catch((err) => {
        if(err){
          console.log(err);
        }         
      });
    }, (err, res) => {
      let success = [];
      for(let idx=0; idx< res.length; idx++){
        if(res[idx].errmsg === ''){
          success.push(res[idx].data);
        }
      }
      notification.open({
        message: '成功阅读:' + success.length,
        duration: 0
      });
      console.log(res);
    })
  }

  requestBuyRabbit = (data) => {
    axios({
      'method': 'get',
      'url': 'https://jiamitu.mi.com/pet/rush/pet'
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleStart = (e) => {
    this.requestArticles();
  }

  handleStartRush = (e) => {
    this.timer = setInterval(() => {
      this.requestBuyRabbit();
    }, this.state.localRushFrequent);
  }

  handleStartRushStop = (e) => {
    this.timer && clearInterval(this.timer);
  }

  localRushFrequentChange = (value) => {
    window.localStorage.setItem('localRushFrequent', value);
    this.setState({
      'localRushFrequent': value
    }, () => {
      this.handleStartRushStop();
    });
  }

  localSelleridUpdate = (e) => {
    window.localStorage.setItem('sellerid', e.target.value);
    this.setState({
      'sellerid': e.target.value
    }, () => {
    });
  }

  lotteryUpdate = (value) => {
    window.localStorage.setItem('lotteryCount', value);
    this.setState({
      'lotteryCount': value
    }, () => {
    });
  }

  handleStartLottery = () => {
    let count = 0 ;
    async.whilst(function () {
      return count < parseInt(window.localStorage.getItem('lotteryCount'), 10);
    }, function (callback) {
      count++;
      axios.get('https://jiamitu.mi.com/pet/main/lottery')
      .then((res) => {
        console.log(res.data.data);
        setTimeout(() => {
          callback('', res);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
    }, function (err, data) {
        console.log(data);
    })
  }

  render() {
    return (
      <div>
        <Divider>IVeryOne</Divider>
        <Row style={{marginBottom: '20px'}}>
          <Col span={8}>
            <Button type="primary" onClick={this.handleStart}>开始读书</Button>
          </Col>
          <Col span={8}>
            卖方ID:
            <Input style={{width:"60%"}} value={this.state.sellerid} onChange={this.localSelleridUpdate}/>
          </Col>
        </Row>
        <Divider>加密兔</Divider>
        <Row style={{marginBottom: '20px'}}>
          <Col span={8}>
            <Button type="primary" onClick={this.handleStartRush}>开始抢兔</Button>
            <Button onClick={this.handleStartRushStop}>停止抢兔</Button>
          </Col>
          <Col span={8}>
            刷新频率：
            <InputNumber value={this.state.localRushFrequent} onChange={this.localRushFrequentChange}/>
          </Col>
        </Row>
        <Row style={{marginBottom: '20px'}}>
          <Col span={8}>
            <Button type="primary" onClick={this.handleStartLottery}>开始抽奖</Button>
          </Col>
          <Col span={8}>
            次数：
            <InputNumber value={this.state.lotteryCount} onChange={this.lotteryUpdate}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AutoRequest;