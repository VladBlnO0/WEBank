import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import styles from "../css/User.module.css";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default function UserDashboard() {
    const location = useLocation();
    const allowedFrom = [
        "/user-transfer",
        "/user-services",
        "/sign-in",
        "/sign-up",
        "/user",
    ];

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

    const cameFrom = location.state?.from;

    const { logout } = useAuth();

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

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
                            to="/user"
                            state={{ from: "/user" }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-wallet2 me-2"></i> Мій рахунок
                        </NavLink>
                        <NavLink
                            to="/user-transfer"
                            state={{ from: "/user" }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Перекази
                        </NavLink>
                        <NavLink
                            to="/user-services"
                            state={{ from: "/user" }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-credit-card me-2"></i> Послуги
                        </NavLink>
                    </nav>
                    <NavLink
                        to="/"
                        onClick={logout}
                        className="btn btn-outline-dark m-3 text-center"
                    >
                        Вийти
                    </NavLink>
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
                                        <div className="text-muted small">
                                            **** **** **** {users[0].number.slice(-4)}
                                        </div>
                                    </>
                                )}
                            </div>
                            <i className="bi bi-credit-card text-muted fs-5"></i>
                        </div>
                    </div>
                    <div className="card p-4">
                        <h2 className="fs-5 fw-semibold mb-3">Транзакції</h2>
                        <div className="vstack gap-3">
                            {transactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="d-flex justify-content-between align-items-center bg-light p-3 rounded border"
                                >
                                    <div className="w-100">
                                        {/* Top row: label + badge + date */}
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

                                        {/* Description line */}
                                        {tx.description && (
                                            <div className="text-muted small mb-1">{tx.description}</div>
                                        )}

                                        {/* Status (used as masked card info) */}
                                        {tx.status && (
                                            <div className="text-muted small mb-2">{tx.status}</div>
                                        )}

                                        {/* Amount, right aligned */}
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
