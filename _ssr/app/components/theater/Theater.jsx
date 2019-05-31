import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import appUrl from '../../app-constants/app-url';

const Theater = ({ theater }) => {
    const { theatreName, theatreAddress, _id } = theater;

    return (
        <div className="theater">
            <div className="name">
                <Link to={`${appUrl.SCREENING}/${_id}`}>{theatreName}</Link>
            </div>
            <div className="address">{theatreAddress}</div>
        </div>
    );
};

Theater.propTypes = {
    theater: PropTypes.object
};

export default Theater;
