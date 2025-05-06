const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        db.query('SELECT * FROM user.users WHERE username = ? AND password = ?',
            [username, password],
            async (err, results) => {

            if (err) {
                console.error('DB error:', err);
                return res.status(500).json({ message: 'Серверна помилка' });
            }

            if (results.length === 0 || results[0].password !== password) {
                return res.status(401).json({ message: 'Дані невірні' });
            }

            const user = results[0];
            return res.status(200).json({ user });

        });
    } catch (error) {
        console.error('Помилка');
    }
});

module.exports = router;