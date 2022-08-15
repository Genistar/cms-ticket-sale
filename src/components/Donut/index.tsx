import React from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';

type Props = {
    data: {
        type: string,
        value: number
    }[]
}

const Donut = (props: Props) => {
    const { data } = props;
    const config = {
        legend: false,
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color: (data: any) => {
            if (data.type === 'used') {
                return '#4F75FF';
            }
            return '#FF8A48';
        },
        radius: 1,
        innerRadius: 0.4,
        label: {
            type: 'outer',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            }
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    display: 'none'
                }
            },
        },

    }
    return (
        <div style={{ position: 'absolute', width: 400, height: 200, left: -99 }}>
            <Pie {...config} />
        </div>


    )
}

export default Donut