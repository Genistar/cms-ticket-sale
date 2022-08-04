import { Menu, MenuProps } from 'antd';
import Icon, {
    SettingOutlined
} from '@ant-design/icons';
import React from 'react';
import styles from './Style.module.scss'
import { Link, useLocation } from 'react-router-dom';
import { home, ticket, check, setting } from '../../asset/Icon/iconHome.tsx'

type Props = {}
type MenuItem = Required<MenuProps>['items'][number];


function getItem(
    label: React.ReactNode,
    key: React.Key,
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
    getItem(<Link to='/'>Trang chủ</Link>, '/', <Icon color='#000' component={home} />),
    getItem(<Link to='/admin/ticketmanagament'>Quản lý vé</Link>, '/admin/ticketmanagament', <Icon component={ticket} />),
    getItem(<Link to='/admin/checkticket'>Đối soát vé</Link>, '/admin/checkticket', <Icon component={check} />),
    getItem(<Link to='/admin/setting' style={{ color: '#000' }}>Cài đặt</Link>, '/admin/setting', <Icon component={setting} />, [
        getItem('Gói dịch vụ', '/admin/servicepackage')
    ]
    ),
]

const Menubar = (props: Props) => {
    return (
        <div>
            <Menu
                defaultSelectedKeys={['/']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                className={styles.menubar}

            />
        </div>

    )
}

export default Menubar