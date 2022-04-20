import React from 'react';
import {Card,List,Button,Image,Steps} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,SmileOutlined,LoadingOutlined} from '@ant-design/icons'

import './artdetial.min.css'
const {Item} = List
const { Step } = Steps;


const Artdetial = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    console.log(pathnamedetail[1],"BBBBBBBBbb");
    const dataList = [
        {   id:"1",
        imgsrc:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
        time:"2022-04-5",
        title:"我点了个链接，银行卡余额被清空了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
        classification:"电信诈骗",
        price:"10",

        },
        {   id:"2",
        imgsrc:"https://p5.ssl.qhimg.com/t0189e7577c3b264565.jpg",
        time:"2022-04-5",
        title:"刚开始说好的，结果后面人消失了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
        classification:"网络赌博",
        price:"10",

        },
        {   id:"3",
        imgsrc:"http://p2.qhimg.com/t01d3fc8a4a5a73590d.png",
        time:"2022-04-5",
        title:"投递简历之前请看清！",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
        classification:"短信诈骗",
        price:"2",

        },  
        {   id:"4",
        imgsrc:"http://p5.qhimg.com/t019c2e2673692a26ce.png",
        time:"2022-04-5",
        title:"切莫点击不明链接",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
        classification:"电信诈骗",
        price:"1",

        },
        {   id:"5",
        imgsrc:"http://n.sinaimg.cn/translate/w398h415/20180208/ZQK--fyrkuxs4332770.jpg",
        time:"2022-04-5",
        title:"不能随便相信他人",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
        classification:"电信诈骗",
        price:"1",

        },
    ]
    return (
        <div className='articledetail'>
            {dataList.map((item)=>{
               if(item.id === pathnamedetail[1]){
                return(
                    <Card  key={item.id}
            title={
            <div className='left-top' >
                <Button type='link' size='small' onClick={()=>{navigate({ pathname: '/admin/article_about/index' }, { replace: true })}}>
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
                        <span className='prod-title'>案件奖励：</span>
                        <span><svg t="1649339921591" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4427" width="200" height="200"><path d="M512 967.110656C260.64896 967.110656 56.889344 763.35104 56.889344 512S260.64896 56.889344 512 56.889344 967.110656 260.64896 967.110656 512 763.35104 967.110656 512 967.110656z m-57.2928-540.443648H369.77664c-15.709184 0-28.444672 12.734464-28.444672 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v85.334016h-113.77664c-15.710208 0-28.445696 12.734464-28.445696 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v113.777664C483.555328 755.264512 496.29184 768 512 768s28.444672-12.735488 28.444672-28.444672v-113.77664h113.77664c15.710208 0 28.445696-12.735488 28.445696-28.445696 0-15.70816-12.735488-28.443648-28.444672-28.443648H540.444672v-85.334016h113.77664c15.710208 0 28.445696-12.734464 28.445696-28.444672 0-15.70816-12.735488-28.443648-28.444672-28.443648h-82.90816l81.883136-81.883136c11.108352-11.108352 11.108352-29.11744 0-40.225792-11.108352-11.108352-29.118464-11.108352-40.226816 0l-99.959808 99.959808-99.959808-99.959808c-11.108352-11.108352-29.118464-11.108352-40.226816 0-11.108352 11.108352-11.108352 29.11744 0 40.225792l81.883136 81.883136z" p-id="4428" fill="#ffd700"></path></svg>{item.price}积分</span>
                    </Item>
                    <Item className='item'>
                        <span className='time'>案件时间：</span>
                        <span>{item.time}</span>
                    </Item>
                    <Item className='item'>
                        <span className='caseState'>案件状态：</span>
                        <span>{item.caseState === "completed" ? "已完成":"审核中"}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>所属分类：</span>
                        <span>{item.classification}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件描述：</span>
                        <span>{item.describe}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件图片：</span>
                        <Image width={200} src={item.imgsrc}/> 
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件进度：</span>
                        <Steps>
                          <Step status="finish" title="案件提交" description="2022.4.5" />
                          <Step status="finish" title="社区民众协助审核" description="2022.4.6"  />
                          <Step status="process" title="辖区民警审核" icon={<LoadingOutlined />} />
                          <Step status="wait" title="案件公布通知"  />
                          <Step status="wait" title="案件完成" icon={<SmileOutlined />} />
                        </Steps>
                    </Item>
                    
                </List>
            </Card>
                )
               }else{
                   return (null)
               }
            })}
            
            
        </div>
    );
};

export default Artdetial;