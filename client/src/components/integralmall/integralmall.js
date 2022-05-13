import React from 'react';
import {connect} from 'react-redux';
import {Button, message,Avatar,InputNumber} from 'antd'
import {ShoppingCartOutlined,} from '@ant-design/icons'
import bjb from '../../static/bjb.jpg'
import sbd from '../../static/sbd.jpg'
import dnb from '../../static/dnb.jpg'
import ydsh from '../../static/ydsh.jpg'
import sjb from '../../static/sjb.jpg'
import dami from '../../static/dami.jpg'
import mf from '../../static/mf.jpg'
import hsy from '../../static/hsy.jpg'
import ylfw from '../../static/ylfw.webp'
import fzry from '../../static/fanzharongyu.webp'
import './integralmall.min.css'

const Integralmall = (props) => {
  let reduxinfo = props.userInfo.user;
  if(typeof(reduxinfo) === "string"){
    reduxinfo =  JSON.parse(reduxinfo)
  }
    const [shopcart,setshopcart] = React.useState({visible:false,selectedRowKeys: [],loading: false,goodslist:""})
    const [info,setinfo] = React.useState({integral:""})
    React.useEffect(()=>{//箭头函数
        window.contract.methods.getBalanceOf(window.accounts[0]).call((err,result)=>{
          setinfo((oldState)=>({
            ...oldState,
            integral:result
          }))
      })
  },[])
    const onClick = (value) =>{//添加商品到购物车
      console.log(value);
      if(info.integral > value.price){
        message.success("兑换成功",2)
      }else{
        message.error("积分不足，兑换失败",2)
      }
        // message.info(`你添加了${value.goodsName}到购物车`)
        setshopcart((oldState)=>({
            ...oldState,
            goodslist:shopcart.goodslist+`${value},`
        }))
    }

    const numberChange = (value)=>{//箭头函数
          console.log(value);
    }

    const goodsList = [
      {
        id:"0",
        imgsrc:ylfw,
        price:100,
        goodsName:"医疗服务",
        describe:"社区医生上门检查身体"
    },
    {
      id:"1",
      imgsrc:fzry,
      price:200,
      goodsName:"反诈骗荣誉",
      describe:"公安局颁发反诈骗荣誉奖项"
    },
    
        {
            id:"2",
            imgsrc:bjb,
            price:50,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"笔记本",
            describe:"定制真皮手感活页笔记本"
        },
        {
            id:"3",
            imgsrc:sbd,
            price:50,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"鼠标垫",
            describe:"定制鼠标垫"
        },
        {
            id:"4",
            imgsrc:dnb,
            price:150,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"电脑包",
            describe:"定制电脑包"
        },
        {
            id:"5",
            imgsrc:ydsh,
            price:100,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"运动水壶",
            describe:"定制运动水壶"
        },
        {
            id:"6",
            imgsrc:sjb,
            price:100,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"双肩包",
            describe:"定制双肩包"
        },
        {
            id:"7",
            imgsrc:dami,
            price:200,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"大米",
            describe:"南方优质稻米品种"
        },
        {
            id:"8",
            imgsrc:hsy,
            price:100,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"花生油",
            describe:"低芥酸特香菜籽特级压榨"
        },
        {
            id:"9",
            imgsrc:mf,
            price:100,
            number:<InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
            goodsName:"面粉",
            describe:"小麦粉中筋面粉"
        },

    ]
   
      
      const data = [];
      for (let i = 1; i < 20; i++) {
        data.push({
          key: i,
          name: `第${i}件商品`,
          price: `${i}`,
          number: <InputNumber min={1} max={5} defaultValue={1} onChange={numberChange}/>,
          total:`${i}`
        });
      }

    return (
        <div className='intergralmall'>
            <div className='inter_left'>
                <div className='inter_left_bottom'>
                    {
                        goodsList.map((item)=>{//箭头函数
                              return (
                              <div className='goodsItem' key={item.id}>
                                  <div className='imgItem'>
                                      <img src={item.imgsrc} alt="商品图片"></img>
                                </div>
                                <div className='bottom'>
                                    <div className='bottom_left'>
                                        <div className='goodsName'>{item.goodsName}</div>
                                        <div className='describe'>{item.describe}</div>
                                    </div>
                                    <div className='bottom_right'>
                                        <div className='price'>积分：<span>{item.price}</span></div>
                                    <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={()=> onClick(item)}>
                                        兑换
                                    </Button>
                                    </div>
                                
                              </div>
                                </div>
                              )    
                        })
                    }
                </div>
            </div>
            <div className='inter_right'>
                <div className='int_right_avatar'>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    src={"http://localhost:8080/ipfs/"+reduxinfo.imgsrc}
                />
                <div className='username'>
                   {reduxinfo.username}
                </div>
                </div>
                <div className='int_right_msg'>
                    <div className='points'>我的积分<div>{info.integral}</div></div>
                    <div className='order'>历史订单<div>5</div></div>
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
  )(Integralmall)
// import {connect} from 'react-redux';
// const mapStateToProps = (state)=>{
//     return {
//       userInfo:state.userInfo
//     }
//   }
//   export default connect(
//     mapStateToProps,{}
//   )(Integralmall)