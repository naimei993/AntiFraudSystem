import React from 'react';
import {Button, message} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import bjb from '../../static/bjb.jpg'
import sbd from '../../static/sbd.jpg'
import dnb from '../../static/dnb.jpg'
import ydsh from '../../static/ydsh.jpg'
import sjb from '../../static/sjb.jpg'
import dami from '../../static/dami.jpg'
import mf from '../../static/mf.jpg'
import hsy from '../../static/hsy.jpg'
import './integralmall.min.css'
const Integralmall = () => {


    const onClick = (value) =>{
        message.success(`你添加了id为${value}的商品到购物车`)
        console.log(value)
    }
    const goodsList = [
        {
            id:"1",
            imgsrc:bjb,
            goodsName:"笔记本",
            describe:"定制真皮手感活页笔记本"
        },
        {
            id:"2",
            imgsrc:sbd,
            goodsName:"鼠标垫",
            describe:"定制鼠标垫"
        },
        {
            id:"3",
            imgsrc:dnb,
            goodsName:"电脑包",
            describe:"定制电脑包"
        },
        {
            id:"4",
            imgsrc:ydsh,
            goodsName:"运动水壶",
            describe:"定制运动水壶"
        },
        {
            id:"5",
            imgsrc:sjb,
            goodsName:"双肩包",
            describe:"定制双肩包"
        },
        {
            id:"6",
            imgsrc:dami,
            goodsName:"大米",
            describe:"南方优质稻米品种"
        },
        {
            id:"7",
            imgsrc:hsy,
            goodsName:"花生油",
            describe:"低芥酸特香菜籽特级压榨"
        },
        {
            id:"8",
            imgsrc:mf,
            goodsName:"面粉",
            describe:"小麦粉中筋面粉"
        },

    ]
    return (
        <div className='intergralmall'>
            <div className='inter_left'>
                <div className='inter_left_top'>

                </div>
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
                                    <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={()=> onClick(item.id)}>
                                        添加
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
            
            </div>
        </div>
    );
};

export default Integralmall;