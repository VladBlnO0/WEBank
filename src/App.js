import NoPage from "./pages/components/NoPage";

import Home from "./pages/Home";
import About from "./pages/About";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import User from "./pages/User";
import UserBill from "./pages/UserBill";
import UserTransfer from "./pages/UserTransfer";
import UserServices from "./pages/UserServices";

import Admin from "./pages/Admin";
import AdminStats from "./pages/AdminStats";
import AdminUsers from "./pages/AdminUsers";
import AdminMainpage from "./pages/AdminMainpage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/404" element={<NoPage />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/user-bill" element={<UserBill />} />
                    <Route path="/user-transfer" element={<UserTransfer />} />
                    <Route path="/user-services" element={<UserServices />} />


                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin-stats" element={<AdminStats />} />
                    <Route path="/admin-users" element={<AdminUsers />} />
                    <Route path="/admin-mainpage" element={<AdminMainpage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
