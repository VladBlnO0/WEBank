const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const loginRoute = require(path.join(__dirname, 'api', 'login'));
const signupRoute = require(path.join(__dirname, 'api', 'signup'));

const app = express();
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] }));
app.use(bodyParser.json());

app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);

app.use((req, res, next) => {
    if (req.path.endsWith('/') && req.path !== '/') {
        res.redirect(301, req.path.slice(0, -1));
    } else {
        next();
    }
});

app.use((req, res) => res.status(404).json({ message: `Route ${req.method} ${req.path} not found` }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));