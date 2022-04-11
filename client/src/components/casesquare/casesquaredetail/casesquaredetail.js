import React from 'react';
import {Card,List,Button,Image,Modal,Input,Steps, message} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,SmileOutlined,LoadingOutlined} from '@ant-design/icons'
import './casesquaredetail.min.css'

const {Item} = List
const { Step } = Steps;
const { TextArea } = Input;

const CasesquareDetail = () => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const input2 = React.createRef()
    let navigate = useNavigate();
    let { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    console.log(pathnamedetail);
    const dataList = {   
            id:"1",
            imgsrc:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
            time:"2022-04-5",
            title:"电信诈骗",
            describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
            caseState:"completed",
            classification:"电信诈骗",
            price:"5",
            peoplesuggest:"该案件对象中当事人亲信他人，点击莫名链接，造成财产损失，虽金额较小不足立案但属于诈骗"

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
      message.success("感谢您的审核与帮助",3)
      navigate("/admin/case_square/index")
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
                <Button type='link' size='small' onClick={()=>{navigate({ pathname: '/admin/case_square/index' }, { replace: true })}}>
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
                        <span className='time'>民众建议：</span>
                        <span>{dataList.peoplesuggest}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件奖励：</span>
                        <span><svg t="1649339921591" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4427" width="20" height="20"><path d="M512 967.110656C260.64896 967.110656 56.889344 763.35104 56.889344 512S260.64896 56.889344 512 56.889344 967.110656 260.64896 967.110656 512 763.35104 967.110656 512 967.110656z m-57.2928-540.443648H369.77664c-15.709184 0-28.444672 12.734464-28.444672 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v85.334016h-113.77664c-15.710208 0-28.445696 12.734464-28.445696 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v113.777664C483.555328 755.264512 496.29184 768 512 768s28.444672-12.735488 28.444672-28.444672v-113.77664h113.77664c15.710208 0 28.445696-12.735488 28.445696-28.445696 0-15.70816-12.735488-28.443648-28.444672-28.443648H540.444672v-85.334016h113.77664c15.710208 0 28.445696-12.734464 28.445696-28.444672 0-15.70816-12.735488-28.443648-28.444672-28.443648h-82.90816l81.883136-81.883136c11.108352-11.108352 11.108352-29.11744 0-40.225792-11.108352-11.108352-29.118464-11.108352-40.226816 0l-99.959808 99.959808-99.959808-99.959808c-11.108352-11.108352-29.118464-11.108352-40.226816 0-11.108352 11.108352-11.108352 29.11744 0 40.225792l81.883136 81.883136z" p-id="4428" fill="#ffd700"></path></svg>{dataList.price}积分</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>所属分类：</span>
                        <span>{dataList.classification}</span>
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件图片：</span>
                        <Image width={200} src={dataList.imgsrc}/> 
                    </Item>
                    <Item className='item'>
                        <span className='prod-title'>案件进度：</span>
                        <Steps>
                          <Step status="finish" title="案件提交" description="2022.4.5" />
                          <Step status="finish" title="社区民众协助审核"  />
                          <Step status="process" title="辖区民警审核" icon={<LoadingOutlined />} />
                          <Step status="wait" title="案件公布通知"  />
                          <Step status="wait" title="案件完成" icon={<SmileOutlined />} />
                        </Steps>
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

export default CasesquareDetail;