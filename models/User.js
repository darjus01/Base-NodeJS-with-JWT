const db = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const globalFunctions = require('../utils/globalFunctions');
const mailService = require('../utils/mailServices');

class User {
    constructor(name, surname, email, password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

    async create() {
        let fullTime = globalFunctions.createFullDateString();
        let pass = await bcrypt.hash(this.password, 10);

        let sql = `
        INSERT INTO users ( 
            created_at, 
            updated_at, 
            name, 
            surname, 
            email, 
            password,
            hash_link
        )
        VALUES ( 
            '${fullTime}', 
            '${fullTime}', 
            '${this.name}', 
            '${this.surname}',
            '${this.email.toLowerCase()}', 
            '${pass}',
            '${uuidv4()}'
        );
        `;

        const [newPost, _] = await db.execute(sql);

        let sql2 = `SELECT * FROM users WHERE id = ${newPost.insertId}`;

        const [user] = await db.execute(sql2);

        let mailConfig = {
            from: `"system" <info@muitink.lt>`, // sender address
            to: this.email.toLowerCase(), // list of receivers
            subject: 'Registration subject', // Subject line
            html: `<p><strong>User registered!</strong><br />You can activate acc here ${user[0].hash_link}</p>`, // html body
        };

        await mailService.sendEmail(mailConfig);

        return newPost;
    }

    static activateAccount(id) {
        let fullTime = globalFunctions.createFullDateString();

        let sql = `
            UPDATE users 
            SET updated_at='${fullTime}',
            is_active=1,
            hash_link=NULL
            WHERE id = ${id};
        `;

        db.execute(sql);

        return this.findByID(id);
    }

    static updateByID(id, newData) {
        let fullTime = globalFunctions.createFullDateString();

        let sql = `
            UPDATE users 
            SET updated_at='${fullTime}',
            name='${newData.name}',
            surname='${newData.surname}',
            email='${newData.email.toLowerCase()}'
            WHERE id = ${id};
        `;

        db.execute(sql);

        return this.findByID(id);
    }

    static findByID(id) {
        let sql = `SELECT * FROM users WHERE id = ${id}`;
        return db.execute(sql);
    }

    static findByEmail(email) {
        let sql = `SELECT * FROM users WHERE email = '${email}'`;
        return db.execute(sql);
    }
}

module.exports = User;
