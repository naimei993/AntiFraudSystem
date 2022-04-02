import React from 'react';
import { Layout } from 'antd';
import {Route,Routes} from 'react-router'
import HeaderTop from './header/header';
import Home from '../home/home';
import PersonalCenter from '../personalCenter/personalCenter';
import RepForm from '../repCenter/repForm/repForm';
import RepGuide from '../repCenter/repGuide/repGuide';
import Integralmall from '../integralmall/integralmall';
const { Header, Content } = Layout;
const Admin = () => {
    return (
        <div>
            <Layout>
      <Header><HeaderTop/></Header>
      <Content>
      <Routes>
                <Route path="/home/index" element={<Home/>}/>Reporting center
               
                <Route path="/reporting_center">
                    <Route path="index" element={<RepGuide/>}/>
                    <Route path="reporting_form" element={<RepForm/>}/>
                </Route>
                {/* <Route path="/article_about">
                    <Route path="articlelist" element={<Articlelist/>}/>
                    <Route path="writearticle" element={<Writearticle/>}/>
                    <Route path="classification" element={<Classification/>}/>
                    <Route path="articledetail/:id" element={<ArticleDetail/>}/>
                    <Route path="articleupdate/:id" element={<ArticleUpdate/>}/>
                </Route>
                <Route path="/system">
                    <Route path="log"  element={<Log/>}/>
                    <Route path="friendlink"  element={<FriendLink/>}/>
                </Route>
                <Route path="comments" element={<Comments/>}/>
                <Route path="comments/:id" element={<Commentdetial/>}/> */}
                <Route path="/integralmall/index" element={<Integralmall/>}/>
                <Route path="/personalcenter/index" element={<PersonalCenter/>}/>
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