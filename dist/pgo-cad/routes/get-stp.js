"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.default.Router();
const onShapesingleton_1 = require("../onShapesingleton");
const express_validator_1 = require("express-validator");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
exports.router.post('/stp', [
    (0, express_validator_1.check)('documentId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('elementId', 'Must be a string').isLength({ min: 15 }).isString(),
], async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    const { workspaceId, documentId, elementId } = req.body;
    let tid;
    const createTranslation = await onShapesingleton_1.client.createTranslation(documentId, 'w', workspaceId, elementId, async (response) => {
        tid = JSON.parse(response).id;
        await onShapesingleton_1.client.getSTEP(tid, (response) => {
            res.send({ step: JSON.parse(response) });
        });
    });
});
//# sourceMappingURL=get-stp.js.map