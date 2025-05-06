const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const loginRoute = require(path.join(__dirname, 'api', 'login'));
const signupRoute = require(path.join(__dirname, 'api', 'signup'));
const statsRoute = require(path.join(__dirname, 'api', 'stats'));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/stats', statsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));