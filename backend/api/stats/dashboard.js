const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/dashboard', async (req, res) => {
    const userSql = `
    SELECT COUNT(*) as totalUsers FROM user.users;
  `;

    const userStatsSql = `
    SELECT DATE(created_at) as date, COUNT(*) as count
    FROM user.users
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(created_at)
    ORDER BY date;
  `;

    const txStatsSql = `
    SELECT DATE(date) as date, COUNT(*) as count
    FROM finance.transactions
    WHERE date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(date)
    ORDER BY date;
  `;

    try {
        db.query(userSql, (err1, totalUserRes) => {
            if (err1) return res.status(500).json({ message: 'User count error' });

            db.query(userStatsSql, (err2, userStats) => {
                if (err2) return res.status(500).json({ message: 'User stats error' });

                db.query(txStatsSql, (err3, transactionStats) => {
                    if (err3) return res.status(500).json({ message: 'Transaction stats error' });

                    res.json({
                        totalUsers: totalUserRes[0].totalUsers,
                        userStats,
                        transactionStats,
                    });
                });
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
