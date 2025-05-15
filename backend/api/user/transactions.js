const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/transactions', (req, res) => {
    const accountNumber = req.query.number;

    if (!accountNumber) {
        return res.status(400).json({ message: 'Missing account' });
    }

    const sqlSend = `
        SELECT t.id,
               t.sender_id,
               t.receiver_id,
               t.amount,
               t.date,
               t.description,
               r.number AS receiver_number,
               'sent' AS type
        FROM finance.transactions t
                 JOIN user.accounts a ON t.sender_id = a.id
                 JOIN user.accounts r ON t.receiver_id = r.id
        WHERE a.number = ?
        ORDER BY t.date DESC
    `;

    const sqlReceive = `
        SELECT t.id, 
               t.sender_id, 
               t.receiver_id, 
               t.amount, 
               t.date,
               t.description,
               'received' AS type,
               s.number AS sender_number
        FROM finance.transactions t
                 JOIN user.accounts a ON t.receiver_id = a.id
                 JOIN user.accounts s ON t.sender_id = s.id
        WHERE a.number = ?
        ORDER BY t.date DESC
    `;

    const sqlPayment = `
        SELECT p.id, 
               p.amount, 
               p.date, 
               p.service_id, 
               'payment' AS type,
               s.name AS service_name
        FROM finance.payment p
                 JOIN user.accounts a ON p.account_id = a.id
                 JOIN finance.services s ON p.service_id = s.id
        WHERE a.number = ?
        ORDER BY p.date DESC
    `;

    try {
        db.query(sqlSend, [accountNumber], (err1, sendResults) => {
            if (err1) return res.status(500).json({ message: 'Sent query error' });

            db.query(sqlReceive, [accountNumber], (err2, receiveResults) => {
                if (err2) return res.status(500).json({ message: 'Received query error' });

                db.query(sqlPayment, [accountNumber], (err3, paymentResults) => {
                    if (err3) return res.status(500).json({ message: 'Payment query error' });

                    const send = sendResults.map(tx => ({
                        id: tx.id,
                        date: tx.date,
                        amount: -tx.amount,
                        description: tx.description || '',
                        status: `На картку ****${tx.receiver_number?.slice(-4)}`,
                        label: 'Переказ на картку',
                        type: 'sent'
                    }));

                    const received = receiveResults.map(tx => ({
                        id: tx.id,
                        date: tx.date,
                        amount: tx.amount,
                        description: tx.description || '',
                        status: `З картки ****${tx.sender_number?.slice(-4)}`,
                        label: 'Отримано з картки',
                        type: 'received'
                    }));

                    const payment = paymentResults.map(p => ({
                        id: p.id,
                        date: p.date,
                        amount: -p.amount,
                        description: `Послуга #${p.service_name}`,
                        label: 'Оплата послуги',
                        type: 'payment'
                    }));

                    const combined = [...send, ...received, ...payment]
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 3);

                    res.json({ transactions: combined });
                });
            });
        });
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
