import React from 'react';
import Theater from './pages/theater/Theater';
import Screening from './pages/screening/Screening';
import Movie from './pages/movie/Movie';
import ErrorPage from './pages/error-page/ErrorPage';
import { getTheaters } from './actions/theaterAction';
import { getMovies, getMovieDetail } from './actions/movieAction';
import appUrl from './app-constants/app-url';

export default [
    {
        path: '/',
        exact: true,
        component: Theater,
        need: [getTheaters]
    },
    {
        path: appUrl.HOME,
        exact: true,
        component: Theater,
        need: [getTheaters]
    },
    {
        path: `${appUrl.SCREENING}/:id`,
        exact: true,
        component: Screening,
        need: [getMovies]
    },
    {
        path: `${appUrl.MOVIE_DETAILS}/:theater/:movie`,
        exact: true,
        component: Movie,
        need: [getMovieDetail]
    },
    {
        path: `${appUrl.SCREENING_TIMINGS}`,
        exact: true,
        component: Screening,
        need: []
    },
    {
        path: '*',
        component: ErrorPage,
        exact: true
    }
];
