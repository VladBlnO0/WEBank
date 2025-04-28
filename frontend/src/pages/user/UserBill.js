import React from 'react'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import styles from '../css/User.module.css'
import '../etc/cool-balls.css'
import { useAuth } from '../../contexts/AuthContext'

export default function UserBill() {
    const location = useLocation()
    const allowedFrom = ['/user', '/user/user-transfer', '/user/user-service', '/user/user-bill']
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
                        <NavLink to="/user" className={styles['nav-item']} state={{ from: '/user/user-bill' }}>
                            Особистий кабінет
                        </NavLink>
                        <NavLink to="/user-bill" className={styles['nav-item']} state={{ from: '/user/user-bill' }}>
                            Перегляд рахунку
                        </NavLink>
                        <NavLink to="/user-transfer" className={styles['nav-item']} state={{ from: '/user/user-bill' }}>
                            Переказ коштів
                        </NavLink>
                        <NavLink to="/user-services" className={styles['nav-item']} state={{ from: '/user/user-bill' }}>
                            Оплата послуг
                        </NavLink>
                    </nav>
                </div>
                <NavLink to="/" onClick={logout} className={styles.exit}>
                    Вийти
                </NavLink>
            </aside>

            <div className={styles['main-content']}>
                <section className={styles.content}>
                    <h2 className={styles['balance-section']}>Ваш баланс</h2>
                    <p className={styles.balance}>9,000 грн</p>
                    <h3 className={styles['balance-section']}>Останні операції</h3>
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
                            <tr>
                                <td>2</td>
                                <td>Поповнення</td>
                                <td>+1,000 грн</td>
                                <td>9,500 грн</td>
                                <td>02.02.2025</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Комунальні послуги</td>
                                <td>-500 грн</td>
                                <td>8,500 грн</td>
                                <td>01.01.2025</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}
