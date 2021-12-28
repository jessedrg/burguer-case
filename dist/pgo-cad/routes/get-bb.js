"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const onShapesingleton_1 = require("../onShapesingleton");
const express_validator_1 = require("express-validator");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
exports.router = express_1.default.Router();
exports.router.post('/boundingbox', [
    (0, express_validator_1.check)('documentId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('elementId', 'Must be a string').isLength({ min: 15 }).isString(),
], async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    else {
        const { documentId, workspaceId, elementId } = req.body;
        const boundingBox = await onShapesingleton_1.client.getBoundingBox(documentId, 'w', workspaceId, elementId, (res1) => {
            const bound = JSON.parse(res1);
            bound.lowX = bound.lowX * 1000;
            bound.lowY = bound.lowY * 1000;
            bound.lowZ = bound.lowZ * 1000;
            bound.highX = bound.highX * 1000;
            bound.highY = bound.highY * 1000;
            bound.highZ = bound.highZ * 1000;
            res.send({ boundingBox: bound });
        });
    }
});
//# sourceMappingURL=get-bb.js.map