import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Admin.module.css";

export function Admin() {
    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>@DMIN</div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" className={styles["nav-item"]}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-stats" className={styles["nav-item"]}>
                        Статистика
                    </NavLink>
                    <NavLink to="/admin-users" className={styles["nav-item"]}>
                        Користувачі
                    </NavLink>
                    <NavLink to="/admin-mainpage" className={styles["nav-item"]}>
                        Контент
                    </NavLink>
                </nav>
                <NavLink to="/" className={styles["nav-item"]}>
                    Вийти
                </NavLink>
            </aside>
            <main className={styles["main-content"]}>
                <section className={styles.content}>
                    <h1>Адміністративна панель</h1>
                    <p>Керування користувачами та фінансами</p>
                    <p>Оберіть необхідний варіант з бокової панелі</p>
                    <div className="newtons-cradle">
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Admin;
