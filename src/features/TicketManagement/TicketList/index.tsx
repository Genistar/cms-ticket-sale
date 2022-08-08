import { Badge, Button, Card, Col, Form, Input, PaginationProps, Row, Tag } from 'antd';
import Icon, { SearchOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons'
import React from 'react'
import styles from '../Styles.module.scss'
import { sort } from '../../../asset/Icon/iconHome';
import moment from 'moment';
import Table, { ColumnsType } from 'antd/lib/table';
import { TicketType } from '../../../interface/ticket'

type Props = {}

const TicketList = (props: Props) => {
    const data = [];
    const date = new Date()
    for (var i = 0; i < 50; i++) {
        data.push({
            stt: i + 1,
            ticketId: 'dfdfdsfds' + (i + 1),
            ticketNumber: 10023460 + i,
            status: i % 2 === 0 ? true : false,
            dateUse: moment(date).format('DD/MM/YYYY'),
            dateOut: moment(date).format('DD/MM/YYYY'),
            checkIn: i % 2 === 0 ? 'Cổng 2' : 'Cổng 1',
        })
    }
    const columns: ColumnsType<TicketType> = [
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
            dataIndex: 'status',
            key: 'status',
            render: (data) => (
                <Tag color={data === true ? '#EAF1F8' : 'green'} className={data === true ? styles.grey : 'green'}>
                    <Badge status={data === true ? 'default' : 'success'} />
                    {data === true ? 'Đã sử dụng' : 'Chưa sử dụng'}
                </Tag>
            )
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'dateUse',
            key: 'dateUse',
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
    return (
        <Card style={{ borderRadius: 24, height: 653 }}>
            <Row className={styles.container}>
                <Col span={6}>
                    <Input.Search
                        placeholder='Tìm bằng số vé'
                        suffix={<SearchOutlined style={{ fontSize: 24 }} />}
                        bordered={false}
                        className={styles.search}
                        color='#F7F7F8'
                    />
                </Col>
                <Col span={6} className={styles.button}>
                    <Form layout='inline'>
                        <Form.Item>
                            <Button className={styles.button_1} icon={<Icon component={sort} />}>
                                Lọc vé
                            </Button>
                        </Form.Item>
                        <Form.Item> <Button className={styles.button_2}>Xuất file {'(.csv)'}</Button></Form.Item>
                    </Form>
                </Col>
                <Table
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 9,
                        position: ["bottomRight"],
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
                    className={styles.table}
                    bordered={false}
                />
            </Row>
        </Card>

    )
}

export default TicketList