const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./routes');
const database = require('./database');
const cors = require('cors');
const logger = require('./logger');
const fileUpload = require('express-fileupload');
dotenv.config();

const server = express();

server.start = async () => {
    try {
        await database.connect();

        server.use(
            fileUpload({
                safeFileNames: true,
                preserveExtension: true,
                debug: process.env.NODE_ENV !== 'production',
                createParentPath: true,
            })
        );
        server.use(cors());
        server.use(bodyParser.json());
        server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        server.use(router);

        server.listen(process.env.PORT, _ => {
            logger.info(`Server running on port: ${process.env.PORT}`);
        });
    } catch (e) {
        console.error(`Failed to boot: ${e.message}`);
    }
};

module.exports = server;
