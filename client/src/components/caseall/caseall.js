import React from 'react';
import * as echarts from 'echarts'
import {Divider,Image,Comment, Avatar,Radio, Button, message,Modal} from 'antd'
// import './casesquare.min.css'
import avatar from '../../static/avatar.webp'

const Caseall = () => {
    const [comment,setcomment] = React.useState({isShow:false,id:""})//评论区板块
    const [similarity,setsimilarity] = React.useState({isVisible:false,id:"",})//相似度板块
    const [value, setValue] = React.useState(0);//投票选择得值
    const [butloading,setbutloading] = React.useState(false)//提交投票按钮loading
    const [vote,setvote] = React.useState(false)//是否投票
    const [datalist,setdatalist] = React.useState([])
    const [isModalVisible, setIsModalVisible] = React.useState({isVisible:false,title:"",id:""});
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
  const handleOk = async () => {
    console.log(isModalVisible.id,isModalVisible.title);
     await window.contract.methods.postTaskFromCase(isModalVisible.id).send({
        from:window.accounts[0],
      },function(error,result){
        if(result){
          message.success("提交任务成功",3)
          setIsModalVisible((oldState)=>({
            ...oldState,
            isVisible:false
          }));
        }else{
          message.error("求助失败，请稍后重试",3)
          setIsModalVisible((oldState)=>({
            ...oldState,
            isVisible:false
          }));
        }
      })
  };

  const handleCancel = () => {
    console.log("取消");
    setIsModalVisible((oldState)=>({
      ...oldState,
      isVisible:false,
    }));
  };

    const Clickcomment = async (id)=>{//评论区点击
      
     await window.contract.methods.getIsVoted(id).call((err,result)=>{
       if(result){
        setvote(true)
       }else{
        setvote(false)
       }
       
      })
    //  await window.contract.methods.getIsVoted(id).call((err,result)=>{
    //    if(result){
    //      setvote(true)
    //    }else{
    //      setvote(false)
    //    }
    //  })
        if(similarity.isVisible){
            setsimilarity((oldState)=>({
                ...oldState,
                isVisible:!similarity.isVisible,
                id,
            }))
            setcomment((oldState)=>({
                ...oldState,
                isShow:!comment.isShow,
                id,
              }))
        }else{
            setcomment((oldState)=>({
                ...oldState,
                isShow:!comment.isShow,
                id
              }))
        }
        setValue(0)
    }
    const Clicksimilarity = (id)=>{//相似度点击区域
     // getVoteCountOf
        if(comment.isShow){
            setcomment((oldState)=>({
                ...oldState,
                isShow:!comment.isShow,
                id,
              }))
              setsimilarity((oldState)=>({
                ...oldState,
                isVisible:!similarity.isVisible,
                id,
            }))
            Similarity({id:id,systemprobability:80.2,peopleprobability:82.6})
        }else{
          Similarity({id:id,systemprobability:80.2,peopleprobability:82.6})
            setsimilarity((oldState)=>({
                ...oldState,
                isVisible:!similarity.isVisible,
                id,
            }))
        }
    }
    const Clickhelp = (id,title) =>{
      console.log(id,title);
      setIsModalVisible((oldState)=>({
        ...oldState,
        isVisible:true,
        title,
        id
      }));
    }


    const onChange = e => {//设置单选框的值
      setValue(e.target.value);
    };
    const SubmitCheck = async (id)=>{//提交按钮
      console.log(id,"提交id");
      if(value === 1){
        setbutloading(true)
        await window.contract.methods.vote(id,true).send({
          from:window.accounts[0],
        },function(error,result){
          if(result){
            setTimeout(() => {
              setbutloading(false)
              message.success("感谢您的提交",3)
              setvote(true)
            }, 1000);
          }else{
            message.error("投票异常，请稍后再试")
          }
        })
        
      }else if(value === 2){
        setbutloading(true)
        await window.contract.methods.vote(id,false).send({
          from:window.accounts[0],
        },function(error,result){
          if(result){
            setTimeout(() => {
              setbutloading(false)
              message.success("感谢您的提交",3)
              setvote(true)
            }, 1000);
          }else{
            message.error("投票异常，请稍后再试")
          }
        })
      }
      else{
        message.warn("请您先选择",3)
      }
     
      
    }
    const Similarity = (props)=>{//相似度组件
      window.contract.methods.getVoteCountOf(props.id).call((err,result)=>{
        console.log(err,result,"当前赞成票数 否定票数 总得票数");
      })
      const option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#136ac065'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 60,
              fontWeight: 'bolder',
              formatter: '{value} %',
              color: 'inherit'
            },
            data: [
              {
                value: `${props.systemprobability}`+0
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
              color: '#136ac0'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: `${props.systemprobability}`+0
              }
            ]
          }
        ]
      };
      const option1 = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#136ac065'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 60,
              fontWeight: 'bolder',
              formatter: '{value} %',
              color: 'inherit'
            },
            data: [
              {
                value: `${props.peopleprobability}`+0
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
              color: '#136ac0'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: `${props.peopleprobability}`+0
              }
            ]
          }
        ]
      };
        setTimeout(function() {
          if(document.getElementById('myecharts1')){
            let myEcharts1 = echarts.init(document.getElementById('myecharts1'))
            myEcharts1.setOption(option);
            myEcharts1 = null;

          }
            
           
        },100);
        setTimeout(function() {
          if(document.getElementById('myecharts2')){
            let myEcharts2 = echarts.init(document.getElementById('myecharts2'))
            myEcharts2.setOption(option1);
            myEcharts2 = null;
          }
            
        },200);
          // return (
          //     <div className='pie'> 
          //         <div className='pie_left'>
          //         <div id='myecharts1' style={{width:450,height:400}}> </div>
          //           <div className='text'>根据数据分析，该案件为诈骗案件的概率为:<p>{props.systemprobability}%</p></div>
          //         </div>
          //         <div className='pie_right'>
          //         <div id='myecharts2' style={{width:450,height:400}}> </div>
          //           <div className='text'>根据投票显示，该案件为诈骗案件的概率为:<p>{props.peopleprobability}%</p></div>
          //         </div>
          //   </div>
          // )
    }
    const MyComment = (itemId)=>{//评论区组件
          return(
            <div className='mycomment'>
              {!vote?<div className='check'>
                <div className='check_left'>
                <p>您的建议是:</p>
                <div> 
                  <Radio.Group onChange={onChange} value={value}>
                       <Radio value={1}>属于诈骗</Radio>
                       <Radio value={2}>不属于诈骗</Radio>
                      </Radio.Group>
                </div>
              </div>
              <div className='check_right'>
                <Button type='primary' loading={butloading} onClick={()=>{SubmitCheck(itemId.id)}}>提交</Button>
              </div>
                </div>:null}
              
                
              <Comment
        actions={[<span key="comment-nested-reply-to">回复</span>]}
        author={<p style={{fontWeight:"bold"}}>张伟</p>}
        avatar={<Avatar src={avatar} alt="Han Solo" />}
        content={
          <p style={{fontWeight:"bold"}}>
            该案件疑似程度很高，楼主需谨慎
          </p>
        }
      >
        <Comment
        actions={[<span key="comment-nested-reply-to">回复</span>]}
        author={<p style={{fontWeight:"bold"}}>李四</p>}
        avatar={<Avatar src={avatar} alt="Han Solo" />}
        content={
          <p style={{fontWeight:"bold"}}>
            赞同
          </p>
        }
      >
      </Comment>
      </Comment>
      <Divider  dashed={false}/>
      <Comment
        actions={[<span key="comment-nested-reply-to">回复</span>]}
        author={<p style={{fontWeight:"bold"}}>张伟</p>}
        avatar={<Avatar src={avatar} alt="Han Solo" />}
        content={
          <p style={{fontWeight:"bold"}}>
            感觉很有可能是骗子
          </p>
        }
      >
        <Comment
        actions={[<span key="comment-nested-reply-to">回复</span>]}
        author={<p style={{fontWeight:"bold"}}>李四</p>}
        avatar={<Avatar src={avatar} alt="Han Solo" />}
        content={
          <p style={{fontWeight:"bold"}}>
            支持你的观点
          </p>
        }
      >
      </Comment>
      </Comment>
            </div>
      
          )
    }
   

    return (
      
        <div className='casequare'>
            <div className='casequare_bg'>
                <div className='casequare_all'>
                  {
                    datalist.map((item)=>{
                        if(item.isValid){
                            return(
                                <div key={item.id}>
                                          <div className='casequare_item'>
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
                                      <a href={`/admin/case_all/${item.id}`}><span>{item.title}</span></a>
                                  </div>
                                  <div className='right_describe'>
                                  <a href={`/admin/case_all/${item.id}`}><span>{item.description}</span></a>
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
                                          <div className='casequare_bottom'>
                                              <div className='bottom_left' onClick={()=>{Clicksimilarity(item.id)}}>
                                              <svg t="1649526244882" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4793" width="15" height="15"><path d="M510.759 0C228.679 0 0 228.677 0 510.748c0 117.224 39.911 224.892 106.318 311.091l38.377-39.956C95.222 715.203 63.249 634.79 56.233 547.225l220.465 0c16.665 107.625 105.717 190.467 215.8 198.984l0 219.895c-83.913-3.356-161.914-29.321-228.223-72.049l-34.636 42.919c80.66 53.305 177.202 84.525 281.12 84.525 282.078 0 510.748-228.672 510.748-510.752C1021.507 228.677 792.836 0 510.759 0zM492.498 691.544c-79.903-8.023-144.782-66.934-160.493-144.319l160.493 0L492.498 691.544zM492.498 492.502l-162.33 0c8.664-85.968 76.465-153.749 162.33-162.437L492.498 492.502zM492.498 274.489c-116.356 8.884-209.087 101.64-217.971 218.013L55.647 492.502C65.055 255.277 255.29 65.046 492.498 55.623L492.498 274.489zM547.221 56.52C775.889 74.679 956.69 261.363 965.857 492.502L746.951 492.502c-8.415-110.212-92.072-199.151-199.73-215.836L547.221 56.52zM547.221 332.187c77.128 15.798 136.044 80.477 144.089 160.315L547.221 492.502 547.221 332.187zM547.221 547.225l142.252 0c-14.502 71.43-70.847 127.4-142.252 141.949L547.221 547.225zM547.221 965.024 547.221 744.544c101.593-15.785 181.821-95.668 197.559-197.318l220.158 0C947.26 769.922 769.872 947.353 547.221 965.024z" p-id="4794"></path></svg>
                                                  <div>疑似度</div>
                                              </div>
                                              <div className='bottom_right' onClick={()=>{Clickcomment(item.id)}}>
                                              <svg t="1649526014910" className='icon' width="15" height="15" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2221" ><path d="M896 138.66666667H128c-38.4 0-64 25.6-64 64V746.66666667c0 38.4 25.6 64 64 64h128v128c83.2 0 166.4-44.8 256-128h384c38.4 0 64-25.6 64-64V202.66666667c0-38.4-25.6-64-64-64z m0 608H486.4l-19.2 19.2c-51.2 51.2-102.4 83.2-147.2 96V746.66666667H128V202.66666667h768V746.66666667z" p-id="2222" fill="#515151"></path><path d="M320 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2223" fill="#515151"></path><path d="M512 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2224" fill="#515151"></path><path d="M704 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2225" fill="#515151"></path></svg>
                                              <div>评论</div>
                                              </div>
                                              <div className='bottom_right' onClick={()=>{Clickhelp(item.id,item.title)}}>
                                              <svg t="1650607763512" className="icon" width="15" height="15" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3167" ><path d="M840.4992 721.4592v-61.44c21.9136 0 39.68-19.1488 39.68-42.7008v-410.624c0-23.552-17.8176-42.7008-39.68-42.7008H378.8288c-21.9136 0-39.68 19.1488-39.68 42.7008h-61.44c0-57.4464 45.3632-104.1408 101.12-104.1408h461.6704c55.7568 0 101.12 46.7456 101.12 104.1408v410.624c0 57.3952-45.3632 104.1408-101.12 104.1408z" fill="#4C4C4C" p-id="3168"></path><path d="M442.7776 938.24c-0.768 0-1.4848 0-2.2528-0.0512-15.0528-0.6144-29.3376-7.5776-39.2192-18.9952l-56.4224-65.28a40.7552 40.7552 0 0 0-30.7712-14.1824H190.0544c-56.5248 0-102.5536-46.4384-102.5536-103.5264V347.7504c0-57.088 46.0288-103.5264 102.5536-103.5264h507.0336c56.5248 0 102.5536 46.4384 102.5536 103.5264v388.4032c0 57.088-46.0288 103.5264-102.5536 103.5264h-114.7904c-10.6496 0-20.736 4.1472-28.416 11.6736l-72.7552 71.2192c-10.24 10.0352-24.1152 15.6672-38.3488 15.6672zM190.0544 305.664c-22.6816 0-41.1136 18.8928-41.1136 42.0864v388.4032c0 23.2448 18.432 42.0864 41.1136 42.0864h124.0576c29.6448 0 57.8048 12.9536 77.2608 35.4816l51.8656 60.0064L510.976 807.424c19.2512-18.8416 44.5952-29.184 71.3728-29.184h114.7904c22.6816 0 41.1136-18.8928 41.1136-42.0864V347.7504c0-23.2448-18.432-42.0864-41.1136-42.0864H190.0544z" fill="#4C4C4C" p-id="3169"></path><path d="M474.2656 631.296h-61.44v-17.7152c0-34.9184 20.6848-66.0992 52.6848-79.4624a57.1904 57.1904 0 0 0 34.9696-56.3712c-1.7408-28.1088-25.1392-51.5072-53.248-53.248-15.9744-0.9728-31.1808 4.4544-42.752 15.36-11.6224 10.9056-17.9712 25.6512-17.9712 41.5744h-61.44c0-32.5632 13.6192-64.0512 37.3248-86.3744 24.064-22.6304 55.6544-33.9456 88.6272-31.8976 59.4432 3.6864 107.0592 51.3024 110.7456 110.7456 3.1232 50.4832-26.0608 97.4336-72.6528 116.8896-9.0624 3.7888-14.8992 12.6976-14.8992 22.784v17.7152z" fill="#4C4C4C" p-id="3170"></path><path d="M443.5456 710.5024m-33.536 0a33.536 33.536 0 1 0 67.072 0 33.536 33.536 0 1 0-67.072 0Z" fill="#4C4C4C" p-id="3171"></path></svg>
                                              <div>求助</div>
                                              </div>
                                              <Modal title="案件转任务" visible={isModalVisible.isVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                                                <div><span>确定将案件</span><span style={{color:'red'}}>{`${isModalVisible.title}`}</span><span>转换为任务悬赏？</span></div>
                                              </Modal>
                                          </div>
                                          
                                          {similarity.isVisible ? similarity.id === item.id ?<div className='pie'> 
                        <div className='pie_left'>
                        <div id='myecharts1' style={{width:450,height:400}}> </div>
                          <div className='text'>根据数据分析，该案件为诈骗案件的概率为:<p>{80.2}%</p></div>
                        </div>
                        <div className='pie_right'>
                        <div id='myecharts2' style={{width:450,height:400}}> </div>
                          <div className='text'>根据投票显示，该案件为诈骗案件的概率为:<p>{82.6}%</p></div>
                        </div>
                  </div>:null :null}
                                          {comment.isShow ? comment.id === item.id ? <MyComment id = {item.id}/>: null:null}
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
    )
};

export default Caseall;