import { Button, Card, Col, Input, Row, Typography, Space, Tag, Badge } from 'antd';
import Icon, { SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import styles from '../Style.module.scss';
import { packageType } from '../../../interface/ticket';
import Table, { ColumnsType } from 'antd/lib/table';
import { edit } from '../../../asset/Icon/iconHome';
import ModalAdd from '../components/ModalAdd';
import ModalUpdate from '../components/ModalUpdate';

type Props = {}
export const data: any[] = [
    {
        stt: 1,
        packageId: 'ALT20210501',
        name: 'Gói gia đình',
        dateApply: '14/07/2022 08:00:00',
        dateExp: '14/04/2021 23:00:00',
        price: '90.000',
        comboPrice: '360.000',
        status: true,
    },
    {
        stt: 2,
        packageId: 'ALT20210502',
        name: 'Gói sự kiện',
        dateApply: '14/07/2022 08:00:00',
        dateExp: '14/04/2021 23:00:00',
        price: '20.000',
        comboPrice: '',
        status: false,
    }
];
const PackageList = (props: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };
    const handleUpdateCancel = () => {
        setIsModalUpdateVisible(false);
    }
    const columns: ColumnsType<packageType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Mã gói',
            dataIndex: 'packageId',
            key: 'packageId',
        },
        {
            title: 'Tên gói vé',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'dateApply',
            key: 'dateApply',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'dateExp',
            key: 'dateExp',
        },
        {
            title: 'Giá vé (VNĐ/Vé)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Giá combo (VNĐ/Combo)',
            dataIndex: 'comboPrice',
            key: 'comboPrice',
        }
        , {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: (data) => (
                <Tag color={data === true ? 'green' : 'red'}>
                    <Badge status={data === true ? 'success' : 'warning'} />
                    {data === true ? 'Đang áp dụng' : 'Tắt'}
                </Tag>
            )
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className={styles.icon_edit} >
                    <Icon component={edit} />
                    <a className={styles} onClick={() => setIsModalUpdateVisible(true)}>Cập nhật</a>
                    <ModalUpdate isModalUpdateVisible={isModalUpdateVisible} setIsModalUpdateVisible={setIsModalUpdateVisible} handelCancel={handleUpdateCancel} />
                </Space>
            ),
        }
    ];
    return (
        <Card className={styles.container}>
            <Row className={styles.container_warp}>
                <Col flex={5}>
                    <Input.Search
                        placeholder='Tìm bằng số vé'
                        suffix={<SearchOutlined style={{ fontSize: 24 }} />}
                        bordered={false}
                        className={styles.search}
                    />
                </Col>
                <Col flex={3}>
                    <Col span={4}>
                        <Button className={styles.btn_ex}>
                            <Typography.Text className={styles.text_ex}>
                                Xuất file {'(.csv)'}
                            </Typography.Text>

                        </Button>
                    </Col>
                    <Col span={4}>
                        <Button className={styles.btn_add} onClick={showModal}>
                            <Typography.Text className={styles.text_add}>
                                Thêm gói vé
                            </Typography.Text>
                        </Button >
                        <ModalAdd isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handelCancel={handleCancel} />
                    </Col>
                </Col>
            </Row>
            <Table
                rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                columns={columns}
                dataSource={data}
                pagination={{
                    style: { marginTop: 280 },
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
    )
}

export default PackageList