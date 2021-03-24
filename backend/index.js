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

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.getConnection({
	user: 'hr',
	password: '2504',
	connectString: 'localhost/xe',
});

async function run() {
	let connection;

	try {
		connection = await oracledb.getConnection({
			user: 'hr',
			password: '2504',
			connectString: 'localhost/xe',
		});
		const id = 1;
		const result = await connection.execute(`select * from hr where id=${1}`);
		console.log('result: ', result.rows[0].NAME);
	} catch (err) {
		console.error(err);
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				g;
				console.error(err);
			}
		}
	}
}

run();

// =================== Listener ===================== //
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
