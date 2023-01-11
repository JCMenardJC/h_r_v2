// imports
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const client = require('./client')
const ticketsRouter = require('./routes/ticketsRouter');
const usersRouter = require('./routes/usersRouter');

// declarations
const app = express();
const port = 8000;


//activation bodyparse pour JSON
app.use(bodyParser.json())


// routes

app.use('/api/ticket', ticketsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
});
// ecoute le port 8000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
