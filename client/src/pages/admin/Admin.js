import React from 'react'
import { NavLink, useLocation, Navigate } from 'react-router-dom'
import styles from '../css/Admin.module.css'

export function Admin() {
    const location = useLocation()

    const allowedFrom = ['/admin/admin-mainpage', '/admin/admin-stats', '/admin/admin-users', '/sign-in', '/sign-up', '/admin']
    const cameFrom = location.state?.from

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>@DMIN</div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" className={styles['nav-item']} state={{ from: '/admin' }}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-stats" className={styles['nav-item']} state={{ from: '/admin' }}>
                        Статистика
                    </NavLink>
                    <NavLink to="/admin-users" className={styles['nav-item']} state={{ from: '/admin' }}>
                        Користувачі
                    </NavLink>
                    <NavLink to="/admin-mainpage" className={styles['nav-item']} state={{ from: '/admin' }}>
                        Контент
                    </NavLink>
                </nav>
                <NavLink to="/" className={styles['nav-item']}>
                    Вийти
                </NavLink>
            </aside>
            <main className={styles['main-content']}>
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
    )
}

export default Admin
