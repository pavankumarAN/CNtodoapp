const POST = require('../models/post');
module.exports.comment = (req,res) => {
    POST.find({user:req.user.id}, (err, commentList) => {
        if(err) {
            console.log(`Not able to fetch comments - ${err}`);
        }
        // console.log(commentList);
            return res.render('post', {
                heading:'Post Comments',
                commentList : commentList
            });
    });
}

module.exports.createpost = (req, res) => {
    POST.create({
        content:req.body.content,
        user:req.user.id
    }, (err, post) => {
        if(err) {
            console.log(`Not able to post - ${err}`);
        }
        return res.redirect('back');
    });
}