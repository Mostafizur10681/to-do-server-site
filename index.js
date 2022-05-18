const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0vv7e.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('todo').collection('courses');

        app.get('/todo', async (req, res) => {
            const query = {}
            const cursor = todoCollection.find(query);
            const courses = await cursor.toArray();
            res.send(courses)
        });

        // single details
        app.get('/course/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const course = await todoCollection.findOne(query);
            res.send(course);
        })

        app.post('/todo', async (req, res) => {
            const newTodo = req.body;
            const result = await todoCollection.insertOne(newTodo);
            res.send(result);
        })

        // delete inventory
        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(query);
            res.send(result)
        })

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