var Disagree = React.createClass({
  
  getInitialState: function(){
    return{hated: false, counter: 0};
  },
  handleClick: function(event){
    this.setState({hated: !this.state.hated});
    this.setState({counter: this.state.counter + 1});
  },
  render: function() {
    var text = this.state.hated ? 'disagree' : 'haven\'t disagreed';
    var count = this.state.counter;
    return (
      <div className="row">
      <button onClick={this.handleClick} className="btn glyphicon glyphicon-thumbs-down"> {count}</button>
      </div>
    );
  }
});

var Agrees = React.createClass({
  var blogID = this.props.blogId;
  var commentID = this.props.commentID;
  handleAgreement: function(){
    $.ajax({
      url: "/api/blogs/" + blogId + "/comments/" + commentID,
      dataType: 'json',
      data: data,
      type: 'POST',
        success: function(data){
        if(this.props.onPost){
         this.props.onPost();
        }
        }.bind(this),
        error: function(xhr, status, err){
           console.error(this.props.url, status, err.toString());
        }.bind(this)
    })
  },
  handleClick: function(event){
    this.data.agrees += 1;
  },
  render: function() {
    return (
      <div className="row">
        <button onClick={this.handleAgreement} className="btn glyphicon glyphicon-thumbs-up"> {count}</button>
      </div>
    );
  }
});
