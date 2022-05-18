const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());

async function run() {
    try {

    }
    finally {

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('ToDo is Running')
})

app.listen(port, () => {
    console.log(`ToDo listening on port ${port}`)
})