import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../../pages/Page';
import imageConfig from '../../../server/config/image-config.json';

class ErrorPage extends Component {
    constructor(props) {
        super(props);
    }
    getMetaData() {
        return {
            title: this.pageTitle(),
            meta: this.pageMeta(),
            link: this.pageLink()
        };
    }

    pageTitle = () => 'Error Page';

    pageMeta = () => [
        {
            name: 'description',
            content: 'Theater'
        }
    ];

    pageLink = () => [];

    render() {
        let currentPageURL = '/';
        if (typeof window !== 'undefined') {
            currentPageURL = window.location.href;
        }
        const { errorType } = this.props;
        return (
            <Page {...this.getMetaData()}>
                <div className="error-page">
                    Oops! <br /> Error Page
                </div>
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    labels_component:
        state.cms &&
        state.cms.cmsCommonData &&
        state.cms.cmsCommonData.error_labels_component
});
export default connect(mapStateToProps)(ErrorPage);
