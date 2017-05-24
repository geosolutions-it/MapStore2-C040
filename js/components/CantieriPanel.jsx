
const Dock = require('../../MapStore2/web/client/components/misc/DockablePanel');
const ToggleButton = require('../../MapStore2/web/client/components/buttons/ToggleButtonv2');

const Message = require('../../MapStore2/web/client/components/I18N/Message');
const React = require('react');
const {indexOf} = require('lodash');
const {ButtonToolbar, Button, Tooltip} = require('react-bootstrap');

const polygonSelection = "polygonSelection";
const pointSelection = "pointSelection";
const CantieriPanel = React.createClass({
    propTypes: {
        activeGrid: React.PropTypes.string,
        toolbar: React.PropTypes.object,
        dockSize: React.PropTypes.number,
        selectBy: React.PropTypes.object,
        toolbarHeight: React.PropTypes.number,
        polygonSelectionGlyph: React.PropTypes.string,
        pointSelectionGlyph: React.PropTypes.string,
        featureGridGlyph: React.PropTypes.string,
        areasGridGlyph: React.PropTypes.string,
        tooltipPlace: React.PropTypes.string,
        options: React.PropTypes.object,
        onInitPlugin: React.PropTypes.func,
        onActiveGrid: React.PropTypes.func,
        onActiveDrawTool: React.PropTypes.func,
        onDrawPolygon: React.PropTypes.func,
        onResetCantieriAreas: React.PropTypes.func,
        wrappedComponent: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
    },
    contextTypes: {
       messages: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            activeGrid: "featureGrid",
            pointSelectionGlyph: "1-point",
            polygonSelectionGlyph: "1-polygon",
            areasGridGlyph: "list",
            featureGridGlyph: "list-alt",
            onInitPlugin: () => {},
            onActiveGrid: () => {},
            onActiveDrawTool: () => {},
            onDrawPolygon: () => {},
            onResetCantieriAreas: () => {},
            options: {},
            toolbarHeight: 40,
            tooltipPlace: "top",
            toolbar: {
                activeTools: [ "featureGrid", pointSelection ],
                inactiveTools: [ "areasGrid", polygonSelection ]
            }
        };
    },
    componentDidMount() {
        this.props.onInitPlugin(this.props.options);
    },
    render() {
        let rowsSelectedComp = null;
        if (this.props.activeGrid === "featureGrid") {
            const rowText = this.props.selectBy.keys.values.length === 1 ? "row" : "rows";
            const rowsSelected = this.props.selectBy.keys.values.length || 0;
            rowsSelectedComp = (<span style={{marginLeft: "15px"}}> <Message msgId={"dock." + rowText} msgParams={{rowsSelected: rowsSelected.toString()}}/></span>);
        }
        let featureGridTooltip = (<Tooltip key="featureGridTooltip" id="featureGridTooltip">
            <Message msgId={"featuregrid.toolbar.featureGridTooltip"}/></Tooltip>);
        let areasGridTooltip = (<Tooltip key="areasGridTooltip" id="areasGridTooltip">
            <Message msgId={"featuregrid.toolbar.areasGridTooltip"}/></Tooltip>);
        let pointSelectionTooltip = (<Tooltip key="pointSelectionTooltip" id="pointSelectionTooltip">
            <Message msgId={"featuregrid.toolbar.pointSelectionTooltip"}/></Tooltip>);
        let polygonSelectionTooltip = (<Tooltip key="polygonSelectionTooltip" id="polygonSelectionTooltip">
            <Message msgId={"featuregrid.toolbar.polygonSelectionTooltip"}/></Tooltip>);

        let toolbar = (<div id="dock-toolbar">
            <ButtonToolbar id="left-tools" className="left-tools" bsSize="sm">
                <ToggleButton id="featureGrid" glyphicon={this.props.featureGridGlyph}
                    onClick={() => this.props.onActiveGrid("featureGrid")}
                    tooltip={featureGridTooltip} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: "featureGrid"}} pressed={this.isToolActive("featureGrid")}/>
                <ToggleButton id="areasGrid" glyphicon={this.props.areasGridGlyph}
                    onClick={() => this.props.onActiveGrid("areasGrid")}
                    tooltip={areasGridTooltip} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: "areasGrid"}} pressed={this.isToolActive("areasGrid")}/>
                {rowsSelectedComp}
            </ButtonToolbar>
            <ButtonToolbar id="right-tools" className="right-tools" bsSize="sm">
                <ToggleButton id={pointSelection} glyphicon={this.props.pointSelectionGlyph}
                    onClick={() => {
                        this.props.onActiveDrawTool(pointSelection);
                        return this.props.onDrawPolygon("clean", "", "LavoriPubblici", [], {});
                    }}
                    tooltip={pointSelectionTooltip} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: pointSelection}} pressed={this.isToolActive(pointSelection)}/>
                <ToggleButton id={polygonSelection} glyphicon={this.props.polygonSelectionGlyph}
                    onClick={() => {
                        this.props.onActiveDrawTool(polygonSelection);
                        this.props.onDrawPolygon("start", "Polygon", "LavoriPubblici", [], {stopAfterDrawing: false});
                    }}
                    tooltip={polygonSelectionTooltip} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: polygonSelection}} pressed={this.isToolActive(polygonSelection)}/>

                <Button key="save" value="save"><Message msgId="featuregrid.toolbar.save"/></Button>
                <Button key="reset" value="reset"
                    onClick={() => this.props.onResetCantieriAreas()}><Message msgId="featuregrid.toolbar.reset"/></Button>
            </ButtonToolbar>
        </div>);
        return (<Dock
                {...this.props}
                toolbar={toolbar}
            />);
    },
    isToolActive(tool) {
        return indexOf(this.props.toolbar.activeTools, tool) !== -1;
    }
});

module.exports = CantieriPanel;
