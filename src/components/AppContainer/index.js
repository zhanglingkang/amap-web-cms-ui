var React = require('react')
var Header = require('../Header')
var LeftNav = require('../LeftNav')
var AppContainer = React.createClass({
	render() {
		return (
			<div className="app-container">
				<div className="header-container">
					{
						this.props.children.filter((item)=> {
							return item.type === 'Header'
						})[0]
					}
				</div>
				<div className="main-container">
					<div className="left">
						{
							this.props.children.filter((item)=> {
								return item.type === 'LeftNav'
							})[0]
						}
					</div>

					<div className="right">
						<div>
							{
								this.props.children
							}
						</div>
					</div>
				</div>
			</div>
		)
	}


})
module.exports = AppContainer