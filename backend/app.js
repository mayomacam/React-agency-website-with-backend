var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const messageSchema = require('./models/messagedb');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

mongoose.connect('mongodb://localhost:27017/message', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const messages = await messageSchema.find().sort({ createdAt: 'desc' })
    //.sort({ createdAt: 'desc' })
  res.render('index', { messages: messages })
})

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
