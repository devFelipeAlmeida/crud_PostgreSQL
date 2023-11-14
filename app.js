require('dotenv').config()
const pool = require('./db')
const port = process.env.PORT
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM company')
        res.status(200).send(data.rows)
    } catch (err) {
        res.send(422).json({ error: "An error occurred"})
    }
})

app.post('/', async (req, res) => {
    const { name, location } = req.body
    try {
        await pool.query('INSERT INTO company (name, address) VALUES ($1, $2)', [name, location])
        res.status(200).send({ message: "Successfully added employee" })
    } catch (err) {
        res.status(422).json({ error: "Error in adding employee to the system"})
    }
})

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE company( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        res.status(422).json({ error: "Error creating database"})
    }
})

app.listen(port, () => {
    console.log('connected')
})