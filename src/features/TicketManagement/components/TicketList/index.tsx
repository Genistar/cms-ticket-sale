import { Card, Tabs } from 'antd';
import moment, { Moment } from 'moment';
import { TicketType } from '../../../../interface/ticket'
import TableCustom from './components/Table/Table';
import { data as packages } from '../../../PackageService/components/PackageList';
import styles from '../../Styles.module.scss'
import { useAppdispatch, useAppSelector } from '../../../../store';
import { getAll, ticketSelector } from '../../ticketSlice';
import { useEffect, useState } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { formType } from './components/ModalSort';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
const { TabPane } = Tabs;

type Props = {}
const defaultCheckedList = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5'];
const TicketList = (props: Props) => {
    const [keywords, setKeywords] = useState<string>('');
    const { tickets, loading } = useAppSelector(ticketSelector);
    const [isVisiableModal, setIsVisiableModal] = useState<boolean>(false);
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
    const [statusUse, setStatusUse] = useState<'used' | 'unused' | 'exp' | undefined>(undefined);
    const [dateRange, setDateRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    const dispatch = useAppdispatch();
    useEffect(() => {
        dispatch(getAll({ filter: { keywords } }))
    }, [keywords]
    )
    const onChange = (key: string) => {
    }
    const onSort = (value: formType) => {
        value.checkIn = checkedList

        dispatch(getAll({
            modalFilter: {
                checkedList,
                statusUse,
                from: dateRange.from ? moment({
                    ...dateRange.from,
                    month: dateRange.from ? dateRange.from.month - 1 : 0
                }) : null,
                to: dateRange.to ? moment({
                    ...dateRange.to,
                    month: dateRange.to ? dateRange.to.month - 1 : 0
                }) : null,
            }
        })).then(() => { setIsVisiableModal(false) })
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
                            isVisiableModal={isVisiableModal}
                            onSort={onSort}
                            setCheckedList={setCheckedList}
                            defaultCheckedList={defaultCheckedList}
                            checkedList={checkedList}
                            setIsVisiableModal={setIsVisiableModal}
                            setStatusUse={setStatusUse}
                            dateRange={dateRange}
                            setdateRange={setDateRange}
                        />
                    </TabPane>
                    <TabPane tab='Gói sự kiện' key='2'>
                        <TableCustom
                            dataProps={tickets}
                            packages={packages.length}
                            setKeywords={setKeywords}
                            loading={loading}
                            isVisiableModal={isVisiableModal}
                            onSort={onSort}
                            setCheckedList={setCheckedList}
                            defaultCheckedList={defaultCheckedList}
                            checkedList={checkedList}
                            setIsVisiableModal={setIsVisiableModal}
                            setStatusUse={setStatusUse}
                            dateRange={dateRange}
                            setdateRange={setDateRange}
                        />
                    </TabPane>
                </Tabs> : <TableCustom
                    dataProps={tickets}
                    packages={packages.length}
                    setKeywords={setKeywords}
                    loading={loading}
                    isVisiableModal={isVisiableModal}
                    onSort={onSort}
                    setCheckedList={setCheckedList}
                    defaultCheckedList={defaultCheckedList}
                    checkedList={checkedList}
                    setIsVisiableModal={setIsVisiableModal}
                    setStatusUse={setStatusUse}
                    dateRange={dateRange}
                    setdateRange={setDateRange}
                />
            }
        </Card>

    )
}

export default TicketList