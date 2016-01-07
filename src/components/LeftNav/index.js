var React = require('react')
var ReactDOM = require('react-dom')
const NORMAL = 'normal'
const ACTIVE = 'highlight'
const addIcon = require('./add_normal')
var LeftNav = React.createClass({
	getInitialState(){
		return {}
	},

	newGeneralize  () {
		if (typeof this.props.newGeneralize === 'function') {
			this.props.newGeneralize()
		} else if (typeof this.props.newGeneralize === 'string') {
			location = this.props.newGeneralize
		}
	},

	render() {
		var menu = this.props.menuList
			.map((menuItem, index)=> {
				var active = ''
				if (location.pathname.indexOf(menuItem.path) !== -1) {
					active = 'active'
				}
				return (
					<a key={index} className={`list-group-item ${active}`} href={menuItem.path}>
						{menuItem.name}
						<div></div>
					</a>
				)
			})
		return (
			<nav className="left-nav">
				<div className="new">
					<button className="btn" onClick={this.newGeneralize}>
						<img src={addIcon}/>新建投放
					</button>
				</div>
				{this.props.children}
				<div className="list-group">
					{menu}
				</div>
			</nav>
		)
	}


})
module.exports = LeftNav