import { Avatar, Image, Input, PageHeader } from 'antd';
import { MailOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons'
import React from 'react';
import styles from './Style.module.scss';
import avt from '../../asset/Image/avt.png'
type Props = {}

const Topbar: React.FC = (props: Props) => {
    return (
        <div>
            <PageHeader
                className={styles.topbar}
                extra={[
                    <Input.Search
                        placeholder='Search'
                        className={styles.searchInput}
                        suffix={<SearchOutlined style={{ fontSize: 24 }} />}
                        bordered={false}
                    />,
                    <div className={styles.accnotimail}>
                        <MailOutlined className={styles.icon} />
                        <BellOutlined className={styles.icon} />
                        <Avatar
                            icon={
                                <Image src={avt} preview={false} className={styles.image} />
                            }
                            size={48}
                        />
                    </div>
                ]}
            />
        </div>
    )
}

export default Topbar