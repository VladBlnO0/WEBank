const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

            db.query(
                'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)',
                [username, email, phone, password],
                (err) => {
                    if (err) return res.status(500).json({ message: 'Пошта або Ім\'я вже занята' });
                    res.json({ message: 'User created' });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;