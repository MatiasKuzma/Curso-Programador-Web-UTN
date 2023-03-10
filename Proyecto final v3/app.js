var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session')

var indexRouter = require('./routes/index');
var formularioTrabajoRouter = require('./routes/formulario-trabajo')
var usersRouter = require('./routes/users');
var admLoginRouter = require('./routes/admin/login');
var admConfiguracionesRouter = require('./routes/admin/configuraciones');
var registroRouters = require('./routes/registro');
var userLoginRouter = require('./routes/user/login');
var userHomeRouter = require('./routes/user/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'p4kk4l40d05kdof829dkr0',
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }
    else{
      res.redirect('login')
    }
  }catch (error){
console.log(error)
  }
}

app.use('/', indexRouter);
app.use('/formulario-trabajo', formularioTrabajoRouter)
app.use('/users', usersRouter);
app.use('/admin/login', admLoginRouter);
app.use('/admin/configuraciones',secured, admConfiguracionesRouter);
app.use('/registro', registroRouters);
app.use('/user/login', userLoginRouter);
app.use('/user/home',secured, userHomeRouter);

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
