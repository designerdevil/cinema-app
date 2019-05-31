import React from 'react';
import Theater from '../../components/theater/Theater';
import commonUtil from '../../utils/commonUtil';

const generatetheaters = props => {
    const { theaters } = props;
    return (
        theaters &&
        theaters.map(theater => <Theater theater={theater} key={theater._id} />)
    );
};

const TheaterContainer = props => (
    <div className="theater-container container">
        <h1>Choose Theaters</h1>
        {generatetheaters(props)}
    </div>
);

export default TheaterContainer;
