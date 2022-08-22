import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { Moment } from "moment";
export interface iFilter {
    keywords: string;
}
export interface modalFilter {
    checkedList?: CheckboxValueType[];
    statusUse?: any;
    to?: Moment | null;
    from?: Moment | null;
    status?: boolean | null;
}