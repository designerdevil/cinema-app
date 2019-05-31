import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../Page';
import MovieContainer from '../../containers/movie-details/MovieContainer';
import { selectSeats } from '../../actions/movieAction';
import { title, meta, link } from '../assets';

class Movie extends Component {
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
                <MovieContainer {...this.props} />
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    theater: state.theaters[0],
    movie: state.movies[0],
    date: state.movies[0].dates[0].dates[0].date,
    dateId: state.movies[0].dates[0].dates[0]._id,
    timeObj: state.movies[0].dates[0].dates[0].timing[0],
    labels: state.app.labels
});

const matchDispatchToProps = dispatch =>
    bindActionCreators({ selectSeats }, dispatch);

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Movie);
