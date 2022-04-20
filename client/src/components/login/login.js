
import React from 'react';
import { useRef } from 'react'
import { Form, Input, Button,Select, message,Menu,Image} from 'antd';
import { UserOutlined, UploadOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import ipfsAPI from 'ipfs-api'
import {useNavigate} from 'react-router-dom';
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import './login.min.css'

const ipfs = ipfsAPI({
  ip: 'localhost',
  port: '5001',
  protocol: 'http'
})
const { Option } = Select;
const Login = (props) => {
    const [imgSrc,setimgSrc] = React.useState([])
    const [identity,setidentity] = React.useState({ident:"people",username:"",})
    const [current,setcurrent] = React.useState("login")
    let navigate = useNavigate();
    const inputRef = useRef(null)
    const  handleClick = e => {
      setcurrent(e.key)
    };
    const handleChange =(value)=> {
        setidentity((oldState)=>({
            ...oldState,
            ident:value
        }))
      }
      React.useEffect(()=>{
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
      })
    const Loginin = async()=>{//箭头函数
        console.log("点击登录按钮");
        console.log(identity.ident);
            try{
                if(identity.ident === 'people'){
                 
                 let result = await  window.contract.methods.getCivilUser(window.accounts[0]).call((erro,result)=>{
                     console.log(result)
                        if(result[1]){
                          result[3] = "people"
                            props.saveUserInfo(result)
                            console.log(result);
                            navigate("/admin/home/index")
                        }else{
                            message.error("请您先注册！",3)
                        }
                        
                      })
                      console.log(result);
                }else{
                 let res = await  window.contract.methods.getPoliceUser(window.accounts[0]).call((erro,result)=>{
                        if(result[1]){
                            result[3] = "police"
                            console.log(result);
                            props.saveUserInfo(result)
                            navigate("/admin/home/index")
                        }else{
                            message.error("请您先注册！",3)
                        }
                        
                      })
                      console.log(res );
                }
            }catch{
                message.error("请您检查您的MateMask钱包是否连接正常",3)
            }
            
        
    }
    const  onFinish = async(values) => {//两个表的完成按钮，根据类型来判断函数
          const{username} = values;
          console.log(username,imgSrc,identity.ident,"注册信息");
          if(imgSrc.length === 0){
            message.error("请您选择您的头像",5)
            return 
          }else{
            setidentity((oldState)=>({
              ...oldState,
              username,
          }))
          if(identity.ident === 'people'){
            await  window.contract.methods.getCivilUser(window.accounts[0]).call((erro,result)=>{//先检查账户是否注册过
              if(result[1]){
                message.error("请勿重复注册",5)
              }
            })
            let res = await window.contract.methods.createCivilUser(username,imgSrc[0]).send( {
              from:window.accounts[0],
              gas:1500000,
              gasPrice:"1000000"
            },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);})
            console.log(res,"市民注册");
            
          }else{
            await  window.contract.methods.getPoliceUser(window.accounts[0]).call((erro,result)=>{//先检查账户是否注册过
              if(result[1]){
                message.error("请勿重复注册",5)
                navigate("/login")
              }
            })
           let res = await window.contract.methods.createPoliceUser(username,imgSrc[0]).send( {
                from:window.accounts[0],
                gas:1500000,
                gasPrice:"1000000"
              },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);})
            console.log(res,"警察注册");
            // message.success("注册成功")
          }
          console.log(username,imgSrc[0],identity.ident);
          }
          
        }
    const saveImageOnIpfs = (reader) => {
          return new Promise(function(resolve,reject){
              const buffer = Buffer.from(reader.result);
              ipfs.add(buffer).then((response) => {
                  resolve(response[0].hash);
              }).catch((err) => {
                console.error(err)
                reject(err);
              })
         })
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
        <Form.Item>
        <h3>用户类型：</h3>
        <Select defaultValue="people" style={{ width: 120 }} onChange={handleChange}>
      <Option value="people">民众</Option>
      <Option value="police">警察</Option>
    </Select>
        </Form.Item>
        <Form.Item  label="上传头像"  className='upavatar'>

<div>

  <label id="file" ><UploadOutlined />选择文件<input type="file" ref={inputRef} id="file" name="file" multiple="multiple" style={{display:"none"}}/></label>


 <Button 
 onClick={() => {
   const list = inputRef.current.files || []
   if(list.length===1){
    let List = []
    //console.log(this.refs.file.files)
    console.log(list);
    const len = list.length;
    for(let i=0;i<=len-1;i++){
       List.push(list[i])
    }
    let arr = []
    List.map((item)=>{
     var reader = new FileReader();
     reader.readAsArrayBuffer(item)
     reader.onloadend = (e) => {
          saveImageOnIpfs(reader).then((hash) => {
            console.log(hash,"哈希值");
            arr.push(hash)
          });
        }
        return(null)
    })
    setTimeout(()=>{
     setimgSrc(arr)
    },500)
   }else if(list.length === 0){
     message.error("请您选择头像",5)
     return null
   }else{
     message.error("头像最多只能选择一张图片,请您重新选择",5)
     return null
   }
   
 }
 }>上传提交</Button>
 </div>
 {
    imgSrc.map((item)=>{
      if(item){
        return(
          <Image key={item} alt='上传的图片' style={{width:80,height:80}} src={`http://localhost:8080/ipfs/${item}`}/>
        )
      }
      else{
        return(null)
      }
    })
 }
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