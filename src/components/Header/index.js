var React = require('react')
var ReactDOM = require('react-dom')
var logo = require('./logo')
var message = require('./message')
var user = require('./user')
var Header = React.createClass({
	render() {
		return (
			<header className="header">
				{this.props.children}
			</header>
		)
	}


})
module.exports = Header