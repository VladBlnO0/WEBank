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
                    <div className="text-xl font-bold h2 bg-white rounded p-4 shadow">Total Users: {stats.totalUsers}</div>

                    <div className="bg-white rounded p-4 shadow" style={{ height: 400, width: '100%'}} >
                        <div style={{ maxWidth: '100%', height: '100%' }}>

                            <Bar data={userChartData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'User Growth This Week'
                                    },
                                    tooltip: {
                                        callbacks: {
                                            title: (tooltipItems) => {
                                                const date = new Date(tooltipItems[0].label);
                                                return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' });
                                            }
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            display: false
                                        },
                                        grid: {
                                            display: false
                                        }
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }} style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>

                    <div className="bg-white rounded p-4 shadow" style={{ height: 400, width: '100%'}}>
                        <div style={{ maxWidth: '100%', height: '100%' }}>
                            <Bar data={transactionChartData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'User Growth This Week'
                                    },
                                    tooltip: {
                                        callbacks: {
                                            title: (tooltipItems) => {
                                                const date = new Date(tooltipItems[0].label);
                                                return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' });
                                            }
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            display: false
                                        },
                                        grid: {
                                            display: false
                                        }
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }}  style={{ width: '100%', height: '100%' }}/>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Admin;
