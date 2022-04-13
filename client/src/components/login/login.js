
import React from 'react';
import { Form, Input, Button,Select, message,Menu} from 'antd';
import { UserOutlined, LinkOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import './login.min.css'
const { Option } = Select;
const Login = (props) => {
    const [identity,setidentity] = React.useState({ident:"people",username:"",avatarlink:""})
    const [current,setcurrent] = React.useState("login")
    let navigate = useNavigate();
    const  handleClick = e => {
      setcurrent(e.key)
    };
    const handleChange =(value)=> {
        setidentity((oldState)=>({
            ...oldState,
            ident:value
        }))
      }
    const checkLogin = ()=>{//箭头函数
          const {ethereum} = window
          if(!ethereum){
              alert("请安装MetaMask钱包插件")
              return
          }else{
              console.log("已安装钱包");
          }
    }
    checkLogin()
    
    const Loginin = ()=>{//箭头函数
        console.log("点击登录按钮");
        console.log(identity.ident);
            try{
                if(identity.ident === 'people'){
                   window.contract.methods.getCivilUser(window.accounts[0]).call((erro,result)=>{
                        if(result[1]){
                          result[3] = "people"
                            props.saveUserInfo(result)
                            console.log(result);
                            navigate("/admin/home/index")
                        }else{
                            message.error("请您先注册！",3)
                        }
                        
                      })
                }else{
                   window.contract.methods.getPoliceUser1(window.accounts[0]).call((erro,result)=>{
                        if(result[1]){
                            result[3] = "police"
                            console.log(result);
                            props.saveUserInfo(result)
                            navigate("/admin/home/index")
                        }else{
                            message.error("请您先注册！",3)
                        }
                        
                      })
                }
                
            }catch{
                message.error("请您检查您的MateMask钱包是否连接正常",3)
            }
            
        
    }
    const onFinish = (values) => {
          const{username,avatarlink} = values;
          setidentity((oldState)=>({
              ...oldState,
              username,
              avatarlink,
          }))
          if(identity.ident === 'people'){
            let res = window.contract.methods.createCivilUser(username,avatarlink).call()
            console.log(res);
            
          }else{
            window.contract.methods.createPoliceUser(username,avatarlink).call()
            message.success("注册成功")
          }
          console.log(username,avatarlink,identity.ident);
        }
    return (
        <div className='login'>
            <div className='login_bg'>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="login" className='top_login'>
          登录
        </Menu.Item>
        <Menu.Item key="regist" className='top_regist' >
          注册
        </Menu.Item>
      </Menu>
      {current === "login"?
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item>
        <h3>用户类型：</h3>
        <Select defaultValue="people" style={{ width: 120 }} onChange={handleChange}>
      <Option value="people">民众</Option>
      <Option value="police">警察</Option>
    </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="login-form-button" onClick={Loginin}>
            直接登录
          </Button>
        </Form.Item>
        </Form>:<Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入你的用户名!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入你的用户名" />
        </Form.Item>
        <Form.Item
          name="avatarlink"
          rules={[
            {
              required: true,
              message: '输入你的头像链接',
            },
          ]}
        >
          <Input
            prefix={<LinkOutlined />}
            placeholder="头像链接"
          />
        </Form.Item>
        
    <Form.Item>
        <h3>用户类型：</h3>
        <Select defaultValue="people" style={{ width: 120 }} onChange={handleChange}>
      <Option value="people">民众</Option>
      <Option value="police">警察</Option>
    </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>}
            
            </div>
        
        
      </div>
    );
};

const mapStateToProps = (state)=>{
    return {
      userInfo:state.userInfo
    }
  }
  export default connect(
    mapStateToProps,{saveUserInfo:createSaveUserInfoAction,}
  )(Login)