"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const countIsMesh_1 = require("../middlewares/countIsMesh");
const validOrNot_1 = require("../middlewares/validOrNot");
const express_validator_1 = require("express-validator");
exports.router = express_1.default.Router();
exports.router.post('/partInfo', [
    (0, express_validator_1.check)('documentId', 'Must be a string').isLength({ min: 15 }).isString(),
    (0, express_validator_1.check)('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(),
], countIsMesh_1.countIsMesh, validOrNot_1.validOrNot, (req, res) => {
    res.send(req.body.isValid);
});
//# sourceMappingURL=check-part.js.map