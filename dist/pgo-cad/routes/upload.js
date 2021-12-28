"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const { check, validationResult } = require('express-validator');
const upload_file_1 = require("../middlewares/upload-file");
exports.router = express_1.default.Router();
exports.router.post('/upload', check('documentId', 'Must be a string').isLength({ min: 15 }).isString(), check('workspaceId', 'Must be a string').isLength({ min: 15 }).isString(), upload_file_1.uploadFile, async (req, res) => {
    res.send({ valid_files: req.body.validFiles, allFiles: req.body.files });
});
//# sourceMappingURL=upload.js.map