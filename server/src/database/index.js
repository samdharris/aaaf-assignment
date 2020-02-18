const mongoose = require('mongoose');
const logger = require('../logger');

exports.connect = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    logger.info('Connected to mongo!');
};
