import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Typography } from 'antd'
import React, { useEffect, useState } from 'react';
import { packageType } from '../../../../../../interface/ticket'
import CustomDatePicker from '../../../../../../components/DatePicker';
import styles from '../../../../Style.module.scss'
import moment, { Moment } from 'moment';
import { useAppdispatch, useAppSelector } from '../../../../../../store';
import { addPackage, get, getAll, packageSelector, update } from '../../../../packageSlice';
import { Timestamp } from 'firebase/firestore';

type Props = {
    isModalVisible: boolean;
    handelCancel: () => void;
    setIsModalVisible: any;
    id?: any;
}
type formType = {
    packageName: string;
    from: any;
    to: any;
    price: number;
    comboPrice: number;
    status: boolean;
    nameEvent: string;
    packageId: string

}
const ModalAdd: React.FC<Props> = (props: Props) => {
    const { isModalVisible, setIsModalVisible, handelCancel, id } = props;
    const [price, setPrice] = useState<boolean>(false);
    const [combo, setCombo] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean | undefined>(undefined);
    const [priceValue, setPriceValue] = useState<string | undefined>('')
    const [comboPrice, setComboPrice] = useState<string | undefined>('')
    const dispatch = useAppdispatch();
    const { pack } = useAppSelector(packageSelector)
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });
    const [form] = Form.useForm();
    useEffect(() => {
        if (id !== undefined) {
            dispatch(get(id))
            form.setFieldsValue({
                nameEvent: pack?.nameEvent,
                price: pack?.price,
                comboPrice: pack?.comboPrice,
                status: pack?.status,
                packageId: pack?.packageId
            })
            const from = pack?.dateApply?.toDate();
            const to = pack?.dateExp?.toDate()
            setPrice(pack?.price ? true : false)
            setCombo(pack?.comboPrice ? true : false);
            setPriceValue(pack?.price);
            setComboPrice(pack?.comboPrice)
            setDayRange({
                from: from ? {
                    day: from.getDate(),
                    month: from.getMonth() + 1,
                    year: from.getFullYear()
                } : null,
                to: to ? {
                    day: to.getDate(),
                    month: to.getMonth() + 1,
                    year: to.getFullYear()
                } : null,
            })
        }

    }, [id])

    const onFinish = (value: formType) => {
        console.log(value)
        setIsModalVisible(false)
        if (id === undefined) {
            dispatch(addPackage({
                ...value,
                packageId: 'ALT20220822',
                dateApply:
                    Timestamp.fromDate(
                        moment({
                            ...dayRange.from,
                            month: dayRange.from ? dayRange.from.month - 1 : 0,
                        }).toDate()
                    ),
                dateExp:
                    Timestamp.fromDate(
                        moment({
                            ...dayRange.to,
                            month: dayRange.to ? dayRange.to.month - 1 : 0,
                        }).toDate()
                    ),
                price: value.price.toString(),
                comboPrice: value.comboPrice.toString()
            })).then(() => {
                setIsModalVisible(false)
                dispatch(getAll())
            })
        }
        else {
            dispatch(update({
                id: id,
                ...value,
                dateApply: Timestamp.fromDate(
                    moment({
                        ...dayRange.from,
                        month: dayRange.from ? dayRange.from.month - 1 : 0,
                    }).toDate()
                ),
                dateExp: Timestamp.fromDate(
                    moment({
                        ...dayRange.to,
                        month: dayRange.to ? dayRange.to.month - 1 : 0,
                    }).toDate()
                ),
                price: value.price.toString(),
                comboPrice: value.comboPrice.toString()
            })).then(() => {
                setIsModalVisible(false)
                dispatch(getAll())
            })
        }
    }
    return (
        <Modal
            title={
                <Typography.Title level={3} className={styles.content_header}>{id === undefined ? 'Thêm gói vé' : 'Cập nhật gói vé'}</Typography.Title>
            }
            visible={isModalVisible}
            onCancel={handelCancel}
            className={styles.modal_container}
            bodyStyle={{ height: 580, width: 758, backgroundColor: '#fff', borderRadius: 24 }}
            width={758}
            centered
            footer={false}
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
                {
                    id === undefined ? '' :
                        <Form.Item
                            label={<Typography.Text className={`${styles.label} ${styles.labelAfter}`} >Mã sự kiện</Typography.Text>}
                            name={'packageId'}
                            className={styles.input_label}
                            style={{ left: 32, top: 81 }}
                        >
                            <Input className={styles.input_name} style={{ width: 245 }} />
                        </Form.Item>
                }
                <Form.Item
                    label={<Typography.Text className={`${styles.label} ${id ? '' : styles.labelAfter}`} >{id === undefined ? 'Tên gói vé' : 'Tên sự kiện'}</Typography.Text>}
                    name={id === undefined ? 'packageName' : 'nameEvent'}
                    className={styles.input_label}
                    style={{ left: id === undefined ? 32 : 380, top: 81 }}
                >
                    <Input className={styles.input_name} style={{ width: 367 }} />
                </Form.Item>
                <Row style={{ position: 'absolute', top: 166, left: 36, width: 700 }} gutter={12}>
                    <Col span={6}>
                        <Form.Item
                            label={<Typography.Text className={styles.label}>Ngày áp dụng</Typography.Text>}
                            className={styles.input_label}
                            style={{ left: 0 }}
                            name='dateApply'
                        >
                            <CustomDatePicker
                                type="from"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={styles.datePicker}
                            />

                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.input_label}>
                            <TimePicker className={styles.timePicker} style={{ left: -30 }} size='large' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label={<Typography.Text className={styles.label}>Ngày hết hạn</Typography.Text>}
                            className={styles.input_label}
                            style={{ left: 0 }}
                            name='dateExp'
                        >
                            <CustomDatePicker
                                type="to"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={styles.datePicker}
                            />

                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className={styles.input_label}>
                            <TimePicker className={styles.timePicker} style={{ left: -30 }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className={styles.input_label} style={{ left: 32, top: 258, }} >
                    <Typography.Text className={styles.checkboxTitle}>Giá áp dụng</Typography.Text>
                    <Checkbox onChange={() => setPrice(!price)} checked={price} style={{ position: 'absolute', top: 40 }}>
                        <Form.Item className={styles.checkbox} style={{ top: -6 }} name='price'>
                            <Typography.Text>
                                Vé lẻ {'(vnđ/vé)'} với giá
                                <Input
                                    placeholder='Giá vé'
                                    disabled={price === false ? true : false}
                                    className={styles.ticket_price}
                                    size='large'
                                    value={priceValue}
                                    onChange={(e) => { console.log(e.target.value); setPriceValue(e.target.value) }}
                                />/ vé
                            </Typography.Text>
                        </Form.Item>
                    </Checkbox>
                    <Checkbox onChange={() => setCombo(!combo)} checked={combo} style={{ position: 'absolute', top: 85, left: -8 }}>
                        <Form.Item className={styles.checkbox} style={{ top: -6 }} name='comboPrice'>
                            <Typography.Text>
                                Combo vé với giá <Input
                                    className={styles.ticket_price}
                                    disabled={combo === false ? true : false}
                                    value={comboPrice}
                                    onChange={(e) => setComboPrice(e.target.value)}
                                />/
                                <Input className={styles.ticket_price1} disabled={combo === false ? true : false} value={id ? 'Combo' : ''} />/ vé
                            </Typography.Text>
                        </Form.Item>
                    </Checkbox>

                </Row>
                <Form.Item label={<Typography.Text className={styles.label}>Tình trạng</Typography.Text>} className={styles.input_label} style={{ left: 32, top: 399 }} name='status'>
                    <Select className={styles.select} bordered={false} dropdownClassName={styles.dropdown} defaultValue={status}>
                        <Select.Option value={true}>Đang áp dụng</Select.Option>
                        <Select.Option value={false}>Tắt</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item className={styles.footerModalButton} key='submit'>
                    <Button className={styles.cancelBtn} onClick={handelCancel}>
                        <Typography.Text className={styles.textBtnCancel}>Hủy</Typography.Text>
                    </Button>
                    <Button className={styles.addBtn} htmlType='submit' key={'submit'} type='primary'>
                        <Typography.Text className={styles.textBtnAdd} style={{ marginLeft: id ? -20 : 0 }}>{id ? 'Cập nhật' : 'Thêm'}</Typography.Text>
                    </Button>
                </Form.Item>
                <Typography.Text className={styles.warning}>là thông tin bắt buộc</Typography.Text>
            </Form>
        </Modal>
        //   
    )
}

export default ModalAdd