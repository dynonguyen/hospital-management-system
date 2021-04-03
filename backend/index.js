const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const constant = require('./src/constant');
const corsConfig = require('./src/configs/cors.config');
// ! set environment variables
require('dotenv').config();

// ! ================== set port ================== //
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);

// ! ================== setup ================== //
const app = express();
const dev = app.get('env') !== 'production';
if (!dev) {
	app.disable('x-powered-by');
	app.use(morgan('common'));
} else {
	app.use(morgan('dev'));
}

// ! ================== config ==================//
app.use(express.json({ limit: constant.MAX_SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: constant.MAX_SIZE_JSON_REQUEST }));
app.use(cookieParser());
app.use(cors(corsConfig));

// =================== Api ===================== //
const loginApi = require('./src/apis/login.api');
app.use('/apis/login', loginApi);

// =================== Listener ===================== //
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
