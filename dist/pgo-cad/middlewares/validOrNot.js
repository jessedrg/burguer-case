"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validOrNot = void 0;
const validOrNot_1 = require("../common/functionality/validOrNot");
const not_valid_file_1 = require("../common/errors/not-valid-file");
const validOrNot = (req, res, next) => {
    const solids = req.body.countParts.solid;
    const meshes = req.body.countParts.mesh;
    const compo = req.body.countParts.composite;
    const other = req.body.countParts.other;
    if (meshes < 2) {
        return next(new not_valid_file_1.InvalidFile());
    }
    req.body.isValid = (0, validOrNot_1.validOrNot)({ meshes, solids, compo, other });
    next();
};
exports.validOrNot = validOrNot;
//# sourceMappingURL=validOrNot.js.map