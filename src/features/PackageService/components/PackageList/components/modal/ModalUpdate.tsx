import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import { Button, Checkbox, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Typography } from 'antd'
import React, { useState } from 'react';
import { packageType } from '../../../../../../interface/ticket'
import CustomDatePicker from '../../../../../../components/DatePicker';
import styles from '../../../../Style.module.scss'

type Props = {
    isModalUpdateVisible: boolean;
    setIsModalUpdateVisible: any;
    handelCancel: () => void;
}

const ModalUpdate: React.FC<Props> = (props: Props) => {
    const { isModalUpdateVisible, setIsModalUpdateVisible, handelCancel } = props;
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });
    const [form] = Form.useForm();
    const onFinish = (value: packageType) => {
        console.log(value)
        setIsModalUpdateVisible(false)
    }
    return (
        <Modal
            title={
                <Typography.Title level={3} className={styles.content_header}>Thêm gói vé</Typography.Title>
            }
            visible={isModalUpdateVisible}
            onCancel={handelCancel}
            className={styles.modal_container}
            bodyStyle={{ height: 580, width: 758, backgroundColor: '#fff', borderRadius: 24 }}
            width={758}
            centered
            footer={false}
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <Form.Item
                    label='Mã sự kiện'
                    name={'eventId'}
                    className={styles.input_label}
                    style={{ left: 32, top: 81, }}
                >
                    <Input className={styles.input_name} style={{ width: 245 }} />
                </Form.Item>
                <Form.Item
                    label='Tên sự kiện'
                    name={'eventName'}
                    className={styles.input_label}
                    style={{ left: 358, top: 81, }}
                >
                    <Input className={styles.input_name} style={{ width: 367 }} />
                </Form.Item>
                <Form.Item style={{ position: 'absolute', top: 156, left: 32, width: 700 }}>
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
                </Form.Item>
                <Form.Item label='Giá áp dụng' className={styles.input_label} style={{ left: 32, top: 258, }} >
                    <Form.Item className={styles.checkbox} style={{ top: 0 }} name='price'>
                        <Checkbox>
                            <Typography.Text>
                                Vé lẻ {'(vnđ/vé)'} với giá
                                <Input placeholder='Giá vé' className={styles.ticket_price} size='large' />/ vé
                            </Typography.Text>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item className={styles.checkbox} style={{ top: 50 }} name='comboPrice'>
                        <Checkbox>
                            <Typography.Text>
                                Combo vé với giá <Input className={styles.ticket_price} />/<Input className={styles.ticket_price1} />/ vé
                            </Typography.Text>
                        </Checkbox>
                    </Form.Item>

                </Form.Item>
                <Form.Item label='Tình trạng' className={styles.input_label} style={{ left: 32, top: 399 }} name='status'>
                    <Select className={styles.select} bordered={false} dropdownClassName={styles.dropdown}>
                        <Select.Option value={true}>Đang áp dụng</Select.Option>
                        <Select.Option value={false}>Tắt</Select.Option>
                    </Select>
                </Form.Item>
                <div className={styles.infor}><div style={{ color: 'red', fontSize: 16 }}>*</div>Là thông tin bắt buộc</div>
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

export default ModalUpdate