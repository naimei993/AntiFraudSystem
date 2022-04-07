import React from 'react';
import {Card,List,Button,Image} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,} from '@ant-design/icons'
import './casesquaredetail.min.css'

const {Item} = List
const CasesquareDetail = () => {
    let navigate = useNavigate();
    let { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    console.log(pathnamedetail);
    const dataList = {   
            id:"1",
            imgsrc:"https://www.vvhan.com/headImg/thumb/www.vvhan.com[32]-img.jpg",
            time:"2022-04-5",
            title:"电信诈骗",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"completed",
            classification:"电信诈骗"

        }
    return (
        <div>
            <Card 
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
                        <span>{dataList.title}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件描述：</span>
                        <span>{dataList.describe}</span>
                    </Item>
                    <Item className='item'>
                        <span className='time'>案件时间：</span>
                        <span>{dataList.time}</span>
                    </Item>
                    <Item className='item'>
                        <span className='caseState'>案件状态：</span>
                        <span>{dataList.caseState === "completed" ? "已完成":"审核中"}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>所属分类：</span>
                        <span>{dataList.classification}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件图片：</span>
                        <Image width={200} src={dataList.imgsrc}/> 
                    </Item>
                </List>
            </Card>
        </div>
    );
};

export default CasesquareDetail;