const faker = require('faker');
const User = require('../models/user.model');
const securityUtil = require('../../securityUtils');

exports.seed = async function seed(options = {}) {
    const name = faker.name.findName();
    const email = `${name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/gi, '')
        .split(' ')
        .join('')}@tms.com`;
    const password = await securityUtil.hashPassword(
        process.env.DUMMY_PASSWORD
    );

    const details = {
        name,
        email,
        password,
        profilePic: faker.image.avatar(),
        enabled: true,
        ...options,
    };

    const user = new User(details);
    return new Promise(async (resolve, reject) => {
        try {
            await user.save();
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

exports.seedAdmin = async function seedAdmin() {
    const adminUser = new User({
        name: 'TMS Admin',
        email: 'admin@tms.com',
        password: await securityUtil.hashPassword(process.env.ADMIN_PASSWORD),
        isAdmin: true,
        enabled: true,
    });

    await adminUser.save();
};
