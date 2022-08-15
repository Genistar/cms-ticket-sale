import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'antd/dist/antd.css'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import './App.css';

import LayoutAdminPage from './layout/LayoutAdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutAdminPage />} />
        <Route path='/*' element={<LayoutAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
