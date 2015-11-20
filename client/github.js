var React = require('react');
var ReactDOM = require('react-dom');

var Github = React.createClass({
	render: function(){
		var gitData = this.props.data.map(function(git){
      if(git.coms) {
        var commitInfo = git.coms.map(function(c){
          return(
            <p>{c.message}</p>
          )
        });
      }
		return(
			<div className = "blog" key={git.id}>
				<div className="panel panel-default box">
						<h3 className="panel-header">Code Zone</h3>
						<div className="panel-body">
							{commitInfo}
						</div>
						<div className="panel-footer">
							{git.id}
						</div>							
				</div>
			</div>
			);
		});
		return (
         <div>
            {gitData}
         </div>
    );
	}
});

var GitBox = React.createClass({
    getInitialState: function(){
      return {data: []};
    },
    loadGitsFromServer: function() {
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
    this.loadGitsFromServer();
  },
  render: function() {
    return (
      <Github data={this.state.data}/>
    );
  }
});



module.exports = GitBox;