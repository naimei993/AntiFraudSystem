import React from 'react';
import {Divider} from 'antd'
import './casesquare.min.css'
const caseSquare = () => {
    
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
        imgsrc:"https://p5.ssl.qhimg.com/t0189e7577c3b264565.jpg",
        time:"2022-04-5",
        title:"刚开始说好的，结果后面人消失了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
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
        caseState:"review",
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
        <div className='casesquare'>
            <div className='casesquare_bg'>
            <div className='casesquare_title'>案件广场</div>
                <div className='casesquare_all'>
                    {
                        dataList.map((item)=>{//箭头函数
                            return(
                                <div key={item.id}>
                                     <div className='casesquare_item'>
                        <div className='line'></div>
                        <div className='casesquare_left'>
                            <a href={`/admin/case_square/${item.id}`}>
                                <img src={item.imgsrc} alt='图片'>
                                </img>
                                <time dateTime="2022-04-5">{item.time}</time>
                            </a>
                            
                        </div>
                        <div className='casesquare_right'>
                            <div className='right_title'>
                                <a href={`/admin/case_square/${item.id}`}><span>{item.title}</span></a>
                            </div>
                            <div className='right_describe'>
                            <a href={`/admin/case_square/${item.id}`}><span>{item.describe}</span></a>
                            </div>
                            <div className='right_bottom'>
                                <div className='time'>{item.time}</div>
                                
                                <div className='classification'>
                                <svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                                        <path d="M512.2 564.743a76.818 76.818 0 0 1-30.973-6.508L108.224 393.877c-26.105-11.508-42.56-35.755-42.927-63.272-.384-27.44 15.356-52.053 41.042-64.232l373.004-176.74c20.591-9.737 45.16-9.755 65.75.017L917.68 266.39c25.668 12.188 41.39 36.792 41.024 64.231-.384 27.5-16.821 51.73-42.908 63.237l-372.57 164.377a77.18 77.18 0 0 1-31.025 6.508zM139.843 329.592l370.213 163.241c1.291.56 3.018.567 4.345-.009l369.758-163.128-369.706-175.464v-.01c-1.326-.628-3.158-.636-4.502 0l-370.108 175.37zm748.015 1.858h.175-.175zM512.376 941.674c-10.348 0-20.8-2.32-30.537-6.997L121.05 778.624c-18.113-7.834-26.454-28.87-18.62-46.983 7.835-18.112 28.862-26.488 46.993-18.61l362.08 156.629 345.26-156.366c17.939-8.166 39.14-.253 47.324 17.746 8.166 17.964.227 39.157-17.729 47.324l-344.51 156.61c-9.196 4.449-19.281 6.7-29.471 6.7z" fill="#444">
                                            </path><path d="M871.563 515.449L511.81 671.775 152.358 515.787v73.578a34.248 34.248 0 0 0 20.76 31.48l301.518 129.19c11.806 5.703 24.499 8.546 37.175 8.546s25.367-2.843 37.174-8.546L850.82 620.534a34.248 34.248 0 0 0 20.744-31.474V515.45z" fill="#ff6a18">
                                                </path>
                                                </svg>
                                    <span >{item.classification}</span>
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

export default caseSquare;