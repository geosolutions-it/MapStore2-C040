/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const PropertiesViewer = require('./row/PropertiesViewer');
const RecordGrid = require('./row/RecordGrid');
const {Tabs, Tab, Accordion, Panel} = require('react-bootstrap');
const moment = require('moment');

require('./GeocollectViewer.css');

class GeocollectViewer extends React.Component {
    static propTypes = {
        response: PropTypes.object,
        wfsResponse: PropTypes.object,
        imgsSopResponse: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        imgsSegnResponse: PropTypes.object,
        layer: PropTypes.object,
        rowViewer: PropTypes.object
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.response !== this.props.response;
    }

    renderSegnalazioniImgs() {
        if (this.props.imgsSegnResponse && this.props.imgsSegnResponse.data && this.props.imgsSegnResponse.data.data.length > 0) {
            return (
                <Tab eventKey={3} key={2} title="Immagini">
                    <div className="catalog-results">
                        <RecordGrid key="records"
                            records={this.props.imgsSegnResponse.data.data}
                        />
                    </div>
                </Tab>);
        }
        return null;
    }
    renderSopralluoghiImgs(imgsSopResponse, i) {
        if (imgsSopResponse[i].data.data.length > 0) {
            return (
                <Tab eventKey={2} key="imgs-changes" title="Immagini" >
                    <div className="catalog-results">
                        <RecordGrid key="records"
                            records={imgsSopResponse[i].data.data}
                        />
                    </div>
                </Tab>
            );
        }
        return null;
    }
    renderWFSResponseTab(wfsResponse, RowViewer) {
        if (wfsResponse) {
            if (wfsResponse.features.length > 0) {
                return (
                    <Tab eventKey={2} key={'Modifica'} title={'Modifiche'} >
                        <Accordion defaultActiveKey={0}>
                            {
                                (wfsResponse.features || []).map((feature, i) => {
                                    return (
                                        <Panel className="geocollect-sop" key={i} header={'Modifica del ' + moment(feature.properties.gc_created).format("DD-MM-YYYY, h:mm:ss a")} eventKey={i} style={{position: "relative"}}>
                                            <Tabs id="geocollect-tab" bsStyle="pills">
                                                <Tab eventKey={1} key="changes" title="Tabella" >
                                                    <RowViewer key={feature.properties.gc_created} exclude={["bbox"]} {...feature.properties}/>
                                                </Tab>
                                                {this.renderSopralluoghiImgs(this.props.imgsSopResponse, i)}
                                            </Tabs>
                                        </Panel>
                                    );
                                })
                            }
                        </Accordion>
                    </Tab>
                );
            }
            return null;
        }
        return null;
    }
    renderResponseInfoTab(response, RowViewer) {
        if (response.features[0].id.split('.')[0] === 'cens_muri') {
            return (
                <Tab eventKey={1} key="cens_muri" title="Segnalazione">
                    <RowViewer key="cens_muri" title={'Segnalazione'} exclude={["bbox"]} {...response.features[0].properties}/>
                </Tab>
            );
        }
        if (response.features[0].id.split('.')[0] === 'cens_muri_sop') {
            return (
                <Tab eventKey={2} key="cens_muri_sop" title="Segnalazione" >
                    <RowViewer key="cens_muri_sop" title={'Sopralluogo'} exclude={["bbox"]} {...response.features[0].properties}/>
                </Tab>
            );
        }
        return null;
    }
    render() {
        const RowViewer = (this.props.layer && this.props.layer.rowViewer) || this.props.rowViewer || PropertiesViewer;
        return (
            <Tabs id="geocollect-tab" bsStyle="tabs">
                {this.renderResponseInfoTab(this.props.response, RowViewer)}
                {this.renderWFSResponseTab(this.props.wfsResponse, RowViewer)}
                {this.renderSegnalazioniImgs()}
            </Tabs>
        );
    }
}

module.exports = GeocollectViewer;
