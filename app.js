var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var key = require('./config/keys');
var flash = require('connect-flash');
var passportConfig = require('./config/passport-setup');
var cookieSession = require('cookie-session');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var expressHbs = require('express-handlebars');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shop',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
  console.log('Connected');
}).on('error',function(error){
  console.log(error);
});

app.use(cookieSession({
  maxAge:1000*60*60,
  keys:[key.session.secret]
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'shopping'}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', indexRouter);
app.use('/', authRouter);

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
