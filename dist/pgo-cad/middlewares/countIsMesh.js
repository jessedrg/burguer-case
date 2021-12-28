"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countIsMesh = void 0;
const express_validator_1 = require("express-validator");
const onShapesingleton_1 = require("../onShapesingleton");
const not_authorized_error_1 = require("../common/errors/not-authorized-error");
const countIsMesh = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    let solid = 0;
    let mesh = 0;
    let composite = 0;
    let other = 0;
    const { documentId, workspaceId } = req.body;
    const parts = onShapesingleton_1.client.getListParts(documentId, workspaceId, (parts) => {
        JSON.parse(parts).forEach((part) => {
            if (part.bodyType === 'solid') {
                if (part.isMesh === true) {
                    mesh += 1;
                }
                else {
                    solid += 1;
                }
            }
            if (part.bodyType === 'composite') {
                composite += 1;
            }
            if (part.bodyType !== 'composite' && part.bodyType !== 'solid') {
                other += 1;
            }
        });
    });
    req.body.countParts = {
        solid,
        mesh,
        composite,
        other,
    };
    next();
};
exports.countIsMesh = countIsMesh;
//# sourceMappingURL=countIsMesh.js.map