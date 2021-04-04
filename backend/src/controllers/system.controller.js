const oracle = require('../configs/oracle');
const OracleDB = require('oracledb');

exports.getStatisticDash = async (req, res, next) => {
	const oracleConnect = await oracle.connect('admin', '2504');
	try {
		const sql = `
			BEGIN
				Sp_Analysis_Sa_Dash(:totalSga, :noRole, :noView,:noTable, :noUser, :noOpenedUser, :noLockedUser, :noAdminUser, :noNewUser);
			END;
		`;
		const result = await oracleConnect.execute(sql, {
			totalSga: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noRole: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noView: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noTable: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noUser: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noOpenedUser: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noLockedUser: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noAdminUser: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
			noNewUser: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
		});
		return res.status(200).json({ statisticData: result.outBinds });
	} catch (error) {
		console.error('GET STATISTIC DASH ERROR: ', error);
		return res.status(400).json({ message: 'failed' });
	} finally {
		oracleConnect.close();
	}
};
