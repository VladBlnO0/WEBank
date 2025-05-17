import 'bootstrap-icons/font/bootstrap-icons.css';

import NoPage from './pages/etc/NoPage'

import User from './pages/user/User'
import UserTransfer from './pages/user/UserTransfer'
import UserServices from './pages/user/UserServices'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/404" element={<NoPage />} />

                    <Route path="/" element={<User />} />
                    <Route path="/transfer" element={<UserTransfer />} />
                    <Route path="/services" element={<UserServices />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
