const { Theatre, Movie, MovieDate, Event, Hall } = require('../db/model')
const { handleError } = require('../utils')

module.exports = {
	theatreCreate: function (req, res, next) {
		//no need to add event while creating theatre
		const rb = req.body;
		const theatre = {
			"theatreName": rb.theatreName,
			"theatreAddress": rb.theatreAddress,
			"location": {
				"lat": rb.latitude || "",
				"long": rb.longitude || ""
			}
		}
		Theatre(theatre).save(function (err, theatres) {
			if (err) return handleError(err);
			res.json(theatres)
		});
	},
	hallCreate: function (req, res, next) {
		//no need to add event while creating theatre
		const rb = req.body;
		const hall = {
			"_theatreId": rb._theatreId,
			"hall": rb.movie_hall
		}
		Hall(hall).save(function (err, hallEl) {
			if (err) return handleError(err);
			res.json(hallEl)
		});
	},
	theatreEdit: function (req, res, next) {
		//edit theatre based on id
		const rb = req.body;
		const theatre = {
			"theatreName": rb.theatreName,	
			"theatreAddress": rb.theatreAddress,
			"location": {
				"lat": rb.latitude || "",
				"long": rb.longitude || ""
			}
		}
		const id = req.params.id;
		Theatre.findByIdAndUpdate(id, theatre, {new: true}, function(err, model){
			if (err) return handleError(err);
			res.send(model)
		});
	},
	theatreDelete: function (req, res, next) {
		//delete filter from id
		const id = req.params.id;
		Theatre.deleteOne({ _id: id }, function (err) {
			if (err) return handleError(err);
			res.send("DELETED!!!")
		});
	},
	hallDelete: function (req, res, next) {
		//delete filter from id
		const id = req.params.id;
		Hall.deleteOne({ _id: id }, function (err) {
			if (err) return handleError(err);
			res.send("DELETED!!!")
		});
	},
	theatreFilter: function (req, res, next) {
		//find filter with id from filter collection
		const id = req.params.id;
		const findIt = id ? {_id: id} : {};
		Theatre.find(findIt, function (err, theatres) {
			if (err) return handleError(err);
			res.send(theatres)
		})
	},
	hallFilter: function (req, res, next) {
		//find filter with id from filter collection
		const id = req.params.id;
		const findIt = id ? {_theatreId: id} : {};
		Hall.find(findIt, function (err, halls) {
			if (err) return handleError(err);
			res.send(halls)
		})
	}
};