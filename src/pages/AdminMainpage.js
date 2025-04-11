import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Admin.module.css";

export function AdminMainpage() {
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
                    <h3 className={styles["name-section"]}>Список користувачів</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ім'я</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Перегляд свого рахунку</td>
                                <td>
                                    <div className={styles.buttons}>
                                        <button className={styles.btn} type="button">
                                            Редагувати
                                        </button>
                                        <button className={styles.btn} type="button">
                                            Видалити
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Переказ коштів на картку</td>
                                <td>
                                    <div className={styles.buttons}>
                                        <button className={styles.btn} type="button">
                                            Редагувати
                                        </button>
                                        <button className={styles.btn} type="button">
                                            Видалити
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Оплата послуг</td>
                                <td>
                                    <div className={styles.buttons}>
                                        <button className={styles.btn} type="button">
                                            Редагувати
                                        </button>
                                        <button className={styles.btn} type="button">
                                            Видалити
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3">
                                    <button className={styles.btn} type="button">
                                        Додати
                                    </button>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default AdminMainpage;
