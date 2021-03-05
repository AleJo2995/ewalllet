'use-strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/userRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/api', usersRoutes.routes)

app.listen(config.port, () => console.log('Server is running on port:' + config.port));