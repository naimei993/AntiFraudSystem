import React from 'react';
import { Menu,Avatar,Dropdown, Button, } from 'antd';
import {Link,useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { UserOutlined,DownOutlined } from '@ant-design/icons';
import  * as Icon from '@ant-design/icons';
import './header.min.css'
import logo from '../../../static/logo.png'
import menuListPeople from '../../../config/menu_config_personal';
import menuListPolice from '../../../config/menu_config_police';
const { SubMenu } = Menu;
const Header = () => {
    const [type,settype] = React.useState("police")
    const { pathname } = useLocation();
    const navigate = useNavigate()
    let pathnamedetail = pathname.split('/').splice(2)
    const onClick = ({ key }) => {
      navigate(`${key}`)
    };
    const changeIdentity = ()=>{//改变身份
          if(type === "people"){
            settype("police")
            navigate({ pathname: '/admin/home/index' }, { replace: true })
          }else{
            settype('people')
            navigate({ pathname: '/admin/home/index' }, { replace: true })
          }
    }
    const menu = (
      <Menu onClick={onClick}>
    <Menu.Item key="/admin/personalcenter/index">个人中心</Menu.Item>
    <Menu.Item key="/admin/article_about/index">我的贴子</Menu.Item>
    <Menu.Item key="/admin/integralmall/index">我的积分</Menu.Item>
    <Menu.Item key="/login">退出登录</Menu.Item>
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
    return (
        <div className='header'>
            <div className='logo'>
                <a href='/admin' className='logo_a'>
                    <img src={logo} alt="反诈信息平台"></img>
                    <div className='header_title'>反诈信息平台</div>
                </a>
            </div>
            <div className='NavigationBar'>
            <Menu defaultSelectedKeys={pathnamedetail[0]}  mode="horizontal" theme="light">
            {type === "people" ?createMenu(menuListPeople):createMenu(menuListPolice)}
      </Menu>
            </div>
            <div className='user'>
                <div className='useravatat'><Avatar size="default" icon={<UserOutlined />} /></div>
                <Dropdown overlay={menu}>
                <a href='/admin/home' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                张伟 <DownOutlined />
                  </a>
                  
                </Dropdown>
                <Button type='primary' onClick={changeIdentity}>{`切换为${type === 'people'?'警察':'民众'}`}</Button>
            </div>
                
        </div>
    );
};

export default Header;