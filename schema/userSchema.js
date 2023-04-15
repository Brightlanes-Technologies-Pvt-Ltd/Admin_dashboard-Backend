const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            required: true,
            default: 'admin',
        },
        profileImage: {
            type: String
        }
    },
    {
        timeStamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
