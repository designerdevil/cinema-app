const { Theatre, Movie, MovieDate, Event } = require('../db/model')

module.exports = {
	eventCreate: function (req, res, next) {
		var rb = req.body;
		var dates = {
			"dates": rb.dates
		}
		MovieDate(dates).save(function (err, date) {
			if (err) return handleError(err);
			var event = {
				theatres: rb._theatreId,
				movies: rb._movieId,
				dates: date._id,
				halls: rb._hallId
			}
			Event(event).save(function (err, evt) {
				if (err) return handleError(err);
				Movie.findByIdAndUpdate(rb._movieId, {
					$push: { theatres: rb._theatreId, dates: date._id, events: evt._id }
				}, { new: true }, function (err, movie) {
					if (err) return handleError(err);
					res.json({
						"dates": date,
						"event": evt
					})
				});
			});
		});
	},
	eventEdit: function (req, res, next) {
		res.send("eventEdit")
	},
	eventDelete: function (req, res, next) {
		// const id = req.params.id;
		// Event.deleteOne({ _id: id }, function (err) {
		// 	if (err) return handleError(err);
		// 	res.send("DELETED!!!")
		// });
		Event.deleteMany({}, function (err) {
			if (err) return handleError(err);
			MovieDate.deleteMany({}, function (err) {
				if (err) return handleError(err);
				Movie.deleteMany({}, function (err) {
					if (err) return handleError(err);
					res.send("OK")
				});
			});
		});
	},
	eventPopulatedFilter: function(req,res,next) {
		// User.findOne({ username: username })
    	// .populate('posts').exec((err, posts) => {
		// 	console.log("Populated User " + posts);
		// })
		Event.
			findOne({ _id: '5c82326f9fd3657048bff57c' })
			.populate('movies')
			.exec((err, posts) => {
				res.send(posts);
			})
	},
	eventFilter: function (req, res, next) {
		const findIt = req.params.id ? { _id: id } : {};
		Event.find(findIt, function (err, events) {
			if (err) return handleError(err);
			MovieDate.find(findIt, function (err, dates) {
				if (err) return handleError(err);
				res.send({events, dates})
			})
		})
		
	},
	dateFilter: function (req, res, next) {
		const findIt = req.params.id ? { _id: id } : {};
		MovieDate.find({}, function (err, dates) {
			if (err) return handleError(err);
			res.send(dates)
		})
	}
};