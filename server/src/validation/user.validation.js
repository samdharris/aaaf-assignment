const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(6)
        .max(50)
        .regex(/^[a-zA-Z0-9 ]{0,50}$/)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    enabled: Joi.boolean().default(false),
});
