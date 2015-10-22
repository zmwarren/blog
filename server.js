var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
// var db = require('./model/db');
var Blog = require('./model/blog');



var app = express();

app.set('port', (process.env.PORT || 3000));

var blogRoutes = require('./routes/blog');

app.use(express.static('public'));

// app.use('/api/blog', blogRoutes);

app.get('/public', function(req, res){
	res.readFile('blog.html')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});