const jwt = require('jsonwebtoken');

exports.jwtAuthentication = (req, res, next) => {
	try {
		res.locals.isAuth = false;
		const token = req.cookies.access_token;
		const verifyJwtRes = jwt.verify(token, process.env.JWT_SECRET);
		console.log(verifyJwtRes);
	} catch (error) {
		console.log('JWT Authentication error: ', error);
		next();
	}
};
