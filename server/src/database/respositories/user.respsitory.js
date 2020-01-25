const User = require('../models/user.model');
const securityUtils = require('../../securityUtils');
const _ = require('lodash');

exports.findById = async (id, options) => {
    let query = User.findById(id);
    if (!_.isNil(options)) {
        Object.keys(options).forEach(k => {
            if (typeof query[k] != 'undefined') {
                query[k](options[k]);
            }
        });
    }
    return await query;
};

exports.findByEmail = async email => await User.findOne({ email });

exports.all = async () => await User.find();

exports.delete = async id => await User.findByIdAndDelete(id).exec();

exports.create = async data => {
    const user = new User({ ...data });
    await user.save();

    return await this.findByEmail(data.email);
};

exports.enableUser = async id => await this.update(id, { enabled: true });

exports.disableUser = async id => await this.update(id, { enabled: false });

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

exports.checkoutDocument = async (id, document) => {
    const user = await this.findById(id);
    user.checkedOutDocuments.push(document);
    await user.save();
};

exports.checkinDocument = async (id, document) => {
    const user = await this.findById(id);
    user.checkedOutDocuments = user.checkedOutDocuments.filter(
        d => d._id !== document._id
    );
    await user.save();
};
