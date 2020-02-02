const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const documentVersionSchema = new Schema(
    {
        document: {
            type: Schema.Types.ObjectId,
            ref: 'Document',
        },
        size: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        checkedOutBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('DocumentVersion', documentVersionSchema);
