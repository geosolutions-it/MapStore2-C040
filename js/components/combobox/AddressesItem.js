import React from 'react';
import './item.less';

const AddressesItem = ({item}) => {

    return !!item.pagination ? (
        <span className="smallItem">
            <span>{item.pagination}</span>
        </span>
    ) : (
        <span className="smallItem">
            <em>{item.DESVIA + " " + item.TESTO}</em><br/>
            <strong>{item.CODICE_CONTROLLO}</strong>
        </span>
    );
};

export default AddressesItem;
