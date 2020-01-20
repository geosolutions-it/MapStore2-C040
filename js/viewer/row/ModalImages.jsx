/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import Modal from '../../../MapStore2/web/client/components/misc/Modal';

class ModalImages extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        modalOptions: PropTypes.object.isRequired,
        showModal: PropTypes.bool.isRequired,
        onClickThumbnail: PropTypes.func.isRequired,
        imgSrc: PropTypes.string.isRequired,
        closeButtonText: PropTypes.object.isRequired
    };

    static defaultProps = {
        modalOptions: {}
    };

    render() {
        return (
            <div>
                <Modal
                    {...this.props.modalOptions}
                    id="geocollect-images-modal"
                    onHide={() => this.props.onClickThumbnail(false, "")}
                    show={this.props.showModal}
                    bsSize="large"
                    style={{overflowY: "auto"}}
                    container={document.getElementById("body")}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div style={{textAlign: "center"}}>
                            <a target="_blank" href={this.props.imgSrc}> <img src={this.props.imgSrc} style={{width: "90%"}}/></a>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsSize="small" style={{"float": "right"}} bsStyle="primary" onClick={() => this.props.onClickThumbnail(false, "")}>{this.props.closeButtonText}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default ModalImages;
