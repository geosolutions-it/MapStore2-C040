/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
import React  from 'react';
import PropTypes  from 'prop-types';
import AttributeEditor  from '@mapstore/components/data/featuregrid/editors/AttributeEditor';
import AddressesCombobox  from './combobox/AddressesCombobox';
import {createAddresses}  from '../observables/createAddressCodesStream';
import assign  from 'object-assign';
import AddressesItem  from './combobox/AddressesItem';

class AddressesEditor extends AttributeEditor {
    static propTypes = {
        column: PropTypes.object,
        filterProps: PropTypes.object,
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
        isValid: (v) => {
            const regControlCode = /(\d?[a-zA-Z]?\d){10}/g;
            return regControlCode.test(v);
        },
        dataType: "string",
        filterProps: {
            blacklist: ["via", "piazza", "viale"],
            maxFeatures: 5,
            predicate: "ILIKE",
            queriableAttributes: ["DESVIA"],
            typeName: "SITGEO:CIVICI_COD_TOPON",
            valueField: "CODICE_CONTROLLO",
            returnFullData: true
        },
        filter: "contains",
        values: [],
        forceSelection: true,
        itemComponent: AddressesItem,
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
            return assign({}, {[attribute]: regControlCode.test(this.props.value) ? this.props.value : ""});
        };
    }
    render() {
        return <AddressesCombobox ref="combo" {...this.props} valueField={this.props.filterProps.valueField} autocompleteStreamFactory={createAddresses}/>;
    }
}

export default AddressesEditor;
