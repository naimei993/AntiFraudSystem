import React from 'react';
import { useRef } from 'react'
import { Form, Input, Button,Image,ConfigProvider,Select, message} from 'antd';
// import { Form, Input, Button,Radio,Cascader,Select,message,Upload,DatePicker,ConfigProvider} from 'antd';
import {UploadOutlined} from '@ant-design/icons'
import ipfsAPI from 'ipfs-api'
import  './repForm.min.css'
import {useNavigate} from 'react-router-dom';
// import  options from './city.js';
import zhCN from 'antd/es/locale/zh_CN'; // 引入语言包
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Option } = Select;
// const { RangePicker } = DatePicker;
const ipfs = ipfsAPI({
  ip: 'localhost',
  port: '5001',
  protocol: 'http'
})
const RepForm = () => {
  const [imgSrc,setimgSrc] = React.useState([])
  const inputRef = useRef(null)
    const [allinfo,setallinfo] = React.useState({radiovalue:"",address:[],hazardType:"",repPlatform:""})
    let navigate = useNavigate();
  //   const radioChange = (e)=>{//单选框改变是触发
  //     setallinfo(oldState => ({
  //       ...oldState,
  //       radiovalue:e.target.value
  //   }))
  // }
  // const onChange = (value)=>{//地址选择回调
  //   setallinfo(oldState => ({
  //     ...oldState,
  //    address:value
  // }))
  // console.log(value);
      
  //   }
  // const phonevalidator  = (rule,value,callback)=>{//手机号码验证
  //   if(!value){
  //     return Promise.reject('请输入正确的号码格式');
  //   }else if(value.length < 2){
  //     return Promise.reject('号码太短')
  //   }
  //   else if(value.length > 12){
  //     return Promise.reject('密码长度必须小于15')
  //   }else if(!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(value)){
  //     return Promise.reject('请输入正确的号码格式')
  //   }else{
  //     return Promise.resolve();
  //   }
  // }
  const dropChoice = (value)=>{//下拉选择类型调用
  setallinfo(oldState => ({
    ...oldState,
   hazardType:value
}))
  }
//  const reportingPlatform = (value) =>{//下拉选择平台
//   setallinfo(oldState => ({
//     ...oldState,
//    repPlatform:value
// }))
//  }
let saveImageOnIpfs = (reader) => {
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
  const layout = {//表单布局
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {//验证表单信息
    required: '${label}必须填写!',
    types: {
      email: '请输入正确的${label}格式！',
      number: '请输入正确的${label}格式！',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
/* eslint-enable no-template-curly-in-string */

  const onFinish = async (values) => {//点击提交事件，最后结果为result
    let result = {};
    // Object.assign(result,values.user,allinfo);
    Object.assign(result,values.user);
    console.log(imgSrc);
    console.log(result.title,result.content,imgSrc);
   let res =  await window.contract.methods.postCase(result.title,allinfo.hazardType,result.content,imgSrc).send( {
      from:window.accounts[0],
    },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);})
    if(res.transactionHash){
      message.success("感谢您的举报内容",3)
      setTimeout(()=>{
        navigate("/admin/home/index")
      },3000)
    }
  };


    return (
      <div className='repform_bg'>
<ConfigProvider locale={zhCN}>
<div className='repform'>
           <div className='repform_all'>
           <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
               {/* <h2 className='shimingtitle'>填写举报人信息</h2> */}
      {/* <Form.Item
        name={['user', 'name']}
        label="真实姓名"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      name={['user','gender']}
        label="性别"
        rules={[
          {
            required: true,
          },
        ]}
      >
    <Radio.Group onChange={radioChange} value={allinfo.radiovalue}>
      <Radio value={'男'}>男</Radio>
      <Radio value={'女'}>女</Radio>
    </Radio.Group>
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="邮箱"
        rules={[
          {
            type: 'email',
            required:true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'number']}
        label="手机号码"
        rules={[
          {
            validator:phonevalidator,
            required:true
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'time']} label="发生时间" rules={[{required:true,}]}>
        <RangePicker locale={zhCN} showTime />
      </Form.Item>
      <Form.Item 
            label="地址"
            rules={[{  }]}>
        <Cascader allowClear={false} options={options.options} onChange={onChange} placeholder="请选择" />,
      </Form.Item> */}
      
      <h2 className='shimingtitle'>填写举报信息</h2>
      
      {/* <Form.Item  label="被举报平台">
      <Input.Group compact>
      <Select defaultValue="请选择" onChange={reportingPlatform}>
        <Option value="网站网页">网站网页</Option>
        <Option value="App">App</Option>
        <Option value="网络账号">网络账号</Option>
      </Select>
    </Input.Group>
      </Form.Item> */}
      <Form.Item
        name={['user', 'title']}
        label="内容标题"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item  label="危害小类">
      <Input.Group compact>
      <Select defaultValue="请选择"  onChange={dropChoice}>
        <Option value="电信诈骗">电信诈骗</Option>
        <Option value="网络赌博">网络赌博</Option>
        <Option value="短信诈骗">短信诈骗</Option>
      </Select>
    </Input.Group>
      </Form.Item>
      <Form.Item name={['user', 'content']} rules={[{required:true,}]} label="举报内容">
        <Input.TextArea />
      </Form.Item>
      <Form.Item  label="举报材料">

<div>

  <label id="file" ><UploadOutlined />选择文件<input type="file" ref={inputRef} id="file" name="file" multiple="multiple" style={{display:"none"}}/></label>


 <Button 
 onClick={() => {
   const list = inputRef.current.files || []
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
 }
 }>上传提交</Button>
 </div>
 {
    imgSrc.map((item)=>{
      console.log(item,"展示图片");
      console.log(imgSrc,"全部");
      if(item){
        return(
          <Image key={item} alt='上传的图片' style={{width:150}} src={`http://localhost:8080/ipfs/${item}`}/>
        )
      }
      else{
        return(null)
      }
    })
 }
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" size='large'>
          提交
        </Button>
      </Form.Item>
    </Form>
           </div>
        </div>
        </ConfigProvider>
      </div>
        
    );
};

export default RepForm;