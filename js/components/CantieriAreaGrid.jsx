/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Tooltip} = require('react-bootstrap');
const assign = require('object-assign');
const ToggleButton = require('../../MapStore2/web/client/components/buttons/ToggleButton');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const ResizableGrid = require('../../MapStore2/web/client/components/misc/ResizableGrid');

const CantieriAreaGrid = React.createClass({
    propTypes: {
        rowGetter: React.PropTypes.func,
        rows: React.PropTypes.array.isRequired,
        onDeleteRow: React.PropTypes.func
    },
    contextTypes: {
        messages: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            rowGetter: () => {},
            onDeleteRow: () => {},
            rows: []
        };
    },
    render() {
        return (
            <ResizableGrid
                {...this.props}
                rowGetter={this.rowGetter}
            />
        );
    },
    rowGetter(i) {
        let elementiGridTooltip = (<Tooltip key="elementiGridTooltip" id="elementiGridTooltip">
            <Message msgId={"cantieriGrid.toolbar.deleteRow"}/></Tooltip>);
        if (this.props.rows[i].delete === "X") {
            return assign({}, {...this.props.rows[i], "delete": (<ToggleButton id={"delRow" + i} glyphicon="remove"
                onClick={() => this.props.onDeleteRow(this.props.rows[i].name)}
                tooltip={elementiGridTooltip} tooltipPlace="top" style={null}
                btnConfig={{key: "delButton_" + i}} pressed={false}/>)});
        }
        return this.props.rows[i];
    }
});

module.exports = CantieriAreaGrid;
