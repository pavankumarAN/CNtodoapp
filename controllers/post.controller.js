const POST = require('../models/post');
const COMMENT = require('../models/comment');

module.exports.allposts = (req, res) => {
    POST.find({ user: req.user.id }, (err, allpostsList) => {
        if (err) {
            console.log(`Not able to fetch comments - ${err}`);
        }
        // console.log(commentList);
        return res.render('post', {
            heading: 'Posts',
            allpostsList: allpostsList
        });
    });
}

module.exports.createpost = (req, res) => {
    POST.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post) => {
        if (err) {
            console.log(`Not able to post - ${err}`);
        }
        return res.redirect('back');
    });
}

module.exports.destroyPost = (req, res) => {
    console.log(req.user)
    POST.findById(req.query.id, (err, post) => {
        console.log(post);
        if (post.user == req.user.id) {
            COMMENT.deleteMany({ post: req.query.id }, (err) => {
                if (err && err!==null) {
                    console.log(`Not able to delete comments - ${err}`);
                    return;
                }
                post.remove();
                return res.redirect('/post/allposts');
            });
        } else {
            console.log(`User is not authorized to delete the post  - ${err}`);
            return res.redirect('/post/allposts');
        }
    });


    // POST.findById(req.params.id, function(err, post){
    //     // .id means converting the object id into string
    //     if (post.user == req.user.id){
    //         post.remove();

    //         COMMENT.deleteMany({post: req.params.id}, function(err){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }

    // });
};