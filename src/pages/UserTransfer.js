import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./User.module.css";
import "./components/cool-balls.css";

export default function UserTransfer() {
    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.container}>
                    <div className={styles.logo}>USER</div>
                    <nav className={styles.nav}>
                        <NavLink to="/user" className={styles["nav-item"]}>
                            Особистий кабінет
                        </NavLink>
                        <NavLink to="/user-bill" className={styles["nav-item"]}>
                            Перегляд рахунку
                        </NavLink>
                        <NavLink to="/user-transfer" className={styles["nav-item"]}>
                            Переказ коштів
                        </NavLink>
                        <NavLink to="/user-services" className={styles["nav-item"]}>
                            Оплата послуг
                        </NavLink>
                    </nav>
                </div>
                <NavLink to="/" className={styles.exit}>
                    Вийти
                </NavLink>
            </aside>

            <main className={styles["main-content"]}>
                <section className={styles.content}>
                    <h2 className={styles["balance-section"]}>Ваш баланс</h2>
                    <p className={styles.balance}>9,000 грн</p>
                    <h3 className={styles["balance-section"]}>Переказ на картку</h3>
                    <form className={styles["transfer-form"]}>
                        <label htmlFor="card">Картка:</label>
                        <input type="text" id="card" name="card" required />

                        <label htmlFor="sum">Сума:</label>
                        <input type="number" id="sum" name="sum" required />

                        <label htmlFor="reason">Призначення:</label>
                        <input type="text" id="reason" name="reason" />

                        <div className={styles["currency-options"]}>
                            <label>
                                <input type="radio" name="money" /> Гривня
                            </label>
                            <label>
                                <input type="radio" name="money" /> Долар
                            </label>
                            <label>
                                <input type="radio" name="money" /> Євро
                            </label>
                        </div>

                        <button type="submit" className={styles.btn}>
                            Переказати
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
