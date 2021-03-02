const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Unable to connect to database - ${err}`);
});

db.once('open', () => {
    console.log(`Connected Successfully`);
});