var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var method = require('method-override');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var db = require('./model/db');
var Blog = require('./model/blog');


require('./config/passport')(passport);
var app = express();

app.set('port', (process.env.PORT || 3000));

var blogRoutes = require('./routes/blog');

app.use(express.static('public'));

app.use('/api/blog', blogRoutes);

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }))


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/userRoutes.js')(app, passport);

app.get('/public', function(req, res){
	res.readFile('blog.html')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});