import React from 'react';

import {Divider,Image, Button, message,Checkbox,Modal,Select} from 'antd'
import './casesquare.min.css'



const { Option } = Select;
const CaseSquare = () => {
    const [datalist,setdatalist] = React.useState([])
    const [selectitem,setselectitem] = React.useState([])
    const [visi,setvisi] = React.useState({visible:false,type:false})
    const [identity,setidentity] = React.useState({ident:"yes",id:""})
    React.useEffect(()=>{
      const getCase = async ()=>{
        await window.contract.methods.getCaseList().call((err,result)=>{
          if(result){
            let arr = Object.assign([],result).reverse();
            console.log(arr);
            setdatalist(arr)
            
          }
        })
      }
      getCase()
    },[])
  

 
  const auditOk = async () => {
    let len = selectitem.length
    let truth = identity.ident === "yes"?true:false
    let arr = []
    for(let i =0;i<len;i++){
      arr.push(truth)
    }
    console.log(selectitem,arr);
    if(len === 0){
      message.error("选择列表不能为空",3)
      return 
    }else{
  await window.contract.methods.setCaseValidity(selectitem,arr).send({
      from:window.accounts[0],
    },function(error,result){
      if(result){
        setvisi((oldState)=>({
          ...oldState,
          visible:false
        }));
        message.success("感谢您的提交",3)
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }else{
        message.error("提交错误，请稍后再试",3)
        setvisi((oldState)=>({
          ...oldState,
          visible:false
        }));
      }
    })
    }
    
  };

  const auditCancel = () => {
    setvisi((oldState)=>({
      ...oldState,
      visible:false
    }));
  };
  const handleChange =(value)=> {
    console.log(value);
    setidentity((oldState)=>({
        ...oldState,
        ident:value
    }))
  }
    
    const start = async() => {//批量审核按钮
      setvisi((oldState)=>({
        ...oldState,
        visible:true
      }));
      console.log(selectitem,"选择的id");
      // await window.contract.methods.setCaseValidity()
  
      };
    const checkBox = (e,id)=>{
      if(e.target.checked){
        let arr = [id,...selectitem]
        setselectitem(Array.from(new Set(arr)))
      }else{
        let arr1 = selectitem
        arr1.map((val,i)=>{
          if(val === id){
            arr1.splice(i,1);
            setselectitem(arr1)
            return null
          }else{
            return null
          }
        })
      }
    }
    return (
      
        <div className='casequare'>
            <div className='casequare_bg'>
            <Button type="primary" className='top_button' onClick={start}>
            批量审核有效性
          </Button>
          <Modal title="审核意见" visible={visi.visible} okText="确定" cancelText="取消" onOk={auditOk} onCancel={auditCancel}>
            <Select className='selecttruth' defaultValue="yes" style={{ width: 200 }} onChange={handleChange}>
                   <Option value="yes">是有效信息</Option>
                    <Option value="no">不是有效信息</Option>
             </Select>
          </Modal>
                <div className='casequare_all'>
                  {
                    datalist.map((item)=>{
                      if(!item.isValid){
                        return(
                          <div key={item.id}>
                                    <div className='casequare_item'>
                                    <Checkbox onChange={(e)=>{checkBox(e,item.id)}} ></Checkbox>
                                        <div className='line'></div>
                                        <div className='casequare_left'>
                            <a href="#!" >
                            <Image
                             width={180}
                             height={180}
                             src={"http://localhost:8080/ipfs/"+item.imageLinks}
                            />
                                <time dateTime={new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}>{new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</time>
                            </a>
                            
                                        </div>
                                        <div className='casequare_right'>
                            <div className='right_title'>
                              {item.price ? <span className="badge" style={{display: "inline-block"}}>悬赏</span>:null}
                                <a href={`/admin/case_square/${item.id}`}><span>{item.title}</span></a>
                            </div>
                            <div className='right_describe'>
                            <a href={`/admin/case_square/${item.id}`}><span>{item.description}</span></a>
                            </div>
                            <div className='right_bottom'>
                                <div className='time'>{new Date(parseInt(item.postTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</div>
                                
                                <div className='classification'>
                                <svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                                        <path d="M512.2 564.743a76.818 76.818 0 0 1-30.973-6.508L108.224 393.877c-26.105-11.508-42.56-35.755-42.927-63.272-.384-27.44 15.356-52.053 41.042-64.232l373.004-176.74c20.591-9.737 45.16-9.755 65.75.017L917.68 266.39c25.668 12.188 41.39 36.792 41.024 64.231-.384 27.5-16.821 51.73-42.908 63.237l-372.57 164.377a77.18 77.18 0 0 1-31.025 6.508zM139.843 329.592l370.213 163.241c1.291.56 3.018.567 4.345-.009l369.758-163.128-369.706-175.464v-.01c-1.326-.628-3.158-.636-4.502 0l-370.108 175.37zm748.015 1.858h.175-.175zM512.376 941.674c-10.348 0-20.8-2.32-30.537-6.997L121.05 778.624c-18.113-7.834-26.454-28.87-18.62-46.983 7.835-18.112 28.862-26.488 46.993-18.61l362.08 156.629 345.26-156.366c17.939-8.166 39.14-.253 47.324 17.746 8.166 17.964.227 39.157-17.729 47.324l-344.51 156.61c-9.196 4.449-19.281 6.7-29.471 6.7z" fill="#444">
                                            </path><path d="M871.563 515.449L511.81 671.775 152.358 515.787v73.578a34.248 34.248 0 0 0 20.76 31.48l301.518 129.19c11.806 5.703 24.499 8.546 37.175 8.546s25.367-2.843 37.174-8.546L850.82 620.534a34.248 34.248 0 0 0 20.744-31.474V515.45z" fill="#ff6a18">
                                                </path>
                                                </svg>
                                    <span >{item.tag}</span>
                                     </div>
                                
                            </div>
                           
                                        </div>
                                    </div>
                                    
                                <Divider dashed />
                          </div>
                     )
                      }else{
                        return null
                      }
                     
                    })
                  }
                </div>
            </div>
        </div>
    );
};

export default CaseSquare;