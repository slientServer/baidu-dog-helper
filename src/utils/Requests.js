/* global cb */
import axios from 'axios';
import async from 'async';
import { message } from 'antd';

function requestOnceMarket(pageNo, pageSize){
  //sortType: "RAREDEGREE_ASC", "RAREDEGREE_DESC", "RAREDEGREE_ASC", "RAREDEGREE_DESC", "CREATETIME_ASC", "CREATETIME_DESC"
  return function (data, callback) {
     axios({
      'method': 'post',
      'url': 'https://pet-chain.baidu.com/data/market/queryPetsOnSale',
      'data': {
        "pageNo":pageNo || 1,
        "pageSize":pageSize || 20,
        "querySortType": "CREATETIME_DESC",
        "petIds":[],
        "lastAmount":null,
        "lastRareDegree":null,
        "requestId": new Date().getTime(),
        "appId":1,
        "tpl":""
      },
      'headers': {
        "Content-Type":"application/json",
      }
    })
    .then((res) => {
      callback(null, data.concat(res.data.data.petsOnSale));
    })
    .catch((err) => {
      callback(null, data);
      message.error('请求失败:' + pageNo);
      console.log(err);
    })
  }
}

function requestDogsMarket(num, callback){
  var pageSize= 20;
  var callNum= Math.ceil(num/pageSize);
  var callList= [function(cb){
    axios({
      'method': 'post',
      'url': 'https://pet-chain.baidu.com/data/market/queryPetsOnSale',
      'data': {
        "pageNo":1,
        "pageSize":pageSize || 20,
        "querySortType": "CREATETIME_DESC",
        "petIds":[],
        "lastAmount":null,
        "lastRareDegree":null,
        "requestId": new Date().getTime(),
        "appId":1,
        "tpl":""
      },
      'headers': {
        "Content-Type":"application/json",
      }
    })
    .then((res) => {
      cb(null, res.data.data.petsOnSale);
    })
    .catch((err) => {
      cb('请求失败1');
      message.error('请求失败:1');
      console.log(err);
    })    
  }];
  for(var idx=2; idx<= callNum; idx++){
    callList.push(requestOnceMarket(idx, pageSize));
  }
  async.waterfall(callList, function(err, result){
    callback(result);
  })
}

function requestBuyDog(data, callback){
  axios({
    'method': 'POST',
    'url': 'https://pet-chain.baidu.com/data/txn/create',
    'headers': {
      "Content-Type":"application/json"
    },
    'data': {
      "amount": data.dogInfo.amount,
      "appId": 1,
      "nounce": null,
      "seed": data.seed,
      "captcha": data.verifyCode,
      "petId": data.dogInfo.petId,
      "requestId": new Date().getTime(),
      "validCode": data.dogInfo.validCode,
      "tpl": "",
      "timeStamp": "",
      "token": null
    }
  })
  .then((response) => {
    callback(response.data);
  })
  .catch((err) => {
    message.error(err);
  })
}

function requestCaptchaGen(data, callback){
  axios({
    'method': 'POST',
    'url': 'https://pet-chain.baidu.com/data/captcha/gen',
    'headers': {
      "Content-Type":"application/json"
    },
    'data': {
      appId: 1,
      nounce: null,
      requestId: new Date().getTime(),
      timeStamp: null,
      token: null,
      tpl: ""
    }
  })
  .then((response) => {
    callback(response.data.data);
  })
  .catch((err) => {
    message.error(err);
  })  
}

export { requestDogsMarket, requestBuyDog, requestCaptchaGen };