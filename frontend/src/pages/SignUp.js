import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goToSignIn, handleSignUp } from './components/navigation'

import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from 'react-bootstrap/Alert'
import styles from './css/Sign.module.css'

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertData, setAlertData] = useState({ heading: '', content: null })
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    return (
        <main className={styles.mainContainer}>
            <div className={styles.alertBox}>
                {showAlert && (
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>{alertData.heading}</Alert.Heading>
                        {alertData.content}
                    </Alert>
                )}
            </div>
            <form
                onSubmit={handleSignUp(navigate, username, email, phone, password, setShowAlert, setAlertData)}
                id="form-sign-up"
                className={styles['form-signin']}
            >
                <h1 className="h3 mb-3 font-weight-normal">Створення акаунта</h1>
                <input
                    type="username"
                    id="username"
                    maxLength="20"
                    className="form-control"
                    placeholder="Ім'я"
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="middle"
                    id="email"
                    maxLength="40"
                    className="form-control"
                    placeholder="Пошта"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="middle"
                    id="phone"
                    maxLength="40"
                    className="form-control"
                    placeholder="Телефон"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div style={{ position: 'relative' }} className="mb-3">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        maxLength="20"
                        className="form-control"
                        placeholder="Пароль"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} ` + styles['show-password']}
                        onClick={() => setShowPassword((v) => !v)}
                        role="button"
                    />
                </div>
                <button className={styles.btn} type="submit">
                    Створити
                </button>
            </form>
            <form onSubmit={goToSignIn(navigate)} className={styles['form-signin']}>
                <button className={styles.btn} type="submit">
                    Вже є акаунт?
                </button>
            </form>
        </main>
    )
}

export default SignUp
