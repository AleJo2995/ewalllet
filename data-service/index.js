'use-strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const busRoutes = require('./routes/busRoutes');
const app = express();


app.use(cors());
app.use(bodyParser.json());

// User routes
app.use('/api', usersRoutes.routes)

app.use('/api', paymentRoutes.routes)

app.use('/api', busRoutes.routes)

app.listen(config.port, () => console.log('Server is running on port:' + config.port));