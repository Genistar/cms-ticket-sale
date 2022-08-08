import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CheckList from './CheckList'

type Props = {}

const CheckTicketPage = (props: Props) => {
    return (
        <Routes>
            <Route path="/" element={<CheckList />} />
        </Routes>

    )
}

export default CheckTicketPage