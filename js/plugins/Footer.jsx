/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import src  from "../../assets/img/logo.jpg";
import { createPlugin } from '@mapstore/utils/PluginsUtils';
class Footer extends React.Component {
    render() {
        return (
            <div className="ms-footer col-md-12">
                <div><a target="_blank" href="http://smart.comune.genova.it/"> <img src={src} width="140" title="Comune di Genova" alt="Comune di Genova" /></a>
                    <br/><br/></div>
                <a target="_blank" href="http://www.comune.genova.it/content/note-legali-e-privacy">Privacy</a>
                <br />
                Comune di Genova  - Palazzo Tursi  -  Via Garibaldi 9  -  16124 Genova  | Centralino 010.557111 <br/>
                Pec: comunegenova@postemailcertificata.it - C.F. / P. Iva 00856930102
            </div>
        );
    }
}

export default createPlugin('Footer', {
    component: Footer
});
