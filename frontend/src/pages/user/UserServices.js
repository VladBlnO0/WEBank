import React, { useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../css/User.module.css";

export default function PaymentPage() {
    const [selected, setSelected] = useState([]);

    const location = useLocation();
    const allowedFrom = ["/user-transfer", "/user-services", "/user"];
    const cameFrom = location.state?.from;
    const { logout } = useAuth();

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    const services = [
        {
            id: 1,
            name: "ЖКГ",
            icon: "bi bi-lightning",
            provider: "PowerCo",
            due: "May 7, 2025",
            amount: 7.07,
        },
        {
            id: 2,
            name: "ЖКГ",
            icon: "bi bi-droplet",
            provider: "PowerCo",
            due: "May 7, 2025",
            amount: 7.07,
        },
        {
            id: 3,
            name: "ЖКГ",
            icon: "bi bi-fire",
            provider: "PowerCo",
            due: "May 7, 2025",
            amount: 7.07,
        },
    ];

    const allIds = services.map((service) => service.id);
    const isAllSelected = selected.length === allIds.length && allIds.length > 0;
    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelected([]);
        } else {
            setSelected(allIds);
        }
    };

    const toggleService = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
        );
    };

    const total = selected.reduce((sum, id) => {
        const item = services.find((s) => s.id === id);
        return item ? sum + item.amount : sum;
    }, 0);

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
                            state={{ from: "/user-services" }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-wallet2 me-2"></i> Мій рахунок
                        </NavLink>
                        <NavLink
                            to="/user-transfer"
                            state={{ from: "/user-services" }}
                            className="btn btn-light text-start d-flex align-items-center"
                        >
                            <i className="bi bi-arrow-repeat me-2"></i> Перекази
                        </NavLink>
                        <NavLink
                            to="/user-services"
                            state={{ from: "/user-services" }}
                            className="btn btn-light text-start d-flex align-items-center active"
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
                    <div className="card mb-4 p-4">
                        <table className="table">
                            <thead>
                            <tr className="table-light">
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Послуга</th>
                                <th>Провідник</th>
                                <th>Оплатити до</th>
                                <th>Сума</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(service.id)}
                                            onChange={() => toggleService(service.id)}
                                        />
                                    </td>
                                    <td>
                                        <i className={`${service.icon} me-2`}></i> {service.name}
                                    </td>
                                    <td>{service.provider}</td>
                                    <td>{service.due}</td>
                                    <td>${service.amount.toFixed(2)}</td>
                                    <td>
                                        <span className="badge bg-secondary">Pending</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card p-4">
                        <h5 className="mb-3">Payment Summary</h5>
                        <div className="d-flex justify-content-between">
                            <span>Selected Services:</span>
                            <span>{selected.length}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Total Amount:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="border-top my-3"></div>

                        <button className="btn btn-dark w-100">
                            Proceed to Payment <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </main>
            </div>

            <footer className={styles.footer}>
                © 2025 Bank. Всі права захищені.
            </footer>
        </div>
    );
}
