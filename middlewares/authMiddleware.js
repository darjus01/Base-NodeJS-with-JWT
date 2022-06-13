const jwt = require('jsonwebtoken');
const flashMessages = require('../config/messages.json');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(bearerToken, process.env.JWT_TOKEN_KEY);
            req.tokenUser = decoded;
        } catch (error) {
            return res.status(401).send({ error: flashMessages.token.invalid });
        }
        return next();
    } else {
        return res.status(403).json({ error: flashMessages.token.isUndefined });
    }
};

module.exports = verifyToken;
