const express = require('express')
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const client = require('../client');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

usersRouter.post('/register', async (req, res) => {
    const password = req.body.password;
    const userName = req.body.user_name;


    bcrypt.hash(password, 10, async (err, hash) => {
        console.log(hash);
        try {
            // Store hash in your password DB.
            const data = await client.query('INSERT INTO users (password, user_name) VALUES ($1, $2) RETURNING *', [hash, userName]);

            res.status(201).json({ status: "CREATED", data: data.rows });
        }

        catch (err) {
            console.log(err.stack);
            res.status(404).json({ status: "404-Not Found", data: null })
        }
    });

});

usersRouter.post('/login', async (req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;
    const accessToken = jwt.sign({ userId: user_name }, accessTokenSecret);

    try {
        const data = await client.query('SELECT * FROM users WHERE user_name = $1', [user_name]);
        if (data.rows.length === 0) {
            //verifie qu un utilisateur existe ou pas 
            res.status(404).json({ error: "User not found" });
        } else {
            const dbHash = data.rows[0].password;
            bcrypt.compare(password, dbHash, function (err, result) {
                if (result === true) {
                    //res.json({ message: "Login successful" });
                    res.status(200).json({
                        status: 'OK',
                        data: accessToken,
                        message: 'logged in'
                    })
                    console.log(accessToken);
                } else {
                    res.status(401).json({ error: "Incorrect password" });
                }
            });
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ error: "An error occured while trying to log in" });
    }
});

module.exports = usersRouter;