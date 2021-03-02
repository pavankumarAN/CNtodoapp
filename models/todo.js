const mongoose = require('mongoose');

// Todo basic schema for storing in database
const TODOSchema = new mongoose.Schema({
    description: {
        type:String,
        require:true
    },
    jobtype: {
        type:String,
        require:true
    },
    date: {
        type:String,
        require:true
    }
});

const TODO = mongoose.model('TODOS', TODOSchema);
module.exports = TODO;