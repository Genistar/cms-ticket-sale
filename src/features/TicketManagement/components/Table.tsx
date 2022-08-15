import React from 'react';
import styles from '../Styles.module.scss'
import Table, { ColumnsType } from 'antd/lib/table';
import { TicketType } from '../../../interface/ticket';
import Icon, { CaretRightOutlined, CaretLeftOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Form, Input, Row, Tag } from 'antd';
import { sort } from '../../../asset/Icon/iconHome';
type Props = {
    dataProps: TicketType[];
    packages?: any;
}

const TableCustom: React.FC<Props> = (props: Props) => {
    const { dataProps, packages } = props
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
        <Row className={styles.container} style={{ top: packages >= 2 ? 55 : 70 }}>
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
                dataSource={dataProps}
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
            />
        </Row>

    )
}

export default TableCustom