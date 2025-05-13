import React from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import styles from "../css/User.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function UserTransfer() {
    const location = useLocation();
    const allowedFrom = ["/user", "/user/user-service", "/user/user-transfer"];
    const cameFrom = location.state?.from;
    const { logout } = useAuth();

    const [card, setCard] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Transfer submitted:", { card, amount, description });
    };

    return (
        <div className="min-vh-100 bg-light p-4 d-flex flex-column justify-content-between">
            <div className="d-flex rounded overflow-hidden shadow bg-white">
                <aside className="bg-white border-end" style={{ width: "250px" }}>
                    <div className="p-4 border-bottom d-flex align-items-center fw-semibold">
                        <i className="bi bi-bank2 me-2"></i> Bank
                    </div>
                    <nav className="d-flex flex-column p-2 gap-1">
                        <NavLink
                            to="/user"
                            state={{ from: '/user-transfer' }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-wallet2 me-2"></i> My Wallet
                        </NavLink>
                        <NavLink
                            to="/user-transfer"
                            state={{ from: '/user-transfer' }}
                            className="btn btn-light text-start d-flex align-items-center active"
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Transfers
                        </NavLink>
                        <NavLink
                            to="/user-services"
                            state={{ from: '/user-transfer' }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-credit-card me-2"></i> Payments
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-grow-1 p-4 d-flex justify-content-center align-items-center">
                    <form
                        className="card p-4 shadow w-100"
                        style={{ maxWidth: 500 }}
                        onSubmit={handleSubmit}
                    >
                        <h4 className="mb-4">Transfer Money</h4>

                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    value={card}
                                    onChange={(e) => setCard(e.target.value)}
                                />
                                <span className="input-group-text">
                  <i className="bi bi-credit-card"></i>
                </span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Amount</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                placeholder="What's this transfer for?"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-dark w-100">
                            <i className="bi bi-send me-2"></i> Send Money
                        </button>
                    </form>
                </main>
            </div>

            <footer className="text-center text-muted small mt-4">
                © 2025 Bank. All rights reserved.
            </footer>
        </div>
    );
}
