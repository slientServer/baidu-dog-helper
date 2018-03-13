import React from 'react';
import { Table, Button } from 'antd';

function ItemList(props) {
  let requestBuyDog = props.requestBuyDog;
  const columns = [
    {
      title: '名字',
      dataIndex: 'desc',
      key: 'desc',
      render: text => <a>{text}</a>,
    }, {
      title: '价格',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    }, {
      title: 'petId',
      dataIndex: 'petId',
      key: 'petId'
    }, {
      title: '代级',
      dataIndex: 'generation',
      key: 'generation',
    }, {
      title: '稀有等级',
      dataIndex: 'rareDegree',
      key: 'rareDegree',
      render: text => {
        let returnStr = '';
        switch (text) {
          case 0:
            returnStr = '普通';
          break;
          case 1:
            returnStr = '稀有';
          break;
          case 2:
            returnStr = '卓越';
          break;
          case 3:
            returnStr = '史诗';
          break;
          case 4:
            returnStr = '神话';
          break;
          case 5:
            returnStr = '传说';
          break;
          default:
            returnStr = '新类型';
        }
        return returnStr;
      }}, {
        title: '购买',
        dataIndex: 'id',
        key: 'buy',
        render: (text, record) =>  <Button type="primary" size="small" value={JSON.stringify(record)} onClick={requestBuyDog}>购买</Button>
      }
  ];
  return (<Table columns={columns} dataSource={props.matchedList} />);
}

export default ItemList;