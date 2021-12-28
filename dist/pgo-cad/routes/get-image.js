"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
const onShapesingleton_1 = require("../onShapesingleton");
exports.router = express_1.default.Router();
exports.router.post('/image', [
    (0, express_validator_1.check)('documentId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('elementId', 'Must be a string').isLength({ min: 15 }).isString(),
], async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    const { workspaceId, documentId, elementId } = req.body;
    const images = await onShapesingleton_1.client.getShadedviews(documentId, 'w', workspaceId, elementId, (images) => {
        res.send({ images: JSON.parse(images) });
    });
});
//# sourceMappingURL=get-image.js.map