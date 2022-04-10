import React from 'react';
import {Divider} from 'antd'
import './casereward.min.css'
const caseReward = () => {
    const dataList = [
        {   id:"1",
            imgsrc:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
            time:"2022-04-5",
            title:"我点了个链接，银行卡余额被清空了",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"completed",
            price:"5"

        },
        {   id:"2",
            imgsrc:"https://p5.ssl.qhimg.com/t0189e7577c3b264565.jpg",
            time:"2022-04-5",
            title:"刚开始说好的，结果后面人消失了",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"review",
            price:"3"

        },
        {   id:"3",
            imgsrc:"http://p2.qhimg.com/t01d3fc8a4a5a73590d.png",
            time:"2022-04-5",
            title:"投递简历之前请看清！",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"completed",
            price:"2"

        },  
        {   id:"4",
            imgsrc:"http://p5.qhimg.com/t019c2e2673692a26ce.png",
            time:"2022-04-5",
            title:"切莫点击不明链接",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"review",
            price:"1"

        },
        {   id:"5",
            imgsrc:"http://n.sinaimg.cn/translate/w398h415/20180208/ZQK--fyrkuxs4332770.jpg",
            time:"2022-04-5",
            title:"我被骗了，呜呜呜",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"completed",
            price:"3"

        },
    ]
    return (
        <div className='casereward'>
            <div className='casereward_bg'>
            <div className='casereward_title'>案件悬赏</div>
                <div className='casereward_all'>
                    {
                        dataList.map((item)=>{//箭头函数
                            return(
                                <div key={item.id}>
                                     <div className='casereward_item'>
                        <div className='line'></div>
                        <div className='casereward_left'>
                            <a href={`/admin/case_reward/${item.id}`}>
                                <img src={item.imgsrc} alt='图片'>
                                </img>
                                <time dateTime="2022-04-5">悬赏积分:{item.price}</time>
                            </a>
                            
                        </div>
                        <div className='casereward_right'>
                            <div className='right_title'>
                                <a href={`/admin/case_reward/${item.id}`}><span>{item.title}</span></a>
                            </div>
                            <div className='right_describe'>
                            <a href={`/admin/case_reward/${item.id}`}><span>{item.describe}</span></a>
                            </div>
                            <div className='right_bottom'>
                                <div className='time'>{item.time}</div>
                                
                                <div className='classification'>
                                <svg t="1649339921591" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4427" width="200" height="200"><path d="M512 967.110656C260.64896 967.110656 56.889344 763.35104 56.889344 512S260.64896 56.889344 512 56.889344 967.110656 260.64896 967.110656 512 763.35104 967.110656 512 967.110656z m-57.2928-540.443648H369.77664c-15.709184 0-28.444672 12.734464-28.444672 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v85.334016h-113.77664c-15.710208 0-28.445696 12.734464-28.445696 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v113.777664C483.555328 755.264512 496.29184 768 512 768s28.444672-12.735488 28.444672-28.444672v-113.77664h113.77664c15.710208 0 28.445696-12.735488 28.445696-28.445696 0-15.70816-12.735488-28.443648-28.444672-28.443648H540.444672v-85.334016h113.77664c15.710208 0 28.445696-12.734464 28.445696-28.444672 0-15.70816-12.735488-28.443648-28.444672-28.443648h-82.90816l81.883136-81.883136c11.108352-11.108352 11.108352-29.11744 0-40.225792-11.108352-11.108352-29.118464-11.108352-40.226816 0l-99.959808 99.959808-99.959808-99.959808c-11.108352-11.108352-29.118464-11.108352-40.226816 0-11.108352 11.108352-11.108352 29.11744 0 40.225792l81.883136 81.883136z" p-id="4428" fill="#ffd700"></path></svg>
                                    <span >悬赏积分:{item.price}</span>
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

export default caseReward;