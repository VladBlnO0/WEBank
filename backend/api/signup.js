const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/', async (req, res) => {
    const { username, email, phone, password, role = 'user' } = req.body;

    try {
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                'INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
                [username, email, phone, hashedPassword, role],
                (err) => {
                    if (err) return res.status(500).json({ message: 'Insert failed' });
                    res.json({ message: 'User created successfully' });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;