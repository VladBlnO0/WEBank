const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 4000

// Connect to MySQL
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'rootpassword',
    database: 'myappdb',
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL')
})

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body

    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).send('Server error')
        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0] })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    })
})

app.listen(4000, () => console.log('Server running on port 4000'))
