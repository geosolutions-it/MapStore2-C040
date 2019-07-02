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
const PropTypes = require('prop-types');

class CantieriAreaGrid extends React.Component {
    static propTypes = {
        rowGetter: PropTypes.func,
        rows: PropTypes.array.isRequired,
        onDeleteRow: PropTypes.func
    };
    static contextTypes = {
        messages: PropTypes.object
    };
    static defaultProps = {
            rowGetter: () => {},
            onDeleteRow: () => {},
            rows: []
    };
    render() {
        return (
            <ResizableGrid
                {...this.props}
                rowsCount={this.props.rows && this.props.rows.length}
                rowGetter={this.rowGetter}
            />
        );
    }
    rowGetter = (i) => {
        let elementsGridTooltip = (<Tooltip key="elementsGridTooltip" id="elementsGridTooltip">
            <Message msgId={"cantieriGrid.toolbar.deleteRow"}/></Tooltip>);
        /*
         * updating react-data-grid to 5.0.4 cause a problem with rowIdx
         * it was arriving row indexes outside the rows array like -1 or some old index of an old row
        */
        if (i < 0 || !this.props.rows[i]) {
            return null;
        }
        if (this.props.rows[i].delete === "X") {
            return assign({}, {...this.props.rows[i], "delete": (<ToggleButton id={"delRow" + i} glyphicon="remove"
                onClick={() => this.props.onDeleteRow(this.props.rows[i].name)}
                tooltip={elementsGridTooltip} tooltipPlace="top" style={null}
                btnConfig={{key: "delButton_" + i}} pressed={false}/>)});
        }
        return this.props.rows[i];
    }
}

module.exports = CantieriAreaGrid;
