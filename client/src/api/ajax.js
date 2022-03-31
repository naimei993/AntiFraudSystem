import { message } from 'antd';
import axios from 'axios'
import qs from 'querystring'
import nProgress from 'nprogress';//进度条效果
import 'nprogress/nprogress.css'
import store from '../redux/store'
import {createDeleteUserInfoAction} from '../redux/action_creators/login_action'
const instance = axios.create({
    timeout:10000,
})
//请求拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    nProgress.start();//进度条开始
    //从redux中获取之前所保存的token
    const {token} = store.getState().userInfo
    //向请求头发送token验证信息
    if(token){
      config.headers.Authorization = 'atguigu_'+token
    }
    const {method,data} = config
    if(method.toLowerCase() === 'post'){
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//响应拦截器
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();//进度条结束
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    nProgress.done();//进度条结束
    console.log(error);
    if(error){
      message.error('身份验证失败，请重新登录',1)
      //分发一个删除用户信息的action
      store.dispatch(createDeleteUserInfoAction())
    }else{
      message.error(error.message,3)
    }
    
    return new Promise(()=>{})
  });
export default instance