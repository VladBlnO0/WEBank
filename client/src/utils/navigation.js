import { alerts } from '../utils/alerts'
import React from 'react'

export const goToSignIn = (navigate) => (e) => {
    e.preventDefault()
    navigate('/sign-in')
}

export const goToSignUp = (navigate) => (e) => {
    e.preventDefault()
    navigate('/sign-up')
}

export const goToUser = (navigate, user, pass, setShowAlert, setAlertData) => (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []
    const userExists = users.some((u) => u.username === user)
    const usernames = ['user', 'admin']

    if (userExists || usernames.includes(user)) {
        setAlertData(alerts.userExists)
        setShowAlert(true)
        return
    }

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/
    let isValid = regex.test(pass)
    if (!isValid) {
        setAlertData(alerts.passwordPolicy)
        setShowAlert(true)
        return
    }

    users.push({ username: user, password: pass })
    localStorage.setItem('users', JSON.stringify(users))

    setShowAlert(false)
    navigate('/user', { state: { from: '/sign-in' } })
}
