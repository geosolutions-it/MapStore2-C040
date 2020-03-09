/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');

const {Grid, Row, Col} = require('react-bootstrap');

const RecordItem = require('./RecordItem');


class RecordGrid extends React.Component {
    static propTypes = {
        records: PropTypes.array,
        style: PropTypes.object,
        column: PropTypes.object,
        currentLocale: PropTypes.string
    };

    static defaultProps = {
        column: {xs: 12},
        currentLocale: 'en-US',
        records: [],
        style: {
            padding: 5,
            position: 'relative'
        }
    };

    renderRecordItem = (record, i) => {
        let Item = RecordItem;
        return (
            <Col {...this.props.column} key={i}>
                <Item
                    record={record}
                    style={this.props.style}
                    currentLocale={this.props.currentLocale}/>
            </Col>
        );
    };

    render() {
        if (this.props.records && this.props.records.length) {
            let mapsList = this.props.records instanceof Array ? this.props.records : [this.props.records];
            return (
                <Grid className="record-grid" fluid>
                    <Row>
                        {mapsList.map(this.renderRecordItem)}
                    </Row>
                </Grid>
            );
        }

        return null;
    }
}

module.exports = RecordGrid;
