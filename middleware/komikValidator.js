const Joi = require('joi');

function errorResponse(res, message, status, details = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details,
    });
}

const komikSchema = Joi.object({
    title: Joi.string().trim().min(1).max(255).required(),
    description: Joi.string().trim().allow(null, '').optional(),
    author: Joi.string().trim().min(1).max(100).required(),
});

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

// Validasi body untuk POST (create) dan PUT (update)
function validateKomik(req, res, next) {
    const { error, value } = komikSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const details = error.details.map((d) => ({
            field: d.path.join('.'),
            message: d.message,
        }));
        return errorResponse(res, 'Validasi gagal', 400, details);
    }

    req.body = value;
    next();
}

// Validasi parameter :id untuk GET by id, PUT, dan DELETE
function validateId(req, res, next) {
    const { error, value } = idSchema.validate(req.params, {
        abortEarly: false,
    });

    if (error) {
        const details = error.details.map((d) => ({
            field: d.path.join('.'),
            message: d.message,
        }));
        return errorResponse(res, 'ID tidak valid', 400, details);
    }

    req.params.id = value.id;
    next();
}

module.exports = {
    errorResponse,
    validateKomik,
    validateId,
};