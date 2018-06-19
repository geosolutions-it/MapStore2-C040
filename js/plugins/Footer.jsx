/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const src = require("../../assets/img/logo.jpg");

const Footer = React.createClass({
    render() {
        return (
            <div className="ms-footer col-md-12">
            <div><a target="_blank" href="http://www.comune.genova.it/"> <img src={src} width="140" title="Comune di Genova" alt="Comune di Genova" /></a>
                <br/><br/></div>
                <a target="_blank" href="http://www.comune.genova.it/content/note-legali-e-privacy">Privacy</a>
                <br />
                Comune di Genova  - Palazzo Tursi  -  Via Garibaldi 9  -  16124 Genova  | Centralino 010.557111 <br/>
                Pec: comunegenova@postemailcertificata.it - C.F. / P. Iva 00856930102
            </div>
        );
    }
});

module.exports = {
    FooterPlugin: Footer
};
