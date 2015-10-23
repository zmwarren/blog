var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))



// var blogList = [];


// function filterByTitle(obj) {
//  if ('title' in obj && typeof(obj.title) === 'string') {
//    blogList.push(obj);
//    return true;
//  } else {
//    return false;
//  }  
// };

router.route('/')

  .get(function(req, res) {

    mongoose.model('Blog').find({}, function(err, blog){
      if(err){
        return console.log(err);
      } else {
        // var arrByTitle = blog.filter(filterByTitle);
        res.json(blog);
      }
    });
  })

  .post(function(req, res){

    mongoose.model('Blog').create({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
    }, function(err, blog){
      if(err){
        res.send("That's not a blog, son")
      } else{
        console.log("Hey, you didn't screw it up for once! " + blog + " has been added to the database.");
        res.send(blog);
      }
    });
  })

  router.route('/:_id')

    .get(function(req, res) {
        mongoose.model('Blog').find({}, function(err, _id){
      if(err){
        return console.log(err);
      } else {
        // var arrByTitle = blog.filter(filterByTitle);
        var gotBlog = mongoose.model('Blog')[4];
        console.log(_id);
        res.json(gotBlog);
      }
    });
  })

    .put(function(req, res) {

          Blog.findById(req.params._id, function(err, blog) {

              if (err)
                  res.send(err);

              blog.title = req.body.title;
              blog.body = req.body.body;

              blog.save(function(err) {
                  if (err)
                      res.send(err);

                  res.json({ message: 'Blog updated!' });
              });

          });
      })

   .delete(function(req, res) {
        Blog.remove({
            _id: req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            res.json({ message: 'Blog successfully deleted' });
        });
    });

module.exports = router;