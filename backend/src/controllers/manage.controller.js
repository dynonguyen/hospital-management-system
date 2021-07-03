const { getEmpStatistic } = require('../services/manage.service');
const oracle = require('../configs/oracle');

exports.getEmployeeStatistic = async (req, res, next) => {
	try {
		console.log(res.locals.user);
		var oracleConnect = await oracle.connect(
			res.locals.user,
			res.locals.password,
		);
		const statList = await getEmpStatistic(oracleConnect);
		return res.status(200).json({ statList });
	} catch (error) {
		console.error('GET EMP STAT ERROR: ', error);
		return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
	} finally {
		oracleConnect.close();
	}
};
