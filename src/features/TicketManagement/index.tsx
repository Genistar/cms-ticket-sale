import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TicketList from './components/TicketList'

type Props = {}

const TicketManagementPage = (props: Props) => {
    return (
        <Routes>
            <Route path="/" element={<TicketList />} />
        </Routes>
    )
}

export default TicketManagementPage