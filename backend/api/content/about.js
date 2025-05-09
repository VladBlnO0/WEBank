const express = require('express');
const router = express.Router();
const db = require('../../db');

// GET all sections
router.get('/about', (req, res) => {
    db.query('SELECT section_key, content FROM admin.page', (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });

        const data = {};
        results.forEach(row => {
            data[row.section_key] = row.content;
        });

        res.json(data);
    });
});

// PUT update a section
router.put('/about/:section', (req, res) => {
    const { section } = req.params;
    const { content } = req.body;

    db.query(
        'UPDATE admin.page SET content = ? WHERE section_key = ?',
        [content, section],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'DB update failed' });

            res.json({ message: 'Section updated' });
        }
    );
});

module.exports = router;
