import React from 'react';
import * as echarts from 'echarts'
import {Divider,Image,Comment, Avatar,Radio, Button, message,Input } from 'antd'
import './assistaudit.min.css'
import avatar from '../../static/avatar.webp'

const { TextArea } = Input;
const Assistaudit = () => {
    const [comment,setcomment] = React.useState({isShow:false,id:""})
    const [similarity,setsimilarity] = React.useState({isVisible:false,id:"",})
    const [value, setValue] = React.useState(0);
    const [butloading,setbutloading] = React.useState(false)
    const [vote,setvote] = React.useState(true)
    const [combutloading,setcombutloading] = React.useState(false)
    React.useEffect(()=>{
      window.contract.methods.getCase().call((err,result)=>{
          console.log(err,result,"所有案件列表");
      })
      window.contract.methods.getIsVoted().call((err,result)=>{
        console.log(err,result,"是否投票");
    })
  },[])
    const Clickcomment = (id)=>{//评论区点击
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
        setvote(true)
        setValue(0)
    }
    const Clicksimilarity = (id)=>{//相似度点击区域
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
        }else{
            setsimilarity((oldState)=>({
                ...oldState,
                isVisible:!similarity.isVisible,
                id,
            }))
        }
        setvote(true)
        setValue(0)
    }
    const onChange = e => {//设置单选框的值
      setValue(e.target.value);
    };
    const onChangeInput = e =>{
      console.log(e.target.value);
      setcombutloading(true)
      setTimeout(() => {
        setcombutloading(false)
        message.success("感谢您的提交",3)
      }, 2000);
    }
    const SubmitCheck = ()=>{//提交按钮
      if(value === 1 || value === 2){
        setbutloading(true)
        setTimeout(() => {
          setbutloading(false)
          message.success("感谢您的提交",3)
          setvote(false)
        }, 1000);
      }else{
        message.warn("请您先选择",3)
      }
     
      
    }
    const Similarity = (props)=>{//相似度组件
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
            let myEcharts = echarts.init(document.getElementById('myecharts1'))
            myEcharts.setOption(option);
        }, 100);
        setTimeout(function() {
            let myEcharts = echarts.init(document.getElementById('myecharts2'))
            myEcharts.setOption(option1);
        }, 400);
          return (
              <div className='pie'> 
                  <div className='pie_left'>
                  <div id='myecharts1' style={{width:450,height:400}}> </div>
                    <div className='text'>根据数据分析，该案件为诈骗案件的概率为:<p>{props.systemprobability}%</p></div>
                  </div>
                  <div className='pie_right'>
                  <div id='myecharts2' style={{width:450,height:400}}> </div>
                    <div className='text'>根据投票显示，该案件为诈骗案件的概率为:<p>{props.peopleprobability}%</p></div>
                  </div>
            </div>
          )
    }
    const MyComment = ()=>{//评论区组件
          return(
            <div className='mycomment'>
              {vote?<div className='check'>
                <div className='check_left'>
                <p>您的建议是:</p>
                <div> 
                  <Radio.Group onChange={onChange} value={value}>
                       <Radio value={1}>属于诈骗</Radio>
                       <Radio value={2}>不属于诈骗</Radio>
                      </Radio.Group></div>
              
              </div>
              <div className='check_right'>
                <Button type='primary' loading={butloading} onClick={SubmitCheck}>提交</Button>
              </div>
                </div>:null}
                <div className='top_comment'>
                <TextArea   placeholder="欢迎您的评论"  />
                <Button type='primary' loading={combutloading} onClick={onChangeInput}>评论</Button>
                </div>
                
                
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
    
    const dataList = [
        {   id:"1",
        imgsrc:"http://p6.qhimg.com/t01bd60eab8fdee708d.png",
        time:"2022-04-5",
        title:"我点了个链接，银行卡余额被清空了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
        classification:"电信诈骗",
        price:10,
        systemprobability:"84.5",
        peopleprobability:"80.2",

        },
        {   id:"2",
        imgsrc:"https://p4.ssl.qhimg.com/t01430dbb1b1cd50790.png",
        time:"2022-04-5",
        title:"大家看看这个可信吗?",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
        classification:"网络赌博",
        price:10,
        systemprobability:"35.6",
        peopleprobability:"40.8",

        },
        {   id:"3",
        imgsrc:"http://p2.qhimg.com/t01d3fc8a4a5a73590d.png",
        time:"2022-04-5",
        title:"感觉好像被骗了",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
        classification:"短信诈骗",
        price:2,
        systemprobability:"70.0",
        peopleprobability:"65.0",

        },  
        {   id:"4",
        imgsrc:"http://p5.qhimg.com/t019c2e2673692a26ce.png",
        time:"2022-04-5",
        title:"切莫点击不明链接",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"review",
        classification:"电信诈骗",
        price:1,
        systemprobability:"10.0",
        peopleprobability:"31.5",

        },
        {   id:"5",
        imgsrc:"http://n.sinaimg.cn/translate/w398h415/20180208/ZQK--fyrkuxs4332770.jpg",
        time:"2022-04-5",
        title:"大伙们看看这个是真是假",
        describe:"点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移,点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",
        caseState:"completed",
        classification:"电信诈骗",
        price:1,
        systemprobability:"100.0",
        peopleprobability:"99.0",

        },
    ]

    return (
        <div className='assistaudit'>
            <div className='assistaudit_bg'>
                <div className='assistaudit_all'>
                    {
                        dataList.map((item)=>{//箭头函数
                            return(
                                <div key={item.id}>
                                    <div className='assistaudit_item'>
                                        <div className='line'></div>
                                        <div className='assistaudit_left'>
                            <a href="#!" >
                            <Image
                             width={200}
                             src={item.imgsrc}
                            />
                                <time dateTime="2022-04-5">{item.time}</time>
                            </a>
                            
                                        </div>
                                        <div className='assistaudit_right'>
                            <div className='right_title'>
                              {item.price>5 ? <span className="badge" style={{display: "inline-block"}}>悬赏</span>:null}
                                <a href={`/admin/assist_audit/${item.id}`}><span>{item.title}</span></a>
                            </div>
                            <div className='right_describe'>
                            <a href={`/admin/assist_audit/${item.id}`}><span>{item.describe}</span></a>
                            </div>
                            <div className='right_bottom'>
                                <div className='time'>{item.time}</div>
                                
                                <div className='classification'>
                                <svg t="1649339921591" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4427" width="16" height="18"><path d="M512 967.110656C260.64896 967.110656 56.889344 763.35104 56.889344 512S260.64896 56.889344 512 56.889344 967.110656 260.64896 967.110656 512 763.35104 967.110656 512 967.110656z m-57.2928-540.443648H369.77664c-15.709184 0-28.444672 12.734464-28.444672 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v85.334016h-113.77664c-15.710208 0-28.445696 12.734464-28.445696 28.443648 0 15.710208 12.735488 28.444672 28.444672 28.444672h113.777664v113.777664C483.555328 755.264512 496.29184 768 512 768s28.444672-12.735488 28.444672-28.444672v-113.77664h113.77664c15.710208 0 28.445696-12.735488 28.445696-28.445696 0-15.70816-12.735488-28.443648-28.444672-28.443648H540.444672v-85.334016h113.77664c15.710208 0 28.445696-12.734464 28.445696-28.444672 0-15.70816-12.735488-28.443648-28.444672-28.443648h-82.90816l81.883136-81.883136c11.108352-11.108352 11.108352-29.11744 0-40.225792-11.108352-11.108352-29.118464-11.108352-40.226816 0l-99.959808 99.959808-99.959808-99.959808c-11.108352-11.108352-29.118464-11.108352-40.226816 0-11.108352 11.108352-11.108352 29.11744 0 40.225792l81.883136 81.883136z" p-id="4428" fill="#ffd700"></path></svg>
                                    <span >积分:{item.price}</span>
                                     </div>
                                
                            </div>
                           
                                        </div>
                                    </div>
                                    <div className='assistaudit_bottom'>
                                        <div className='bottom_left' onClick={()=>{Clicksimilarity(item.id)}}>
                                        <svg t="1649526244882" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4793" width="15" height="15"><path d="M510.759 0C228.679 0 0 228.677 0 510.748c0 117.224 39.911 224.892 106.318 311.091l38.377-39.956C95.222 715.203 63.249 634.79 56.233 547.225l220.465 0c16.665 107.625 105.717 190.467 215.8 198.984l0 219.895c-83.913-3.356-161.914-29.321-228.223-72.049l-34.636 42.919c80.66 53.305 177.202 84.525 281.12 84.525 282.078 0 510.748-228.672 510.748-510.752C1021.507 228.677 792.836 0 510.759 0zM492.498 691.544c-79.903-8.023-144.782-66.934-160.493-144.319l160.493 0L492.498 691.544zM492.498 492.502l-162.33 0c8.664-85.968 76.465-153.749 162.33-162.437L492.498 492.502zM492.498 274.489c-116.356 8.884-209.087 101.64-217.971 218.013L55.647 492.502C65.055 255.277 255.29 65.046 492.498 55.623L492.498 274.489zM547.221 56.52C775.889 74.679 956.69 261.363 965.857 492.502L746.951 492.502c-8.415-110.212-92.072-199.151-199.73-215.836L547.221 56.52zM547.221 332.187c77.128 15.798 136.044 80.477 144.089 160.315L547.221 492.502 547.221 332.187zM547.221 547.225l142.252 0c-14.502 71.43-70.847 127.4-142.252 141.949L547.221 547.225zM547.221 965.024 547.221 744.544c101.593-15.785 181.821-95.668 197.559-197.318l220.158 0C947.26 769.922 769.872 947.353 547.221 965.024z" p-id="4794"></path></svg>
                                            <div>疑似度</div>
                                        </div>
                                        <div className='bottom_right' onClick={()=>{Clickcomment(item.id)}}>
                                        <svg t="1649526014910" className='icon' width="15" height="15" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2221" ><path d="M896 138.66666667H128c-38.4 0-64 25.6-64 64V746.66666667c0 38.4 25.6 64 64 64h128v128c83.2 0 166.4-44.8 256-128h384c38.4 0 64-25.6 64-64V202.66666667c0-38.4-25.6-64-64-64z m0 608H486.4l-19.2 19.2c-51.2 51.2-102.4 83.2-147.2 96V746.66666667H128V202.66666667h768V746.66666667z" p-id="2222" fill="#515151"></path><path d="M320 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2223" fill="#515151"></path><path d="M512 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2224" fill="#515151"></path><path d="M704 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2225" fill="#515151"></path></svg>
                                        <div>评论</div>
                                        </div>
                                    </div>
                                    {similarity.isVisible ? similarity.id === item.id ?<Similarity systemprobability = {item.systemprobability} peopleprobability = {item.peopleprobability}/>:null :null}
                                    {comment.isShow ? comment.id === item.id ? <MyComment/>: null:null}

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

export default Assistaudit;