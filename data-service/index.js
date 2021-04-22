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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('web-service/build'));
}

app.listen(config.port, () => console.log('Server is running on port:' + process.env.PORT || config.port));