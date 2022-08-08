import { Breadcrumb, Card, Image, Layout, Typography } from 'antd';
import React from 'react';
import Topbar from '../../components/Topbar';
import styles from '../Style.module.scss';
import logo from '../../asset/Image/logo.png'
import Menubar from '../../components/Menubar';
import { Route, Routes, useLocation } from 'react-router-dom';
import TicketManagementPage from '../../features/TicketManagement';
import CheckTicketPage from '../../features/CheckTicket';
import DashboardPage from '../../features/Dashboard';
import { Link } from 'react-router-dom';
const { Sider, Header, Content, Footer } = Layout;

type Props = {}


const breadcrumbNameMap: Record<string, string> = {
    '/home': "Thống kê",
    "/ticketmanagament": "Danh sách vé",
    "/checkticket": "Đối soát vé"
};
const LayoutAdminPage: React.FC = (props: Props) => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    console.log(pathSnippets)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url} className={styles.breadcrumb}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    console.log(extraBreadcrumbItems)
    return (
        <Layout
            className={styles.container}
        >
            <Sider className={styles.sider_menu}>
                <Layout className={styles.sider_menu_site}>
                    <Header className={styles.site_layout_header}>
                        <Image src={logo} className={styles.logo_image} />
                    </Header>
                    <Content className={styles.sider_menu_site_content}>
                        <Menubar></Menubar>
                    </Content>
                    <Footer className={styles.sider_menu_site_footer}>
                        copyright @ Alta software
                    </Footer>
                </Layout>
            </Sider>
            <Layout className={styles.site_layout}>
                <Header
                    className={styles.site_layout_header}
                >
                    <Topbar />
                </Header>
                <Content
                    className={styles.site_layout_content}
                >
                    <Breadcrumb separator='' >{extraBreadcrumbItems}</Breadcrumb>
                    <Routes>
                        <Route path='/home' element={<DashboardPage />} />
                        <Route path='/ticketmanagament' element={<TicketManagementPage />} />
                        <Route path='/checkticket' element={<CheckTicketPage />} />
                        <Route path='/setting' element={'setting'} />
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    )
}

export default LayoutAdminPage