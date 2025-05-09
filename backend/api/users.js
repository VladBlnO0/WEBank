const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const sql = 'SELECT id, username FROM user.users ORDER BY username';

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });

        res.json({ users: results });
    });
});

module.exports = router;
