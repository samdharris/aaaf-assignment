const mongoose = require('mongoose');
const DocumentVersion = require('./documentVersion.model');
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
        team: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
        versions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'DocumentVersion',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
