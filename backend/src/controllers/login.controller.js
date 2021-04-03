const oracle = require('../configs/oracle');
const jwt = require('jsonwebtoken');

exports.postLogin = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const oracleConnect = await oracle.connect(username, password);
		if (oracleConnect) {
			// get user
			const result = await oracleConnect.execute(
				`SELECT sys_context('USERENV', 'CURRENT_USER') as CURRENT_USER FROM dual`,
			);
			const currentUser = result.rows[0].CURRENT_USER;

			// create json web token
			const jwtEncoded = jwt.sign(
				{
					data: { username, password },
				},
				process.env.JWT_SECRET,
				{ expiresIn: '1d' },
			);

			// set cookie
			res.cookie('access_token', jwtEncoded, {
				httpOnly: true,
				expires: new Date(Date.now() + 3 * 86400000),
			});
			return res.status(200).json({
				message: `Đăng nhập thành công với quyền ${currentUser}`,
				username,
			});
		}
	} catch (error) {
		const { errorNum } = error;
		// invalid username/password; logon denied
		if (errorNum === 1017) {
			return res.status(401).json({
				message:
					'Đăng nhập thất bại. Người dùng không tồn tại hoắc sai mật khẩu',
			});
		}
		// user lacks CREATE SESSION privilege; logon denied]
		else if (errorNum === 1045) {
			return res.status(401).json({
				message: 'Đăng nhập thất bại. Người dùng không có quyền truy cập.',
			});
		}

		return res.status(401).json({ message: 'Đăng nhập thất bại' });
	}
};

// api: get current user is logging ...
exports.getUser = async (req, res, next) => {
	try {
		const token = req.cookies.access_token;
		if (!token) return res.status(401).json({ username: '' });

		const dataDecoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!dataDecoded) return res.status(401).json({ username: '' });

		const { username, password } = dataDecoded.data;
		if (!username || !password) return res.status(401).json({ username: '' });

		const oracleConnect = await oracle.connect(username, password);
		if (oracleConnect) {
			const result = await oracleConnect.execute(
				`SELECT sys_context('USERENV', 'CURRENT_USER') as CURRENT_USER FROM dual`,
			);
			const currentUser = result.rows[0].CURRENT_USER;
			return res.status(200).json({ username: currentUser });
		} else {
			return res.status(401).json({ username: '' });
		}
	} catch (error) {
		console.error('GET USER AUTHENTICATION ERROR: ', error);
		return res.status(401).json({ username: '' });
	}
};

exports.postLogout = async (req, res, next) => {
	try {
		res.clearCookie('access_token');
		return res.status(200).json({ message: 'success' });
	} catch (error) {
		return res.status(400).json({ message: 'failed' });
	}
};
