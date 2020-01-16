const User = require('../models/user.model');
const securityUtils = require('../../securityUtils');
exports.findById = async id => await User.findById(id);

exports.findByEmail = async email => await User.findOne({ email });

exports.all = async () => await User.find();

exports.delete = async id => await User.findByIdAndDelete(id).exec();

exports.create = async data => {
    const user = new User({ ...data });
    await user.save();
};

exports.update = async (id, data) => {
    const user = await this.findById(id);

    Object.keys(data).forEach(k => {
        // We deal with this below.
        if (k !== 'password') {
            return (user[k] = data[k]);
        }
    });

    // If it's empty, it means they don't want to update the user's password.
    if (!_.isEmpty(data.password)) {
        user.password = await securityUtils.hashPassword(data.password);
    }

    await user.save();

    return await this.findById(id);
};
