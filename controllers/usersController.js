const User = require('../models/User');
const flashMessages = require('../config/messages.json');

exports.activateAccount = async (req, res, next) => {
    try {
        let currentUser = req.tokenUser;
        let { hashLink } = req.params;

        let [user, _] = await User.findByID(currentUser.user_id);

        if (user.length > 0) {
            if (user[0].hash_link !== hashLink) {
                res.status(400).json({ error: flashMessages.user.userHashIsWrong });
            } else {
                let [userUpdated, _] = await User.activateAccount(currentUser.user_id);
                res.status(200).json({ message: flashMessages.user.userActivated, user: userUpdated[0] });
            }
        } else {
            res.status(404).json({ error: flashMessages.user.dontExists });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateCurrentUser = async (req, res, next) => {
    try {
        let currentUser = req.tokenUser;
        const { name, surname, email } = req.body;

        let [user, _] = await User.updateByID(currentUser.user_id, { name, surname, email });

        if (user.length > 0) {
            res.status(200).json({ message: flashMessages.user.updated, user: user[0] });
        } else {
            res.status(404).json({ error: flashMessages.user.dontExists });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.userByID = async (req, res, next) => {
    try {
        let { id } = req.params;
        let [user, _] = await User.findByID(id);

        if (user.length > 0) {
            res.status(200).json({ user: user[0] });
        } else {
            res.status(404).json({ error: flashMessages.user.dontExists });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.currentUser = async (req, res, next) => {
    try {
        let currentUser = req.tokenUser;
        let [user, _] = await User.findByID(currentUser.user_id);

        if (user.length > 0) {
            res.status(200).json({ user: user[0] });
        } else {
            res.status(404).json({ error: flashMessages.user.dontExists });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
