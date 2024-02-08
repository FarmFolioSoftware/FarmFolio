import React from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginComponent from './components/common/LoginComponent';
import RegisterComponent from './components/common/RegisterComponent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/home' element={<MainPage />} />
                <Route path='*' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
