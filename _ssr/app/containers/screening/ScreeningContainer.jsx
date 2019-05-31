import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import appUrl from '../../app-constants/app-url';
import Search from '../../components/common/Search';
import { FormattedMessage } from 'react-intl';

const Screen = ({ movie, theaterSelected }) => {
    const { moviePoster, movieName, _id } = movie;

    return (
        <div className="item col-6">
            <div className="poster">
                <Link to={`${appUrl.MOVIE_DETAILS}/${theaterSelected}/${_id}`}>
                    <img
                        className="img-responsive"
                        src={moviePoster}
                        alt={movieName}
                    />
                </Link>
            </div>
            <div className="desc">
                <div className="name">{movieName}</div>
            </div>
        </div>
    );
};

const ScreeningContainer = ({
    movies, labels, onChange, theaterSelected
}) => {
    const moviesCount = movies.length;
    const moviesList =
        moviesCount &&
        movies.map(movie => (
            <Screen
                movie={movie}
                theaterSelected={theaterSelected}
                key={movie._id}
            />
        ));

    return (
        <div className="result-container container">
            <Search labels={labels} onChange={onChange} />
            <div className="search-result">
                <FormattedMessage
                    id="search.screens"
                    values={{ screens: movies.length }}
                />
            </div>
            {moviesCount > 0 && (
                <div className="list-container row">{moviesList}</div>
            )}
        </div>
    );
};

ScreeningContainer.propTypes = {
    movies: PropTypes.array
};

export default ScreeningContainer;
