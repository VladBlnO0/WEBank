import React from 'react'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import styles from '../css/User.module.css'
import { useAuth } from '../../contexts/AuthContext'

export default function UserDashboard() {
    const location = useLocation()
    const allowedFrom = ['/user/user-transfer', '/user/user-service', '/sign-in', '/sign-up', '/user']
    const cameFrom = location.state?.from
    const { logout } = useAuth()

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />
    }

    const transactions = [
        { id: 1, label: "Water Bill", date: "May 7, 2025", amount: -5.0 },
        { id: 2, label: "Salary", date: "May 1, 2025", amount: 1980.0 },
        { id: 3, label: "Transfer", date: "April 29, 2025", amount: -50.0 },
    ];

    return (
        <div className="min-vh-100 bg-light p-4">
            <div className="d-flex rounded overflow-hidden shadow bg-white">
                <aside className="bg-white border-end" style={{ width: '250px' }}>
                    <div className="p-4 border-bottom d-flex align-items-center fw-semibold">
                        <i className="bi bi-bank2 me-2"></i> Bank
                    </div>
                    <nav className="d-flex flex-column p-2 gap-1">
                        <NavLink
                            to="/user"
                            state={{ from: '/user' }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-wallet2 me-2"></i> My Wallet
                        </NavLink>

                        <NavLink
                            to="/user-transfer"
                            state={{ from: '/user' }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Transfers
                        </NavLink>

                        <NavLink
                            to="/user-services"
                            state={{ from: '/user' }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-credit-card me-2"></i> Payments
                        </NavLink>
                    </nav>
                    <NavLink to="/" onClick={logout} className={styles.exit}>
                        Вийти
                    </NavLink>
                </aside>

                <main className="flex-grow-1 p-4">
                    <div className="card p-4 mb-4">
                        <div>
                            <div className="text-muted">Main Account</div>
                            <div className="fs-3 fw-bold">$11,111.00</div>
                            <div className="text-muted small">**** **** **** 1111</div>
                        </div>
                    </div>

                    <div className="card p-4">
                        <h2 className="fs-5 fw-semibold mb-3">Transactions</h2>
                        <div className="vstack gap-3">
                            {transactions.map(tx => (
                                <div
                                    key={tx.id}
                                    className="d-flex justify-content-between align-items-center bg-light p-3 rounded border"
                                >
                                    <div>
                                        <div className="fw-medium">{tx.label}</div>
                                        <div className="text-muted small">{tx.date}</div>
                                    </div>
                                    <div className={`fw-bold ${tx.amount < 0 ? "text-danger" : "text-success"}`}>
                                        {tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <footer className={styles.footer}>
                © 2025 Bank. All rights reserved.
            </footer>
        </div>
    );
}