
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const theatreSchema = Schema({
    _tid: Schema.Types.ObjectId,
    theatreName: String,
    theatreAddress: String,
    location: {
        lat: String,
        long: String
    }
});

const movieSchema = Schema({
    _mid: Schema.Types.ObjectId,
    theatres: [{ type: Schema.Types.ObjectId, ref: 'Theatre' }],
    dates: [{ type: Schema.Types.ObjectId, ref: 'Date' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    movieName: String,
    movieActors: String,
    movieGenre: String,
    movieLanguage: String,
    moviePlot: String,
    moviePoster: String,
    movieRatings: Object
});

const hallSchema = Schema({
    _hid: Schema.Types.ObjectId,
    _theatreId: { type: Schema.Types.ObjectId, ref: 'Theatre' },
    hall: String
});

const reviewSchema = Schema({
    _rid: Schema.Types.ObjectId,
    _movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
    review: [{
        review: String,
        stars: Number
    }]
});

const dateSchema = Schema({
    _did: Schema.Types.ObjectId,
    _movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
    dates: [
        {
            date: String,
            timing: [
                {
                    time: Number,
                    seats_available: String,
                    total_seats: String
                }
            ]
        }
    ]
});

const eventSchema = Schema({
    _eid: Schema.Types.ObjectId,
    theatres: { type: Schema.Types.ObjectId, ref: 'Theatre' },
    movies: { type: Schema.Types.ObjectId, ref: 'Movie' },
    dates: { type: Schema.Types.ObjectId, ref: 'Date' },
    halls: { type: Schema.Types.ObjectId, ref: 'Hall' }
}); 

const Theatre = mongoose.model('Theatre', theatreSchema, 'theatres');
const Movie = mongoose.model('Movie', movieSchema, 'movies');
const MovieDate = mongoose.model('Date', dateSchema, 'dates');
const Review = mongoose.model('Review', reviewSchema, 'reviews');
const Event = mongoose.model('Event', eventSchema, 'events');
const Hall = mongoose.model('Hall', hallSchema, 'halls');


module.exports = {
    Theatre,
    Movie,
    MovieDate,
    Review,
    Event,
    Hall
};



/*
SEAT

"A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9",
"B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9",
"C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9",
"D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9",
"E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9",
"F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9",
"G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9",
"H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9",
"I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9",
"J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9"

*/