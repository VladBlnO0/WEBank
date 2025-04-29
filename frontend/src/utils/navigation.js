// const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/
// let isValid = regex.test(password)
// if (!isValid) {
//     setAlertData(alerts.passwordPolicy)
//     setShowAlert(true)
//     return
// }
// import { alerts } from './alerts'

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
    (navigate, username, email, phone, password, role = 'user', setShowAlert, setAlertData) =>
    async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, phone, password, role }),
            })

            const contentType = response.headers.get('Content-Type')
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text()
                throw new Error(`Expected JSON, got ${contentType || 'no content-type'}: ${text}`)
            }

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Signup failed')
            }

            setShowAlert(false)
            navigate('/sign-in')
        } catch (error) {
            setAlertData({ heading: 'Sign Up Error', content: error.message })
            setShowAlert(true)
        }
    }


export const handleSignIn = (navigate, username, password, setUser, setShowAlert, setAlertData, setIsAdmin) => async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        console.log('Fetch response:', response.status, response.statusText, response.headers.get('Content-Type'));

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Expected JSON, got ${contentType || 'no content-type'}: ${text}`);
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid credentials');
        }

        const data = await response.json();
        if (!data.user) {
            throw new Error('No user data in response');
        }

        const user = data.user;
        setShowAlert(false);
        setUser(user.username); // Changed setUserContext to setUser
        setIsAdmin(user.role === 'admin');
        navigate(user.role === 'admin' ? '/admin' : '/user', { state: { from: '/sign-in' } });
    } catch (error) {
        console.error('SignIn error:', error.message);
        setAlertData({ heading: 'Login Error', content: error.message });
        setShowAlert(true);
    }
};

// Include handleSignUp, goToSignIn, goToSignUp as previously provided