import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goToSignIn, handleSignUp } from '../utils/navigation'

import Alert from 'react-bootstrap/Alert'
import styles from './css/Sign.module.css'

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertData, setAlertData] = useState({ heading: '', content: null })

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
                onSubmit={handleSignUp(navigate, username, password, setShowAlert, setAlertData)}
                method="get"
                id="form-sign-up"
                className={styles['form-signin']}
            >
                <h1 className="h3 mb-3 font-weight-normal">Створення акаунта</h1>
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
                    Створити
                </button>
            </form>
            <form onSubmit={goToSignIn(navigate)} method="get" className={styles['form-signin']}>
                <button className={styles.btn} type="submit">
                    Вже є акаунт?
                </button>
            </form>
        </main>
    )
}

export default SignUp
