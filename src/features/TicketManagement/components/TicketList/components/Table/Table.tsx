import React, { useState } from 'react';
import styles from '../../../../Styles.module.scss'
import Table, { ColumnsType } from 'antd/lib/table';
import { TicketType } from '../../../../../../interface/ticket';
import Icon, { CaretRightOutlined, CaretLeftOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Form, Input, Row, Tag, Typography } from 'antd';
import { sort } from '../../../../../../asset/Icon/iconHome';
import moment from 'moment';
import ModalSort from '../ModalSort';
import { CSVLink } from 'react-csv';
type Props = {
    dataProps: TicketType[];
    packages?: any;
    setKeywords: React.Dispatch<React.SetStateAction<string>>
    loading: boolean;
}

const TableCustom: React.FC<Props> = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState<boolean>(false);
    const { dataProps, packages, setKeywords, loading } = props;
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Booking code',
            dataIndex: 'ticketId',
            key: 'ticketId',
        },
        {
            title: 'Số vé',
            dataIndex: 'ticketNumber',
            key: 'ticketNumber',
        },
        {
            title: 'Tình trạng sử dụng',
            dataIndex: 'statusUse',
            key: 'statusUse',
            render: (data) => (
                <Tag
                    color={data === 'used' ? '#EAF1F8' : data === 'unused' ? 'green' : 'red'}
                    className={data === 'used' ? styles.grey : data === 'unused' ? 'green' : 'red'}
                >
                    <Badge status={data === 'used' ? 'default' : data === 'unused' ? 'success' : 'warning'} />
                    {data === 'used' ? 'Đã sử dụng' : data === 'unused' ? 'Chưa sử dụng' : 'Hết hạn'}
                </Tag>
            )
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'dateUsed',
            key: 'dateUsed',
        },
        {
            title: 'Ngày xuất vé',
            dataIndex: 'dateOut',
            key: 'dateOut',
        },
        {
            title: 'Cổng check - in',
            dataIndex: 'checkIn',
            key: 'checkIn',
        }
    ];
    const headers = [
        { label: "STT", key: "stt" },
        { label: "Booking code", key: "ticketId" },
        { label: "Số vé", key: "ticketNumber" },
        { label: 'Tình trạng sử dụng', key: 'statusUse' },
        { label: 'Ngày sử dụng', key: 'dateUsed' },
        { label: 'Ngày xuất vé', key: 'dateOut' },
        { label: 'Cổng check - in', key: 'checkIn' }
    ];
    const data: any = dataProps.map((ticket) => ({
        dateUsed: moment(ticket.dateUsed?.toDate()).format('DD/MM/YYYY'),
        dateOut: moment(ticket.dateOut?.toDate()).format('DD/MM/YYYY'),
        ticketId: ticket.ticketId,
        stt: ticket.stt,
        statusUse: ticket.statusUse === 'used' ? 'Đã sử dụng' : ticket.statusUse === 'unused' ? 'Chưa sử dụng' : 'Hết hạn',
        checkIn: ticket.checkIn,
        ticketNumber: ticket.ticketNumber
    }))
    return (
        <Row className={styles.container} style={{ top: packages >= 2 ? 55 : 70 }}>
            <Col span={6}>
                <Input.Search
                    placeholder='Tìm bằng số vé'
                    suffix={<SearchOutlined style={{ fontSize: 24 }} />}
                    bordered={false}
                    className={styles.search}
                    color='#F7F7F8'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                />
            </Col>
            <Col span={6} className={styles.button}>
                <Form layout='inline'>
                    <Form.Item>
                        <Button
                            className={styles.button_1}
                            icon={<Icon component={sort} />}
                            onClick={() => setIsVisiableModal(true)}
                        >
                            Lọc vé
                        </Button>
                        <ModalSort
                            setIsVisiableModal={setIsVisiableModal}
                            isVisiableModal={isVisiableModal}
                        />
                    </Form.Item>
                    <Form.Item>
                        <CSVLink headers={headers} data={dataProps} className={styles.button_2}>
                            <Typography.Text className={styles.btnText}>
                                Xuất file {'(.csv)'}
                            </Typography.Text>

                        </CSVLink>
                    </Form.Item>
                </Form>
            </Col>
            <Table
                rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                columns={columns}
                dataSource={dataProps.map((ticket) => ({
                    dateUsed: moment(ticket.dateUsed?.toDate()).format('DD/MM/YYYY'),
                    dateOut: moment(ticket.dateOut?.toDate()).format('DD/MM/YYYY'),
                    ticketId: ticket.ticketId,
                    stt: ticket.stt,
                    statusUse: ticket.statusUse,
                    checkIn: ticket.checkIn,
                    ticketNumber: ticket.ticketNumber
                }))}
                pagination={{
                    pageSize: 9,
                    position: ["bottomCenter"],
                    showLessItems: true,
                    showSizeChanger: false,
                    itemRender(page, type, element) {
                        if (type === 'prev') {
                            return <CaretLeftOutlined />;
                        }
                        if (type === 'next') {
                            return <CaretRightOutlined style={{ color: '#FF993C' }} />;
                        }
                        return element;
                    },
                }}
                className={styles.ant_table}
                bordered={false}
                loading={loading}
            />
        </Row>

    )
}

export default TableCustom