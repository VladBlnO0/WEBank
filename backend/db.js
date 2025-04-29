const mysql = require('mysql2');
const retry = require('async-retry');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'db',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'rootpassword',
    database: process.env.MYSQL_DATABASE || 'bankdb',
});

const connectWithRetry = async () => {
    await retry(
        async () => {
            return new Promise((resolve, reject) => {
                db.connect((err) => {
                    if (err) return reject(err);
                    console.log('Connected to MySQL');
                    resolve();
                });
            });
        },
        { retries: 5, minTimeout: 1000, maxTimeout: 5000 }
    );
};

connectWithRetry().catch((err) => {
    console.error('MySQL connection failed:', err);
    process.exit(1);
});

module.exports = db;