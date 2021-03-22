const COMMENT = require('../models/comment');
const POST = require('../models/post');

module.exports.create = (req, res) => {
    POST.findById(req.body.post, (err, post) => {
        if (err) {
            console.log(`No post is present inside db - ${err}`);
            return;
        }
        if (post) {
            COMMENT.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err, comment) => {
                if (err) {
                    console.log(`Not able to post comment - ${err}`);
                    return;
                }
                if (comment) {
                    post.comments.push(comment);
                    post.save();
                    return res.redirect('back');
                }
            });
        }
    });
};