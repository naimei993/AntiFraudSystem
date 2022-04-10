import React from 'react';
import { Form, Input, Button,message,Upload,ConfigProvider} from 'antd';
// import { Form, Input, Button,Radio,Cascader,Select,message,Upload,DatePicker,ConfigProvider} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import  './repForm.min.css'
// import  options from './city.js';
import zhCN from 'antd/es/locale/zh_CN'; // 引入语言包
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// const { Option } = Select;
const { Dragger } = Upload;
// const { RangePicker } = DatePicker;

const RepForm = () => {

    // const [allinfo,setallinfo] = React.useState({radiovalue:"",address:[],hazardType:"",repPlatform:""})
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
//   const dropChoice = (value)=>{//下拉选择类型调用
//   setallinfo(oldState => ({
//     ...oldState,
//    hazardType:value
// }))
//   }
//  const reportingPlatform = (value) =>{//下拉选择平台
//   setallinfo(oldState => ({
//     ...oldState,
//    repPlatform:value
// }))
//  }
  const layout = {//表单布局
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  const props = {//上传文件配置
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
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

  const onFinish = (values) => {//点击提交事件，最后结果为result
    let result = {};
    // Object.assign(result,values.user,allinfo);
    Object.assign(result,values.user);
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
      {/* <Form.Item  label="危害小类">
      <Input.Group compact>
      <Select defaultValue="请选择"  onChange={dropChoice}>
        <Option value="电信诈骗">电信诈骗</Option>
        <Option value="网络赌博">网络赌博</Option>
        <Option value="短信诈骗">短信诈骗</Option>
      </Select>
    </Input.Group>
      </Form.Item>
      <Form.Item  label="被举报平台">
      <Input.Group compact>
      <Select defaultValue="请选择" onChange={reportingPlatform}>
        <Option value="网站网页">网站网页</Option>
        <Option value="App">App</Option>
        <Option value="网络账号">网络账号</Option>
      </Select>
    </Input.Group>
      </Form.Item> */}
      <Form.Item
        name={['user', 'communication_address']}
        label="通信地址"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'content']} rules={[{required:true,}]} label="举报内容">
        <Input.TextArea />
      </Form.Item>
      <Form.Item  label="举报材料">
      <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击此处上传文件材料</p>
    <p className="ant-upload-hint">
          支持单个或批量上传
    </p>
  </Dragger>
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