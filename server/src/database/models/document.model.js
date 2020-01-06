const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        teamId: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
        size: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        checkedOutBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
