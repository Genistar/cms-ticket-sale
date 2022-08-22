import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import { Button, Checkbox, Col, Form, Radio, Row, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import Modal from 'antd/lib/modal/Modal'
import { Moment } from 'moment';
import React, { useState } from 'react'
import { calendar } from '../../../../../../asset/Icon/iconHome';
import CustomDatePicker from '../../../../../../components/DatePicker';
import styles from '../../../../Styles.module.scss'
export type formType = {
    checkIn?: CheckboxValueType[];
    from: Moment;
    to: Moment;
    statusUse?: any;
}
type Props = {
    setCheckedList: React.Dispatch<React.SetStateAction<CheckboxValueType[]>>;
    isVisiableModal: boolean;
    onSort: (value: formType) => void;
    defaultCheckedList: string[];
    checkedList: CheckboxValueType[];
    setStatusUse: any;
    dayRange: any;
    setDayRange: any;
}
const plainOptions = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5'];
const ModalSort: React.FC<Props> = (props: Props) => {
    const [checkAll, setCheckAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);
    const { isVisiableModal, onSort, setCheckedList, checkedList, setStatusUse, dayRange, setDayRange } = props;
    const [form] = Form.useForm();
    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        // setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    return (
        <Modal
            title={false}
            footer={false}
            visible={isVisiableModal}
            closable={false}
            className={styles.modalContainer}
            bodyStyle={{ width: 634, height: 454, backgroundColor: '#fff', borderRadius: 16 }}
        >
            <Form
                layout='vertical'
                form={form}
                onFinish={onSort}
            >
                <Typography.Title level={3} className={styles.title}>Lọc vé</Typography.Title>
                <Row className={styles.warpContainer}>
                    <Col flex={4}>
                        <Form.Item label={'Từ ngày'} name='from'>
                            <CustomDatePicker
                                type="from"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={styles.datePicker}
                                icon={calendar}
                            />
                        </Form.Item>
                    </Col>
                    <Col flex={4}>
                        <Form.Item label={'Đến ngày'} name='to'>
                            <CustomDatePicker
                                type="to"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={styles.datePicker}
                                icon={calendar}
                            />
                        </Form.Item>
                    </Col>
                    <Form.Item label={'Tình trạng sử dụng'} name='statusUse'>
                        <Radio.Group style={{ width: 634 }} onChange={(e) => setStatusUse(e.target.value)}>
                            <Radio value={undefined}>
                                <Typography.Text className={styles.radioText}>Tất cả</Typography.Text>
                            </Radio>
                            <Radio value={'used'} className={styles.radio}>
                                <Typography.Text className={styles.radioText}>Đã sử dụng</Typography.Text>

                            </Radio>
                            <Radio value={'unused'} className={styles.radio}>
                                <Typography.Text className={styles.radioText}>Chưa sử dụng</Typography.Text>
                            </Radio>
                            <Radio value={'exp'} className={styles.radio}>
                                <Typography.Text className={styles.radioText}>Hết hạn</Typography.Text>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='Cổng Check-In' name='checkIn'>
                        <Col flex={8} className={styles.checkboxWarp}>
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                <Typography.Text className={styles.checkboxText}>Tất cả</Typography.Text>
                            </Checkbox>
                            <Checkbox.Group disabled={checkAll === true ? true : false} options={plainOptions} value={checkedList} onChange={onChange} />
                        </Col>
                    </Form.Item>
                    <Button htmlType='submit' className={styles.btnSort}>
                        <Typography.Text className={styles.btnSortText}>Lọc</Typography.Text>
                    </Button>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalSort