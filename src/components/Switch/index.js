var React = require('react')
var ReactDOM = require('react-dom')
var Switch = React.createClass({
    render() {
        var status = this.props.status ? 'on' : ''
        return (
            <div className={`switch ${status}`} onClick={()=>{this.props.onToggle(!this.props.status)}}>
                <div className="status"></div>
            </div>
        )
    }


})
module.exports = Switch