import React from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import styles from "../css/Admin.module.css";
import "../etc/cool-balls.css";

export function AdminUsers() {
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
                    <NavLink to="/admin" className={styles["nav-item"]} state={{ from: "/admin/admin-users" }}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-stats" className={styles["nav-item"]} state={{ from: "/admin/admin-users" }}>
                        Статистика
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
                    <h3 className={styles["name-section"]}>Список користувачів</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ім'я</th>
                                <th>Баланс</th>
                                <th>Операції</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Іван Іваненко</td>
                                <td>10,000 грн</td>
                                <td>
                                    <NavLink to="/admin-stats#ivan-ivanenko" className={styles.btn}>
                                        Операції
                                    </NavLink>
                                </td>
                                <td>
                                    <button className={styles.btn} type="button">
                                        Повідомити
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Марія Петрівна</td>
                                <td>5,500 грн</td>
                                <td>
                                    <NavLink to="/admin-stats#maria-petrivna" className={styles.btn}>
                                        Операції
                                    </NavLink>
                                </td>
                                <td>
                                    <button className={styles.btn} type="button">
                                        Повідомити
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Петро Іванов</td>
                                <td>7,000 грн</td>
                                <td>
                                    <NavLink to="/admin-stats#petro-ivanov" className={styles.btn}>
                                        Операції
                                    </NavLink>
                                </td>
                                <td>
                                    <button className={styles.btn} type="button">
                                        Повідомити
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default AdminUsers;
