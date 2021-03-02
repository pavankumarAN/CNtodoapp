const TODO = require('../models/todo');
module.exports.home = (req, res) => {
    TODO.find({}, (err, TODOS) => {
        if (err) {
            console.log(`Not able to fetch TODOS - ${err}`);
        }
        return res.render('home', {
            title: 'TODO APP',
            todosList: TODOS
        });
    });
};

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