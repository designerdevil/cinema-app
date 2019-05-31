import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../Page';
import TheaterContainer from '../../containers/theater/TheaterContainer';
import { title, meta, link } from '../assets';

class Theatre extends Component {
    constructor(props) {
        super(props);
    }
    getMetaData() {
        return {
            title,
            meta,
            link,
            labels: this.props.labels
        };
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                <TheaterContainer {...this.props} />
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    theaters: state.theaters,
    labels: state.app.labels
});

export default connect(mapStateToProps)(Theatre);
