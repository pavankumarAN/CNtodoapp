const TODO = require('../models/todo');
// This function will list the all todos from database if exists
module.exports.home = (req, res) => {
    TODO.find({}, (err, TODOS) => {
        if (err) {
            console.log(`Not able to fetch TODOS - ${err}`);
        }
        res.cookie('user_id', 25);
        return res.render('home', {
            title: 'TODO APP',
            todosList: TODOS
        });
    });
};

// This function will create a todo as model
module.exports.createtodo = (req, res) => {
    TODO.create(req.body, (err, todo) => {
        if (err) {
            console.log(`Error in creating a todo - ${err}`);
            return;
        }
        console.log(` ***  -  ${todo}`);
        return res.redirect('/');
    });
};

// This function will delete a todo after clicking on delete icon
module.exports.deletetodo = (req, res) => {
    const id = req.query.id;

    TODO.findByIdAndDelete(id, (err) => {
        if(err) {
            console.log(`Not able to delete - ${err}`);
            return;
        }
        return res.redirect('/');
    })
};