import React, { Component } from 'react';
import { Form, Input, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;

class Configurations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type0: window.localStorage.getItem('type0'),
      type1: window.localStorage.getItem('type1'),
      type2: window.localStorage.getItem('type2'),
      type3: window.localStorage.getItem('type3'),
      type4: window.localStorage.getItem('type4'),
      type5: window.localStorage.getItem('type5'),
      refreshCount: window.localStorage.getItem('refreshCount'),
      autoBuy: window.localStorage.getItem('autoBuy') === 'true'? true : false,
      refreshFrequent: window.localStorage.getItem('refreshFrequent')
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleChange = (e) => {
    window.localStorage.setItem([e.target.name], e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheckboxChange = (e) => {
    window.localStorage.setItem([e.target.name], e.target.checked);
    this.setState({[e.target.name]: e.target.checked});
  }

  render() {
    let dogMap= [
      {label: '普通', key: 'type0'},
      {label: '稀有', key: 'type1'}, 
      {label: '卓越', key: 'type2'}, 
      {label: '史诗', key: 'type3'}, 
      {label: '神话', key: 'type4'}, 
      {label: '传说', key: 'type5'}];
    return (
      <Form>
        <Row gutter={6}>
          <Col span={12}>
            {dogMap.map((item) => {
              return (<FormItem label={item.label} key={item.key}>
                  <Input value={this.state[item.key]} type="number" name={item.key} onChange={this.handleChange}/>
                </FormItem>);
            })}
          </Col>
          <Col span={12}>
            <FormItem label="刷新数量(时间降序，建议在500以内)" key="refreshCount">
              <Input value={this.state.refreshCount} max="200" min="0"  type="number" name="refreshCount" onChange={this.handleChange}/>
            </FormItem>
            <FormItem label="刷新频率(单位秒，建议频率不要太高，否则来不及提交)" key="refreshFrequent">
              <Input value={this.state.refreshFrequent} max="200" min="0"  type="number" name="refreshFrequent" onChange={this.handleChange}/>
            </FormItem>
            <FormItem label="自动提交(勾选后，会自动弹出验证码，并自动尝试购买至多五组符合条件的狗)" key="autoBuy">
              <Checkbox checked={this.state.autoBuy} name="autoBuy" onChange={this.handleCheckboxChange}>自动提交</Checkbox>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Configurations;