import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goToSignUp } from '../utils/navigation'

import { useAuth } from '../contexts/AuthContext'

import 'bootstrap/dist/css/bootstrap.css'
import styles from './css/Sign.module.css'

function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        const role = login(username, password)

        if (role === 'admin') {
            navigate('/admin', { state: { from: '/sign-in' } })
        } else if (role === 'user') {
            navigate('/user', { state: { from: '/sign-in' } })
        }
    }

    const navigate = useNavigate()

    return (
        <main className={styles.mainContainer}>
            <form onSubmit={handleLogin} className={styles['form-signin']}>
                <h1 className="h3 mb-3 font-weight-normal">Вхід</h1>
                <input
                    type="text"
                    id="username"
                    maxLength="20"
                    className="form-control"
                    placeholder="ID користувача"
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    maxLength="20"
                    className="form-control"
                    placeholder="Пароль"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.btn} type="submit">
                    Увійти
                </button>
            </form>

            <form onSubmit={goToSignUp(navigate)} className={styles['form-signin']}>
                <button className={styles.btn} type="submit">
                    Реєстрація
                </button>
            </form>
        </main>
    )
}

export default SignIn
