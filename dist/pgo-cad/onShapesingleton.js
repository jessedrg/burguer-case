"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const onShape_calls_1 = require("./common/onshape-client/src/onShape-calls");
class OnShape {
    constructor(accessKey, baseUrl, secretKey) {
        this.client = new onShape_calls_1.onshapeCalls(baseUrl, accessKey, secretKey);
    }
    getClient() {
        return this.client;
    }
}
const apiKey = process.env.apikey || 'lBZonxdZru9O60AH7gujz711';
const baseUrl = process.env.baseUrl || 'https://cad.onshape.com';
const secretKey = process.env.secretKey || 'CESrlGkdMEZeDUfBwLxDzQbnCiTSKyJq2f1ufWpovLUhZinX';
const onshapeClient = new OnShape(apiKey, baseUrl, secretKey).getClient();
exports.client = onshapeClient;
//# sourceMappingURL=onShapesingleton.js.map