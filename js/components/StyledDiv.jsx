
const React = require('react');

const StyledDiv = React.createClass({
    propTypes: {
        toolbar: React.PropTypes.object,
        dockSize: React.PropTypes.number,
        wrappedComponent: React.PropTypes.object,
        toolbarHeight: React.PropTypes.number,
        position: React.PropTypes.string,
        style: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            style: {},
            toolbar: {}
        };
    },
    getHeight(pos) {
        return pos === "top" || pos === "bottom" ? true : undefined;
    },
    getWidth(pos) {
        return pos === "left" || pos === "right" ? true : undefined;
    },
    render() {
        const WrappedComponent = this.props.wrappedComponent;

        return (
            <div style={this.props.style}>
                <div className="dockpanel-wrapped-component" style={{height: "calc(100% - " + this.props.toolbarHeight + "px)"}}>
                    {this.props.wrappedComponent !== null ? (<WrappedComponent
                    size={{
                        height: this.getHeight(this.props.position) && this.props.dockSize,
                        width: this.getWidth(this.props.position) && this.props.dockSize
                    }}
                    />) : null }
                </div>
                {this.props.toolbar}
            </div>
        );
    }
});

module.exports = StyledDiv;
