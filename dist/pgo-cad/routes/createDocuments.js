"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const createDocumentMw_1 = require("../middlewares/createDocumentMw");
const express_validator_1 = require("express-validator");
exports.router = express_1.default.Router();
const client = require('../onShapesingleton');
exports.router.post('/createDocument', (0, express_validator_1.check)('email', 'Email is not valid').isEmail(), createDocumentMw_1.createDocument, (req, res) => {
    const { documentId, workspaceId } = req.body;
    res.send({ documentId, workspaceId });
});
//# sourceMappingURL=createDocuments.js.map