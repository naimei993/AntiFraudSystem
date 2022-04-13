import React from 'react';
import { Card,Carousel,Divider, message } from 'antd';
import {connect} from 'react-redux'
import { useNavigate } from 'react-router';
import './home.min.css'
import logo from '../../static/gongan.png'
import lb01 from '../../static/lb01.jpg'
import lb02 from '../../static/lb02.jpg'
import lb03 from '../../static/lb03.png'
import lb04 from '../../static/lb04.png'
import report from '../../static/fanzha.svg'
import progressquery from '../../static/jinduchaxun.svg'
const Home = (props) => {
    const navigate = useNavigate ()
      const niticeList = [
          {   id:"1",
              title:"习近平向第四届中古两党理论研讨会致贺信",
              time:"2022-03-25"
          },
          {
            id:"2",
            title:"何鲁丽同志遗体在京火化　习近平栗战书汪洋等到八宝山革命公墓送别",
            time:"2022-03-25"
        },
        {
            id:"3",
            title:"中共中央办公厅印发《关于推动党史学习教育常态化长效化的意见》",
            time:"2022-03-25"
        },
        {
            id:"4",
            title:"中共中央政治局常务委员会召开会议 习近平主持",
            time:"2022-03-25"
        },
        {
            id:"5",
            title:"打击整治枪支爆炸物品违法犯罪部际联席会议第四次全体会议暨全国专项行动推进会召开 纵深推进打击整治枪爆违法犯罪工作 确保社会大局持续安全稳定",
            time:"2022-03-25"
        },
        {
            id:"6",
            title:"全国公安机关打击治理跨境赌博工作视频会议召开 持续保持严打高压态势 扎实抓好打击治理跨境赌博各项措施落实",
            time:"2022-03-25"
        },
        
      ]
      let reduxinfo = JSON.parse(props.userInfo.user)
      const {isLogin} = props.userInfo
      console.log(props.userInfo);
      if(!isLogin){
          message.warn("请您先登录",3)
          navigate("/admin/login/index")
        return 
        
    }else{
        return (
        
            <div className='home'>
                <div className='top_bag'>
                    <div className='jubao entrance'>
                        <a href={reduxinfo.type ==="people"?"/admin/reporting_center/index":"/admin/case_square/index" }>
                    <img src={report} alt="我要举报"></img>
                    <div>{reduxinfo.type === "people" ?"我要举报":"辖区案件"}</div>
                    </a>
                    </div>
                    <div className='chaxun entrance'>
                    <a href={reduxinfo.type === "people"?"/admin/assist_audit/index":"/admin/flea_market/index"}>
                        <img src={progressquery} alt="进度查询"></img>
                        <div>{reduxinfo.type=== "people"?"协助审查":"社区生态"}</div>
                    </a>
                    </div>
                </div>
                <div className='home_center'>
                    <div className='shuffling'>
                    <Carousel autoplay>
                    <div>
                        <h3 style={{height:"378px"}}><img src={lb01} alt="轮播图片1"></img></h3>
                    </div>
                    <div>
                        <h3 style={{height:"378px"}}><img src={lb02} alt="轮播图片2"></img></h3>
                    
                    </div>
                    <div>
                    <h3 style={{height:"378px"}}><img src={lb03} alt="轮播图片3"></img></h3>
                    
                    </div>
                    <div>
                    <h3 style={{height:"378px"}}><img src={lb04} alt="轮播图片4"></img></h3>
                    
                    </div>
                    </Carousel>,
    
                    </div>
                    <div className='notice'>
                <Card title="通知公告" extra={<a href="/admin/home/index">{`更多>>`}</a>} style={{ width: 500 }} headStyle={{fontWeight:"bold",fontSize:'25px'}}>
                    {
                        niticeList.map((item)=>{//通知公告列表遍历
                              return(
                              <div className='notice_item' key={item.id}>
                                <a href='/admin/home/index'>{item.title}</a>
                              <span className='notice_time'>{item.time}</span>
                          </div>)
                        })
                    }
                
            
            
                </Card>
                </div>
                </div>
                <div className='home_bottom'>
                    <div className='card_two'>
                    <Divider style={{fontWeight:"bolder"}} orientation="left">政策文件</Divider>
                        <div className='rule'>{
                        niticeList.map((item)=>{//通知公告列表遍历
                              return(
                              <div className='notice_item' key={item.id}>
                                <a href='/admin/home/index'>{item.title}</a>
                              <span className='notice_time'>{item.time}</span>
                          </div>)
                        })
                    }
                    <div className='card_bottom'>
                        <a href='/admin/home/index'>{`更多>>`}</a>
                    </div>
                    </div>
                    
                    </div>
                    <div className='card_two'>
                    <Divider style={{fontWeight:"bolder"}} orientation="left">政策解读</Divider>
                        <div className='rule'>{
                        niticeList.map((item)=>{//通知公告列表遍历
                              return(
                              <div className='notice_item' key={item.id}>
                                <a href='/admin/home/index'>{item.title}</a>
                              <span className='notice_time'>{item.time}</span>
                          </div>)
                        })
                    }
                    <div className='card_bottom'>
                        <a href='/admin/home/index'>{`更多>>`}</a>
                    </div>
                    </div>
                        
                    </div>
                </div>
                <div className='home_foot'>
                    <div className='home_detailmsg'>
                        <div className='email'>邮箱：gongan@gov.cn</div>
                        <div className='zipcode'>邮编：110110</div>
                        <div className='address'>地址:重庆市南岸区</div>
                    </div>
                    <div className='web_msg'>
                    <img src={logo} alt='logo'></img>
                        <div className='record'>京公网安备 66666666666666号</div>
                        <div>京ICP备00000000号</div>
    
                    </div>
                        
                    </div>
            </div>
        );
    }
   
};
const mapStateToProps = (state)=>{
    return {
      userInfo:state.userInfo
    }
  }
export default connect(
    mapStateToProps,{}
  )(Home)