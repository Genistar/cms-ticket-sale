import { Card, Image, Layout, Typography } from 'antd';
import React from 'react';
import Topbar from '../../components/Topbar';
import styles from '../Style.module.scss';
import logo from '../../asset/Image/logo.png'
import Menubar from '../../components/Menubar';
import { Route, Routes } from 'react-router-dom';
import TicketManagementPage from '../../features/TicketManagement';
import CheckTicketPage from '../../features/CheckTicket';
const { Sider, Header, Content, Footer } = Layout;

type Props = {}

const LayoutAdminPage: React.FC = (props: Props) => {
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
                    <Card className={styles.card_content}>
                        <Routes>
                            <Route path='/ticketmanagament' element={<TicketManagementPage />} />
                            <Route path='/checkticket' element={<CheckTicketPage />} />
                            <Route path='/setting' element={'setting'} />
                        </Routes>
                    </Card>
                </Content>

            </Layout>
        </Layout>
    )
}

export default LayoutAdminPage