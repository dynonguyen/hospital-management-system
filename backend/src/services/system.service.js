exports.getTableSpaceList = async (oracleConnect) => {
	try {
		const tableSpace = await oracleConnect.execute(
			`SELECT Tablespace_Name FROM User_Tablespaces`,
		);
		if (tableSpace) {
			return tableSpace.rows.map((item) => item.TABLESPACE_NAME);
		}
	} catch (error) {
		throw error;
	}
};

exports.getUsernameList = async (oracleConnect) => {
	try {
		const usernameList = await oracleConnect.execute(
			`SELECT Username FROM Dba_Users`,
		);
		if (usernameList) {
			return usernameList.rows.map((item) => item.USERNAME);
		}
	} catch (error) {
		throw error;
	}
};

exports.getRoleList = async (oracleConnect) => {
	try {
		const roleList = await oracleConnect.execute(`SELECT Role FROM Dba_Roles`);
		if (roleList) {
			return roleList.rows.map((item) => item.ROLE);
		}
	} catch (error) {
		throw error;
	}
};

exports.getSysPrivList = async (oracleConnect) => {
	try {
		const sysPrivList = await oracleConnect.execute(
			`SELECT DISTINCT Privilege FROM Dba_Sys_Privs`,
		);
		if (sysPrivList) {
			return sysPrivList.rows.map((item) => item.PRIVILEGE);
		}
	} catch (error) {
		throw error;
	}
};

exports.getUserTableList = async (oracleConnect) => {
	try {
		const userTableList = await oracleConnect.execute(
			`SELECT Table_Name FROM User_Tables`,
		);
		if (userTableList) {
			return userTableList.rows.map((item) => item.TABLE_NAME);
		}
	} catch (error) {
		throw error;
	}
};

exports.getColTabList = async (oracleConnect) => {
	try {
		const colList = await oracleConnect.execute(
			`SELECT Table_Name, Column_Name  FROM User_Tab_Columns`,
		);
		if (colList) {
			let result = {};
			colList.rows.forEach((item) => {
				const key = item.TABLE_NAME;
				const value = item.COLUMN_NAME;
				if (!result[key]) {
					result[key] = [value];
				} else {
					result[key].push(value);
				}
			});
			return result;
		}
	} catch (error) {
		throw error;
	}
};
