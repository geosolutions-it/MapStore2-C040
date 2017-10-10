const React = require('react');

const AddressesItem = ({item}) => (
    <span>
        <em>{item.DESVIA + " " + item.TESTO}</em><br/>
        <strong>{item.CODICE_CONTROLLO}</strong>
    </span>
    );

module.exports = AddressesItem;
