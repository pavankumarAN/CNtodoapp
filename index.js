const express = require('express');
const PORT = 8080;
const path = require('path');
const db = require('./config/mongoose');
const TODO = require('./models/todo');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Application is not able to launch - ${err}`);
        return;
    }
    console.log(`Todo application is runnig on ${PORT}`);
});