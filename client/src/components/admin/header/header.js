import React from 'react';
import { Menu,Avatar,Dropdown, message,} from 'antd';
import {Link} from 'react-router-dom';
import { UserOutlined,DownOutlined } from '@ant-design/icons';
import  * as Icon from '@ant-design/icons';
import './header.min.css'
import logo from '../../../static/logo.png'
import menuList from '../../../config/menu_config_personal';
const { SubMenu } = Menu;
const Header = () => {

    const [current,setcurrent] = React.useState("home")

    
    const onClick = ({ key }) => {
      message.info(`Click on item ${key}`);
    };
    const menu = (
      <Menu onClick={onClick}>
    <Menu.Item key="1">个人中心</Menu.Item>
    <Menu.Item key="2">我的贴子</Menu.Item>
    <Menu.Item key="3">我的积分</Menu.Item>
    <Menu.Item key="4">退出登录</Menu.Item>
  </Menu>
    );
    const createMenu = (target)=>{//箭头函数
        return (target.map((item)=>{//箭头函数
          if(!item.children){
            return(
            <Menu.Item key={item.key} onClick={()=>{console.log(item.title)}}>
              <span>{
                React.createElement(
                  Icon[item.icon]
                )
              }</span>
              <Link className="nav-item" to={item.path}><span>{item.title}</span></Link>
            </Menu.Item>
            )}else{
              return(
    <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={<span>{item.title}</span>}>
    {
      createMenu(item.children)
    }

    </SubMenu> 
              )
            }
          
          
    }))
      }
    const handleClick = (e) => {
        console.log('click ', e);
        setcurrent(e.key)
      };
    return (
        <div className='header'>
            <div className='logo'>
                <a href='/admin' className='logo_a'>
                    <img src={logo} alt="反诈信息平台"></img>
                    <div className='header_title'>反诈信息平台</div>
                </a>
            </div>
            <div className='NavigationBar'>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="light">
            {createMenu(menuList)}
      </Menu>
            </div>
            <div className='user'>
                <div className='useravatat'><Avatar size="default" icon={<UserOutlined />} /></div>
                <Dropdown overlay={menu}>
                <a href='/admin/home' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                张三 <DownOutlined />
                  </a>
                </Dropdown>
               
            </div>
                
        </div>
    );
};

export default Header;