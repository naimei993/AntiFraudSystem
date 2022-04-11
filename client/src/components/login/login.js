import { Button } from 'antd';
import React from 'react';
import {ethers} from 'ethers'

const Login = () => {
    const checkLogin = ()=>{//箭头函数
          const {ethereum} = window
          if(!ethereum){
              alert("请安装MetaMask钱包插件")
              return
          }else{
              console.log("已安装钱包");
          }
    }
    return (
        <div>
            <Button type='primary' onClick={checkLogin}>登录</Button>
        </div>
    );
};

export default Login;