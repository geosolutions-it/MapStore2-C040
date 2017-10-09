/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const React = require('react');
const PropTypes = require('prop-types');
const AttributeEditor = require('../../MapStore2/web/client/components/data/featuregrid/editors/AttributeEditor');
const IndirizziCombobox = require('./combobox/IndirizziCombobox');
const {createIndirizziStream} = require('../observables/asyncStream');
const assign = require('object-assign');
const IndirizziItem = require('./combobox/IndirizziItem');

class IndirizziEditor extends AttributeEditor {
    static propTypes = {
        column: PropTypes.object,
        dataType: PropTypes.string,
        defaultOption: PropTypes.string,
        forceSelection: PropTypes.bool,
        allowEmpty: PropTypes.bool,
        itemComponent: PropTypes.function,
        isValid: PropTypes.func,
        typeName: PropTypes.string,
        url: PropTypes.string,
        value: PropTypes.string,
        values: PropTypes.array
    };
    static defaultProps = {
        isValid: () => true,
        dataType: "string",
        values: [],
        forceSelection: true,
        itemComponent: IndirizziItem,
        allowEmpty: true
    };
    constructor(props) {
        super(props);
        this.validate = (value) => {
            try {
                return this.props.isValid(value[this.props.column && this.props.column.key]);
            } catch (e) {
                return false;
            }
        };
        this.getValue = () => {
            const updated = super.getValue();
            const attribute = this.props.column && this.props.column.key;
            const regControlCode = /(\d?[a-zA-Z]?\d){10}/g;
            const isValid = regControlCode.test(this.refs.combo.state.value);
            if (isValid) {
                return updated;
            }
            return assign({}, {[attribute]: ""});
        };
    }
    render() {
        return <IndirizziCombobox ref="combo" {...this.props} filter="contains" autocompleteStreamFactory={createIndirizziStream}/>;
    }
}

module.exports = IndirizziEditor;
