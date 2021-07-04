exports.getEmpStatistic = async (oracleConnect) => {
	try {
		const result = await oracleConnect.execute(
			`SELECT * FROM ADMIN_BV.Employee_Statistic_V`,
		);
		return result?.rows;
	} catch (error) {
		throw error;
	}
};
