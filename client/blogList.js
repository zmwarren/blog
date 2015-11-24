var React = require('react');
var ReactDOM = require('react-dom');
var prettydate = require('pretty-date');
var md5 = require('md5');



var BlogList = React.createClass({
   render: function() {
      var self = this;
      var blogData = this.props.data.map(function(blog){      
        var commentData = blog.comments.map(function(comment){
          var grav = "http://www.gravatar.com/avatar/" + md5(comment.user.local.email);
          var newDate = prettydate.format(new Date(comment.date));
                 return(
                 <div className="para" key={comment._id}>    
                     <div className="comment">                
                        <figure className="commentName">
                          <img className="gravatar" src={grav} />
                          <figcaption>{comment.user.local.userName}</figcaption>
                        </figure>
                        <p className="">{comment.body}</p>
                        <p className="commentTime">{newDate}</p>
                     </div>
                  </div>
                );
        });
        return (
            <div className="blog" key={blog._id}>
              <h2 className="title banner" id="something">{blog.title}</h2>
              <p className="title">By {blog.author} &middot; {blog.date}</p>
              <img className="blogImage" src={blog.img} height="200px" width="600px" />
              <p className="para"> {blog.body}</p>
             
              <CommentForm blogId={blog._id} onPost={self.props.newData}/>
              <h2 className="title">Comments</h2>
              {commentData}
            </div>
        );   
      });
      return (
          <div>
            {blogData}
          </div>
      );
   }
});

var BlogBox = React.createClass({

    getInitialState: function(){
      return {data: []};
    },

    loadBlogsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("broken url is " + this.props.url)
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },

  componentDidMount: function(){
    this.loadBlogsFromServer();
  },

  render: function() {

    var self = this;

    var doRefresh = function(){
    self.loadBlogsFromServer();
    };

    return (
      <BlogList data={this.state.data} newData={doRefresh}/>
    );
  }
});

var CommentForm = React.createClass({

   handleCommentSubmit: function(e) {
   
    var blogId = this.props.blogId;
      e.preventDefault();
      var body = ReactDOM.findDOMNode(this.refs.body).value.trim();
      var data = ({body: body});
      if(!body) {
        return;
      }
      $.ajax({
         url: "/api/blogs/" + blogId + "/comment",
         dataType: 'json',
         data: data,
         type: 'POST',
            success: function(data){
            if(this.props.onPost){
             this.props.onPost();
            }
            // console.log("Comment posted! " + data)
            // document.location='/'
            }.bind(this),
            error: function(xhr, status, err){
               console.log("Didn't comment!");
               console.error(this.props.url, status, err.toString());
            }.bind(this)
      })
      
      ReactDOM.findDOMNode(this.refs.body).value = "";
  
   },

      render: function() {
        return (
          <div>
              <h3>Leave a Commment</h3>
              <textarea type="text" className="form" ref="body" placeholder="Say something nice..."/>
           <button onClick={this.handleCommentSubmit} type="submit" className="btn btn-default">Submit</button>
          
          </div>
        );
      }
   });


module.exports = BlogBox;
