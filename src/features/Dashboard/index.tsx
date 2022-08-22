import { Area } from '@ant-design/plots';
import { Card, Col, Row, Space, Typography } from 'antd';
import Icon from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import styles from './Style.module.scss'
import { calendar } from '../../asset/Icon/iconHome';
import Donut from '../../components/Donut';
import CustomDatePicker from '../../components/DatePicker';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';

type Props = {}

const dateFormat = 'YYYY-MM-DD';
const DashboardPage = (props: Props) => {
    const [data, setData] = useState([]);
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

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
    const dataDonut = [
        {
            type: 'used',
            value: 27,
        },
        {
            type: 'notUse',
            value: 25,
        }
    ];
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
    };

    return (
        <Card style={{ borderRadius: 24, height: 653 }}>
            <Row>
                <Col span={6} className={styles.textContent}>Doanh thu</Col>
                <Col span={6} className={styles.selectdate}>
                    <CustomDatePicker
                        inputClassName={styles.datepicker}
                        type="from"
                        dayRange={dayRange}
                        setDayRange={setDayRange}
                        format={"[Tháng] M, YYYY"}
                    />
                </Col>
                <Area {...config} style={{ width: 1168, height: 237, position: 'absolute', top: 109, left: 24 }} color='#FF993C' />
                <Col className={styles.saleMonth}>
                    <Typography.Text className={styles.saleMonth_label}>Tổng danh thu theo tuần</Typography.Text>
                    <Typography.Title className={styles.saleMonth_number} level={3}>123.123.000</Typography.Title>
                    <Typography.Text className={styles.saleMonth_value}>đồng</Typography.Text>
                </Col>
                <Col span={4}>
                    <CustomDatePicker
                        inputClassName={styles.datepicker1}
                        type="from"
                        dayRange={dayRange}
                        setDayRange={setDayRange}
                        format={"[Tháng] M, YYYY"}
                    />
                </Col>
                <Col span={4} style={{ position: 'absolute', top: 425, left: 320, height: 200, width: 400 }}>
                    <Typography.Text className={styles.donutLabel}>Gói gia đình</Typography.Text>
                    <Donut data={dataDonut} />
                </Col>
                <Col span={4} style={{ position: 'absolute', top: 425, left: 669, height: 200, width: 400 }}>
                    <Typography.Text className={styles.donutLabel}>Gói sự kiện</Typography.Text>
                    <Donut data={dataDonut} />
                </Col>
                <Col span={4} style={{ position: 'absolute', top: 425, left: 969, height: 200, width: 400 }}>
                    <Space>
                        <Card className={styles.cardLegend} style={{ backgroundColor: '#4F75FF' }} />
                        <Typography.Text className={styles.legendText}>Vé đã sử dụng</Typography.Text>
                    </Space>
                    <br />
                    <Space>
                        <Card className={styles.cardLegend} style={{ backgroundColor: '#FF8A48' }} />
                        <Typography.Text className={styles.legendText}>Vé chưa sử dụng</Typography.Text>
                    </Space>
                </Col>
            </Row>
        </Card>

    )
}

export default DashboardPage