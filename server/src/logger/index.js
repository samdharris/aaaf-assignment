const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    const myFormat = winston.format.printf(
        ({ level, message, label, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        }
    );
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                myFormat
            ),
        })
    );
}

module.exports = logger;
