const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 8080;
const path = require('path');
const db = require('./config/mongoose');
const TODO = require('./models/todo');

const app = express();

//passport 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
// Here I have used bootstrap for better look
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use(cookieParser());




//Session
app.use(session({
    name: 'rouse',
    secret: 'imagesharing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, (err) => console.log(err || `Connect-mongo set up is okay.`))
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// This is master route
app.use('/', require('./routes'));

// Launching application
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Application is not able to launch - ${err}`);
        return;
    }
    console.log(`Todo application is runnig on ${PORT}`);
});