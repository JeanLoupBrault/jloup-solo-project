'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');
const fs = require('file-system');


const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
});



// Get all TODOS in MongoDB test collection todo

const allTodos = JSON.parse(fs.readFileSync('./data/todo.json'));
console.log('allTodos', allTodos);
const getTodos = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('test');
        let result = await db.collection('todo').insertMany(allTodos);


        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

getTodos();



