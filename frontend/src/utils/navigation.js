import { alerts } from './alerts'

export const goToSignIn = (navigate) => (e) => {
    e.preventDefault()
    navigate('/sign-in')
}

export const goToSignUp = (navigate) => (e) => {
    e.preventDefault()
    navigate('/sign-up')
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://backend:4000';

export const handleSignUp =
    (navigate, username, email, phone, password, setShowAlert, setAlertData) =>
    async (e) => {
        e.preventDefault()

        const regex_email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        let isValidEmail = regex_email.test(email)
        if (!isValidEmail) {
            setAlertData(alerts.email)
            setShowAlert(true)
            return
        }

        const regex_phone = /^\+?[1-9][0-9]{7,14}$/;
        let isValidPhone = regex_phone.test(phone)
        if (!isValidPhone) {
            setAlertData(alerts.phone)
            setShowAlert(true)
            return
        }

        const regex_password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/
        let isValidPassword = regex_password.test(password)
        if (!isValidPassword) {
            setAlertData(alerts.passwordPolicy)
            setShowAlert(true)
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, phone, password }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            setShowAlert(false)
            navigate('/sign-in')
        } catch (error) {
            setAlertData({ heading: 'Помилка', content: error.message })
            setShowAlert(true)
        }
    }


export const handleSignIn = (navigate, username, password, setUser, setShowAlert, setAlertData, setIsAdmin) => async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        const user = data.user;
        setShowAlert(false);
        setUser(user.username);
        setIsAdmin(user.role === 'admin');
        navigate(user.role === 'admin' ? '/admin' : '/user', { state: { from: '/sign-in' } });

    } catch (error) {
        setAlertData({ heading: 'Помилка', content: error.message });
        setShowAlert(true);
    }
};