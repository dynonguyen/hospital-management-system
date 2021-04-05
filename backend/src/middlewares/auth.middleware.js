const jwt = require('jsonwebtoken');

exports.jwtAuthentication = (req, res, next) => {
	try {
		res.locals.isAuth = false;
		const token = req.cookies.access_token;
		const verifyJwtRes = jwt.verify(token, process.env.JWT_SECRET);
		res.locals.user = verifyJwtRes.data.username;
		res.locals.password = verifyJwtRes.data.password;
		next();
	} catch (error) {
		console.log('JWT Authentication error: ', error);
		next();
	}
};
