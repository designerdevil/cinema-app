import React from 'react';
import appConstants from '../../app-constants/app-constants';
import { Icon } from 'react-icons-kit';
import { times } from 'react-icons-kit/fa/times';
import { Link } from 'react-router-dom';
import appUrl from '../../app-constants/app-url';

const triggerSeatSelection = e => {
    const element = e.currentTarget;
    const classList = element.classList;
    if (classList.contains('available')) {
        if (classList.contains('selected')) classList.remove('selected');
        else classList.add('selected');
    }
    document.getElementById('seat-selected').innerHTML = document.querySelectorAll('.selected').length;
};

const generateSeats = (total, available) => {
    if (total.length < 1) return null;
    const totalSeats = total.split(',');
    const configuredRows = appConstants.seatRows.map(row => {
        const rowMarkup = totalSeats
            .filter(seat => seat.indexOf(row) != -1)
            .map((seat, index) => {
                const availabilityClass =
                    available.indexOf(seat) != -1 ? 'available' : 'unavailable';
                return (
                    <div
                        className={`seat ${availabilityClass}`}
                        key={`${row}-${seat}`}
                        data-id={seat}
                        onClick={triggerSeatSelection}
                    >
                        <span>{seat}</span>
                    </div>
                );
            });
        return rowMarkup.length > 0 ? (
            <div className="seat-row" key={`${row}`}>
                {rowMarkup}
            </div>
        ) : null;
    });

    return configuredRows;
};

const setTime = time => {
    if (time < 12) {
        return `${time.toFixed(2)} A.M.`;
    }
    return `${time.toFixed(2) - 12} P.M.`;
};

const MovieContainer = ({
    theater,
    movie,
    date,
    timeObj,
    selectSeats,
    dateId
}) => (
    <div className="movie-details container">
        <Link
            className="back-to-screening"
            to={`${appUrl.SCREENING}/${theater._id}`}
        >
            <Icon icon={times} />
        </Link>
        <div className="movie-name">{movie.movieName}</div>
        <div className="timing">
            {setTime(timeObj.time)}
            <div className="seats-info">
                <span id="seat-selected">0</span> Selected
            </div>
        </div>
        <div className="seat-map">
            {generateSeats(timeObj.total_seats, timeObj.seats_available)}
        </div>
        <button
            onClick={e => {
                const elements = document.querySelectorAll('.selected');
                const seatsSelected = [];
                elements.forEach(el => {
                    seatsSelected.push(el.getAttribute('data-id'));
                });
                selectSeats(
                    seatsSelected,
                    movie._id,
                    theater._id,
                    dateId,
                    timeObj._id
                );
            }}
        >
            Checkout
        </button>
    </div>
);

export default MovieContainer;
