import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.js';
import Home from './Pages/Home/Home';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} ></Route>
                <Route path="/home" element={<Home/>} ></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;