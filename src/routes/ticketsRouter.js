const express = require('express')
const ticketsRouter = express.Router();
const client = require('../client')

ticketsRouter.get('/', async (req, res) => {
    try {
        const data = await client.query('SELECT * FROM ticket');
        console.log(data.rowCount)
        res.status(200).json({ status: "SUCCESS", data: data.rows });
    }
    catch (err) {
        res.status(404).json({ status: "404-Not Found", data: null });
        console.log(err.stack)
    }
});
ticketsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await client.query('SELECT * FROM ticket where id = $1', [id]);
        console.log(data.rowCount)

        if (data.rowCount > 0) { res.status(200).json({ status: "SUCCESS", data: data.rows }); }

        else { res.status(404).json({ status: "404-FAIL", data: null }) }

    }
    catch (err) {
        console.log(err.stack)
        res.status(404).json({ status: "404-Not Found", data: null });
    }
});
ticketsRouter.post('/', async (req, res) => {
    console.log(req.body);

    try {
        const message = req.body.message;

        const data = await client.query('INSERT INTO ticket (message) VALUES ($1)', [message]);

        res.status(200).json({ status: "SUCCESS", data: data.rows });
    }
    catch (err) {
        console.log(err.stack);
        res.status(404).json({ status: "404-Not Found", data: null })
    }
});
ticketsRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await client.query('PUT FROM ticket WHERE id = $1', [id]);

        res.status(200).json({ status: "SUCCESS", data: data.rows });
    }
    catch (err) {
        console.log(err.stack);
        res.status(404).json({ status: "404-Not Found", data: null })
    }
});
ticketsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await client.query('DELETE FROM ticket WHERE id = $1', [id]);

        res.status(200).json({ status: "SUCCESS", data: data.rows });
    }
    catch (err) {
        console.log(err.stack);
        res.status(404).json({ status: "404-Not Found", data: null })
    }
});

module.exports = ticketsRouter;