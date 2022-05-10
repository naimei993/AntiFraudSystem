import React from 'react';
import {Card,List,Button,Image,Modal,Steps, message,Select} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,SmileOutlined,LoadingOutlined} from '@ant-design/icons'
import './casesquaredetail.min.css'

const {Item} = List
const { Step } = Steps;
const { Option } = Select;
const CasesquareDetail = () => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [identity,setidentity] = React.useState({ident:"yes",id:""})
    const [datalist,setdatalist] = React.useState([])
    let navigate = useNavigate();
    let { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    React.useEffect(()=>{
        const getCase = async ()=>{
          await window.contract.methods.getCaseList().call((err,result)=>{
            if(result){
              let arr = Object.assign([],result).reverse();
              console.log(arr);
              setdatalist(arr)
              console.log("任务");
            }
          })
        }
        getCase()
      },[])
 
    const handleChange =(value)=> {
        console.log(value);
        setidentity((oldState)=>({
            ...oldState,
            ident:value
        }))
      }
        const Audit = (id)=>{//审核案件
            setidentity((oldState)=>({
                ...oldState,
                id:id,
            }))
            setVisible(true);
        }
    
  const handleOk = async () => {
    setConfirmLoading(true);
    console.log(identity,"最终信息");
    let mark = identity.ident === "yes"?true:false
    await window.contract.methods.setIsFraudCase(identity.id,mark).send({
        from:window.accounts[0],
    },function(error,result){
        if(result){
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
                message.success("感谢您的审核与帮助",3)
                navigate("/admin/case_square/index")
              }, 2000);
        }else{
            message.error("审核错误，请稍后再试",3)
        }
    })
    
    
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
    return (
        <div>
             {datalist.map((item)=>{
                 if(item.id === pathnamedetail[1]){
                    return (
                        <div key={item.id}>
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
                                    <span>{item.title}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='prod-title'>案件描述：</span>
                                    <span>{item.description}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>案件时间：</span>
                                    <span>{new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>是否审核：</span>
                                    <span>{item.isSetValidity?"是":"否"}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='time'>信息有效性：</span>
                                    <span>{item.isValid?"是":"否"}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='prod-title'>所属分类：</span>
                                    <span>{item.tag}</span>
                                </Item>
                                <Item className='item'>
                                    <span className='prod-title'>案件图片：</span>
                                    <Image width={200} src={"http://localhost:8080/ipfs/"+item.imageLinks}/> 
                                </Item>
                                <Item className='item'>
                                    <span className='prod-title'>案件进度：</span>
                                    <Steps>
                                      <Step status="finish" title="已提交,等待审核"   description={new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')} />
                                      <Step status="process" title="通过审核,案件广场展示" icon={<LoadingOutlined />}description={new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')} />
                                      <Step status="wait" title="辖区民警审核" />
                                      <Step status="wait" title="案件完成" icon={<SmileOutlined />} />
                                    </Steps>
                                </Item>
                            </List>
                        </Card>
                        <div className='buttonlist'>
                            <Button type='primary' size='large' onClick={()=>{Audit(item.id)}}>立即审核</Button> 
                            <Modal
                              title="审核案件"
                              visible={visible}
                              onOk={handleOk}
                              confirmLoading={confirmLoading}
                              onCancel={handleCancel}
                              okText="确定"
                              cancelText="取消"
                            >
                              <h3><span>审核意见</span>
                              <Select className='selecttruth' defaultValue="yes" style={{ width: 200 }} onChange={handleChange}>
                                  <Option value="yes">该案件为诈骗案件</Option>
                                  <Option value="no">该案件不是诈骗案件</Option>
                            </Select>
                              </h3>
                              
                              
                            </Modal>
                        </div>
                        </div>
                    )}else{
                        return(null)
                    }
                    })}
           
        </div>
    );
};

export default CasesquareDetail;