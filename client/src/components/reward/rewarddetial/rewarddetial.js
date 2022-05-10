import React from 'react';
import {Card,List,Button,Image,message,Modal,Input,Select} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons'
import './rewarddetial.min.css'
const { TextArea } = Input;
const {Item} = List
const { Option } = Select;
let IsAccept = false;//初始化是否接受任务，使用state会循环报错
const CaserewardDetail = () => {
    const navigate = useNavigate();
    const input2 = React.createRef()
    const { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    const [visible, setVisible] = React.useState(false);
    const [visibled, setVisibled] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [confirmLoadingd, setConfirmLoadingd] = React.useState(false);
    const [identity,setidentity] = React.useState({ident:"yes",id:""})//选择是否为诈骗案件
    const [identityd,setidentityd] = React.useState({ident:"yes",id:""})//任务是否有效
    const [datalist,setdatalist] = React.useState([])//数据列表
    const [butloading,setbutloading] = React.useState(false)//接受任务按钮loading
    const [time,setTime]=React.useState(2 * 22 * 58 * 60)//倒计时时间
    const [task,settask] = React.useState({mark:false,content:"",end:null})
    React.useEffect(()=>{
      const getReward = async ()=>{
        await window.contract.methods.getTaskList().call((err,result)=>{
          if(result){
            setdatalist(result)
            console.log(result,"悬赏任务列表");
          }
        })
       
      }
      const getTaskDetil = async (id)=>{//箭头函数
        await window.contract.methods.getTaskReply(id).call((err,result)=>{
          if(result){
            console.log(result);
            settask((oldState)=>({
              ...oldState,
              mark:result[0],
              content:result[1][4],
              end:result[0],
            }))
          }
         })
       }
      getReward()
      getTaskDetil(pathnamedetail[1])
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const CountDown = () => {
      let d = Math.floor(time / (60 * 60 * 24))
      let h = parseInt(time / 60 / 60 % 24)
      let m = parseInt(time / 60 % 60)
      let s = parseInt(time % 60)
      setTimeout(()=>{
        setTime(time=>time-1)
      },1000)
      
      return `${d}天${h}小时${m}分钟${s}秒`;
  }
    const userAccept = (props)=>{//箭头函数
          IsAccept = props
    }
    const Accpet = async (id)=>{//接受任务
      setbutloading(true)
      console.log(id);
      await window.contract.methods.setCaseAccept(id).send({
        from:window.accounts[0]
      },function(error,result){
        if(result){
          setTimeout(() => {
            setbutloading(false)
            message.success("您已成功接受此任务",3)
            window.location.reload()
          }, 1000);
          
        }else{
          message.error("接受任务失败，请稍后重试",3)
          setbutloading(false)
          
        }
      })
        setbutloading(false)
        console.log("点击接受");
    }
    const Audit = ()=>{//审核案件
      console.log(IsAccept);
      if(IsAccept){
        setVisible(true);
        console.log("审核");
      }else{
        message.warn("请您先接受任务，然后再审核")
      }
        
         
}
const handleChange =(value)=> {
  console.log(value);
  setidentity((oldState)=>({
      ...oldState,
      ident:value
  }))
}
const handleChangeD =(value)=> {
  console.log(value,"裁定任务");
  setidentityd((oldState)=>({
      ...oldState,
      ident:value
  }))
}
const handleOk = async(id) => {
  let content = input2.current.resizableTextArea.textArea.value || "";
  let truth = identity.ident === "yes"?true :false;
setConfirmLoading(true);
await window.contract.methods.postReply2Task(id,truth,content).send({
  from:window.accounts[0]
},function(error,result){
  if(result){
    setTimeout(() => {
      setConfirmLoading(false);
      setVisible(false);
      message.success("感谢您的审核与帮助",3)
      navigate("/admin/review/index")
    }, 2000);
  }else{
    setTimeout(() => {
      setConfirmLoading(false);
      setVisible(false);
      message.error("审核任务出错，请稍后再试",3)
    }, 2000);
  }
})


};
const handleOkD = async(id) => {
  let truth = identityd.ident === "yes"?true :false;
setConfirmLoadingd(true);
if(truth){
  await window.contract.methods.setCaseFinished(id).send({
    from:window.accounts[0]
  },function(err,result){
    if(result){
      setTimeout(() => {
        setConfirmLoadingd(false);
        setVisibled(false);
        message.success("感谢您的审核与帮助",3)
        navigate("/admin/review/index")
      }, 2000);
    }else{
      setTimeout(() => {
        setConfirmLoadingd(false);
        setVisibled(false);
        message.error("审核任务出错，请稍后再试",3)
      }, 2000);
    }
  })
}else{
  await window.contract.methods.setCaseFailed(id).send({
    from:window.accounts[0]
  },function(err,result){
    if(result){
      setTimeout(() => {
        setConfirmLoadingd(false);
        setVisibled(false);
        message.success("感谢您的审核与帮助",3)
        navigate("/admin/review/index")
      }, 2000);
    }else{
      setTimeout(() => {
        setConfirmLoadingd(false);
        setVisibled(false);
        message.error("审核任务出错，请稍后再试",3)
      }, 2000);
    }
  })
}
console.log(id,truth);
// await window.contract.methods.postReply2Task(id,truth,content).send({
//   from:window.accounts[0]
// },function(error,result){
//   if(result){
//     setTimeout(() => {
//       setConfirmLoadingd(false);
//       setVisibled(false);
//       message.success("感谢您的审核与帮助",3)
//       navigate("/admin/review/index")
//     }, 2000);
//   }else{
//     setTimeout(() => {
//       setConfirmLoadingd(false);
//       setVisibled(false);
//       message.error("审核任务出错，请稍后再试",3)
//     }, 2000);
//   }
// })


};
const Determine = ()=>{//箭头函数
  setVisibled(true)
}

const handleCancel = () => {
setVisible(false);
};
const handleCancelD = () => {
  setVisibled(false);
  };
    return (
        <div className='articledetail'>
            {datalist.map((item)=>{
                 if(item.id === pathnamedetail[1]){
                    return (
                        <div key={item.id}>
            <Card 
            title={
            <div className='left-top' >
                <Button type='link' size='small' onClick={()=>{navigate({ pathname: '/admin/review/index' }, { replace: true })}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}} />
                </Button>
                <span>案件详情</span>
                </div>}
             >
                <List>
                <Item className='item'>
                                    <span className='prod-title'>案件名称：</span>
                                    <span>{item.title}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='prod-title'>案件描述：</span>
                                    <span>{item.description}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>案件时间：</span>
                                    <span>{new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>是否被接受：</span>
                                    <span>{item.isAccept?"是":"否"}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>接受任务时间:</span>
                                    <span>{new Date(parseInt(item.acceptTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>是否为诈骗案：</span>
                                    <span>{item.isFraud?"是":"否"}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>剩余时间：</span>
                                    <span>{CountDown()}</span>
                                    
                                </Item>
                                <Item className='item'>
                                    <span className='prod-title'>所属分类：</span>
                                    <span>{item.tag}</span>
                                </Item>
                                {task.mark?<Item className='item'>
                                    <span className='prod-title'>任务回复：</span>
                                    <span>{task.end?"是诈骗案件":"不是诈骗案件"}<span style={{marginRight:20}}></span>{task.content}</span>
                                    
                                </Item>:null}
                                <Item className='item'>
                                    <span className='prod-title'>案件图片：</span>
                                    <Image width={200} src={"http://localhost:8080/ipfs/"+item.imageLinks}/> 
                                </Item>
                </List>
            </Card>
            <div className='buttonlist'>
              {userAccept(item.isAccept)}
              {item.isAccept ? null :<Button type='primary' loading={butloading} size='large' onClick={()=>{Accpet(item.id)}}>接受任务</Button> }
            {!item.isFraud?item.acceptAdd === "0x0000000000000000000000000000000000000000"?<Button type='primary' size='large' onClick={Audit}>立即审核</Button>:item.acceptAdd === window.accounts[0]?<Button type='primary' size='large' onClick={Audit}>立即审核</Button>:null:null}
            {!item.isFinished?task.mark ?item.userAdd === window.accounts[0]?<Button type='primary' size='large' onClick={Determine}>判定任务回答</Button>:null:null:null}
            <Modal
              title="审核案件"
              visible={visible}
              onOk={()=>{handleOk(item.id)}}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              okText="确定"
              cancelText="取消"
            >
             <div>
               <span>审核抉择：</span>
               <Select className='selecttruth' defaultValue="yes" style={{ width: 200 }} onChange={handleChange}>
                  <Option value="yes">是诈骗案件</Option>
                  <Option value="no">不是诈骗案件</Option>
               </Select>
               </div>
              <div>审核意见：<TextArea ref={input2} showCount  rows={4} placeholder="最多输入两百字" maxLength={200} /></div>
            </Modal>
            <Modal
              title="裁定任务"
              visible={visibled}
              onOk={()=>{handleOkD(item.id)}}
              confirmLoading={confirmLoadingd}
              onCancel={handleCancelD}
              okText="确定"
              cancelText="取消"
            >
             <div>
               <span>任务裁定：</span>
               <Select className='selecttruth' defaultValue="yes" style={{ width: 200 }} onChange={handleChangeD}>
                  <Option value="yes">回答有效,任务成功</Option>
                  <Option value="no">回答无效,任务失败</Option>
               </Select>
               </div>
            </Modal>
        </div>
        </div>
                    )}else{
                        return(null)
                    }
                    
                    })}
            
            
        </div>
    );
};

export default CaserewardDetail;