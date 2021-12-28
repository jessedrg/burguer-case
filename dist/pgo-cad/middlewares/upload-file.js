"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const extFiles_array_1 = require("./extFiles-array");
const express_validator_1 = require("express-validator");
const path_1 = require("path");
const onShapesingleton_1 = require("../onShapesingleton");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
const uploadFile = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    const { documentId, workspaceId } = req.body;
    req.body.files = [];
    req.body.validFiles = [];
    if (!req.files) {
        throw new Error('No file uploaded');
    }
    req.files.file.forEach(async (file) => {
        const name = file.name;
        const mimeType = file.mimetype;
        const newExtenstion = name.split('.');
        let extension = newExtenstion[1];
        const filterFound = extFiles_array_1.filesArray.filter((val) => val === extension);
        const path1 = path_1.default.join(__dirname, '../uploads');
        if (filterFound[0]) {
            onShapesingleton_1.client.uploadBlobElement(documentId, workspaceId, mimeType, file, (res) => {
                console.log(res);
                console.log('file uploaded');
            });
            req.body.validFiles.push(file);
            req.body.files.push({
                name: file.name,
                mime: file.mimetype,
                valid: true,
            });
        }
        else {
            req.body.files.push({
                name: file.name,
                mime: file.mimetype,
                valid: false,
            });
        }
    });
    next();
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload-file.js.map