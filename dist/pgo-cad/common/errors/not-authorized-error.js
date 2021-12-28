"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_errors_1 = require("./custom-errors");
class NotAuthorizedError extends custom_errors_1.CustomErrors {
    constructor() {
        super('Not Authorized');
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
//# sourceMappingURL=not-authorized-error.js.map