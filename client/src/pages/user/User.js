import React from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";

import styles from "../css/User.module.css";
import "../etc/cool-balls.css";

function User() {
    const location = useLocation();
    const allowedFrom = ["/user/user-bill", "/user/user-transfer", "/user/user-service", "/sign-in", "/sign-up", "/user"];
    const cameFrom = location.state?.from;

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.container}>
                    <div className={styles.logo}>USER</div>
                    <nav className={styles.nav}>
                        <NavLink to="/user" className={styles["nav-item"]} state={{ from: "/user" }}>
                            Особистий кабінет
                        </NavLink>
                        <NavLink to="/user-bill" className={styles["nav-item"]} state={{ from: "/user" }}>
                            Перегляд рахунку
                        </NavLink>
                        <NavLink to="/user-transfer" className={styles["nav-item"]} state={{ from: "/user" }}>
                            Переказ коштів
                        </NavLink>
                        <NavLink to="/user-services" className={styles["nav-item"]} state={{ from: "/user" }}>
                            Оплата послуг
                        </NavLink>
                    </nav>
                </div>
                <NavLink to="/" className={styles.exit}>
                    Вийти
                </NavLink>
            </aside>
            <div className={styles["main-content"]}>
                <section className={styles.content}>
                    <h1>Особистий кабінет</h1>
                    <p>Ласкаво просимо до вашого кабінету</p>
                    <p>Оберіть необхідний варіант з бокової панелі</p>
                    <div className="newtons-cradle">
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default User;
