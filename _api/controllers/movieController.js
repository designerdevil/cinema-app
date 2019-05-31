const { Theatre, Movie, MovieDate, Event } = require('../db/model')
const { handleError, filterDates, stitchMovieWithDate } = require('../utils')

module.exports = {
	movieCreate: function (req, res, next) {
		//if creating movie - take movie id with associated theatre
		//movie id map with date
		//and add it to events
		const rb = req.body;
		const movie = {
			"movieName": rb.movieName,
			"movieActors": rb.movie_Actors,
			"movieGenre": rb.movie_Genre,
			"movieLanguage": rb.movie_Language,
			"moviePlot": rb.movie_Plot,
			"moviePoster": rb.movie_Poster,
			"movieRatings": rb.movie_Ratings ? JSON.parse(rb.movie_Ratings) : {}
		}
		Movie(movie).save(function (err, movie) {
			if (err) return handleError(err);
			res.json(movie)
		});
	},
	movieEdit: function (req, res, next) {
		//edit movie attributes(other than date) based on id
		//if date editting date based on movie id
		//fetch date id from events 
		//find date from date collection and edit it accordingly.
		const movie = {
			"_hallId": [],
			"_dateId": [],
			"_eventId": [],
			"_theatreId": []
		}
		// const id = req.params.id;
		Movie.findByIdAndUpdate('5c7d5ca344218bef731525a4', movie, { new: true }, function (err, model) {
			if (err) return handleError(err);
			res.send(model)
		});
	},
	movieDelete: function (req, res, next) {
		//get movie id
		//delete from movie & event
		const id = req.params.id;
		Movie.deleteOne({ _id: id }, function (err) {
			if (err) return handleError(err);
			res.send("DELETED!!!")
		});
	},
	seatSelect: function(req, res, next) {
		const {seats, theater, movie, date, time} = req.query;
		console.log({
			seats, theater, movie, date, time
		})
		MovieDate.find({
			'dates': { $elemMatch: { _id: date } }
		}, function (err, dates) {
			if (err) return handleError(err);
			const firstTiming = dates[0].dates[0].timing[0]
			res.send(firstTiming);
		});
	},
	movieFilter: function (req, res, next) {
		const id = req.params.id;
		const findIt = id ? { _id: id } : {};

		//fetch id from movie collection
		//fetch id of date and theatre & date
		//return data for theatre and date
		const query = req.query;
		const theatreId = query.theatre;
		const searchTerm = query.search;
		const searchdate = query.searchdate;
		const start = query.timeStart;
		const end = query.timeEnd;

		if (theatreId && !searchdate) {
			Movie.find({ 'theatres': { $in: theatreId } }, function (err, movie) {
				if (searchTerm) {
					res.send(movie.filter(data => ((data.movieName).toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)))
				} else {
					res.send(movie);
				}
			}).populate('dates');
		} else if (theatreId && searchdate) {
			MovieDate.find({
				'dates': { $elemMatch: { date: searchdate } }
			}, function (err, dates) {
				if (err) return handleError(err);
				if (start && end) {
					const dateParsed = filterDates(dates, start, end);
					const dateIds = dateParsed.map((v, i) => v._id);
					Movie.find({
						'theatres': { $in: theatreId },
						'dates': { $in: dateIds }
					}, function (err, movies) {
						if (err) return handleError(err);
						res.send(stitchMovieWithDate(dateParsed, movies))
					})
				} else {
					const dateIds = dates.map((v, i) => v.id);
					Movie.find({
						'theatres': { $in: theatreId },
						'dates': { $in: dateIds }
					}, function (err, docs) {
						if (err) return handleError(err);
						res.send(docs)
					})
				}
			});
		} else {
			const id = req.params.id;
			const findIt = id ? { _id: id } : {};
			Movie.find(findIt, function (err, movies) {
				if (err) return handleError(err);
				res.send(movies)
			})
		}
	}
};