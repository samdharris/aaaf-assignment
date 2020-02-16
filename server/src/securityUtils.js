const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Generates a hashed password
 *
 * @param {string} openPass
 * @returns string
 */
exports.hashPassword = async openPass => {
    const salt = await genSalt();
    const password = await bcrypt.hash(openPass, salt);
    return password;
};

/**
 * Checks hashes match
 *
 * @param {string} clear
 * @param {string} hash
 * @returns Promise<bool>
 */
exports.hashesAreSame = async (clear, hash) =>
    await bcrypt.compare(clear, hash);

/**
 * Generates a JWT token
 *
 * @param {object} payload
 * @returns string
 */
exports.generateToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '60m',
    });
};

/**
 * Verfies the given JWT token
 *
 * @param {string} token
 * @returns object
 */
exports.validateToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, {
        maxAge: '60m',
    });
};

/**
 * Generates a salt for the hash
 *
 * @returns Promise<string>
 */
const genSalt = async () => await bcrypt.genSalt(10);
