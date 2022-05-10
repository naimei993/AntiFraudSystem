import React from 'react';
import { useRef } from 'react'
import ipfsAPI from 'ipfs-api'
import { Avatar, Image,Divider,Modal, Button,Form,Input, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons'
import * as echarts from 'echarts'
import {connect} from 'react-redux'
import './personalcenter.min.css'

const ipfs = ipfsAPI({
  ip: 'localhost',
  port: '5001',
  protocol: 'http'
})
const PersonalCenter = (props) => {
  const [info,setinfo] = React.useState({integral:0})
  const [isModalVisible, setIsModalVisible] = React.useState({isvisible:false,content:""});
  const [imgSrc,setimgSrc] = React.useState([])
  const inputRef = useRef(null)
  let reduxinfo = props.userInfo.user;
  if(typeof(reduxinfo) === "string"){
    reduxinfo =  JSON.parse(reduxinfo)
  }
      React.useEffect(()=>{//箭头函数
        var myEcharts;
        if(myEcharts !== null && myEcharts !== "" && myEcharts !== undefined){
          myEcharts.dispose();//解决echarts dom已经加载的报错
        }
        myEcharts = echarts.init(document.getElementById('myecharts'))
        myEcharts.setOption(option);
       
        window.contract.methods.getBalanceOf(window.accounts[0]).call((err,result)=>{
        setinfo((oldState)=>({
          ...oldState,
          integral:result
        }))
      })
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 10, name: '已提交案件' },
            { value: 7, name: '已解决案件' },
            { value: 3, name: '审核中' },
            
          ]
        }
      ]
    };
    
    const InputContent = (e)=>{
      setIsModalVisible((oldState)=>({
        ...oldState,
        content:e.target.value
      }))
    }
    const handleOk = () => {
      setIsModalVisible((oldState)=>({
        ...oldState,
        isvisible:false
      }));
      console.log(isModalVisible.content,imgSrc,"输入结果");
    };
  
    const handleCancel = () => {
      setIsModalVisible((oldState)=>({
        ...oldState,
        isvisible:false
      }));
    };
    const Feedback = (e)=>{//反馈信息
      e.preventDefault()
      setIsModalVisible((oldState)=>({
        ...oldState,
        isvisible:true
      }));
      console.log(e,"点击反馈信息");
    }
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
    console.log(result.content,imgSrc[0]);
    
  };
    return (
      <div className='personalcenter'>
          <div className='per_all'>
            <div className='per_left'>
              <div className='avatar_my'>
              <Avatar
                src={
                  <Image
                    src={"http://localhost:8080/ipfs/"+reduxinfo.imgsrc}
        />
      } size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
    />
              </div>
              <div className='userinfo'>
                <div className='username'>{reduxinfo.username}</div>
                <div className='userdetial'>
                  注册年龄：1年
                  <Divider type="vertical" />
                  <a href="/admin/article_about/index">发布数量：10</a>
                  <Divider type="vertical" />
                  <a href="/admin/integralmall/index">我的积分：{info.integral}</a>
                </div>
                <div className='userbottom'>
                <div className='entrance'>
                  <a href={reduxinfo.type === "people"?'/admin/reporting_center/index':'/admin/case_square/index'}>
                    <div>{reduxinfo.type === "people" ? "我要举报":"辖区案件"}</div>
                  </a>
                </div>
                <div className='center entrance'>
                  <a href={reduxinfo.type === "people" ?'/admin/article_about/index':"/admin/upload_case/index"}>
                  <div>{reduxinfo.type === "people" ? "历史审核":"上传案件"}</div>
                  </a>
                </div>
                <div className='entrance'>
                  <a href="/admin/home/index" onClick={(e)=>Feedback(e)}>
                  <div>反馈信息</div>
                  </a>
                  <Modal title="反馈信息" visible={isModalVisible.isvisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                  <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                  <Form.Item name={['user', 'content']} rules={[{required:true,}]} label="反馈描述">
        <Input.TextArea style={{height:100}} onChange={InputContent}/>
      </Form.Item>
      <Form.Item  label="反馈材料">
<div>
  <label id="file" ><UploadOutlined />选择文件<input type="file" ref={inputRef} id="file" name="file" multiple="multiple" style={{display:"none"}}/></label>
 <Button 
 onClick={() => {
   const list = inputRef.current.files || []
   let List = []
   //console.log(this.refs.file.files)
  //  console.log(list);
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
      console.log(imgSrc,"全部图片ipfs链接");
      if(item){
        return(
          <Image key={item} alt='上传的图片' style={{width:150}} src={`http://localhost:8080/ipfs/${item}`}/>
        )
      }
      else{
        message.error("上传图片失败,请重试",3)
        return(null)
      }
    })
 }
      </Form.Item>
      </Form>
                  </Modal>
                </div>
                  </div>
              </div>
            </div>
          <div className='per_right'>
            <div id='myecharts' style={{width:300,height:400}}>

            </div>
          </div>
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
  mapStateToProps,{}
)(PersonalCenter)