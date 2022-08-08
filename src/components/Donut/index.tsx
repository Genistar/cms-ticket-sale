import React from 'react';
import { Pie } from '@ant-design/plots';

type Props = {}

const Donut = (props: Props) => {
    const data = [
        {
            type: 'Vé đã sử dụng',
            value: 27,
        },
        {
            type: 'Vé chưa sử dụng',
            value: 25,
        }
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
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
        <Pie {...config} />
    )
}

export default Donut