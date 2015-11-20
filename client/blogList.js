var React = require('react');
var ReactDOM = require('react-dom');



var BlogList = React.createClass({
   render: function() {
      var blogData = this.props.data.map(function(blog){
        var commentData = blog.comments.map(function(comment){
                 return(    
                     <div className="comment panel panel-default box">
                        <h4 className="panel-header">{comment._id} said...</h4>
                        <p className="panel-body">{comment.body}</p>
                        <h5 className="panel-footer">Posted on {comment.date}</h5>
                     </div>
                );
        });
        return (
            <div className="blog">
              <h2 className="title banner" id="something">{blog.title}</h2>
              <h3 className="title">By {blog.author} &middot; {blog.date}</h3>
              <p className="para"> {blog.body}</p>
              <CommentForm/>
              <p className="para"> {commentData}</p>  
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
    return (
      <BlogList data={this.state.data}/>
    );
  }
});

var CommentForm = React.createClass({

   handleCommentSubmit: function(e) {
      e.preventDefault();
      var body = ReactDOM.findDOMNode(this.refs.body).value.trim();
      if(!title) {
        return;
      }
      var data = ({body: body});
      $.ajax({
         url: this.props.url,
         dataType: 'json',
         data: data,
         type: 'POST',
            success: function(data){
               console.log("Comment posted! " + data.body)
               document.location='/'
            }.bind(this),
            error: function(xhr, status, err){
               console.log("Didn't comment!");
               console.error(this.props.url, status, err.toString());
            }.bind(this)
      })
      
      ReactDOM.findDOMNode(this.refs.title);
  
   },
      render: function() {
        return (
                 <div>
                 <form>
                  <div className="form-group" >
                        <label>Comment</label>
                        <input type="text" className="form-control" ref="body" placeholder="Say something nice..."/>
                  </div>
                  <button onClick={this.handleCommentSubbmit} type="submit" className="btn btn-default">SAY SOMETHING</button>
                 </form>
                 </div>
              );
      }
   });

module.exports = BlogBox;
