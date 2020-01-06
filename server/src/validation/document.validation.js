const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().required(),
    size: Joi.number().required(),
    mimetype: Joi.string()
        .allow(
            'application/pdf',
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'text/plain',
            'image/gif',
            'video/mp4',

            // MS Office - https://stackoverflow.com/questions/4212861/what-is-a-correct-mime-type-for-docx-pptx-etc
            'application/msword',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'application/vnd.ms-word.document.macroEnabled.12',
            'application/vnd.ms-word.template.macroEnabled.12',
            'application/vnd.ms-excel',
            'application/vnd.ms-excel',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            'application/vnd.ms-excel.sheet.macroEnabled.12',
            'application/vnd.ms-excel.template.macroEnabled.12',
            'application/vnd.ms-excel.addin.macroEnabled.12',
            'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
            'application/vnd.ms-powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.presentationml.template',
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'application/vnd.ms-powerpoint.addin.macroEnabled.12',
            'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
            'application/vnd.ms-powerpoint.template.macroEnabled.12',
            'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
        )
        .only()
        .messages({
            'any.only':
                "You're only allowed to upload files that are image, audio, video, word, powerpoint, excel, plain text and photoshop files.",
        }),
});

module.exports = schema;
