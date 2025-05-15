const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const loginRoute = require(path.join(__dirname, 'api', 'login'));
const signupRoute = require(path.join(__dirname, 'api', 'signup'));
const dashboardRoute = require(path.join(__dirname, 'api', 'stats', 'dashboard'));
const contentRoute = require(path.join(__dirname, 'api', 'content', 'about'));
const transRoute = require(path.join(__dirname, 'api', 'finance', 'transactions'));
const userRoute = require(path.join(__dirname, 'api', 'users'));
const senRoute = require(path.join(__dirname, 'api', 'finance', 'senders'));
const recRoute = require(path.join(__dirname, 'api', 'finance', 'receivers'));

const balanceRoute = require(path.join(__dirname, 'api', 'user', 'balance'));
const transactionsRoute = require(path.join(__dirname, 'api', 'user', 'transactions'));

const sendingRoute = require(path.join(__dirname, 'api', 'user', 'sending'));

const servicesRoute = require(path.join(__dirname, 'api', 'content', 'services'));
// const paymentsRoute = require(path.join(__dirname, 'api', 'user', 'payments'));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/stats', dashboardRoute);
app.use('/api/content', contentRoute);
app.use('/api/finance/transactions', transRoute);
app.use('/api/users', userRoute);
app.use('/api/finance/transactions', senRoute);
app.use('/api/finance/transactions', recRoute);

app.use('/api/user/', balanceRoute);
app.use('/api/user/', transactionsRoute);
app.use('/api/user/', sendingRoute);
app.use('/api/content/', servicesRoute);
// app.use('/api/user/', paymentsRoute);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));