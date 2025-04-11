import React from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import styles from "../css/Admin.module.css";

export function AdminStats() {
    const location = useLocation();
    const allowedFrom = ["/admin/admin-mainpage", "/admin/admin-stats", "/admin/admin-users", "/sign-in", "/sign-up", "/admin"];
    const cameFrom = location.state?.from;

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>@DMIN</div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" className={styles["nav-item"]} state={{ from: "/admin/admin-stats" }}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-stats" className={styles["nav-item"]} state={{ from: "/admin/admin-stats" }}>
                        Статистика
                    </NavLink>
                    <NavLink to="/admin-users" className={styles["nav-item"]} state={{ from: "/admin/admin-stats" }}>
                        Користувачі
                    </NavLink>
                    <NavLink to="/admin-mainpage" className={styles["nav-item"]} state={{ from: "/admin/admin-stats" }}>
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
                </section>
            </main>
        </div>
    );
}

export default AdminStats;
