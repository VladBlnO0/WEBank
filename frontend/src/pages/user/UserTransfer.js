import React from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import styles from "../css/User.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function UserTransfer() {
    const location = useLocation();
    const allowedFrom = ["/user", "/user-services", "/user-transfer"];
    const cameFrom = location.state?.from;
    const { logout } = useAuth();

    const [card, setCard] = useState("");
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState("");

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 100001) {
            setAmount(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Transfer submitted:", { card, amount, description });
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
                            to="/user"
                            state={{ from: "/user-transfer" }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-wallet2 me-2"></i> Мій рахунок
                        </NavLink>
                        <NavLink
                            to="/user-transfer"
                            state={{ from: "/user-transfer" }}
                            className="btn btn-light text-start d-flex align-items-center active"
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Перекази
                        </NavLink>
                        <NavLink
                            to="/user-services"
                            state={{ from: "/user-transfer" }}
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

                <main className="flex-grow-1 p-4 d-flex justify-content-center align-items-center">
                    <form
                        className="card p-4 shadow w-100"
                        style={{ maxWidth: 700 }}
                        onSubmit={handleSubmit}
                    >
                        <h4 className="mb-4">Переказ коштів</h4>

                        <div className="mb-3">
                            <label className="form-label">Номер картки</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    maxLength="20"
                                    required
                                    value={card}
                                    onChange={(e) => setCard(e.target.value)}
                                />
                                <span className="input-group-text">
                  <i className="bi bi-credit-card"></i>
                </span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Сума</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="0.00"
                                    step="any"
                                    required
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Опис</label>
                            <textarea
                                className={styles.transfer_form}
                                placeholder="What's this transfer for?"
                                rows="3"
                                maxLength="150"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-dark w-100">
                            <i className="bi bi-send me-2"></i> Надіслати
                        </button>
                    </form>
                </main>
            </div>

            <footer className={styles.footer}>
                © 2025 Bank. Всі права захищені.
            </footer>
        </div>
    );
}
