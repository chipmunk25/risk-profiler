import React from 'react';
import { useRouteMatch } from "react-router-dom";
import PageHeader from "../Header"
import PageSidebar from "../Sidebar"
import { Layout } from 'antd';
import App from "../../pages"
//import "./style.scss"


const { Content, Footer } = Layout;
const MainApp = () => {
    const match = useRouteMatch();
    return (
        <Layout className="gx-app-layout">
            <PageSidebar />
            <Layout>
                <PageHeader />
                <Content className={`gx-layout-content `}>
                    <App match={match} />
                    <Footer>
                        <div className="gx-layout-footer-content">
                            Copyright Chipsoft GH
                        </div>
                    </Footer>
                </Content>

            </Layout>

        </Layout>
    );
};

export default MainApp;