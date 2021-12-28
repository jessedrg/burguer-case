"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validOrNot = void 0;
const validOrNot = ({ solids, meshes, compo, other }) => {
    if ((solids == 1 && meshes == 0 && other >= 0) ||
        (meshes > 0 && solids == 0 && compo == 0 && other == 0) ||
        (compo == 1 && meshes == 0 && solids == 0 && other == 0)) {
        if (solids == 0 && meshes == 0) {
            throw new Error('pyC.partError');
        }
        return { valid: true };
    }
    else {
        if (solids == 0)
            return { valid: false, error: 'No se encontraron solidos' };
        else if (meshes > 0)
            return { valid: false, error: 'No esta Agrupado' };
        else if (solids > 1)
            return { valid: false, error: 'Hay mas de un solido' };
    }
};
exports.validOrNot = validOrNot;
//# sourceMappingURL=validOrNot.js.map