const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const server = express();

server.use(
    fileUpload({
        safeFileNames: true,
        preserveExtension: true,
        debug: process.env.NODE_ENV === 'debug',
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

module.exports = server;
