var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var worksRouter = require('./routes/works')

var app = express();

app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true,  
  cookie : { maxAge : 1000 * 60 * 60 * 3, }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.get(/\/admin/ , (req,res,next) => {
//     if(!req.session.username){
//       res.redirect('/login')
//     }
//   next();
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/works', worksRouter);



app.use('*' , (req,res,next) => {
  res.redirect('/login')
})


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
