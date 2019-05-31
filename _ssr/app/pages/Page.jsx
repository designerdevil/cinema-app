import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

const Page = ({
    title, link, meta, labels, children
}) => (
    <IntlProvider locale="en" messages={labels}>
        <div className="page-container">
            <Helmet title={title} link={link} meta={meta} />
            {children}
        </div>
    </IntlProvider>
);

Page.propTypes = {
    title: PropTypes.string,
    link: PropTypes.array,
    meta: PropTypes.array
};

export default Page;
