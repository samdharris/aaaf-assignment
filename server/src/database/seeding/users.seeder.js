const faker = require('faker');
const User = require('../models/user.model');
const securityUtil = require('../../securityUtils');

exports.seed = async function seed() {
    const name = faker.name.findName();
    const email = `${name.toLowerCase().replace(' ', '.')}@tms.com`;
    const password = await securityUtil.hashPassword(
        process.env.DUMMY_PASSWORD
    );

    const user = new User({
        name,
        email,
        password,
        profilePic: faker.image.avatar(),
        enabled: true,
    });

    await user.save();
    console.log(`UserSeeder: ${name} seeded!`);
    return Promise.resolve(user);
};