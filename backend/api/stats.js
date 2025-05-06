const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const sql = "SELECT COUNT(*) AS total_users FROM user.users WHERE role = 'user'";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        res.json({ totalUsers: results[0].total_users });
    });
});

module.exports = router;
