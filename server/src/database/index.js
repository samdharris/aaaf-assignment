const mongoose = require('mongoose');
const logger = require('../logger');

exports.connect = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-gui1q.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    logger.info('Connected to mongo!');
};
