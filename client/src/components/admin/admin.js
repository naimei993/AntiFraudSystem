import React from 'react';
import { Layout,Result,Button,message } from 'antd';
import { connect } from 'react-redux';
import {Route,Routes,useNavigate} from 'react-router'
import { Navigate } from "react-router-dom";
import HeaderTop from './header/header';
import Home from '../home/home';
import Index  from '../index';
import PersonalCenter from '../personalCenter/personalCenter';
import RepForm from '../repCenter/repForm/repForm';
import RepGuide from '../repCenter/repGuide/repGuide';
import Integralmall from '../integralmall/integralmall';
import Article from '../article/article';
import Artdetial from '../article/artdetial/artdetial';
// import CaseReward from '../casereward/casereward';
// import CaseRewardDetail from '../casereward/caserewarddetail/caserewarddetail'
import CaseSquare from '../casesquare/casesquare';
import CaseSquareDeatil from '../casesquare/casesquaredetail/casesquaredetail'
import Fleamarket from '../fleamarket/fleamarket';
import Assistaudit from '../assistaudit/assistaudit';
import AssistauditDetail from '../assistaudit/assistauditdetail/assistauditdetail';
import Reward from '../reward/reward'
import RewardDetial from '../reward/rewarddetial/rewarddetial'
import Uploadcase from '../uploadcase/uploadcase';
import Caseall from '../caseall/caseall';
import Casealldetail from '../caseall/casealldetail/casealldetail';
import Caseallpeople from '../caseallpeople/caseallpeople';
import Casealldetailpeople from '../caseallpeople/casealldetail/casealldetail';
const { Header, Content } = Layout;
const Admin = (props) => {
    const navigate = useNavigate()
    if(props.userInfo.isLogin){
        return (
        <div>
            <Layout>
      <Header><HeaderTop/></Header>
      <Content>
      <Routes>
               
                {/* 主页路由 */}
                <Route path="/home/index" element={<Home/>}/>
                <Route path='/index' element={<Index/>}/>
                {/* 举报中心路由 */}
                <Route path="/reporting_center">
                    <Route path="index" element={<RepGuide/>}/>
                    <Route path="reporting_form" element={<RepForm/>}/>
                </Route>
                {/* 民众历史审核路由 */}
                <Route path='/article_about'>
                    <Route path='index' element={<Article/>}/>
                    <Route path=':id' element={<Artdetial/>}/>
                </Route>
                <Route path='/assist_audit'>
                    <Route path='index' element={<Assistaudit/>}/>
                    <Route path=':id' element={<AssistauditDetail/>}/>
                </Route>
                {/* 警方案件广场路由 */}
                <Route path='/case_square'>
                    <Route path='index' element={<CaseSquare/>}/>
                    <Route path=':id' element={<CaseSquareDeatil/>}/>
                </Route>
                <Route path='/case_all'>
                <Route path='index' element={<Caseall/>}/>
                    <Route path=':id' element={<Casealldetail/>}/>
                </Route>
                <Route path='/case_all_people'>
                <Route path='index' element={<Caseallpeople/>}/>
                    <Route path=':id' element={<Casealldetailpeople/>}/>
                </Route>
                {/* 警方悬赏广场路由 */}
                {/* <Route path='/history_review'>
                    <Route path='index' element={<CaseReward/>}/>
                    <Route path=':id' element={<CaseRewardDetail/>}/>
                </Route> */}
                <Route path='/review'>
                    <Route path='index' element={<Reward/>}/>
                    <Route path=':id' element={<RewardDetial/>}/>
                </Route>
                {/* 跳蚤市场 */}
                <Route path='/flea_market'>
                    <Route path='index' element={<Fleamarket/>}/>
                </Route>
                <Route path='/upload_case'>
                    <Route path='index' element={<Uploadcase/>}/>
                </Route>
                {/* 积分商城路由 */}
                <Route path="/integralmall/index" element={<Integralmall/>}/>
                {/* 个人中心路由 */}
                <Route path="/personalcenter/index" element={<PersonalCenter/>}/>
                {/* 404not found */}
                <Route
                path="*"
                element={
                    <Result
                    status="404"
                    title="404"
                    style={{height:"870px"}}
                    subTitle="抱歉，未找到您需要的网址"
                    extra={<Button type="primary" onClick={()=>{navigate("/admin/home/index")}}>回到首页</Button>}
                  />
            }
            />
              </Routes>
      </Content>
    </Layout>
        </div>
    );
}else{
    message.warn("请您先登录！",3);
    return(
    <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
)
  }
};

const mapStateToProps = (state)=>{
    return {
      userInfo:state.userInfo
    }
  }
  export default connect(
    mapStateToProps,{}
  )(Admin)