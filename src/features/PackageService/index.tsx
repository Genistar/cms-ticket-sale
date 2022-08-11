import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PackageList from './PackageList'

type Props = {}

const PackageServicePage: React.FC = (props: Props) => {
    return (
        <Routes>
            <Route path="/" element={<PackageList />} />
        </Routes>

    )
}

export default PackageServicePage