import { Button, Card, Col, DatePicker, Form, Input, Radio, Row, Space, Typography } from 'antd'
import React, { useState } from 'react';
import styles from '../Style.module.scss'
import Icon, { SearchOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons'
import moment from 'moment';
import Table, { ColumnsType } from 'antd/lib/table';
import { TicketType } from '../../../interface/ticket';
import { calendar1 } from '../../../asset/Icon/iconHome';

type Props = {}
type formValue = {
    status: boolean;
    to: Date;
    form: Date;
}
const CheckList = (props: Props) => {
    const [status, setStatus] = useState<boolean | null>(null);
    const [to, setTo] = useState<Date>();
    const [from, setFrom] = useState<Date>();
    const [loading, setLoading] = useState<boolean>(false);
    const data: any[] = [];
    const date = new Date();
    const [form] = Form.useForm();
    for (var i = 0; i < 50; i++) {
        data.push({
            stt: i + 1,
            ticketId: 'dfdfdsfds' + (i + 1),
            ticketNumber: 10023460 + i,
            status: i % 2 === 0 ? true : false,
            dateUse: moment(date).format('DD/MM/YYYY'),
            dateOut: moment(date).format('DD/MM/YYYY'),
            checkIn: i % 2 === 0 ? 'Cổng 2' : 'Cổng 1',
            name: 'Vé cổng'
        })
    }
    const columns: ColumnsType<TicketType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Số vé',
            dataIndex: 'ticketNumber',
            key: 'ticketNumber',
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'dateUse',
            key: 'dateUse',
        },
        {
            title: 'Tên loại vé',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Cổng check - in',
            dataIndex: 'checkIn',
            key: 'checkIn',
        }
        , {
            dataIndex: 'status',
            key: 'status',
            render: (data) => (
                <i style={{ color: data === true ? '#FD5959' : '#A5A8B1' }}>{data === true ? 'Đã đối soát' : 'Chưa đối soát'}</i>
            )
        }
    ];
    const onFinish = (va: formValue) => {
        setLoading(true);
        setFrom(va.form);
        setTo(va.to);
        setStatus(va.status)
        console.log(va.status)
    }
    const newData1 = () => {
        if (status === true) {
            return data.filter((value) => value.status === status)
        }
        return data.filter((value) => value.status === false)
    }
    const newData = newData1();
    return (
        <Row>
            <Col flex={6}>
                <Card className={styles.container1}>
                    <Row justify='start' className={styles.container1_warp}>
                        <Col span={8}>
                            <Input.Search
                                placeholder='Tìm bằng số vé'
                                suffix={<SearchOutlined style={{ fontSize: 24 }} />}
                                bordered={false}
                                className={styles.search}
                            />
                        </Col>
                        <Col span={4}>
                            <Button className={styles.btn}>Chốt đối soát</Button>
                        </Col>
                    </Row>
                    <Table
                        rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                        columns={columns}
                        dataSource={status === null ? data : newData}
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
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
                </Card>
            </Col>
            <Col flex={2}>
                <Card className={styles.container2}>
                    <Typography.Title level={3} className={styles.content}>Lọc vé</Typography.Title>
                    <Form className={styles.form} form={form} onFinish={onFinish}>
                        <Form.Item label={'Tình trạng đối soát'} name='status'>
                            <Radio.Group>
                                <Space direction='vertical' className={styles.radio}>
                                    <Radio value={null}>Tất cả</Radio>
                                    <Radio value={true}>Đã đối soát</Radio>
                                    <Radio value={false}>Chưa đối soát</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={'Loại vé'}>
                            <Typography.Text style={{ marginLeft: 120 }}>Vé cổng</Typography.Text>
                        </Form.Item>
                        <Form.Item label={'Từ ngày'} name='to'>
                            <DatePicker
                                className={styles.datepicker}
                                suffixIcon={<Icon component={calendar1}
                                    placeholder='Chọn ngày' />}
                                style={{ marginLeft: 110 }}
                            />
                        </Form.Item>
                        <Form.Item label={'Đến ngày'} name='from'>
                            <DatePicker
                                className={styles.datepicker}
                                suffixIcon={<Icon component={calendar1}
                                    placeholder='Chọn ngày' />}
                                style={{ marginLeft: 98 }}
                            />
                        </Form.Item>
                        <Button
                            htmlType='submit'
                            className={styles.btn_sort}
                        >
                            <Typography.Text className={styles.text}>Lọc</Typography.Text>
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default CheckList