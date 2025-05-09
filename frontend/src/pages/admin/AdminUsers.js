import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Navigate } from "react-router-dom";
import styles from "../css/Admin.module.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export function AdminUsers() {
    const location = useLocation();
    const allowedFrom = ["/admin/admin-mainpage", "/admin/admin-users", "/sign-in", "/sign-up", "/admin"];
    const cameFrom = location.state?.from;

    const [users, setUsers] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [transactions, setTransactions] = useState({});
    const [senders, setSenders] = useState({});
    const [receivers, setReceivers] = useState({});

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users`)
            .then(res => res.json())
            .then(data => setUsers(data.users));
    }, []);
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/finance/transactions/senders`)
            .then(res => res.json())
            .then(data => {
                const senderMap = {};
                for (const sender of data.senders) {
                    senderMap[sender.id] = sender.username;
                }
            setSenders(senderMap);}
            );
    }, []);
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/finance/transactions/receivers`)
            .then(res => res.json())
            .then(data => {
                const receiverMap = {};
                for (const receiver of data.receivers) {
                    receiverMap[receiver.id] = receiver.username;
                }
                setReceivers(receiverMap);}
            );
    }, []);

    const toggle = (userId) => {
        if (expanded === userId) {
            setExpanded(null);
            return;
        }

        setExpanded(userId);

        if (!transactions[userId]) {
            fetch(`${API_BASE_URL}/api/finance/transactions/user/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setTransactions(prev => ({ ...prev, [userId]: data.transactions }));
                });
        }
    };

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>@DMIN</div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" className={styles["nav-item"]} state={{ from: "/admin/admin-users" }}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-users" className={styles["nav-item"]} state={{ from: "/admin/admin-users" }}>
                        Користувачі
                    </NavLink>
                    <NavLink to="/admin-mainpage" className={styles["nav-item"]} state={{ from: "/admin/admin-users" }}>
                        Контент
                    </NavLink>
                </nav>
                <NavLink to="/" className={styles["nav-item"]}>
                    Вийти
                </NavLink>
            </aside>
            <main className={styles["main-content"]}>
                <section className={styles.content}>

                    <table className="table table-bordered">
                        <tbody>
                        {users.map(user => (
                            <React.Fragment key={user.id}>
                                <tr onClick={() => toggle(user.id)} style={{ cursor: 'pointer' }}>
                                    <td>{user.username}</td>
                                </tr>
                                {expanded === user.id && (
                                    <tr>
                                        <td colSpan="3">
                                            <table className="table table-sm mb-0">
                                                <thead>
                                                <tr><th>Sender</th><th>Receiver</th><th>Amount</th><th>Date</th><th>Status</th><th>Description</th></tr>
                                                </thead>
                                                <tbody>
                                                {(transactions[user.id] || []).map(tx => (
                                                    <tr key={tx.id}>
                                                        <td>{senders[tx.sender_id]}</td>
                                                        <td>{receivers[tx.receiver_id]}</td>
                                                        <td>{tx.amount}</td>
                                                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                                                        <td>{tx.status}</td>
                                                        <td>{tx.description}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>

                </section>
            </main>
        </div>
    );
}

export default AdminUsers;
