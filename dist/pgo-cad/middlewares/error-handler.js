"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_errors_1 = require("../common/errors/custom-errors");
const errorHandler = (err, req, res, next) => {
    if (err instanceof custom_errors_1.CustomErrors) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({
        error: [{ message: 'something went wrong' }],
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map