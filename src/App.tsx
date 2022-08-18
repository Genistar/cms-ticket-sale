import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'antd/dist/antd.css'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import './App.css';

import LayoutAdminPage from './layout/LayoutAdminRoute';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<LayoutAdminPage />} />
          <Route path='/*' element={<LayoutAdminPage />} />
        </Routes>
      </Provider>

    </BrowserRouter>
  );
}

export default App;
