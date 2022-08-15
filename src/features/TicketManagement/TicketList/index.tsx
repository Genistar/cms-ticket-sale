import { Card, Tabs } from 'antd';
import moment from 'moment';
import { TicketType } from '../../../interface/ticket'
import TableCustom from '../components/Table';
import { data as packages } from '../../PackageService/PackageList';
import styles from '../Styles.module.scss'
const { TabPane } = Tabs;

type Props = {}

const TicketList = (props: Props) => {
    const dataFamily: TicketType[] = [];
    const date = new Date()
    for (var i = 0; i < 50; i++) {
        dataFamily.push({
            stt: i + 1,
            ticketId: 'dfdfdsfds' + (i + 1),
            ticketNumber: 10023460 + i,
            status: i % 2 === 0 ? true : false,
            dateUse: moment(date).format('DD/MM/YYYY'),
            dateOut: moment(date).format('DD/MM/YYYY'),
            checkIn: i % 2 === 0 ? 'Cổng 2' : 'Cổng 1',
        })
    }
    const dataEvent: TicketType[] = [];
    for (var i = 0; i < 40; i++) {
        dataEvent.push({
            stt: i + 1,
            ticketId: 'dfdfdsfds' + (i + 1),
            ticketNumber: 10023460 + i,
            status: i % 2 === 0 ? true : false,
            dateUse: moment(date).format('DD/MM/YYYY'),
            dateOut: moment(date).format('DD/MM/YYYY'),
            checkIn: i % 2 === 0 ? 'Cổng 2' : 'Cổng 1',
        })
    }
    const onChange = (key: string) => {
        console.log(key)
    }
    return (
        <Card style={{ borderRadius: 24, height: 653 }}>
            {packages.length >= 2 ?
                <Tabs defaultActiveKey="1" onChange={onChange} className={styles.tabs}>
                    <TabPane tab='Gói gia đình' key='1'>
                        <TableCustom dataProps={dataFamily} packages={packages.length} />
                    </TabPane>
                    <TabPane tab='Gói sự kiện' key='2'>
                        <TableCustom dataProps={dataEvent} packages={packages.length} />
                    </TabPane>
                </Tabs> : <TableCustom dataProps={dataEvent} packages={packages.length} />
            }


        </Card>

    )
}

export default TicketList