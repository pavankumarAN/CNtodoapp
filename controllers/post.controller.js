const POSTCOMMENT = require('../models/post');
module.exports.createpost = (req,res) => {
    POSTCOMMENT.create({
        content:req.body.content,
        user:req.user._id
    }, (err, post) => {
        if(err) {
            console.log(`Not able to post - ${err}`);
        }
        return res.redirect('back');
    });
}