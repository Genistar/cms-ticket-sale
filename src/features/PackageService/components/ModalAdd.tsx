import { Modal } from 'antd'
import React from 'react'

type Props = {
    isModalVisible: boolean;
    handelOk: () => void;
    handelCancel: () => void;
}

const ModalAdd = (props: Props) => {
    const { isModalVisible, handelOk, handelCancel } = props;
    return (
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handelOk} onCancel={handelCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
        //   
    )
}

export default ModalAdd