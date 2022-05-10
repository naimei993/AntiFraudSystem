import React from 'react';
import {Card,List,Button,Image,Steps,} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,SmileOutlined,LoadingOutlined} from '@ant-design/icons'
import './casesquaredetail.min.css'

const {Item} = List
const { Step } = Steps;

const CasesquareDetail = () => {

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