const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./routes');
const database = require('./database');

dotenv.config();

const server = express();

server.start = async () => {
    try {
        await database.connect();
        server.use(bodyParser.json());
        server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        server.use(router);

        server.listen(process.env.PORT, _ => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.error(`Failed to boot: ${e.message}`);
    }
};

module.exports = server;
