import React from 'react'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import styles from '../css/User.module.css'
import '../etc/cool-balls.css'
import { useAuth } from '../../contexts/AuthContext'

export default function UserServices() {
    const location = useLocation()
    const allowedFrom = ['/user/user-bill', '/user/user-transfer', '/user', '/user/user-service']
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
                        <NavLink to="/user" className={styles['nav-item']} state={{ from: '/user/user-service' }}>
                            Особистий кабінет
                        </NavLink>
                        <NavLink to="/user-bill" className={styles['nav-item']} state={{ from: '/user/user-service' }}>
                            Перегляд рахунку
                        </NavLink>
                        <NavLink to="/user-transfer" className={styles['nav-item']} state={{ from: '/user/user-service' }}>
                            Переказ коштів
                        </NavLink>
                        <NavLink to="/user-services" className={styles['nav-item']} state={{ from: '/user/user-service' }}>
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
                    <p className={styles.balance}>10,000 грн</p>
                    <h3 className={styles['balance-section']}>Останні операції</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Послуга</th>
                                <th>Сума</th>
                                <th>Операція</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Водопостачання</td>
                                <td>1,000 грн</td>
                                <td>
                                    <button className={styles.btn} type="submit">
                                        Оплатити
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Теплопостачання</td>
                                <td>500 грн</td>
                                <td>
                                    <button className={styles.btn} type="submit">
                                        Оплатити
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Електропостачання</td>
                                <td>800 грн</td>
                                <td>
                                    <button className={styles.btn} type="submit">
                                        Оплатити
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    )
}
