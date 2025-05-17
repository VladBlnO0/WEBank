import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from "react-router-dom";
import styles from "../css/User.module.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default function UserDashboard() {

    const [showCardNumberTooltip, setShowCardNumberTooltip] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        setShowCardNumberTooltip(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowCardNumberTooltip(false);
        }, 1000);
    };

    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const mainCard = users[0];

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/user/balance?number=1`)
            .then((res) => res.json())
            .then((data) => setUsers(data.userData));
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/user/transactions?number=1234123412345234`)
            .then((res) => res.json())
            .then((data) => setTransactions(data.transactions));
    }, []);

    const formatCard = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim();
    };

    return (
        <div
            className="d-flex p-2 justify-content-between flex-column"
            style={{ minHeight: "100%" }}
        >
            <div className="p-2 d-flex rounded overflow-hidden shadow bg-white">
                <aside
                    className="bg-white border-end d-flex flex-column"
                    style={{ minHeight: "90vh", width: "250px" }}
                >
                    <div className="p-4 border-bottom d-flex align-items-center fw-semibold">
                        <i className="bi bi-bank2 me-2"></i> Bank
                    </div>
                    <nav className="d-flex flex-column p-2 gap-2">
                        <NavLink
                            to="/"
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-wallet2 me-2"></i> Мій рахунок
                        </NavLink>
                        <NavLink
                            to="/transfer"
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Перекази
                        </NavLink>
                        <NavLink
                            to="/services"
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-credit-card me-2"></i> Послуги
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-grow-1 p-4">
                    <div
                        className="card p-4 mb-4 position-relative mx-auto"
                        style={{ maxWidth: "320px" }}
                    >
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                {mainCard && (
                                    <>
                                        <div className="text-muted">Головна картка</div>
                                        <div className="fs-3 fw-bold">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(Number(users[0].balance))}
                                        </div>
                                        <div className="text-muted small position-relative"
                                             onMouseEnter={handleMouseEnter}
                                             onMouseLeave={handleMouseLeave}
                                        >
                                            **** **** **** {users[0].number.slice(-4)}

                                            {showCardNumberTooltip && (
                                                <div
                                                    className="position-absolute z-1 top-100 mt-1 fs-6 bg-light border p-2 rounded shadow-sm small"
                                                    style={{ minWidth: '160px', whiteSpace: 'nowrap' }}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    {formatCard(users[0].number)}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <i className="bi bi-credit-card text-muted fs-5"></i>
                        </div>
                    </div>
                    <div className="card p-4">
                        <h2 className="fs-5 fw-semibold mb-3">Транзакції</h2>
                        <div className="vstack gap-3 overflow-auto" style={{ maxHeight: '400px', paddingRight: '6px' }}>
                            {transactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="d-flex justify-content-between align-items-center bg-light p-3 rounded border"
                                >
                                    <div className="w-100">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="fw-medium">
                                                {tx.label}
                                                <span className={`badge ms-2 text-uppercase ${
                                                        tx.type === 'sent'
                                                            ? 'bg-danger'
                                                            : tx.type === 'received'
                                                                ? 'bg-success'
                                                                : 'bg-primary'
                                                    }`}>
                                              {tx.type}
                                            </span>
                                            </div>
                                            <div className="text-muted small">
                                                {new Date(tx.date).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {tx.description && (
                                            <div className="text-muted small mb-1">{tx.description}</div>
                                        )}

                                        {tx.status && (
                                            <div className="text-muted small mb-2">{tx.status}</div>
                                        )}

                                        <div
                                            className={`fw-bold text-end ${
                                                tx.amount < 0 ? 'text-danger' : 'text-success'
                                            }`}
                                        >
                                            {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <footer className={styles.footer}>
                © 2025 Bank. Всі права захищені.
            </footer>
        </div>
    );
}
