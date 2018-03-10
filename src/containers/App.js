// /*global chrome*/
import React, { Component } from 'react';
import '../App.css';
import Home from './Home';
import { requestDogsMarket, requestBuyDog, requestCaptchaGen } from '../utils/Requests';
import Captcha from '../components/Captcha';
import {withRouter} from 'react-router'
import {Spin, message} from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          key: 'configuration',
          title: '配置'
        },
        {
          key: 'dogslist',
          title: '匹配狗狗列表'
        }],
      matchedList: [],
      loading: false
    };
  }

  componentDidMount(){
    // setTimeout(() => {
      
    // }, (window.localStorage.getItem('refreshFrequent') || 10000))
  }

  updateDogsList = () => {
    let num = window.localStorage.getItem('refreshCount') || 100;
    this.setState({
      loading: true
    });
    requestDogsMarket(num, (data) => {
      this.setState({
        loading: false,
        matchedList: this.filterInvalidData(data)
      })
    });
  }

  filterInvalidData = (data) => {
    let conditionMap= {
      0: window.localStorage.getItem('type0'),
      1: window.localStorage.getItem('type1'),
      2: window.localStorage.getItem('type2'),
      3: window.localStorage.getItem('type3'),
      4: window.localStorage.getItem('type4'),
      5: window.localStorage.getItem('type5')
    };
    let validData= data.filter(item => (parseInt(item.amount, 10) < (parseInt(conditionMap[item.rareDegree], 10) || 0)));
    if (validData.length > 0 && window.localStorage.getItem('autoBuy') === 'true') {
      requestCaptchaGen({}, (data) => {
        this.setState({
          loading: false
        });
        this.refs.captcha.showModal(data, validData[0]);
      }); 
    }
    return validData;
  }

  confirmRequestBuyDogs = (data) => {
    requestBuyDog(data, (response) => {
      message.success(response.errorMsg);
    });
    if (window.localStorage.getItem('autoBuy') === 'true') {
      this.state.matchedList.forEach(function(currentValue, key, arr){
        if (key > 0 && key < 5) {
          requestBuyDog({
            dogInfo: currentValue,
            seed: data.seed,
            verifyCode: data.verifyCode
          }, (response) => {
            message.success(response.errorMsg);
          });
        }        
      })
    }
  }

  render() {
    const props= {
      menuList: this.state.menuList,
      matchedList: this.state.matchedList,
      updateView: (evt)=>{
        if (evt.key === 'dogslist') {
          this.updateDogsList();
          let that = this;
          this.timer && clearInterval(this.timer);
          this.timer = setInterval(() => {
            that.updateDogsList();
          }, (window.localStorage.getItem('refreshFrequent')*1000))
          this.props.router.push('list');
        } else {
          this.props.router.push('/');
        }
      },
      requestBuyDog: (evt)=>{
        let dogInfo = evt.target.value;
        this.setState({
          loading: true
        });
        requestCaptchaGen({}, (data) => {
          this.setState({
            loading: false
          });
          this.refs.captcha.showModal(data, JSON.parse(dogInfo));
        });
      }
    };
    return (
      <Spin spinning={this.state.loading} delay={500} >
        <Captcha ref='captcha' confirmRequestBuyDogs={this.confirmRequestBuyDogs} />
        <Home {...(Object.assign(props, {children: this.props.children}))}></Home>
      </Spin>
    );
  }
}

export default withRouter(App);
