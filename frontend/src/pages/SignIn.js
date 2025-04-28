import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goToSignUp, handleSignIn } from '../utils/navigation'
import { useAuth } from '../contexts/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './css/Sign.module.css'
import Alert from 'react-bootstrap/Alert'

function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertData, setAlertData] = useState({ heading: '', content: null })

    const navigate = useNavigate()
    const { setUser, setIsAdmin } = useAuth()

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
                onSubmit={handleSignIn(navigate, username, password, setUser, setShowAlert, setAlertData, setIsAdmin)}
                className={styles['form-signin']}
            >
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
