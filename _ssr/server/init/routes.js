import expressEndPointURL from '../../app/app-constants/express-endpoint-url';
// Controllers import
import TheatreController from '../controllers/theatreController';
import MovieController from '../controllers/movieController';
import SeatSelectionController from '../controllers/seatSelectionController';

export default app => {
    // app.use(AuthController);

    app.get(expressEndPointURL.THEATRE.url, TheatreController);
    app.get(expressEndPointURL.MOVIE_FILTER.url, MovieController);
    app.get(expressEndPointURL.MOVIE_SEAT_SELECT.url, SeatSelectionController);
};
