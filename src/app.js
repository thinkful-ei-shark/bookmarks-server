require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { API_TOKEN, NODE_ENV } = require('./config')
const bookmarkRouter = require('./bookmark-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());
  //validate token
app.use(function validateBearerToken(req, res, next) {
  let userAuthorization = req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined;
  console.log("user auth is", userAuthorization);

  let validateToken =  userAuthorization ? userAuthorization===API_TOKEN ? next : () => {
    console.log('Request is unauthorized') //change to logger
    res.status(401).send('Unauthorized request');
  } : () => {
    console.log('Request requires authorization') //change to logger
    res.status(401).send('Unauthorized request');
  };
  validateToken();
});

app.use('/bookmarks', bookmarkRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) {
   let response;
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } };
   } else {
     console.error(error);
     response = { message: error.message, error };
   }
   res.status(500).json(response);
 });

module.exports = app;