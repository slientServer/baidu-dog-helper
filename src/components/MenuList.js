import React from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu, Item } = Menu;

function MenuList(props) {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[props.menuList[0].key]}
      defaultOpenKeys={[props.menuList[0].key]}
      style={{ height: '100%' }}
      onClick={props.updateView}
    >
      {props.menuList.map(item => {
        if (item && item.children) {
          return (<SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>}>
                    {
                      item.children.map(subItem => (
                        <Item key={subItem.key}>
                          <Icon type={subItem.icon} />
                          <span>{subItem.title}</span>
                        </Item>
                      ))
                    }
                  </SubMenu>);
        } else {
          return (
            <Item key={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Item>
          );
        }
      })}
      </Menu>
  );
}

export default MenuList;