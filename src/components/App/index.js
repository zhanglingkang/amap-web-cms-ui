var React = require('react')
var Header = require('../Header')
var LeftNav = require('../LeftNav')
var App = React.createClass({
    render() {
        return (
            <div className="app-container">
                <div className="header-container">
                    {
                        this.props.children.filter((item)=> {
                            return item.type.displayName === 'Header'
                        })[0]
                    }
                </div>
                <div className="main-container">
                    <div className="left">
                        {
                            this.props.children.filter((item)=> {
                                return item.type.displayName === 'LeftNav'
                            })[0]
                        }
                    </div>

                    <div className="right">
                        <div>
                            {
                                this.props.children.filter((item)=> {
                                    return item.type.displayName !== 'Header' && item.type.displayName !== 'LeftNav'
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }


})
module.exports = App