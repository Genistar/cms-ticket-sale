import { Button, Card, Col, Input, Row } from 'antd'
import React from 'react';
import styles from '../Style.module.scss'
import { SearchOutlined } from '@ant-design/icons'

type Props = {}

const CheckList = (props: Props) => {
    return (
        <Row>
            <Col flex={5}>
                <Card className={styles.container1}>
                    <Row justify='start' className={styles.container1_warp}>
                        <Col span={8}>
                            <Input.Search
                                placeholder='Tìm bằng số vé'
                                suffix={<SearchOutlined style={{ fontSize: 24 }} />}
                                bordered={false}
                                className={styles.search}
                            />
                        </Col>
                        <Col span={4}>
                            <Button className={styles.btn}>Chốt đối soát</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col flex={2}>
                <Card className={styles.container2}>

                </Card>
            </Col>
        </Row>
    )
}

export default CheckList