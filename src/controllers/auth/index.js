const { users } = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	try {
		const body = req.body;
		const userExist = await users.findAll();

		if (userExist.length > 0) {
			return res.status(401).send({
				status: 'failed',
				message: 'username already exist',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedpassword = await bcrypt.hash(body.password, salt);
		const response = await users.create({
			username: body.username,
			password: hashedpassword,
		});
		res.status(200).send({
			status: 'success',
			data: {
				username: response.DataValues,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'failed',
			message: error.message,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const userExist = await users.findOne({
			where: {
				username,
			},
		});

		const isValid = await bcrypt.compare(password, userExist.password);

		if (!isValid) {
			return res.status(401).send({
				status: 'failed',
				message: 'username and password combination isnt valid',
			});
		}
		const token = jwt.sign({ id: userExist.id }, 'qewadsws');
		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24,
		})
			.status(200)
			.send({
				status: 'success',
				data: {
					id: userExist.id,
				},
			});
	} catch (error) {
		console.log(error.message);
	}
};
exports.getUsers = async (req, res) => {
	try {
		const data = await users.findAll({
			attributes: {
				exclude: ['password'],
			},
		});
		res.status(200).send({
			status: 'success',
			data,
		});
	} catch (error) {}
};
