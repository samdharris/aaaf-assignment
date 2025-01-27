const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        documents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Document',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
