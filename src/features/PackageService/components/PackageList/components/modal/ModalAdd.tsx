import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import { Button, Checkbox, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Typography } from 'antd'
import React, { useState } from 'react';
import { packageType } from '../../../../../../interface/ticket'
import CustomDatePicker from '../../../../../../components/DatePicker';
import styles from '../../../../Style.module.scss'

type Props = {
    isModalVisible: boolean;
    handelCancel: () => void;
    setIsModalVisible: any
}
type formType = {
    name: string;
    dayApply: DayRange;
    dateExp: DayRange;
    price: number;
    comboPrice: number;
    status: boolean;

}
const ModalAdd: React.FC<Props> = (props: Props) => {
    const { isModalVisible, setIsModalVisible, handelCancel } = props;
    const [price, setPrice] = useState<boolean>(false);
    const [combo, setCombo] = useState<boolean>(false)
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });
    const [form] = Form.useForm();
    const onFinish = (value: formType) => {
        console.log(value)
        setIsModalVisible(false)
    }
    return (
        <Modal
            title={
                <Typography.Title level={3} className={styles.content_header}>Thêm gói vé</Typography.Title>
            }
            visible={isModalVisible}
            onCancel={handelCancel}
            className={styles.modal_container}
            bodyStyle={{ height: 580, width: 758, backgroundColor: '#fff' }}
            width={758}
            centered
            footer={false}
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <Form.Item
                    label='Tên gói vé'
                    name={'name'}
                    className={styles.input_label}
                    style={{ left: 32, top: 81, }}
                >
                    <Input className={styles.input_name} style={{ width: 367 }} />
                </Form.Item>
                <Row style={{ position: 'absolute', top: 156, left: 32, width: 700 }}>
                    <Form.Item label='Ngày áp dụng' className={styles.input_label} style={{ left: 0 }} name='dateApply'>
                        <CustomDatePicker
                            type="from"
                            dayRange={dayRange}
                            setDayRange={setDayRange}
                            inputClassName={styles.datePicker}
                        />
                        <TimePicker className={styles.timePicker} style={{ left: 153 }} size='large' />
                    </Form.Item>
                    <Form.Item label='Hết hạn' className={styles.input_label} style={{ left: 327 }} name='dateExp'>
                        <CustomDatePicker
                            type="to"
                            dayRange={dayRange}
                            setDayRange={setDayRange}
                            inputClassName={styles.datePicker}
                        />
                        <TimePicker className={styles.timePicker} style={{ left: 153 }} />
                    </Form.Item>
                </Row>
                <Row className={styles.input_label} style={{ left: 32, top: 258, }} >
                    <Typography.Text className={styles.checkboxTitle}>Giá áp dụng</Typography.Text>
                    <Checkbox onChange={() => setPrice(!price)} checked={price} style={{ position: 'absolute', top: 40 }}>
                        <Form.Item className={styles.checkbox} style={{ top: -6 }} name='price'>
                            <Typography.Text>
                                Vé lẻ {'(vnđ/vé)'} với giá
                                <Input placeholder='Giá vé' disabled={price === false ? true : false} className={styles.ticket_price} size='large' />/ vé
                            </Typography.Text>
                        </Form.Item>
                    </Checkbox>
                    <Checkbox onChange={() => setCombo(!combo)} checked={combo} style={{ position: 'absolute', top: 85, left: -8 }}>
                        <Form.Item className={styles.checkbox} style={{ top: -6 }} name='comboPrice'>
                            <Typography.Text>
                                Combo vé với giá <Input className={styles.ticket_price} disabled={combo === false ? true : false} />/
                                <Input className={styles.ticket_price1} disabled={combo === false ? true : false} />/ vé
                            </Typography.Text>

                        </Form.Item>
                    </Checkbox>

                </Row>
                <Form.Item label='Tình trạng' className={styles.input_label} style={{ left: 32, top: 399 }} name='status'>
                    <Select className={styles.select} bordered={false} dropdownClassName={styles.dropdown}>
                        <Select.Option value={true}>Đang áp dụng</Select.Option>
                        <Select.Option value={false}>Tắt</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item className={styles.footerModalButton} key='submit'>
                    <Button className={styles.cancelBtn} onClick={handelCancel}>
                        <Typography.Text className={styles.textBtnCancel}>Hủy</Typography.Text>
                    </Button>
                    <Button className={styles.addBtn} htmlType='submit' key={'submit'} type='primary'>
                        <Typography.Text className={styles.textBtnAdd}>Thêm</Typography.Text>
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        //   
    )
}

export default ModalAdd