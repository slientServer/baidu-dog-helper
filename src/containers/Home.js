import React from 'react';
import { Layout } from 'antd';
import MenuList from '../components/MenuList';
const { Content, Footer, Sider } = Layout;

function Home(props) {
  return (
    <Layout>
      <Content>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <MenuList {...props}/>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {React.cloneElement(props.children, {'matchedList': props.matchedList, 'requestBuyDog': props.requestBuyDog})}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Created by <a href='mailto:Brian.Hao211@gmail.com'>Brian.Hao211@gmail.com</a>
      </Footer>
    </Layout>);  
}

export default Home;