import React, { useEffect, useState } from 'react';
import LoginPage from './Authentication/LoginPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Body/Home';
import Logout from './Authentication/Logout';
import SavedHotels from './Body/SavedHotels';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from '../redux/authactionTypes';

const Main = () => {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    // 🔄 Global dark mode state
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    return (
        <Routes>
            <Route
                path="/login"
                element={token === null ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
                path="/"
                element={token ? <Home darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navigate to="/login" />}
            />
            <Route
                path="/saved-hotels"
                element={<SavedHotels darkMode={darkMode} />}
            />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
};

export default Main;
