const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const cookieParser = require('cookie-parser');
const path = require('path');

const indexRouter = require('./routes/index');

const { Product } = require('./models');
const dummyData = require('./dummyData').default;

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json())
app.use(methodOverride())

const {
  MONGODB = 'mongodb://localhost:27017/database',
  PORT = '3000',
} = process.env;

app.set('port', PORT);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGODB)
    .then(() => {
      console.log('MongoDB connected.');
      dummyData();
    })
    .catch(err => console.log(err));
}

app.use('/', indexRouter);

restify.serve(router, Product);

app.use(router)

module.exports = app;
