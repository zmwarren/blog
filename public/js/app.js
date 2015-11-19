var BlogList = React.createClass({
   render: function() { 
      var blogData = this.props.data.map(function(blog){ 
         return (
         <div className="blog">
           <h2 className="title banner" id="something">{blog.title}</h2>
           <h3 className="title">By {blog.author} &middot; {blog.date}</h3>
           <p className="para"> {blog.body}</p> 
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
          // console.log(data);
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

ReactDOM.render(<BlogBox url="/api/blog/"/>, document.getElementById('content'));
