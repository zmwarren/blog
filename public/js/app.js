var BlogList = React.createClass({
    render: function() {
      
      var blogData = this.props.data.map(function(blog){
        return <div className="blog">
                  <h2 className="title">{blog.title}</h2>
                  <h3 className="title">By {blog.author}</h3>
                  <p> {blog.body}</p>
                </div>
      });

        return (
        <div>
          
            
            <ul>
              {blogData}
            </ul>
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
          );
    }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.body.value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, body: body});
    this.refs.author.value = '';
    this.refs.body.value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="body" />
        <input type="submit" value="Post" />
      </form>
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
          console.log("inside success")
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
        <div className="testit">
            <ul>
              <BlogList data={this.state.data}/>
            </ul>
        </div>
          );
    }
});

ReactDOM.render(<BlogBox url="/api/blog/"/>, document.getElementById('content'));