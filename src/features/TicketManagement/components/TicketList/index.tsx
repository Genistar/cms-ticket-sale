import { Card, Tabs } from 'antd';
import moment from 'moment';
import { TicketType } from '../../../../interface/ticket'
import TableCustom from './components/Table/Table';
import { data as packages } from '../../../PackageService/components/PackageList';
import styles from '../../Styles.module.scss'
import { useAppdispatch, useAppSelector } from '../../../../store';
import { getAll, ticketSelector } from '../../ticketSlice';
import { useEffect, useState } from 'react';
const { TabPane } = Tabs;

type Props = {}

const TicketList = (props: Props) => {
    const [keywords, setKeywords] = useState<string>('');
    const { tickets, loading } = useAppSelector(ticketSelector);
    const dispatch = useAppdispatch();
    useEffect(() => {
        dispatch(getAll({ keywords }))
    }, [keywords]
    )
    const onChange = (key: string) => {
    }
    return (
        <Card style={{ borderRadius: 24, height: 653 }}>
            {packages.length >= 2 ?
                <Tabs defaultActiveKey="1" onChange={onChange} className={styles.tabs}>
                    <TabPane tab='Gói gia đình' key='1'>
                        <TableCustom
                            dataProps={tickets}
                            packages={packages.length}
                            setKeywords={setKeywords}
                            loading={loading}
                        />
                    </TabPane>
                    <TabPane tab='Gói sự kiện' key='2'>
                        <TableCustom
                            dataProps={tickets}
                            packages={packages.length}
                            setKeywords={setKeywords}
                            loading={loading}
                        />
                    </TabPane>
                </Tabs> : <TableCustom
                    dataProps={tickets}
                    packages={packages.length}
                    setKeywords={setKeywords}
                    loading={loading}
                />
            }
        </Card>

    )
}

export default TicketList