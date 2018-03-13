import React, { Component } from 'react';
import { Modal, Input } from 'antd';

class Captcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      verifyCode: '',
      seed: '',
      dogInfo: {}
    }
  }

  showModal = (data, dogInfo) => {
    this.setState({
      visible: true,
      image: 'data:image/jpeg;base64,' + data.img,
      seed: data.seed,
      dogInfo: dogInfo,
      verifyCode: ''
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.confirmRequestBuyDogs(this.state);
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleChange = (e) => {
    this.setState({'verifyCode': e.target.value}, () => {
      if(this.state.verifyCode.length === 4){
        this.props.confirmRequestBuyDogs(this.state); 
        this.setState({visible: false});
      }
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="验证码识别"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img src={this.state.image} alt='captcha'/>
          <Input value={this.state.verifyCode} type="input" name="captcha" onChange={this.handleChange}/>
        </Modal>
      </div>
    );
  }
}

export default Captcha;