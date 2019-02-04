const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const cookieParser = require('cookie-parser');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json())
app.use(methodOverride())

const {
  MONGODB = 'mongodb://localhost:27017/database',
} = process.env;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGODB)
    .then(() => {
      console.log('MongoDB connected…');
      // dummyData();
    })
    .catch(err => console.log(err));
}

app.use('/', indexRouter);

restify.serve(router, mongoose.model('Product', new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
})))

app.use(router)

module.exports = app;
