const USER = require('../models/user');

module.exports.profile = (req, res) => {
    console.log(req.cookies);
    // if (req.cookies.user_id) {
    //     USER.findById(req.cookies.user_id, (err, user) => {
    //         if(err) {
    //             console.log(`Error in fetching authenticated user - ${err}`);
    //             return;
    //         }
    //         if (user) {
    //             return res.render('userprofile', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         } else {
    //             return res.redirect('/users/signin');
    //         }
    //     });
    // } else {
    //     return res.redirect('/users/signin');
    // }
    return res.render('userprofile', {
        title: "User Profile",
        // user: user
    })
}

module.exports.signup = (req, res) => {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title: 'Sign-Up'
    });
};

module.exports.signin = (req, res) => {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signin', {
        title: 'Sign-In'
    });
};

module.exports.create = (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    USER.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(`User is not yet created - ${err}`);
            return;
        }
        if (!user) {
            console.log(req.body);
            USER.create(req.body, (err, user) => {
                if (err) {
                    console.log(`Error in creating user ${err}`);
                    return;
                }
                if(req.file) {
                    user.avatar = USER.avatarPath +"/"+req.file.filename;
                }
                return res.redirect('/users/signin');
            });
        } else {
            return res.redirect('back');
        }
    });
};

module.exports.createSession = (req, res) => {
    return res.redirect('/');
};

module.exports.destroySession = (req, res) => {
    req.logout();

    return res.redirect('/users/signin');
}