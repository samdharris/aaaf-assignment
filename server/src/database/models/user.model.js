const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const { accessibleRecordsPlugin } = require('@casl/mongoose');
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
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePic: {
            type: String,
            default: null,
        },
        team: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
        checkedOutDocuments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Document',
            },
        ],
    },
    { timestamps: true }
);

userSchema.post('find', (res, next) => {
    for (user of res) {
        user.password = undefined;
    }
    next();
});
userSchema.plugin(accessibleRecordsPlugin);
module.exports = mongoose.model('User', userSchema);
