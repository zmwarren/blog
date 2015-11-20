var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	title: String,
	body: String,
	author: String,
	img: String,
	tags: Array,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);

