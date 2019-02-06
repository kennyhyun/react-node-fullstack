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
  ALLOW_ORIGIN = '*',
  PORT = '3000',
} = process.env;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', PORT);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGODB)
    .then(() => {
      console.log('MongoDB connected.');
      dummyData();
    })
    .catch(err => {
      console.error('MongoDB connection failed');
      console.error(err);
      process.exit(1);
    });
}

app.use('/', indexRouter);

restify.serve(router, Product);

app.use(router)

module.exports = app;
