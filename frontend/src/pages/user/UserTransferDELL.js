import React from 'react'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import styles from '../css/User.module.css'
import { useAuth } from '../../contexts/AuthContext'

export default function UserTransfer() {
    const location = useLocation()
    const allowedFrom = ['/user', '/user/user-service', '/user/user-transfer']
    const cameFrom = location.state?.from
    const { logout } = useAuth()

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.container}>
                    <div className={styles.logo}>USER</div>
                    <nav className={styles.nav}>
                        <NavLink to="/user" className={styles['nav-item']} state={{ from: '/user/user-transfer' }}>
                            Особистий кабінет
                        </NavLink>
                        <NavLink to="/user-transfer" className={styles['nav-item']} state={{ from: '/user/user-transfer' }}>
                            Переказ коштів
                        </NavLink>
                        <NavLink to="/user-services" className={styles['nav-item']} state={{ from: '/user/user-transfer' }}>
                            Оплата послуг
                        </NavLink>
                    </nav>
                </div>
                <NavLink to="/" onClick={logout} className={styles.exit}>
                    Вийти
                </NavLink>
            </aside>

            <main className={styles['main-content']}>
                <section className={styles.content}>
                    <h2 className={styles['balance-section']}>Ваш баланс</h2>
                    <p className={styles.balance}>9,000 грн</p>
                    <h3 className={styles['balance-section']}>Переказ на картку</h3>
                    <form className={styles['transfer-form']}>
                        <label htmlFor="card">Картка:</label>
                        <input type="text" id="card" name="card" required />

                        <label htmlFor="sum">Сума:</label>
                        <input type="number" id="sum" name="sum" required />

                        <label htmlFor="reason">Призначення:</label>
                        <input type="text" id="reason" name="reason" />

                        <div className={styles['currency-options']}>
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
    )
}
