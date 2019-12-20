const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string()
        .min(6)
        .max(50)
        .regex(/^[a-zA-Z0-9 ]{0,50}$/)
        .required(),
});

module.exports = schema;
