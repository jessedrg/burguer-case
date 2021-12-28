"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const express_validator_1 = require("express-validator");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
const onShapesingleton_1 = require("../onShapesingleton");
const createDocument = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    const email = req.body.email;
    const response = await onShapesingleton_1.client.createDocument('document proto and go', 'jesedragstra@protoandgo.com', (res) => {
        req.body.documentId = res.defaultWorkspace.documentId;
        req.body.workspaceId = res.defaultWorkspace.lastModifier.id;
    });
    next();
};
exports.createDocument = createDocument;
//# sourceMappingURL=createDocumentMw.js.map