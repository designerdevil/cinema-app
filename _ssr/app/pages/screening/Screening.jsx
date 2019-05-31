import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../Page';
import commonUtil from '../../utils/commonUtil';
import Header from '../../components/common/Header';
import { searchMovies } from '../../actions/movieAction';
import ScreeningContainer from '../../containers/screening/ScreeningContainer';
import { title, meta, link } from '../assets';

class Screening extends Component {
    constructor(props) {
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onSearchChange(e) {
        const value = e.target.value;
        this.props.searchMovies(this.props.theaterSelected, value);
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
                <Header {...this.props} />
                <ScreeningContainer
                    {...this.props}
                    onChange={this.onSearchChange}
                />
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    theaterSelected: state.theaters[0]._id,
    movies: state.movies,
    labels: state.app.labels
});
const matchDispatchToProps = dispatch =>
    bindActionCreators({ searchMovies }, dispatch);

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Screening);
