const server = require('./server');
const database = require('./database');
const logger = require('./logger');
const dotenv = require('dotenv');
dotenv.config();
database.connect().then(() => {
    server.listen(process.env.PORT, _ => {
        logger.info(`Server running on port: ${process.env.PORT}`);
    });
});
