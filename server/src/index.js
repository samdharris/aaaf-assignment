const server = require('./server');
const database = require('./database');
const logger = require('./logger');
const dotenv = require('dotenv');
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const securityUtils = require('./securityUtils');

const User = require('./database/models/user.model');
io.use(async (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            const decoded = securityUtils.validateToken(
                socket.handshake.query.token
            );
            const user = await User.findById(decoded.id);
            socket.user = user;
            next();
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error('Auth error');
    }
}).on('connection', socket => {
    console.log('connected');
    const roomId = `team-${socket.user.team}`;
    socket.join(roomId, () => {
        console.log(`connected to room ${roomId}`);
        io.to(roomId).emit('user-connected', `${socket.user.name} has joined!`);

        socket.on('disconnect', () => {
            console.log('disconnect!');
            io.to(roomId).emit(
                'user-disconnected',
                `${socket.user.name} has left!`
            );
        });
        socket.on('send-message', data => {
            console.log(`message sent! Relaying`);
            io.to(roomId).emit('message-sent', data);
        });
    });
});
dotenv.config();

database.connect().then(() => {
    http.listen(process.env.PORT, _ => {
        logger.info(`Server running on port: ${process.env.PORT}`);
    });
});
