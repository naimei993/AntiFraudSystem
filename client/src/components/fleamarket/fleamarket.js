import React from 'react';
import { useRef } from 'react'
import { Comment, Avatar,Image,Divider,Button,Modal,Form,Input, message,Select,InputNumber} from 'antd';
import {connect} from 'react-redux';
import ipfsAPI from 'ipfs-api'
import {PlusCircleOutlined,UploadOutlined} from '@ant-design/icons'
import './fleamarket.min.css'
const ipfs = ipfsAPI({
  ip: 'localhost',
  port: '5001',
  protocol: 'http'
})
const { TextArea } = Input;
const { Option } = Select;
const Fleamarket = (props) => {
  let reduxinfo = props.userInfo.user
  if(typeof(reduxinfo) === "string"){
    reduxinfo =  JSON.parse(reduxinfo)
  }
  const inputRef = useRef(null)
  const [isModalVisible, setIsModalVisible] = React.useState({isShow:false,type:"",describe:"",title:"",price:""});
  const [imgSrc,setimgSrc] = React.useState([])
  const [commentisshow,setcommentisshow] = React.useState({isvisible:false,id:""})
  const [comment,setcomment] = React.useState([])
  const [commentlist,setcommentlist] = React.useState([])
  const [report,setreport] = React.useState({repvisible:false,id:"",content:""})
  const [allinfo,setallinfo] = React.useState({integral:""})
  const input2 = React.createRef()
  const [combutloading,setcombutloading] = React.useState(false)
  const [datalist,setdatalist] = React.useState([])
  const [userlist,setuserlist] = React.useState([[1],[2],[3]])
  React.useEffect(()=>{//箭头函数
      window.contract.methods.getBalanceOf(window.accounts[0]).call((err,result)=>{
        console.log(result,"账户余额");
        setallinfo((oldState)=>({
          ...oldState,
          integral:result
        }))
      })
     window.contract.methods.getTransactionPostList().call((err,result)=>{
        if(result){
          console.log(result);
          let arrall = []
          result.map((item)=>{
            window.contract.methods.getPoliceUser(item.userAdd).call((err,result)=>{
              if(result){
                arrall.push([result.name,result.avatarLink])
              }else{
                message.error("初始化错误,请稍后再试",3)
              }
            })
            return null
          }) 
          setuserlist(arrall)     
          setTimeout(()=>{
            setdatalist(result)
          },100)
          
        }else{
          message.error("初始化错误,请稍后再试",3)
        }
      })
     
    
},[])
const onChange = (value)=> {//设置物品价格
  setIsModalVisible((oldState)=>({
    ...oldState,
    price:value
}))
}
const handleChange =(value)=> {//发布/求购物品
  console.log(value);
  setIsModalVisible((oldState)=>({
      ...oldState,
      type:value
  }))
}
  const needGoods = ()=>{//求购物品
        console.log("求购物品");
        setIsModalVisible((oldState)=>({
          ...oldState,
          isShow:true,
          type:"need"
        }));
  }
  const saveImageOnIpfs = (reader) => {//保存图片
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
const describeChange = (e)=>{//发布求购物品描述
  setIsModalVisible((oldState)=>({
    ...oldState,
    describe: e.target.value
  }))
}
const titleChange  = (e)=>{//发布求购物品标题
  setIsModalVisible((oldState)=>({
    ...oldState,
    title: e.target.value
  }))
}
const reportChange = (e)=>{//举报内容描述
  setreport((oldState)=>({
    ...oldState,
    content:e.target.value,
  }))
}
  const handleOk = async () => {
    console.log(isModalVisible.title,isModalVisible.describe,isModalVisible.type,isModalVisible.price,imgSrc,);
    if(isModalVisible.title === "" || isModalVisible.describe==="" || isModalVisible.price === 0){
      message.warn("请填写完整信息后再试",3)
    }else{
      window.contract.methods.postTransactionPost(isModalVisible.title,isModalVisible.describe,isModalVisible.type,imgSrc,isModalVisible.price).send(
        {
          from:window.accounts[0],
        },function(error,result){
          if(result){
            message.success("发布成功",3)
            setTimeout(()=>{
              setIsModalVisible((oldState)=>({
                ...oldState,
                isShow:false
              }))
            },3000)
           
          }else{
            message.error("发布出错，请稍后再试")
          }
          }
      )
    }
    setIsModalVisible({isShow:false,type:"",describe:"",title:""});
    setimgSrc([])
  };
  const handleOkreport = () => {//举报确定按钮
    setreport((oldState)=>({
      ...oldState,
      repvisible:false,
    }))
    console.log(report);
  };
const ClickShare = (id)=>{//分享按钮回调
      console.log("分享",id);
}
const ClickComment = async (id)=>{//点击评论
  console.log(commentisshow.isvisible);
  if(commentisshow.isvisible){
    setcomment([])
    setcommentlist([])
  }
  setcommentisshow((oldState)=>({
    ...oldState,
    isvisible:!commentisshow.isvisible,
    id,
  }))
  if(!commentisshow.isvisible){
    await window.contract.methods.getTransactionPostReplyList(id).call((err,result)=>{
      if(result){
        let arrall = []
          result.map((item)=>{
            window.contract.methods.getPoliceUser(item.userAdd).call((err,result)=>{
              if(result){
                arrall.push([result.name,result.avatarLink])
              }else{
                message.error("初始化错误,请稍后再试",3)
              }
            })
            return null
          }) 
          setcommentlist(arrall)     
          setTimeout(()=>{
            setcomment(result)
          },100)
        
      }else{
        message.error("初始化错误，请稍后再试")
      }
      
    })
  }
}
const ClickReport = (id)=>{//点击举报
  setreport((oldState)=>({
    ...oldState,
    repvisible:true,
    id,
  }))
}
const onChangeInput = async(id)=>{
  let content = input2.current.resizableTextArea.textArea.value || "";
  console.log(id,1,content);
  setcombutloading(true)
  await window.contract.methods.postReply2TransactionPost(id,1,content).send({
    from:window.accounts[0]
  },function(err,result){
    if(result){
      setTimeout(() => {
        setcombutloading(false)
        message.success("感谢您的提交,您的评论将在审核后展示",2)
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }, 2000);
    }else{
      message.error("回复错误，请稍后再试",3)
    }
  })
  
}
  const handleCancel = () => {
    setIsModalVisible({isShow:false,type:"",describe:"",title:""});
    setimgSrc([])
  };
  const handleCancelreport = () => {//举报弹窗取消
    setreport((oldState)=>({
      ...oldState,
      repvisible:false,
    }));
  };
  // const dataList = [
  //   {
  //     id:"1",
  //     author:"张伟",
  //     avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
  //     content:"闲置二手手机出售，有需要的请联系我",
  //     imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
  //   }, {
  //     id:"2",
  //     author:"张伟",
  //     avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
  //     content:"闲置二手手机出售，有需要的请联系我",
  //     imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
  //   }, {
  //     id:"3",
  //     author:"张伟",
  //     avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
  //     content:"闲置二手手机出售，有需要的请联系我",
  //     imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
  //   }, {
  //     id:"4",
  //     author:"张伟",
  //     avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
  //     content:"闲置二手手机出售，有需要的请联系我",
  //     imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
  //   }

  // ]
    const ExampleComment = (props) => (
        <Comment
          actions={[<span key="comment-nested-reply-to">回复</span>]}
          author={<span>{props.info.author}</span>}
          avatar={<Avatar src={"http://localhost:8080/ipfs/"+props.info.img} alt="Han Solo" />}
          content={
            <p>
              {props.info.content}
            </p>
          }
        >
          {props.children}
        </Comment>
      );
    return (
        <div className='fleamarket'>
            <div className='fleam_all'>
              <div className='fleam_left'>
                {
                  datalist.map((item)=>{
                    return(
                      <div key={item.id}>
                      <Comment
          actions={[<div className='comment_bottom'><div className='share' onClick={()=>{ClickShare(item.id)}}><svg t="1649607438853" className="icon" viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2586" width="16" height="16"><path d="M849.09935368 141.42947916h-202.20073764c-9.28906634 0-17.24800831 3.27079843-23.81141001 9.87780978a32.38090101 32.38090101 0 0 0-9.89961607 23.89863152c0 9.26726151 3.27079843 17.18259238 9.89961607 23.76779962 6.54159614 6.60701208 14.52234368 9.89961534 23.81141001 9.89961534h120.82328116l-279.60962593 279.54421a31.94479498 31.94479498 0 0 0-9.70336752 23.78960518c0 9.5943412 3.20538176 17.61869912 9.5943412 23.98585227 6.38895871 6.49798576 14.43512218 9.70336751 24.09487931 9.70336825 9.48531415 0 17.4660617-3.29260327 23.96404674-9.81239457l279.32615733-279.54420999v120.80147633c0 9.35448227 3.27079843 17.29161942 9.87780979 23.87682596 6.58520652 6.58520652 14.52234368 9.87781052 23.83321556 9.87780979 9.28906634 0 17.24800831-3.27079843 23.81141002-9.87780979 6.60701208-6.58520652 9.89961534-14.52234368 9.89961607-23.8986315v-202.13532173c0-9.24545594-3.27079843-17.29161942-9.89961607-23.87682668A32.42451141 32.42451141 0 0 0 849.09935368 141.42947916zM475.00727343 143.28293101c-45.11520803 4.40467496-88.98751322 17.20439794-129.41457771 37.67959431a371.47544195 371.47544195 0 0 0-178.3675228 195.02678766A369.07685628 369.07685628 0 0 0 141.42947916 512.11992911c0 50.34848539 9.74697864 98.42921698 29.19732408 144.26400109 18.09841626 43.34897768 44.52646458 82.68577601 79.26234014 117.9013687 35.25920307 34.8012915 74.59600215 61.16392461 117.94497979 79.28414569 45.79117299 19.45034616 93.87190532 29.21912963 144.2640011 29.21912963a368.29186501 368.29186501 0 0 0 136.08700572-25.83930487 371.69349532 371.69349532 0 0 0 113.49669376-70.73646026 371.34461006 371.34461006 0 0 0 81.61731469-107.58745144 366.76549284 366.76549284 0 0 0 37.63598318-129.34916177c0.87221277-10.09586316-1.96247891-18.75257565-8.56949099-26.16638529a32.38090101 32.38090101 0 0 0-25.14153436-10.98988148c-8.59129656 0-16.09232696 2.87830207-22.50309049 8.63490692-6.45437465 5.7784097-10.07405833 13.08319228-10.94627111 21.63087846a299.38705178 299.38705178 0 0 1-30.63647547 106.06107927 298.10053782 298.10053782 0 0 1-67.05136135 87.94085819 293.6086421 293.6086421 0 0 1-92.67261212 57.95854212 303.09395624 303.09395624 0 0 1-111.33796701 21.02032871c-41.25566688 0-80.57065966-7.93713643-117.96678465-23.68057814-35.45545163-14.93664488-67.66190964-36.67654892-96.61937551-65.08888171-28.43413835-28.93566031-50.10862646-61.05489757-65.00166095-96.59757068a299.14719359 299.14719359 0 0 1-23.72418851-117.87956314c0-38.42097518 7.02131328-75.57724124 21.04213427-111.42518779A292.40934962 292.40934962 0 0 1 287.74317993 308.02212848a299.51788367 299.51788367 0 0 1 194.00193745-97.62242017c8.61310137-0.91582315 15.80885765-4.51370129 21.58726735-11.01168705 5.80021524-6.36715388 8.72212843-13.88998911 8.72212843-22.43767527 0-6.69423357-1.26470841-12.36361694-3.83773634-17.09537089a25.77388893 25.77388893 0 0 0-10.1176687-10.59738585 51.24250371 51.24250371 0 0 0-11.99292615-4.75356021 52.15832687 52.15832687 0 0 0-11.20793487-1.30831878l0.08722151 0.08722075z" fill="#515151" p-id="2587"></path></svg>分享</div><div className='comment' onClick={()=>{ClickComment(item.id)}}><svg t="1649607706334" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2227" width="16" height="16"><path d="M379.733333 913.066667h-8.533333c-21.333333-4.266667-38.4-17.066667-46.933333-34.133334l-29.866667-72.533333H226.133333c-76.8 0-140.8-64-140.8-140.8V251.733333C85.333333 170.666667 149.333333 110.933333 226.133333 110.933333h571.733334C874.666667 110.933333 938.666667 170.666667 938.666667 251.733333v413.866667c0 76.8-64 140.8-140.8 140.8h-307.2l-64 85.333333c-8.533333 12.8-25.6 21.333333-46.933334 21.333334zM226.133333 174.933333c-42.666667 0-76.8 34.133333-76.8 76.8v413.866667c0 42.666667 34.133333 76.8 76.8 76.8h110.933334l42.666666 102.4 76.8-102.4h337.066667c42.666667 0 76.8-34.133333 76.8-76.8V251.733333c0-42.666667-34.133333-76.8-76.8-76.8H226.133333z" p-id="2228"></path><path d="M285.866667 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="2229"></path><path d="M512 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="2230"></path><path d="M738.133333 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="2231"></path></svg>评论</div><div className='like' onClick={()=>{ClickReport(item.id)}}><svg t="1649607832448" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5389" width="16" height="16"><path d="M512.019836 0.699834C229.341005 0.699834 0.168979 229.560774 0.168979 511.88335 0.168979 794.205926 229.341004 1023.07233 512.019836 1023.07233 794.708243 1023.07233 1023.884371 794.207292 1023.884371 511.88335 1023.883002 229.560774 794.708243 0.699834 512.019836 0.699834L512.019836 0.699834 512.019836 0.699834ZM512.019836 946.392342C271.735784 946.392342 76.94223 751.847291 76.94223 511.884714 76.94223 271.905741 271.735784 77.372992 512.019836 77.372992 752.301152 77.372992 947.09607 271.905747 947.09607 511.884714 947.094707 751.845925 752.301152 946.392342 512.019836 946.392342L512.019836 946.392342 512.019836 946.392342ZM537.897737 605.680295 552.23407 225.652115 457.610169 225.652115 471.958814 605.680295 537.897737 605.680295 537.897737 605.680295ZM503.504218 665.792529C471.960182 665.792529 446.874335 691.55472 446.874335 723.754385 446.874335 755.247731 470.514236 782.443053 503.504218 782.443053 535.015423 782.443053 560.83587 756.672665 560.83587 723.754385 560.83587 691.556087 535.015423 665.792529 503.504218 665.792529L503.504218 665.792529 503.504218 665.792529Z" p-id="5390"></path></svg>举报</div></div>]}
          author={<div style={{display:"flex",justifyContent:"space-between"}}><div className='name_left'><span style={{fontSize:14,paddingRight:16}}>{userlist[item.id-1]?userlist[item.id-1][0]:"王静"}</span>{new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</div><div className='name_right'><span style={{color:"#ffd700",fontSize:18,display:'flex',alignItems:"center"}}><svg t="1651550056150" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2787" width="16" height="16"><path d="M512 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448z m0-832c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z m0 672c-17.6 0-32-14.4-32-32V480c0-17.6 14.4-32 32-32s32 14.4 32 32v288c0 17.6-14.4 32-32 32z m160-128H352c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z m0-160H352c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z m-160 0c-8 0-16-3.2-22.4-9.6L331.2 344c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l158.4 158.4c12.8 12.8 12.8 32 0 44.8-6.4 6.4-14.4 9.6-22.4 9.6z m0 0c-8 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.8L648 299.2c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L534.4 502.4C528 508.8 520 512 512 512z" p-id="2788" fill="#ffd700"></path></svg>{item.price}</span></div></div>}
          avatar={<Avatar src={"http://localhost:8080/ipfs/"+(userlist[item.id-1]?userlist[item.id-1][1]:"QmPPe1WtgXG3fqPoepksz85WMCQBTsJo2F1qePZh6qxzmb")} alt="Han Solo" />}
          content={
            <div>
              {item.description}
              <Image
                width={180}
                height={200}
                src={"http://localhost:8080/ipfs/"+item.imageLink}
              />
            </div>
          }
        >
        </Comment>
        {commentisshow.isvisible ? commentisshow.id === item.id? <div> <div className='top_comment'>
                <TextArea   placeholder="欢迎您的评论" ref={input2}/>
                <Button type='primary' loading={combutloading} onClick={()=>{onChangeInput(item.id)}}>评论</Button>
                </div>
                <div>
                  {
                    comment.map((item)=>{
                      return(
                        <ExampleComment key={item.floor} info={{author:commentlist[item.floor-1]?commentlist[item.floor-1][0]:"未知",content:item.details,img:commentlist[item.floor-1]?commentlist[item.floor-1][1]:""}}>
                        </ExampleComment>
                      )
                    })
                  }
            </div></div>:null:null }
            {report.id === item.id ? <Modal title="举报内容" okText="确定" cancelText="取消" visible={report.repvisible} onOk={handleOkreport} onCancel={handleCancelreport}>
                <Form
                     name="wrap"
                     labelCol={{ flex: '110px' }}
                     labelAlign="left"
                     labelWrap
                     wrapperCol={{ flex: 1 }}
                     colon={false}
                   >
                     <Form.Item label="举报内容描述" name="content">
                       <Input onChange={reportChange} />
                     </Form.Item>
                  </Form>
            </Modal>:null
      }
            <Divider dashed />
            </div>
                    )
                  })
                }
              </div>
              <div className='fleam_right'>
              <div className='inter_right'>
                <div className='int_right_avatar'>
                <Avatar
                    size='large'
                    width={200}
                    height={200}
                    src={"http://localhost:8080/ipfs/"+reduxinfo.imgsrc}
                />
                <div className='username'>
                    {reduxinfo.username}
                </div>
                </div>
                <div className='int_right_msg'>
                    <div className='points'>我的积分<div>{allinfo.integral}</div></div>
                    <div className='order'>历史记录<div>5</div></div>
                </div>
                <div className='int_right_shopcart'>
                 <Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={needGoods} className='shopcartButton'>
                                        发布/求购 闲置
                 </Button>
                 <Modal title={isModalVisible.type === "need"?"求购物品":"发布物品"} htmlType="submit" visible={isModalVisible.isShow} okText="确认" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                 <Form
                     name="wrap"
                     labelCol={{ flex: '110px' }}
                     labelAlign="left"
                     labelWrap
                     wrapperCol={{ flex: 1 }}
                     colon={false}
                     initialValues={{selecttype:"release",price:1}}
                   >
                      <Form.Item label="内容标题" name="title">
                       <Input value={isModalVisible.title} onChange={titleChange} />
                     </Form.Item>
                     <Form.Item label="内容描述" name="describe">
                       <Input value={isModalVisible.describe} onChange={describeChange} />
                     </Form.Item>
                     <Form.Item label="发布类型" name="selecttype">
                     <Select className='selecttype'style={{ width: 200 }} onChange={handleChange}>
                      <Option value="release">发布物品</Option>
                      <Option value="need">求购物品</Option>
                    </Select>
                     </Form.Item>
                     <Form.Item label="意向积分" name="price">
                     <InputNumber min={1} max={100}  onChange={onChange} />
                     </Form.Item>
                     <Form.Item label="上传图片">
                     <div>

  <label id="file" ><UploadOutlined />选择文件<input type="file" ref={inputRef} id="file" name="file" multiple="multiple" style={{display:"none"}}/></label>


 <Button 
 onClick={() => {
   const list = inputRef.current.files || []
   let List = []
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
                  </Form>
                </Modal>
                </div>
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
  )(Fleamarket)