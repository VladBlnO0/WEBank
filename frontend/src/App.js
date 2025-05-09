import NoPage from './pages/etc/NoPage'

import About from './pages/About'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import User from './pages/user/User'
import UserTransfer from './pages/user/UserTransfer'
import UserServices from './pages/user/UserServices'

import Admin from './pages/admin/Admin'
import AdminUsers from './pages/admin/AdminUsers'
import AdminMainpage from './pages/admin/AdminMainpage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/404" element={<NoPage />} />

                    <Route path="/about" element={<About />} />

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />

                    <Route path="/" element={<User />} />
                    <Route path="user-transfer" element={<UserTransfer />} />
                    <Route path="user-services" element={<UserServices />} />

                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin-users" element={<AdminUsers />} />
                    <Route path="/admin-mainpage" element={<AdminMainpage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
