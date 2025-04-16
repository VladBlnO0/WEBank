import { alerts } from './alerts'

export const goToSignIn = (navigate) => (e) => {
    e.preventDefault()
    navigate('/sign-in')
}

export const goToSignUp = (navigate) => (e) => {
    e.preventDefault()
    navigate('/sign-up')
}

export const handleSignUp =
    (navigate, username, password, setShowAlert, setAlertData, role = 'user') =>
    (e) => {
        e.preventDefault()

        const users = JSON.parse(localStorage.getItem('users')) || []
        const userExists = users.some((u) => u.username === username)

        if (userExists) {
            setAlertData(alerts.userExists)
            setShowAlert(true)
            return
        }

        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/
        let isValid = regex.test(password)
        if (!isValid) {
            setAlertData(alerts.passwordPolicy)
            setShowAlert(true)
            return
        }

        users.push({ username, password, role })
        localStorage.setItem('users', JSON.stringify(users))

        setShowAlert(false)
        navigate('/user', { state: { from: '/sign-in' } })
    }

export const handleSignIn = (navigate, username, password, setUserContext, setShowAlert, setAlertData, setIsAdmin) => (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []

    const userExists = users.find((u) => u.username === username)
    const userPasswordRight = users.find((u) => u.username === username && u.password === password)

    if (!userExists) {
        setAlertData(alerts.userNotExists)
        setShowAlert(true)
        return
    }
    if (!userPasswordRight) {
        setAlertData(alerts.passwordWrong)
        setShowAlert(true)
        return
    }

    setShowAlert(false)
    setUserContext(userExists.username)
    setIsAdmin(userExists.role === 'admin')

    if (userExists.role === 'admin') {
        navigate('/admin', { state: { from: '/sign-in' } })
    } else {
        navigate('/user', { state: { from: '/sign-in' } })
    }
}
