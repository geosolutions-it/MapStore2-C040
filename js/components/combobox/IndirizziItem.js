const React = require('react');

const IndirizziItem = ({item}) => (
    <span>
        <em>{item.label}</em><br/>
        <strong>{item.value}</strong>
    </span>
    );

module.exports = IndirizziItem;
