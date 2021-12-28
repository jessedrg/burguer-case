"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const onShapesingleton_1 = require("../onShapesingleton");
const tornofresa_1 = require("../common/functionality/tornofresa");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
const { check, validationResult } = require('express-validator');
exports.router = express_1.default.Router();
exports.router.post('/process', [
    check('documentId', 'Must be a string').isLength({ min: 15 }).isString(),
    check('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(),
    check('elementId', 'Must be a string').isLength({ min: 15 }).isString(),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    const { workspaceId, elementId, documentId } = req.body;
    const faces1 = await onShapesingleton_1.client.getBodyDetailsStudios(documentId, workspaceId, elementId, (faces) => {
        res.send((0, tornofresa_1.tornoFresa)(JSON.parse(faces).bodies));
    });
});
//# sourceMappingURL=get-process.js.map