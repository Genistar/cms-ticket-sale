import { Area } from '@ant-design/plots';
import { Col, DatePicker, Row, Typography } from 'antd';
import Icon from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import styles from './Style.module.scss'
import { calendar } from '../../asset/Icon/iconHome';
import moment from 'moment';

type Props = {}
const dateFormat = 'YYYY-MM-DD';
const DashboardPage = (props: Props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
    };

    return (
        <Row>
            <Col span={6} className={styles.textContent}>Doanh thu</Col>
            <Col span={6} className={styles.selectdate}>
                <DatePicker className={styles.datepicker} suffixIcon={<Icon component={calendar} placeholder='Chọn ngày' />} />
            </Col>
            <Area {...config} style={{ width: 1168, height: 237, position: 'absolute', top: 109, left: 24 }} color='#FF993C' />
            <Col className={styles.saleMonth}>
                <Typography.Text className={styles.saleMonth_label}>Tổng danh thu theo tuần</Typography.Text>
                <Typography.Title className={styles.saleMonth_number} level={3}>123.123.000</Typography.Title>
                <Typography.Text className={styles.saleMonth_value}>đồng</Typography.Text>
            </Col>
            <Col span={4}>
                <DatePicker className={styles.datepicker} style={{ top: 400 }} suffixIcon={<Icon component={calendar} placeholder='Chọn ngày' />} />
            </Col>
        </Row>
    )
}

export default DashboardPage