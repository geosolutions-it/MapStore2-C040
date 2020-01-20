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
    ({ open, toggle, select, focus, change, value, valuesCount,
        loadNextPage, loadPrevPage, maxFeatures, currentPage,
        valueField, textField, busy, itemComponent, data, loading = false, filter }) => {
        const numberOfPages = Math.ceil(valuesCount / maxFeatures);
        return (<PagedCombobox
            pagination={{firstPage: currentPage === 1, lastPage: currentPage === numberOfPages, paginated: true, loadPrevPage, loadNextPage,
                nextPageIcon: "chevron-right",
                prevPageIcon: "chevron-left"}}
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
