"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidFile = void 0;
const custom_errors_1 = require("./custom-errors");
class InvalidFile extends custom_errors_1.CustomErrors {
    constructor() {
        super('Invalid file format');
        this.statusCode = 422;
    }
    serializeErrors() {
        return [{ message: 'Introduce a valid format' }];
    }
}
exports.InvalidFile = InvalidFile;
//# sourceMappingURL=not-valid-file.js.map