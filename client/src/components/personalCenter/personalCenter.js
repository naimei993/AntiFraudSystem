import React from 'react';
import { Avatar, Image,Divider} from 'antd';
import * as echarts from 'echarts'
import './personalcenter.min.css'
import avatar_My from '../../static/avatar.webp'
const PersonalCenter = () => {
    const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 10, name: '已提交案件' },
              { value: 7, name: '已解决案件' },
              { value: 3, name: '审核中' },
              
            ]
          }
        ]
      };
    React.useEffect(()=>{//箭头函数
        let myEcharts = echarts.init(document.getElementById('myecharts'))
        myEcharts.setOption(option);
    })
    return (
      <div className='personalcenter'>
          <div className='per_all'>
            <div className='per_left'>
              <div className='avatar_my'>
              <Avatar
                src={
                  <Image
                    src={avatar_My}
        />
      } size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
    />
              </div>
              <div className='userinfo'>
                <div className='username'>张伟</div>
                <div className='userdetial'>
                  性别：男
                  <Divider type="vertical" />
                  注册年龄：1年
                  <Divider type="vertical" />
                  <a href="/admin/article_about/index">发布数量：10</a>
                  <Divider type="vertical" />
                  <a href="/admin/integralmall/index">我的积分：20</a>
                </div>
                <div className='userbottom'>
                <div className='entrance'>
                  <a href='/admin/reporting_center/index'>
                  <div>我要举报</div>
                  </a>
                </div>
                <div className='center entrance'>
                  <a href='/admin/article_about/index'>
                  <div>进度查询</div>
                  </a>
                </div>
                <div className='entrance'>
                  <a href='/admin/home/index'>
                  <div>反馈信息</div>
                  </a>
                </div>
                  </div>
              </div>
            </div>
          <div className='per_right'>
            <div id='myecharts' style={{width:300,height:400}}>

            </div>
          </div>
      </div>
          
            
        </div>
    );
};

export default PersonalCenter;