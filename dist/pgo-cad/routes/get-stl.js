"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.default.Router();
const onShapesingleton_1 = require("../onShapesingleton");
const express_validator_1 = require("express-validator");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
exports.router.post('/stl', [
    (0, express_validator_1.check)('documentId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('elementId', 'Must be a string').isLength({ min: 15 }).isString(),
], async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    const { workspaceId, documentId, elementId } = req.body;
    const stl = await onShapesingleton_1.client.partStudioStl(documentId, workspaceId, elementId, (result) => {
        res.send({ stl: JSON.parse(result) });
    });
});
//# sourceMappingURL=get-stl.js.map