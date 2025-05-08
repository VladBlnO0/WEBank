import React from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import styles from "../css/Admin.module.css";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export function Admin() {
    const location = useLocation();
    const allowedFrom = ["/admin/admin-mainpage", "/admin/admin-users", "/sign-in", "/sign-up", "/admin"];
    const cameFrom = location.state?.from;

    const [stats, setStats] = useState({
        totalUsers: 0,
        userStats: [],
        transactionStats: []
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/stats/dashboard`)
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    const userChartData = {
        labels: stats.userStats.map(s => s.date),
        datasets: [
            {
                label: 'New Users',
                data: stats.userStats.map(s => s.count),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const transactionChartData = {
        labels: stats.transactionStats.map(s => s.date),
        datasets: [
            {
                label: 'Transactions per Day',
                data: stats.transactionStats.map(s => s.count),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };
    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>@DMIN</div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" className={styles["nav-item"]} state={{ from: "/admin" }}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-users" className={styles["nav-item"]} state={{ from: "/admin" }}>
                        Користувачі
                    </NavLink>
                    <NavLink to="/admin-mainpage" className={styles["nav-item"]} state={{ from: "/admin" }}>
                        Контент
                    </NavLink>
                </nav>
                <NavLink to="/" className={styles["nav-item"]}>
                    Вийти
                </NavLink>
            </aside>
            <main className={styles["main-content"]}>
                <section className={styles.content}>
                    <h3 className={styles["name-section"]}>Іван Іваненко</h3>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Операція</th>
                            <th>Сума</th>
                            <th>Остаточна сума</th>
                            <th>Дата</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Переказ</td>
                            <td>-500 грн</td>
                            <td>9,500 грн</td>
                            <td>03.03.2025</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Переказ</td>
                            <td>-500 грн</td>
                            <td>9,500 грн</td>
                            <td>03.03.2025</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3 className={styles["name-section"]}>Марія Петрівна</h3>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Операція</th>
                            <th>Сума</th>
                            <th>Остаточна сума</th>
                            <th>Дата</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Переказ</td>
                            <td>-500 грн</td>
                            <td>9,000 грн</td>
                            <td>03.03.2025</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3 className={styles["name-section"]}>Петро Іванов</h3>
                    <table className={styles.table} id="petro-ivanov">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Операція</th>
                            <th>Сума</th>
                            <th>Остаточна сума</th>
                            <th>Дата</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Переказ</td>
                            <td>-500 грн</td>
                            <td>6,500 грн</td>
                            <td>03.03.2025</td>
                        </tr>
                        </tbody>
                    </table>

                        <div className="text-xl font-bold">Total Users: {stats.totalUsers}</div>

                        <div className="bg-white rounded p-4 shadow" style={{ height: 400, width: '100%'}} >
                            <h2 className="text-lg font-semibold mb-2">New Users This Week</h2>
                            <Bar data={userChartData} />
                        </div>

                        <div className="bg-white rounded p-4 shadow">
                            <h2 className="text-lg font-semibold mb-2">Transactions This Week</h2>
                            <Bar data={transactionChartData} options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'User Growth This Week'
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }} />
                        </div>
                </section>
            </main>
        </div>
    );
}

export default Admin;
