/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const React = require('react');
const PropTypes = require('prop-types');
const {Panel, Thumbnail} = require('react-bootstrap');
const {isObject} = require('lodash');
const moment = require('moment');

const ModalImages = require('./ModalImages').default;
const Message = require('../../../MapStore2/web/client/components/I18N/Message');

const defaultThumb = require('./img/default.jpg');

require("./RecordItem.css");

class RecordItem extends React.Component {
    static propTypes = {
        currentLocale: PropTypes.string,
        record: PropTypes.object,
        style: PropTypes.object
    };

    static defaultProps = {
        currentLocale: 'en-US'
    };

    constructor(props) {
        super(props);
        this.onClickThumbnail = this.onClickThumbnail.bind(this);
        this.state = {
            showModal: false,
            imgSrc: "",
            modalOptions: {}
        };
    }

    UNSAFE_componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    onClickThumbnail(showModal, thumbSrc) {
        this.setState({
            modalOptions: {},
            showModal: showModal,
            imgSrc: thumbSrc
        });
    }

    getTitle(title) {
        return isObject(title) ? title[this.props.currentLocale] || title.default : title || '';
    }

    renderThumb(thumbURL, record) {
        let thumbSrc = 'http://geocollect.geo-solutions.it/opensdi2-manager/mvc/fileManager/extJSbrowser?action=get_image&file=' + thumbURL || defaultThumb;
        return (
            <Thumbnail id="geocollect-thumb" className="gridcard thumb">
                <a onClick={() => this.onClickThumbnail(true, thumbSrc)}>
                    <ModalImages
                        title={record && this.getTitle(record.name)}
                        modalOptions={this.state.modalOptions}
                        showModal={this.state.showModal}
                        onClickThumbnail={this.onClickThumbnail}
                        imgSrc={this.state.imgSrc}
                        closeButtonText={<Message msgId={"geocollectViewer.images.modal.closeButtonText"}/>}/>
                    <img className="img-fluid" src={thumbSrc} alt={record && this.getTitle(record.name)}/>
                </a>
            </Thumbnail>
        );

    }

    renderDescription(record) {
        return moment(record.mtime).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }

    render() {
        let record = this.props.record;
        return (
            <Panel className="record-item" style={this.props.style}>
                {this.renderThumb(record && record.web_path, record)}
                <div>
                    <h4 className="truncateText"><strong><Message msgId={"geocollectViewer.images.label"}/>:</strong> {record && this.getTitle(record.name)}</h4>
                    <h4 className="truncateText"><strong><Message msgId={"geocollectViewer.images.size"}/>:</strong> {record && record.size / 1000} Kb</h4>
                    <h4 className="truncateText"><strong><Message msgId={"geocollectViewer.images.lastModified"}/>:</strong> {this.renderDescription(record)}</h4>
                </div>
            </Panel>
        );
    }

    UNSAFE_componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

}

module.exports = RecordItem;
