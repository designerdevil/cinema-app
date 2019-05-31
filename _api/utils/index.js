module.exports = {
    handleError: function (err) {
        console.log(err);
        res.send("ERROR HAPPENED");
    },
    filterDates: function (dates, start, end) {
        return dates.map((v, i) => {
            let filteredDate = {}
            v.dates.map((fdateObj, i) => {
                return fdateObj.timing.filter(dateObj => {
                    const time = dateObj.time;
                    if (time > start && time < end) {
                        filteredDate.date = dateObj
                        filteredDate._id = v._id
                        return true;
                    }
                    return false;
                })
            })
            return filteredDate
        }).filter(value => Object.keys(value).length !== 0)
    },
    stitchMovieWithDate: function (dates, movies) {
        const moviesParse = dates.map((date)=>{
            const dateId = date._id;
            return movies.map((v, i) => {
                if(v.dates.indexOf(dateId) != -1){
                    return {
                        "_id" : v._id,
                        "movieName" : v.movieName,
                        "movieActors" : v.movieActors,
                        "movieGenre" : v.movieGenre,
                        "movieLanguage" : v.movieLanguage,
                        "moviePlot" : v.moviePlot,
                        "moviePoster" : v.moviePoster,
                        "movieRatings" : v.movieRatings,
                        "dates": date
                    }
                } else {
                    return {}
                }
            }).filter(value => Object.keys(value).length !== 0)[0]
        })
        return moviesParse;
    }
};