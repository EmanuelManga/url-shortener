import { VARIABLES_ENTORNO } from "../server.js";

export class AppError extends Error {
    constructor(message, status = 400, meta = undefined) {
        super(message);
        this.status = status;
        this.meta = meta;
    }
}

/**
 * Envía una respuesta de éxito estandarizada
 * @param {object} res - Express response object
 * @param {number} status - HTTP status code (default: 200)
 * @param {*} data - Datos a enviar en la respuesta
 * @param {string} message - Mensaje opcional
 */
export const successResponse = (res, status = 200, data = null, message = null) => {
    const body = {
        ok: true,
        ...(message && { message }),
        ...(data !== null && { data }),
    };
    return res.status(status).json(body);
};

/**
 * Envía una respuesta de error estandarizada
 * @param {object} res - Express response object
 * @param {number} status - HTTP status code (default: 400)
 * @param {string} error - Mensaje de error
 * @param {*} meta - Información adicional del error (opcional)
 */
export const errorResponse = (res, status = 400, error = "Error", meta = null) => {
    const body = {
        ok: false,
        error,
        ...(meta && { meta }),
    };
    return res.status(status).json(body);
};

export const errorResponder = (err, _req, res, next) => {
    if (!err) {
        return next();
    }

    const status = err.status || 500;
    const body = {
        ok: false,
        error: err.message || "Internal error",
        ...(err.meta ? { meta: err.meta } : {}),
    };
    if (VARIABLES_ENTORNO.DEBBUGING) {
        body.stack = err.stack;
    }
    res.status(status).json(body);
};
