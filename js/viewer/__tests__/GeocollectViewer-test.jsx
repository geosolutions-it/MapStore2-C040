/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import GeocollectViewer from '../GeocollectViewer';


describe('Geocollect Viewer Tests', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('test GeocollectViewer with cens_muri', () => {
        const cmp = ReactDOM.render(<GeocollectViewer response={{
            features: [{
                id: 'cens_muri.308',
                properties: {
                    name: 'myname',
                    description: 'mydescription'
                }
            }]
        }} />, document.getElementById("container"));
        expect(cmp).toExist();

        const cmpDom = ReactDOM.findDOMNode(cmp);
        expect(cmpDom).toExist();

        expect(cmpDom.innerHTML.indexOf('Segnalazione') !== -1).toBe(true);
    });

    it('test GeocollectViewer with cens_muri_sop', () => {
        const cmp = ReactDOM.render(<GeocollectViewer response={{
            features: [{
                id: 'cens_muri_sop.308',
                properties: {
                    name: 'cens_muri_sop',
                    description: 'mydescription'
                }
            }]
        }} />, document.getElementById("container"));
        expect(cmp).toExist();

        const cmpDom = ReactDOM.findDOMNode(cmp);
        expect(cmpDom).toExist();

        expect(cmpDom.innerHTML.indexOf('cens_muri_sop') !== -1).toBe(true);
    });

    it('test GeocollectViewer with wfsResponse', () => {
        const cmp = ReactDOM.render(<GeocollectViewer response={{
            features: [{
                id: 'cens_muri.308',
                properties: {
                    name: 'myname',
                    description: 'mydescription'
                }
            }]
        }} wfsResponse={{
            features: [{
                id: 'cens_muri_sop.308',
                properties: {
                    name: 'myname',
                    description: 'mydescription'
                }
            }]
        }} imgsSopResponse={[{
            data: {
                data: [{
                    name: "foo"
                }]
            }
        }]}/>, document.getElementById("container"));
        expect(cmp).toExist();

        const cmpDom = ReactDOM.findDOMNode(cmp);
        expect(cmpDom).toExist();

        expect(cmpDom.innerHTML.indexOf('Sopralluogo') !== -1).toBe(false);
        expect(cmpDom.innerHTML.indexOf('Modifica') !== -1).toBe(true);
    });

    it('test GeocollectViewer with images', () => {
        const cmp = ReactDOM.render(<GeocollectViewer response={{
            features: [{
                id: 'cens_muri.308',
                properties: {
                    name: 'myname',
                    description: 'mydescription'
                }
            }]
        }} wfsResponse={{
            features: [{
                id: 'cens_muri_sop.308',
                properties: {
                    name: 'myname',
                    description: 'mydescription'
                }
            }]
        }} imgsSegnResponse={{
            data: {
                data: [{
                    name: "foo"
                }]
            }
        }} imgsSopResponse={[{
            data: {
                data: [{
                    name: "foo"
                }]
            }
        }]}/>, document.getElementById("container"));
        expect(cmp).toExist();

        const cmpDom = ReactDOM.findDOMNode(cmp);
        expect(cmpDom).toExist();

        expect(cmpDom.innerHTML.indexOf('Sopralluogo') !== -1).toBe(false);
        expect(cmpDom.innerHTML.indexOf('Modifica') !== -1).toBe(true);
        expect(cmpDom.innerHTML.indexOf('Immagini') !== -1).toBe(true);
        expect(cmpDom.innerHTML.indexOf('foo') !== -1).toBe(true);
    });
});
