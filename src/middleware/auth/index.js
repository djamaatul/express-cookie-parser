const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
	try {
		const cookie = req.headers.cookie.split(';');
		const token = cookie.filter((e) => e.includes('token'));
		if (token.length == 0) {
			return res.status(401).send({
				status: 'failed',
				message: 'unauthorize',
			});
		}
		const data = jwt.verify(token[0].split('=')[1], 'qewadsws');
		req.user = data;
	} catch (error) {
		return res.status(401).send({
			status: 'failed',
			message: 'token not valid',
		});
	}
	next();
};
