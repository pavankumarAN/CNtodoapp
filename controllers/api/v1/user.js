const USER = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession = async (req, res) => {
    try {
        let user = await USER.findOne({ email: req.body.email });
        if (!user || user.password !== req.body.password) {
            return res.status(422).json({
                message: `Invalid user name or password`
            })
        }
        return res.status(200).json({
            message: `Signin successful`,
            data: {
                toker: jwt.sign(user.toJSON(), 'codeial', { expiresIn: 10000 })
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal error`
        });
    }
    return res.redirect('/');
};

