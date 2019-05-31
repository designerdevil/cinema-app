import React from 'react';
import { NavLink } from 'react-router-dom';
import appUrl from '../../app-constants/app-url';
import { Icon } from 'react-icons-kit';
import { calendar, film } from 'react-icons-kit/fa';

const Header = ({ labels, match }) => (
    <header className="header">
        <NavLink
            exact
            to={`${appUrl.SCREENING}/${match.params.id}`}
            className="header-movie"
        >
            <Icon icon={film} />
            <span className="title">{labels['header.tab.title']}</span>
        </NavLink>
        <NavLink to={appUrl.SCREENING_TIMINGS} className="header-timing">
            <Icon icon={calendar} />
            <span className="title">{labels['header.tab.screeTimes']}</span>
        </NavLink>
    </header>
);

export default Header;
