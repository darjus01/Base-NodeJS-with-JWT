# Base NodeJS setup with JWT authorization

This snippet intended for beginning of development and use it as base, developer should know basic javasctipt and little bit of NodeJS.

**It has:**
 - JWT authenrization
 - Saving data in MySql database
 - Account activation

**Main actions are:**
 - Register
 - Login
 - User data ( GET / UPDATE)
 - Activate account

This small project developed on **Node v18.0.0 (npm v8.6.0)**

**Used packages:**
 - dotenv - for enviroment files
 - bcryptjs - for password enciption
 - express - node js framework
 - jsonwebtoken - jwt token
 - mysql2 - database managment
 - nodemailer - send emails
 - uuid - to generate random hashes
 - nodemon - development server for live development

Instalation process:

 1. Make sure that you have node v18 and npm 8.6
 2. Pull this project
 3. npm install in root directory of project
 4. edit .env file and fill all variables
 5. nodemon server will launch dev server on your localhost with http://localhost:{ourPortFromEnvFile}

