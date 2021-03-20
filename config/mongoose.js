const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp', { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true});
const db = mongoose.connection;

// If any error is occured
db.on('error', (err) => {
    console.log(`Unable to connect to database - ${err}`);
});

// After checking error and no occurance of any err,  connecting successfully.
db.once('open', () => {
    console.log(`Connected Successfully`);
});

module.exports = db;