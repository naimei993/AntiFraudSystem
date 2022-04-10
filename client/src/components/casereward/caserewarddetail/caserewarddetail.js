import React from 'react';
import {Card,List,Button,Image,Modal,Input} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,} from '@ant-design/icons'
import './caserewarddetail.min.css'

const {Item} = List
const { TextArea } = Input;
const CaserewardDetail = () => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const input2 = React.createRef()
    let navigate = useNavigate();
    let { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    console.log(pathnamedetail);
    const dataList = {   
            id:"1",
            imgsrc:"http://n.sinaimg.cn/translate/w398h415/20180208/ZQK--fyrkuxs4332770.jpg",
            time:"2022-04-5",
            title:"电信诈骗",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"completed",
            classification:"电信诈骗"

        }
        const Audit = ()=>{//审核案件
            setVisible(true);
              console.log("审核");
        }
    
  const handleOk = () => {
    console.log(input2.current.resizableTextArea.textArea.value); 
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
    return (
        <div>
            <Card 
            title={
            <div className='left-top' >
                <Button type='link' size='small' onClick={()=>{navigate({ pathname: '/admin/case_reward/index' }, { replace: true })}}>
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
                        <span className='prod-title'>所属分类：</span>
                        <span>{dataList.classification}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件图片：</span>
                        <Image width={200} src={dataList.imgsrc}/> 
                    </Item>
                </List>
            </Card>
            <div className='buttonlist'>
                <Button type='primary' size='large' onClick={Audit}>立即审核</Button> 
                <Modal
                  title="审核案件"
                  visible={visible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <div>审核意见<TextArea ref={input2} showCount  rows={4} placeholder="最多输入两百字" maxLength={200} /></div>
                </Modal>
            </div>
        </div>
    );
};

export default CaserewardDetail;