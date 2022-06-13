require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/usersRoutes'));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: 'Something wrong with server!',
    });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
