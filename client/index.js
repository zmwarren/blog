var React = require('react');
var ReactDOM = require('react-dom');
var GitBox = require('./github');
var BlogForm = require('./blogForm');
var BlogBox = require('./blogList');
var HateButton = require('./hatebutton')




ReactDOM.render(<BlogForm url="/api/blogs/"/>, document.getElementById('blog-form'));
ReactDOM.render(<BlogBox url="/api/blogs/"/>, document.getElementById('content'));
ReactDOM.render(<GitBox url="/api/github/"/>, document.getElementById('Github'));
ReactDOM.render(<HateButton />, document.getElementById('hateButton'));
