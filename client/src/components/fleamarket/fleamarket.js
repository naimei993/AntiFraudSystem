import React from 'react';
import { Comment, Avatar,Image,Divider,Button,Modal,Form,Input,Upload } from 'antd';
import {connect} from 'react-redux';
import ImgCrop from 'antd-img-crop';
import {PlusCircleOutlined,ArrowUpOutlined} from '@ant-design/icons'
import img from '../../static/avatar.webp'
import './fleamarket.min.css'
const Fleamarket = (props) => {
  let reduxinfo = JSON.parse(props.userInfo.user)
  const [isModalVisible, setIsModalVisible] = React.useState({isShow:false,type:"",describe:""});
  const [fileList, setFileList] = React.useState([]);
  const [commentisshow,setcommentisshow] = React.useState({isvisible:false,id:""})
  const [report,setreport] = React.useState({repvisible:false,id:"",content:""})
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const releaseGoods = ()=>{//发布物品
        console.log("发布物品");
        setIsModalVisible((oldState)=>({
          ...oldState,
          isShow:true,
          type:"release"
        }));
  }
  const needGoods = ()=>{//求购物品
        console.log("求购物品");
        setIsModalVisible((oldState)=>({
          ...oldState,
          isShow:true,
          type:"need"
        }));
  }
const describeChange = (e)=>{//物品描述
  setIsModalVisible((oldState)=>({
    ...oldState,
    describe: e.target.value
  }))
}
const reportChange = (e)=>{//物品描述
  setreport((oldState)=>({
    ...oldState,
    content:e.target.value,
  }))
}
  const handleOk = () => {
    setIsModalVisible(false);
    setFileList([])
    console.log(isModalVisible);
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
const ClickComment = (id)=>{//点击举报
  setcommentisshow((oldState)=>({
    ...oldState,
    isvisible:!commentisshow.isvisible,
    id,
  }))
}
const ClickReport = (id)=>{//点击举报
  setreport((oldState)=>({
    ...oldState,
    repvisible:true,
    id,
  }))
}
  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([])
  };
  const handleCancelreport = () => {
    setreport((oldState)=>({
      ...oldState,
      repvisible:false,
    }));
  };
  const dataList = [
    {
      id:"1",
      author:"张伟",
      avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
      content:"闲置二手手机出售，有需要的请联系我",
      imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
    }, {
      id:"2",
      author:"张伟",
      avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
      content:"闲置二手手机出售，有需要的请联系我",
      imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
    }, {
      id:"3",
      author:"张伟",
      avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
      content:"闲置二手手机出售，有需要的请联系我",
      imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
    }, {
      id:"4",
      author:"张伟",
      avatar:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
      content:"闲置二手手机出售，有需要的请联系我",
      imgsrc:"https://image.suning.cn/uimg/ZR/share_order/161648032066359273.jpg",
    }

  ]
    const ExampleComment = (props) => (
        <Comment
          actions={[<span key="comment-nested-reply-to">回复</span>]}
          author={<span>{props.info.author}</span>}
          avatar={<Avatar src={img} alt="Han Solo" />}
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
                  dataList.map((item)=>{
                    return(
                      <div key={item.id}>
                      <Comment
          actions={[<div className='comment_bottom'><div className='share' onClick={()=>{ClickShare(item.id)}}><svg t="1649607438853" className="icon" viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2586" width="16" height="16"><path d="M849.09935368 141.42947916h-202.20073764c-9.28906634 0-17.24800831 3.27079843-23.81141001 9.87780978a32.38090101 32.38090101 0 0 0-9.89961607 23.89863152c0 9.26726151 3.27079843 17.18259238 9.89961607 23.76779962 6.54159614 6.60701208 14.52234368 9.89961534 23.81141001 9.89961534h120.82328116l-279.60962593 279.54421a31.94479498 31.94479498 0 0 0-9.70336752 23.78960518c0 9.5943412 3.20538176 17.61869912 9.5943412 23.98585227 6.38895871 6.49798576 14.43512218 9.70336751 24.09487931 9.70336825 9.48531415 0 17.4660617-3.29260327 23.96404674-9.81239457l279.32615733-279.54420999v120.80147633c0 9.35448227 3.27079843 17.29161942 9.87780979 23.87682596 6.58520652 6.58520652 14.52234368 9.87781052 23.83321556 9.87780979 9.28906634 0 17.24800831-3.27079843 23.81141002-9.87780979 6.60701208-6.58520652 9.89961534-14.52234368 9.89961607-23.8986315v-202.13532173c0-9.24545594-3.27079843-17.29161942-9.89961607-23.87682668A32.42451141 32.42451141 0 0 0 849.09935368 141.42947916zM475.00727343 143.28293101c-45.11520803 4.40467496-88.98751322 17.20439794-129.41457771 37.67959431a371.47544195 371.47544195 0 0 0-178.3675228 195.02678766A369.07685628 369.07685628 0 0 0 141.42947916 512.11992911c0 50.34848539 9.74697864 98.42921698 29.19732408 144.26400109 18.09841626 43.34897768 44.52646458 82.68577601 79.26234014 117.9013687 35.25920307 34.8012915 74.59600215 61.16392461 117.94497979 79.28414569 45.79117299 19.45034616 93.87190532 29.21912963 144.2640011 29.21912963a368.29186501 368.29186501 0 0 0 136.08700572-25.83930487 371.69349532 371.69349532 0 0 0 113.49669376-70.73646026 371.34461006 371.34461006 0 0 0 81.61731469-107.58745144 366.76549284 366.76549284 0 0 0 37.63598318-129.34916177c0.87221277-10.09586316-1.96247891-18.75257565-8.56949099-26.16638529a32.38090101 32.38090101 0 0 0-25.14153436-10.98988148c-8.59129656 0-16.09232696 2.87830207-22.50309049 8.63490692-6.45437465 5.7784097-10.07405833 13.08319228-10.94627111 21.63087846a299.38705178 299.38705178 0 0 1-30.63647547 106.06107927 298.10053782 298.10053782 0 0 1-67.05136135 87.94085819 293.6086421 293.6086421 0 0 1-92.67261212 57.95854212 303.09395624 303.09395624 0 0 1-111.33796701 21.02032871c-41.25566688 0-80.57065966-7.93713643-117.96678465-23.68057814-35.45545163-14.93664488-67.66190964-36.67654892-96.61937551-65.08888171-28.43413835-28.93566031-50.10862646-61.05489757-65.00166095-96.59757068a299.14719359 299.14719359 0 0 1-23.72418851-117.87956314c0-38.42097518 7.02131328-75.57724124 21.04213427-111.42518779A292.40934962 292.40934962 0 0 1 287.74317993 308.02212848a299.51788367 299.51788367 0 0 1 194.00193745-97.62242017c8.61310137-0.91582315 15.80885765-4.51370129 21.58726735-11.01168705 5.80021524-6.36715388 8.72212843-13.88998911 8.72212843-22.43767527 0-6.69423357-1.26470841-12.36361694-3.83773634-17.09537089a25.77388893 25.77388893 0 0 0-10.1176687-10.59738585 51.24250371 51.24250371 0 0 0-11.99292615-4.75356021 52.15832687 52.15832687 0 0 0-11.20793487-1.30831878l0.08722151 0.08722075z" fill="#515151" p-id="2587"></path></svg>分享</div><div className='comment' onClick={()=>{ClickComment(item.id)}}><svg t="1649607706334" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2227" width="16" height="16"><path d="M379.733333 913.066667h-8.533333c-21.333333-4.266667-38.4-17.066667-46.933333-34.133334l-29.866667-72.533333H226.133333c-76.8 0-140.8-64-140.8-140.8V251.733333C85.333333 170.666667 149.333333 110.933333 226.133333 110.933333h571.733334C874.666667 110.933333 938.666667 170.666667 938.666667 251.733333v413.866667c0 76.8-64 140.8-140.8 140.8h-307.2l-64 85.333333c-8.533333 12.8-25.6 21.333333-46.933334 21.333334zM226.133333 174.933333c-42.666667 0-76.8 34.133333-76.8 76.8v413.866667c0 42.666667 34.133333 76.8 76.8 76.8h110.933334l42.666666 102.4 76.8-102.4h337.066667c42.666667 0 76.8-34.133333 76.8-76.8V251.733333c0-42.666667-34.133333-76.8-76.8-76.8H226.133333z" p-id="2228"></path><path d="M285.866667 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="2229"></path><path d="M512 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="2230"></path><path d="M738.133333 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="2231"></path></svg>评论</div><div className='like' onClick={()=>{ClickReport(item.id)}}><svg t="1649607832448" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5389" width="16" height="16"><path d="M512.019836 0.699834C229.341005 0.699834 0.168979 229.560774 0.168979 511.88335 0.168979 794.205926 229.341004 1023.07233 512.019836 1023.07233 794.708243 1023.07233 1023.884371 794.207292 1023.884371 511.88335 1023.883002 229.560774 794.708243 0.699834 512.019836 0.699834L512.019836 0.699834 512.019836 0.699834ZM512.019836 946.392342C271.735784 946.392342 76.94223 751.847291 76.94223 511.884714 76.94223 271.905741 271.735784 77.372992 512.019836 77.372992 752.301152 77.372992 947.09607 271.905747 947.09607 511.884714 947.094707 751.845925 752.301152 946.392342 512.019836 946.392342L512.019836 946.392342 512.019836 946.392342ZM537.897737 605.680295 552.23407 225.652115 457.610169 225.652115 471.958814 605.680295 537.897737 605.680295 537.897737 605.680295ZM503.504218 665.792529C471.960182 665.792529 446.874335 691.55472 446.874335 723.754385 446.874335 755.247731 470.514236 782.443053 503.504218 782.443053 535.015423 782.443053 560.83587 756.672665 560.83587 723.754385 560.83587 691.556087 535.015423 665.792529 503.504218 665.792529L503.504218 665.792529 503.504218 665.792529Z" p-id="5390"></path></svg>举报</div></div>]}
          author={<span>{item.author}</span>}
          avatar={<Avatar src={item.avatar} alt="Han Solo" />}
          content={
            <div>
              {item.content}
              <Image
                width={180}
                height={200}
                src={item.imgsrc}
              />
            </div>
          }
        >
        </Comment>
        {commentisshow.isvisible ? commentisshow.id === item.id?  <ExampleComment info={{author:"张三",content:"看着感觉还可以，楼主能聊下细节吗？"}}>
        <ExampleComment info={{author:"张伟",content:"可以可以"}}>
            </ExampleComment>
            </ExampleComment>:null:null }
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
                    width={180}
                    height={180}
                    src={reduxinfo.imgsrc}
                />
                <div className='username'>
                    {reduxinfo.username}
                </div>
                </div>
                <div className='int_right_msg'>
                    <div className='points'>我的积分<div>10</div></div>
                    <div className='order'>历史记录<div>5</div></div>
                </div>
                <div className='int_right_shopcart'>
                <Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={releaseGoods} className='shopcartButton'>
                                        发布物品
                 </Button>
                 <Button type="primary" icon={<ArrowUpOutlined />} size="large" onClick={needGoods} className='shopcartButton'>
                                        求购物品
                 </Button>
                 <Modal title={isModalVisible.type === "need"?"求购物品":"发布物品"} htmlType="submit" visible={isModalVisible.isShow} okText="确认" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                 <Form
                     name="wrap"
                     labelCol={{ flex: '110px' }}
                     labelAlign="left"
                     labelWrap
                     wrapperCol={{ flex: 1 }}
                     colon={false}
                   >
                     <Form.Item label="内容描述" name="describe">
                       <Input onChange={describeChange} />
                     </Form.Item>
                     <Form.Item label="上传图片">
                     <ImgCrop rotate>
                       <Upload
                         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                         listType="picture-card"
                         fileList={fileList}
                         onChange={onChange}
                         onPreview={onPreview}
                       >
                         {fileList.length < 5 && '+ Upload'}
                       </Upload>
                      </ImgCrop>
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