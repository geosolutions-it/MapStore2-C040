/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const React = require('react');
const PagedCombobox = require('../../../MapStore2/web/client/components/misc/combobox/PagedCombobox');
const {streamEnhancer, addStateHandlers} = require('./addressesEnhancer');

// component enhanced with props from stream, and local state
const PagedComboboxEnhanced = streamEnhancer(
    ({ open, toggle, select, focus, change, value, valueField, textField, busy, itemComponent, data, loading = false, filter }) => {
        return (<PagedCombobox
            pagination={{paginated: false}}
            dropUp={false}
            onFocus={focus}
            onToggle={toggle}
            onChange={change}
            itemComponent={itemComponent}
            onSelect={select}
            selectedValue={value}
            valueField={valueField}
            busy={busy}
            data={data}
            textField={textField}
            open={open}
            loading={loading}
            filter={filter}
            />);
    });

const AddressesCombobox = addStateHandlers(PagedComboboxEnhanced);

module.exports = AddressesCombobox;
