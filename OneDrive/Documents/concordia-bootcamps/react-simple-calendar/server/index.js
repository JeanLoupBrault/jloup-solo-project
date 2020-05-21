"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { MongoClient } = require('mongodb');

const PORT = 4000;



express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))



  // TODO list - Form Validation add in MongoDB

  .post("/todo", async (req, res) => {
    console.log('req.body', req.body)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })


    const postTodo = async () => {
      console.log("***In postTodo...")

      try {
        console.log('req.body', req.body)
        await client.connect();
        console.log('connected!');
        const db = await client.db('test');
        let data = await db.collection('todo').insertOne(req.body);

        console.log('postTodo data', data)

        res.status(200).send(data);
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await postTodo();
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
