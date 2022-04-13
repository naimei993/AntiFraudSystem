import React from 'react';
import {Divider,Image} from 'antd'
import './casereward.min.css'
const CaseReward = () => {
    const dataList = [
        {   id:"1",
        imgsrc:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
        time:"2022-04-5",
        title:"我点了个链接，银行卡余额被清空了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
            classification:"电信诈骗"

        },
        {   id:"2",
        imgsrc:"https://p4.ssl.qhimg.com/t01430dbb1b1cd50790.png",
        time:"2022-04-5",
        title:"刚开始说好的，结果后面人消失了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
            classification:"网络赌博"

        },
        {   id:"3",
        imgsrc:"http://p2.qhimg.com/t01d3fc8a4a5a73590d.png",
        time:"2022-04-5",
        title:"投递简历之前请看清！",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
            classification:"短信诈骗"

        },  
        {   id:"4",
        imgsrc:"http://p5.qhimg.com/t019c2e2673692a26ce.png",
        time:"2022-04-5",
        title:"切莫点击不明链接",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
            classification:"电信诈骗"

        },
        {   id:"5",
        imgsrc:"http://n.sinaimg.cn/translate/w398h415/20180208/ZQK--fyrkuxs4332770.jpg",
        time:"2022-04-5",
        title:"我被骗了，呜呜呜",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
        classification:"电信诈骗"

        },
    ]
    return (
        <div className='article'>
            <div className='article_bg'>
                <div className='article_all'>
                    {
                        dataList.map((item)=>{//箭头函数
                            return(
                                <div key={item.id}>
                                     <div className='article_item'>
                        <div className='line'></div>
                        <div className='article_left'>
                           
                            <Image
                             width={200}
                             src={item.imgsrc}
                            />
                                <time dateTime="2022-04-5">{item.time}</time>
                           
                            
                        </div>
                        <div className='article_right'>
                            <div className='right_title'>
                                <a href={`/admin/history_review/${item.id}`}><span>{item.title}</span></a>
                            </div>
                            <div className='right_describe'>
                            <a href={`/admin/history_review/${item.id}`}><span>{item.describe}</span></a>
                            </div>
                            <div className='right_bottom'>
                                <div className='time'>{item.time}</div>
                                
                                <div className='classification'>
                                    <span style={item.caseState === "completed"?{color:'green'}:{color:'#f5d000'}}>{item.caseState === "completed" ? "已完成":"审核中"}</span>
                                     </div>
                                
                            </div>
                           
                        </div>
                    </div>
                    <Divider dashed />
                                </div>
                            )
                        })
                    }
                    
                </div>
                
            </div>
        </div>
        
    );
};

export default CaseReward;