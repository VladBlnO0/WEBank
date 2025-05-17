import React from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';

import User from './pages/user/User';
import UserTransfer from './pages/user/UserTransfer';
import UserServices from './pages/user/UserServices';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<User />} />
                    <Route path="/transfer" element={<UserTransfer />} />
                    <Route path="/services" element={<UserServices />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
