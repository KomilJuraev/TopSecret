require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoute = require('./routes/userInfoRoute');
const secretsRoute = require('./routes/secretsRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', usersRoute);
app.use('/api',secretsRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})