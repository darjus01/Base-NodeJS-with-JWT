const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const flashMessages = require('../config/messages.json');

exports.register = async (req, res, next) => {
    try {
        const { name, surname, email, password } = req.body;

        let user = new User(name, surname, email, password);

        user = await user.create();

        res.status(200).json({ message: flashMessages.user.created });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let [user, _] = await User.findByEmail(email);

        if (user.length > 0) {
            let currentUser = user[0];
            if (await bcrypt.compare(password, currentUser.password)) {
                // create token
                let token = jwt.sign({ user_id: currentUser.id }, process.env.JWT_TOKEN_KEY, { expiresIn: process.env.JWT_EXP_TIME });
                res.status(200).json({ token, currentUser });
            } else {
                res.status(401).json({
                    error: flashMessages.auth.badCredencials,
                });
            }
        } else {
            res.status(404).json({
                errors: [
                    {
                        field: 'email',
                        message: flashMessages.user.emailDontExists,
                    },
                ],
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
