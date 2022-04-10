import React from 'react';
import { Layout } from 'antd';
import {Route,Routes} from 'react-router'
import HeaderTop from './header/header';
import Home from '../home/home';
import PersonalCenter from '../personalCenter/personalCenter';
import RepForm from '../repCenter/repForm/repForm';
import RepGuide from '../repCenter/repGuide/repGuide';
import Integralmall from '../integralmall/integralmall';
import Article from '../article/article';
import Artdetial from '../article/artdetial/artdetial';
import CaseReward from '../casereward/casereward';
import CaseRewardDetail from '../casereward/caserewarddetail/caserewarddetail'
import CaseSquare from '../casesquare/casesquare';
import CaseSquareDeatil from '../casesquare/casesquaredetail/casesquaredetail'
import Fleamarket from '../fleamarket/fleamarket';
import Assistaudit from '../assistaudit/assistaudit';
const { Header, Content } = Layout;
const Admin = () => {
    return (
        <div>
            <Layout>
      <Header><HeaderTop/></Header>
      <Content>
      <Routes>
                {/* 主页路由 */}
                <Route path="/home/index" element={<Home/>}/>
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
                    <Route path=':id' element={<CaseRewardDetail/>}/>
                </Route>
                {/* 警方案件广场路由 */}
                <Route path='/case_square'>
                    <Route path='index' element={<CaseSquare/>}/>
                    <Route path=':id' element={<CaseSquareDeatil/>}/>
                </Route>
                {/* 警方悬赏广场路由 */}
                <Route path='/case_reward'>
                    <Route path='index' element={<CaseReward/>}/>
                    <Route path=':id' element={<CaseRewardDetail/>}/>
                </Route>
                {/* 跳蚤市场 */}
                <Route path='/flea_market'>
                    <Route path='index' element={<Fleamarket/>}/>
                </Route>
                {/* 积分商城路由 */}
                <Route path="/integralmall/index" element={<Integralmall/>}/>
                {/* 个人中心路由 */}
                <Route path="/personalcenter/index" element={<PersonalCenter/>}/>
                {/* 404not found */}
                <Route
                path="*"
                element={
              <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
            />
              </Routes>
      </Content>
    </Layout>
        </div>
    );
};

export default Admin;