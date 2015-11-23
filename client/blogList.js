var React = require('react');
var ReactDOM = require('react-dom');



var BlogList = React.createClass({
   render: function() {
      var blogData = this.props.data.map(function(blog){
        var commentData = blog.comments.map(function(comment){
                 return(
                 <div className="para" key={comment._id}>    
                     <div className="comment panel panel-default box">
                        <h4 className="panel-header">{comment._id} said...</h4>
                        <p className="panel-body">{comment.body}</p>
                        <h5 className="panel-footer">Posted on {comment.date}</h5>
                     </div>
                  </div>
                );
        });
        return (
            <div className="blog" key={blog._id}>
              <h2 className="title banner" id="something">{blog.title}</h2>
              <h3 className="title">By {blog.author} &middot; {blog.date}</h3>
              <p className="para"> {blog.body}</p>
             
              <CommentForm blogId={blog._id}/>
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
    return (
      <BlogList data={this.state.data}/>
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
               console.log("Comment posted! " + data)
               document.location='/'
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
              <textarea type="text" className="form-control" ref="body" placeholder="Say something nice..."/>
           <button onClick={this.handleCommentSubmit} type="submit" className="btn btn-default">Submit</button>
          
          </div>
        );
      }
   });

var HateButton = React.createClass({
  
  getInitialState: function(){
    return{hated: false, counter: 0};
  },
  handleClick: function(event){
    this.setState({hated: !this.state.hated});
    this.setState({counter: this.state.counter + 1});
  },

  render: function() {
    var text = this.state.hated ? 'hate' : 'haven\'t hated';
    var count = this.state.counter;
    return (
      <div className="row">
      <button onClick={this.handleClick} className="btn glyphicon glyphicon-thumbs-down"> {count}</button>
      </div>
    );
  }
});

var LoveButton = React.createClass({
  
  getInitialState: function(){
    return{loved: false, counter: 0};
  },
  handleClick: function(event){
    this.setState({hated: !this.state.loved});
    this.setState({counter: this.state.counter + 1});
  },

  render: function() {
    var text = this.state.loved ? 'hate' : 'haven\'t loved';
    var count = this.state.counter;
    return (
      <div className="row">
      <button onClick={this.handleClick} className="btn glyphicon glyphicon-thumbs-up"> {count}</button>
      </div>
    );
  }
});

module.exports = BlogBox;
