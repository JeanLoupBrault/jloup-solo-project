const path = require('path');
const envpath = __dirname + '/../.env';
require('dotenv').config({ path: envpath });
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { createUser, getUser } = require('../handlers.js');


const PORT = process.env.FIREBASEPORT || 8000;
console.log('firebasePort', process.env.FIREBASEPORT)

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./client/build'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get('/users', getUser)
  .post('/users', createUser)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
