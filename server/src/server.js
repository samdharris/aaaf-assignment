const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const server = express();

server.listen(process.env.PORT, _ => {
    console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = server;
