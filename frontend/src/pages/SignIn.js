import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToSignUp, handleSignIn } from '../utils/navigation';
import { useAuth } from '../contexts/AuthContext';
import styles from './css/Sign.module.css';
import Alert from 'react-bootstrap/Alert';

function SignIn() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alertData, setAlertData] = useState({ heading: '', content: null });

    const navigate = useNavigate();
    const { setUser, setIsAdmin } = useAuth(); // Changed setUserContext to setUser

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with:', { username, password });
        const signInHandler = handleSignIn(navigate, username, password, setUser, setShowAlert, setAlertData, setIsAdmin);
        signInHandler(e);
    };

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
            <form onSubmit={handleSubmit} className={styles['form-signin']}>
                <h1 className="h3 mb-3 font-weight-normal">Вхід</h1>
                <input
                    type="text"
                    id="username"
                    maxLength="40"
                    className="form-control"
                    placeholder="ПІБ"
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div style={{ position: 'relative' }} className="mb-3">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        maxLength="20"
                        className="form-control"
                        placeholder="Пароль"
                        autoComplete="current-password"
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
                    Увійти
                </button>
            </form>
            <form onSubmit={goToSignUp(navigate)} className={styles['form-signin']}>
                <button className={styles.btn} type="submit">
                    Реєстрація
                </button>
            </form>
        </main>
    );
}

export default SignIn;