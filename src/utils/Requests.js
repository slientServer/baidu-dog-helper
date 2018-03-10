import axios from 'axios';
import { message } from 'antd';

function requestOnceMarket(pageNo, pageSize){
  //sortType: "RAREDEGREE_ASC", "RAREDEGREE_DESC", "RAREDEGREE_ASC", "RAREDEGREE_DESC", "CREATETIME_ASC", "CREATETIME_DESC"
  return axios({
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
}

function requestDogsMarket(num, callback){
  var pageSize= 20;
  var callNum= Math.ceil(num/pageSize);
  var callList= [];
  for(var idx=1; idx<= callNum; idx++){
    callList.push(requestOnceMarket(idx, pageSize));
  }
  axios.all(callList)
  .then((res) => {
    var list= [];
    (res || []).forEach((value, index, arr) => {
      list= list.concat(value.data.data.hasData? value.data.data.petsOnSale: []);
    })
    callback(list);
  })
  .catch((err) => {
    message.error(err);
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
      "seed": data.seed,
      "captcha": data.verifyCode,
      "petId": data.dogInfo.petId,
      "requestId": new Date().getTime(),
      "validCode": "",
      "tpl":""
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