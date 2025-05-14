const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/balance", async (req, res) => {
    const userDataSql = `
        SELECT *
        FROM user.accounts
        WHERE accounts.id = '1'
    `;

    try {
        db.query(userDataSql, (err2, userData) => {
            if (err2) return res.status(500).json({ message: "User details error" });
            res.json({
                userData,
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
