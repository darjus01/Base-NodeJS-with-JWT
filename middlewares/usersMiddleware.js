const flashMessages = require('../config/messages.json');
const fieldValiadator = require('../utils/fieldValidator');

exports.checkHashLink = (req, res, next) => {};

exports.registerValidation = (req, res, next) => {
    const { name, surname, email, password, password_two } = req.body;
    let errors = [];

    if (typeof password !== 'undefined' && typeof password_two !== 'undefined') {
        if (password.length === 0 && password_two.length === 0) {
            errors = [...errors, { field: 'password', message: flashMessages.fields.passwordRequired }];
            errors = [...errors, { field: 'password_two', message: flashMessages.fields.passwordRequired }];
        } else if (password !== password_two) {
            errors = [...errors, { field: 'password', message: flashMessages.fields.passwordsNotMatch }];
            errors = [...errors, { field: 'password_two', message: flashMessages.fields.passwordsNotMatch }];
        }
    }

    if (typeof password !== 'undefined') {
        if (password.length === 0) {
            errors = [...errors, { field: 'password', message: flashMessages.fields.passwordRequired }];
        }
    } else {
        errors = [...errors, { field: 'password', message: flashMessages.fields.passwordRequired }];
    }

    if (typeof password_two !== 'undefined') {
        if (password_two.length === 0) {
            errors = [...errors, { field: 'password_two', message: flashMessages.fields.passwordRequired }];
        }
    } else {
        errors = [...errors, { field: 'password_two', message: flashMessages.fields.passwordRequired }];
    }

    if (typeof email !== 'undefined') {
        if (email.length === 0) {
            errors = [...errors, { field: 'email', message: flashMessages.fields.emailRequired }];
        } else if (fieldValiadator.isEmail(email) === false) {
            errors = [...errors, { field: 'email', message: flashMessages.fields.invalidEmail }];
        }
    } else {
        errors = [...errors, { field: 'email', message: flashMessages.fields.emailRequired }];
    }

    if (typeof name !== 'undefined') {
        if (name.length === 0) {
            errors = [...errors, { field: 'name', message: flashMessages.fields.nameRequired }];
        } else if (name.length > 150) {
            errors = [...errors, { field: 'name', message: flashMessages.fields.nameLong }];
        }
    } else {
        errors = [...errors, { field: 'name', message: flashMessages.fields.required }];
    }

    if (typeof surname !== 'undefined') {
        if (surname.length === 0) {
            errors = [...errors, { field: 'surname', message: flashMessages.fields.surnameRequired }];
        } else if (surname.length > 150) {
            errors = [...errors, { field: 'surname', message: flashMessages.fields.surnameLong }];
        }
    } else {
        errors = [...errors, { field: 'surname', message: flashMessages.fields.required }];
    }

    if (errors.length > 0) {
        return res.status(401).send({ errors });
    } else {
        return next();
    }
};
