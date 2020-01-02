const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashPassword = async openPass => {
    const salt = await genSalt();
    const password = await bcrypt.hash(openPass, salt);
    return password;
};

exports.hashesAreSame = async (clear, hash) =>
    await bcrypt.compare(clear, hash);

exports.generateToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '60m',
    });
};

exports.validateToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, {
        maxAge: '60m',
    });
};

const genSalt = async () => await bcrypt.genSalt(10);
