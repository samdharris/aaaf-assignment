const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const server = express();

server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

server.listen(process.env.PORT, _ => {
    console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = server;
