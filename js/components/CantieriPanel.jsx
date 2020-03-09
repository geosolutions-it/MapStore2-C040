const Dock = require('../../MapStore2/web/client/components/misc/DockablePanel');
const Spinner = require('react-spinkit');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const StyledDiv = require('./StyledDiv');
const ToggleButton = require('../../MapStore2/web/client/components/buttons/ToggleButton');
const LocaleUtils = require('../../MapStore2/web/client/utils/LocaleUtils');
const Modal = require('../../MapStore2/web/client/components/misc/Modal');

const React = require('react');
const {indexOf} = require('lodash');
const {ButtonToolbar, Button, Tooltip, Alert} = require('react-bootstrap');

const polygonSelection = "polygonSelection";
const pointSelection = "pointSelection";
const PropTypes = require('prop-types');

class CantieriPanel extends React.Component {
    static propTypes = {
        activeGrid: PropTypes.string,
        toolbar: PropTypes.object,
        dockSize: PropTypes.number,
        selectBy: PropTypes.object,
        toolbarHeight: PropTypes.number,
        polygonSelectionGlyph: PropTypes.string,
        pointSelectionGlyph: PropTypes.string,
        elementsGridGlyph: PropTypes.string,
        areasGridGlyph: PropTypes.string,
        maxFeaturesExceeded: PropTypes.bool,
        tooltipPlace: PropTypes.string,
        gridOpened: PropTypes.string,
        gridClosed: PropTypes.string,
        onInitPlugin: PropTypes.func,
        onActiveGrid: PropTypes.func,
        onActiveDrawTool: PropTypes.func,
        onHideModal: PropTypes.func,
        onDrawPolygon: PropTypes.func,
        onSave: PropTypes.func,
        position: PropTypes.string,
        onResetCantieriFeatures: PropTypes.func,
        onToggleGrid: PropTypes.func,
        elementsSelected: PropTypes.number,
        saving: PropTypes.bool,
        show: PropTypes.bool,
        loading: PropTypes.bool,
        useDock: PropTypes.bool,
        wrappedComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    };
    static contextTypes = {
        messages: PropTypes.object
    };
    static defaultProps = {
        activeGrid: "elementsGrid",
        pointSelectionGlyph: "1-point",
        polygonSelectionGlyph: "1-polygon",
        areasGridGlyph: "1-polygon",
        elementsGridGlyph: "list-alt",
        onInitPlugin: () => {},
        onActiveGrid: () => {},
        onActiveDrawTool: () => {},
        onToggleGrid: () => {},
        onDrawPolygon: () => {},
        onResetCantieriFeatures: () => {},
        onSave: () => {},
        onHideModal: () => {},
        toolbarHeight: 40,
        tooltipPlace: "top",
        gridOpened: "chevron-right",
        gridClosed: "chevron-left",
        elementsSelected: 0,
        position: "bottom",
        toolbar: {
            activeTools: [ "elementsGrid", pointSelection ],
            inactiveTools: [ "areasGrid", polygonSelection ]
        },
        useDock: false,
        saving: false,
        show: true,
        loading: false
    };
    getStyle = (pos) => {
        return {
            width: pos === "right" || pos === "left" ? "560px" : "100%",
            height: pos === "bottom" || pos === "top" ? "300px" : "100%",
            position: "fixed",
            background: "white",
            right: pos === "right" ? 0 : "auto",
            left: pos === "left" ? 0 : "auto",
            top: pos === "top" ? 0 : "auto",
            bottom: pos === "bottom" ? 0 : "auto",
            zIndex: 20
        };
    }
    getToggleStyle = () => {
        if (this.props.position === "right") {
            return {position: "relative", right: "52px", top: "-12px"};
        }
        if (this.props.show) {
            return {position: "relative", left: "2px", bottom: "313px"};
        }
        return {position: "relative", left: "2px", bottom: "54px"};
    }
    getLeftToolsStyle = () => {
        if (this.props.position === "right") {
            return { position: "relative", left: "2px", bottom: "49px"};
        }
        return {position: "relative", left: "2px", bottom: "48px"};
    }
    getRightToolsStyle = () => {
        if (this.props.position === "right") {
            return { position: "relative", left: "379px", bottom: "82px"};
        }
        return {position: "relative", right: "-842px", bottom: "82px"};
    }
    render() {

        let rowsSelectedComp = null;
        if (this.props.activeGrid === "elementsGrid") {
            const rowText = this.props.elementsSelected === 1 ? "row" : "rows";

            rowsSelectedComp = (<span style={{marginLeft: "15px"}}> <Message msgId={"dock." + rowText} msgParams={{rowsSelected: this.props.elementsSelected.toString()}}/></span>);
        }
        let pointSelectionTooltip = (<Tooltip key="pointSelectionTooltip" id="pointSelectionTooltip">
            <Message msgId={"cantieriGrid.toolbar.pointSelectionTooltip"}/></Tooltip>);
        let polygonSelectionTooltip = (<Tooltip key="polygonSelectionTooltip" id="polygonSelectionTooltip">
            <Message msgId={"cantieriGrid.toolbar.polygonSelectionTooltip"}/></Tooltip>);

        const toggleStyle = this.getToggleStyle();
        const toggleGliphiconOpened = this.props.position === "right" ? this.props.gridOpened : "chevron-down";
        const toggleGliphiconClosed = this.props.position === "right" ? this.props.gridClosed : "chevron-up";

        let toolbar = (<div id="dock-toolbar">

            <ButtonToolbar id="toggle-tools" className="toggle-tool" bsSize="lg" style={toggleStyle}>
                <ToggleButton disabled={this.props.loading} pressed id="toggle-cantieri" className="square-button" glyphicon={this.props.show ? toggleGliphiconOpened : toggleGliphiconClosed} style={{ width: "none"}} btnConfig={{className: "square-button"}}
                    onClick={() => { this.props.onToggleGrid(); }}/>
            </ButtonToolbar>
            <ButtonToolbar id="left-tools" className="left-tools" bsSize="sm" style={this.getLeftToolsStyle()}>
                <ToggleButton id={pointSelection} glyphicon={this.props.pointSelectionGlyph}
                    onClick={() => {
                        this.props.onActiveDrawTool(pointSelection);
                        this.props.onDrawPolygon("clean", "", "LavoriPubblici", [], {});
                    }}
                    tooltip={pointSelectionTooltip} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: pointSelection}} pressed={this.isToolActive(pointSelection)}/>
                <ToggleButton id={polygonSelection} glyphicon={this.props.polygonSelectionGlyph}
                    onClick={() => {
                        this.props.onActiveDrawTool(polygonSelection);
                        if (!this.isToolActive(polygonSelection)) {
                            this.props.onDrawPolygon("start", "Polygon", "LavoriPubblici", [], {stopAfterDrawing: false});
                        } else {
                            this.props.onDrawPolygon("clean", "", "LavoriPubblici", [], {});
                        }
                    }}
                    tooltip={polygonSelectionTooltip} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: polygonSelection}} pressed={this.isToolActive(polygonSelection)}/>
                {rowsSelectedComp}
                <Button key="save" value="save" onClick={() => this.props.onSave()}>
                    <Message msgId="cantieriGrid.toolbar.save"/></Button>
                <Button key="reset" value="reset" onClick={() => this.props.onResetCantieriFeatures()}>
                    <Message msgId="cantieriGrid.toolbar.reset"/></Button>
            </ButtonToolbar>
            <ButtonToolbar id="right-tools" className="right-tools" bsSize="sm" style={this.getRightToolsStyle()}>
                <ToggleButton id="elementsGrid" glyphicon={this.props.elementsGridGlyph} text={LocaleUtils.getMessageById(this.context.messages, "cantieriGrid.toolbar.elements")} onClick={() => this.props.onActiveGrid("elementsGrid")}
                    tooltip={null} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: "elementsGrid"}} pressed={this.isToolActive("elementsGrid")}/>
                <ToggleButton id="areasGrid" glyphicon={this.props.areasGridGlyph} text={LocaleUtils.getMessageById(this.context.messages, "cantieriGrid.toolbar.areas")} onClick={() => this.props.onActiveGrid("areasGrid")}
                    tooltip={null} tooltipPlace={this.props.tooltipPlace} style={null}
                    btnConfig={{key: "areasGrid"}} pressed={this.isToolActive("areasGrid")}/>
            </ButtonToolbar>
            {this.props.maxFeaturesExceeded ?
                (<Modal onHide={() => this.props.onHideModal(false)} show={this.props.maxFeaturesExceeded} bsSize="large" container={document.getElementById("body")}>
                    <Modal.Header closeButton><Modal.Title><Message msgId="warning"/></Modal.Title></Modal.Header>
                    <Modal.Body><Alert bsStyle="danger"><Message msgId="cantieriGrid.error.maxFeatures"/></Alert></Modal.Body>
                </Modal>) : null}
        </div>);
        const Container = this.props.useDock ? Dock : StyledDiv;
        return (<Container
            {...this.props}
            toolbar={toolbar}
            id="CantieriDockablePanel"
            style={ this.props.useDock ? null : this.getStyle(this.props.position)}
        >
            <div style="width:100%;position: absolute;z-index: 1000;height:100%;background-color: rgba(255, 255, 255, 0.56);">
                <Spinner spinnerName="circle" overrideSpinnerClassName="spinner"/>
                <Message msgId="uploader.uploadingFiles"/>
            </div>
        </Container>
        );
    }
    isToolActive = (tool) => {
        return indexOf(this.props.toolbar.activeTools, tool) !== -1;
    }
}

module.exports = CantieriPanel;
