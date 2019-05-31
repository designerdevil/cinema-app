var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cinema-experience',  { useNewUrlParser: true });

var db = mongoose.connection;

process.on('SIGINT', function () {
    db.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
    mongoose,
    db
}
