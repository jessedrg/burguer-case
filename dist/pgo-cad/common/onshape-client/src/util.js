"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyObject = exports.error = void 0;
const error = function (err) {
    console.log(err.msg);
    process.exit(err.status);
};
exports.error = error;
const copyObject = function (object) {
    if (object === null || typeof object !== 'object') {
        return object;
    }
    const copy = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        if (object.hasOwnProperty(keys[i])) {
            copy[keys[i]] = (0, exports.copyObject)(object[keys[i]]);
        }
    }
    return copy;
};
exports.copyObject = copyObject;
//# sourceMappingURL=util.js.map