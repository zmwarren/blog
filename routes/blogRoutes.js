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

    mongoose.model('Blog').find({})
      .populate('comments')
      .exec(function(err, blog){
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
      // img: req.body.img,
      // tags: req.body.tags,

    }, function(err, blog){
      if(err){
        res.send("That's not a blog, son");
      }else {
        console.log(blog + " has been added to the database.");
        // res.render('index.ejs');
        res.json(blog);
        // res.render('index.ejs');
      }
    });
  });

  router.route('/:id')

  .get(function(req, res) {
      mongoose.model('Blog').findById({
          _id: req.params.id
      }, function(err, blog) {
          if (err)
              res.send(err);
          res.json(blog);
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
      mongoose.model('Blog').findByIdAndRemove(req.params.id,
        function(err){
          if(err)
            res.send(err)
          res.json({message: "deleted"})
      })
  });

  router.route('/:id/comment')
 

 .post(function(req,res){
   mongoose.model('Comment').create({
     body: req.body.body,
     user: req.body.user
   }, function(err, comment){
     if(err)
       res.send(err)
     mongoose.model('Blog').findById({
       _id: req.params.id

     }, function(err, blog){
       if(err)
         res.send(err)
       blog.comments.push(comment._id);
       blog.save();
       res.send(comment);
     })
   })
 });

router.route('/:id/comments')

.get(function(req, res){
  mongoose.model('Blog').findById({_id: req.params.id})
  .populate('comments').exec(function(err, comments){
    if(err)
      res.send(err)
    res.send(comments)
  })
});



module.exports = router;