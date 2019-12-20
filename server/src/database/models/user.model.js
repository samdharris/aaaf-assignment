const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.post('save', (user, next) => {
    user.password = undefined;
    next();
});

userSchema.post('find', (res, next) => {
    for (user of res) {
        user.password = undefined;
    }
    next();
});

userSchema.post('findOne', (user, next) => {
    if (!_.isNil(user)) {
        user.password = undefined;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
