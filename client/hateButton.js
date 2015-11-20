var React = require('react');
var ReactDOM = require('react-dom');
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
      <div>
      <button onClick={this.handleClick} className="btn btn-danger">
        you {text} this. Click to toggle.
      </button>
      <div className="btn btn-primary">{count} visitors hate this blog Poast!</div>
      </div>
    );
  }
});

// ReactDOM.render(<HateButton />, document.getElementById('hateButton'));
module.exports = HateButton;