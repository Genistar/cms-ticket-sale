import React, { useEffect, useState } from 'react';
import { Calendar, DayRange, DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import Icon from '@ant-design/icons'
import { DatePicker, Popover, Radio } from 'antd';
import styles from './Style.module.scss';
import './Style.css'
import moment from 'moment';
import { myCustomLocale } from './myCustomLocate';

type Props = {
    value?: any;
    onChange?: (value: DayValue) => void;
    textLabel?: string;
    className?: string;
    dayRange?: any;
    setDayRange?: React.Dispatch<React.SetStateAction<DayRange>>;
    type?: string;
    hasOption?: boolean;
    inputClassName?: string;
    icon?: any;
    format?: string;
}

const CustomDatePicker: React.FC<Props> = (props: Props) => {
    const [typeCalendar, setTypeCalendar] = useState<string>('date')
    const [value, setValue] = useState(props.value);
    const { hasOption = true } = props;
    const { icon, format } = props
    useEffect(() => {
        setValue(props.value);
    }, [props.value, props]);

    useEffect(() => {
        if (props.onChange !== undefined) {
            if (props.type === "to") {
                props.onChange(props.dayRange.to);
            } else if (props.type === "from") {
                props.onChange(props.dayRange.from);
            }
        }
    }, [props.dayRange, props]);
    const onChange = (pValue: any) => {
        setValue(pValue);
        if (props.onChange) {
            if (props.dayRange && props.setDayRange) {
                if (props.type === "to") {
                    props.setDayRange({ ...props.dayRange, to: pValue });
                }
                if (props.type === "from") {
                    props.setDayRange({ ...props.dayRange, from: pValue });
                }
            }
            props.onChange(pValue);
        }
    };
    const onChangeRange = (pValue: any) => {
        if (props.setDayRange) {
            props.setDayRange(pValue);
        }
        console.log(pValue)
    };
    const calendar = (
        <Calendar
            colorPrimary='FFBA7B'
            colorPrimaryLight='FFD2A8'
            calendarClassName={styles.calendarWrapper}
            onChange={typeCalendar === 'date' ? onChange : onChangeRange}
            value={typeCalendar === 'date' ? value : props.dayRange}
            calendarSelectedDayClassName={styles.select}
            calendarRangeBetweenClassName={styles.select}
            calendarRangeStartClassName={`${styles.select} ${styles.selectStart}`}
            calendarRangeEndClassName={`${styles.select} ${styles.selectStart}`}
            locale={myCustomLocale}
            renderFooter={
                hasOption ? () => (
                    <Radio.Group
                        onChange={(e: any) => setTypeCalendar(e.target.value)}
                        defaultValue='date'
                        className={styles.typeCalendar}
                    >
                        <Radio value='date'>Theo ngày</Radio>
                        <Radio value='month'>Theo tuần</Radio>
                    </Radio.Group>
                ) : undefined
            }
        />
    )
    return (
        <Popover
            trigger={'click'}
            content={calendar}
            overlayInnerStyle={{ borderRadius: 20 }}
        >
            <DatePicker
                value={value ? moment({ ...value, month: value.month - 1 }) : undefined}
                panelRender={() => undefined}
                size='large'
                format={format ? format : 'DD/MM/YYYY'}
                placeholder={'Chọn ngày'}
                onChange={onChange}
                className={props.inputClassName}
                suffixIcon={<Icon component={icon} />}
            />
        </Popover>
    )
}

export default CustomDatePicker