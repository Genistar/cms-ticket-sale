import { Menu, MenuProps, Typography } from 'antd';
import Icon, {
    SettingOutlined,
    HomeOutlined
} from '@ant-design/icons';
import React from 'react';
import styles from './Style.module.scss'
import { Link, useLocation } from 'react-router-dom';
import { home, ticket, check, setting } from '../../asset/Icon/iconHome.tsx'

type Props = {}
type MenuItem = Required<MenuProps>['items'][number];


function getItem(
    label: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem(<Link to='/home' style={{ fontWeight: 700 }}>Trang chủ</Link>, '/home', <HomeOutlined />),
    getItem(<Link to='/ticketmanagament' style={{ fontWeight: 700 }}>Quản lý vé</Link>, '/ticketmanagament', <Icon component={ticket} />),
    getItem(<Link to='/checkticket' style={{ fontWeight: 700 }}>Đối soát vé</Link>, '/checkticket', <Icon component={check} />),
    getItem('Cài đặt', '', <SettingOutlined />, [
        getItem(<Link to='/setting/servicepackage' style={{ color: '#000', fontWeight: 700 }}>Gói dịch vụ</Link>, '/setting/servicepackage')
    ]
    ),
]

const Menubar = (props: Props) => {
    return (
        <div>
            <Menu
                defaultSelectedKeys={['/admin']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                className={styles.menubar}

            />
        </div>

    )
}

export default Menubar