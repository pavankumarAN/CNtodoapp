const POST = require('../../../models/post');
module.exports.index = async (req, res) => {
    try {
        let posts = await POST.find({});
        return res.status(200).json({
            posts
        })
    } catch (err) {
        console.log(`Not able to fetch posts - ${err}`);
        return;
    }
}