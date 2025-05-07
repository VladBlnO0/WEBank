// const express = require('express')
// const router = express.Router()
// const db = require('../db')
//
// router.get('/transactions', (req, res) => {
//     const sql = 'SELECT DATE(created_at) as date, COUNT(*) as total FROM account GROUP BY DATE(created_at) ORDER BY date'
//
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('DB error:', err)
//             return res.status(500).json({ message: 'Server error' })
//         }
//
//         res.json({ data: results })
//     })
// })
//
// module.exports = router
