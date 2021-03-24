const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imagePath = path.join('/uploads/user/images');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    }
},
    {
        timestamps: true
    });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imagePath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

UserSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
UserSchema.statics.avatarPath = imagePath;

const User = mongoose.model('User', UserSchema);

module.exports = User;