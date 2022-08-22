import { Button, Card, Col, Input, Row, Typography, Space, Tag, Badge } from 'antd';
import Icon, { SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import styles from '../../Style.module.scss';
import { packageType } from '../../../../interface/ticket';
import Table, { ColumnsType } from 'antd/lib/table';
import { edit } from '../../../../asset/Icon/iconHome';
import ModalAdd from './components/modal/ModalAdd';
import { useAppdispatch, useAppSelector } from '../../../../store';
import { getAll, packageSelector } from '../../packageSlice';
import moment from 'moment';
import { CSVLink } from 'react-csv';

type Props = {}
export const data: any[] = [
    {
        stt: 1,
        packageId: 'ALT20210501',
        packageName: 'Gói gia đình',
        dateApply: '14/07/2022 08:00:00',
        dateExp: '14/04/2021 23:00:00',
        price: '90.000',
        comboPrice: '360.000',
        status: true,
    },
    {
        stt: 2,
        packageId: 'ALT20210502',
        packName: 'Gói sự kiện',
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
    const [update, setUpdate] = useState<boolean>(false)
    const [id, setId] = useState<string | undefined>(undefined);
    const dispatch = useAppdispatch()
    const { packages, loading } = useAppSelector(packageSelector);

    useEffect(() => {
        dispatch(getAll())
    }, [])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setId(undefined)

    };
    const handleUpdateCancel = () => {
        setIsModalUpdateVisible(false);
    }
    const columns: ColumnsType<any> = [
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
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'dateApply',
            key: 'dateApply',
            render: (value) => (
                moment(value.toDate()).format('HH:mm DD/MM/YYYY')
            )
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'dateExp',
            key: 'dateExp',
            render: (value) => (
                moment(value.toDate()).format('HH:mm DD/MM/YYYY')
            )
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
            key: 'edit',
            dataIndex: 'edit'
        }
    ];
    const headers = [
        { label: "STT", key: "stt" },
        { label: "Mã gói", key: "packageId" },
        { label: "Tên gói", key: "packageName" },
        { label: 'Ngày áp dụng', key: 'dateApply' },
        { label: 'Ngày hết hạn', key: 'dateExp' },
        { label: 'Giá vé (VNĐ/vé)', key: 'price' },
        { label: 'Giá combo', key: 'comboPrice' },
        { label: 'Tình trạng', key: 'status' }
    ];
    const data = packages.map((pack) => ({
        status: pack.status === true ? 'Đang áp dụng' : 'Tắt',
        dateApply: moment(pack.dateApply?.toDate()).format('HH:mm DD/MM/YYYY'),
        dateExp: moment(pack.dateExp?.toDate()).format('HH:mm DD/MM/YYYY'),
        ...pack
    }))
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
                        <CSVLink headers={headers} data={data} className={styles.btn_ex}>
                            <Typography.Text className={styles.text_ex}>
                                Xuất file {'(.csv)'}
                            </Typography.Text>
                        </CSVLink>
                    </Col>
                    <Col span={4}>
                        <Button className={styles.btn_add} onClick={() => { setIsModalVisible(true); setId(undefined) }}>
                            <Typography.Text className={styles.text_add}>
                                Thêm gói vé
                            </Typography.Text>
                        </Button >
                        <ModalAdd id={id} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handelCancel={handleCancel} />
                    </Col>
                </Col>
            </Row>
            <Table
                rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                columns={columns}
                dataSource={packages.map((pack, index) => ({
                    ...pack,
                    stt: index + 1,
                    edit: (
                        <Space size="middle" className={styles.icon_edit} >
                            <Icon component={edit} />
                            <a className={styles} onClick={() => { setIsModalVisible(true); setId(pack.id); setUpdate(true) }}>Cập nhật</a>
                            <ModalAdd id={id} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handelCancel={handleCancel} />
                        </Space>
                    )
                }))}
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
                loading={loading}
            />
        </Card>
    )
}

export default PackageList