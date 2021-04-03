const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.connect = async (user, password) => {
	let connection;
	try {
		connection = await oracledb.getConnection({
			user,
			password,
			connectString: 'localhost/xe',
		});
		return connection;
	} catch (err) {
		console.error('CONNECT ORACLE ERROR: ', err);
		throw err;
	}
};
