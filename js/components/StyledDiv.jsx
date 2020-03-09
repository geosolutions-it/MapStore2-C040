
const React = require('react');
const assign = require('object-assign');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const PropTypes = require('prop-types');

class StyledDiv extends React.Component {
    static propTypes = {
        toolbar: PropTypes.object,
        dockSize: PropTypes.number,
        wrappedComponent: PropTypes.object,
        toolbarHeight: PropTypes.number,
        position: PropTypes.string,
        saving: PropTypes.bool,
        show: PropTypes.bool,
        loading: PropTypes.bool,
        style: PropTypes.object
    }
    static defaultProps = {
        style: {},
        toolbar: {}
    };
    getHeight = (pos) => {
        return pos === "top" || pos === "bottom" ? true : undefined;
    }
    getWidth = (pos) => {
        return pos === "left" || pos === "right" ? true : undefined;
    }
    render() {
        const WrappedComponent = this.props.wrappedComponent;
        let style = assign({}, this.props.style, this.isRightSide() ? {width: this.props.show ? this.props.style.width : 0} : {height: this.props.show ? this.props.style.height : 0}, {transition: this.isRightSide() ? "width 1s ease-in-out" : null} );

        return (
            <div id="cantieri-panel" style={style}>
                {this .props.saving || this.props.loading ? (<div id="maskSpinner" style={{width: "100%", position: "absolute", "zIndex": 1000, height: "100%", backgroundColor: "rgba(255, 255, 255, 0.56)", fontSize: "xx-large"}}>
                    <div className="maskSpinner-body"><Message msgId="loading"/></div>
                </div>) : null}
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
    isRightSide = () => {
        return this.props.position === "right";
    }
}

module.exports = StyledDiv;
