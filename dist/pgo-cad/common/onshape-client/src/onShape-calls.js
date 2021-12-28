"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onshapeCalls = void 0;
const onshape_auth_1 = require("./auth/onshape-auth");
class onshapeCalls extends onshape_auth_1.onShapeSign {
    constructor(baseUrl, accesKey, secretKey) {
        super(baseUrl, accesKey, secretKey);
    }
    async getParts(documentId, wvm, wvmId, elementId, cb) {
        const opts = {
            d: documentId,
            e: elementId,
            resource: 'parts',
        };
        opts[wvm] = wvmId;
        super.get(opts, cb);
    }
    async getListParts(documentId, workspaceId, cb) {
        const opts = {
            d: documentId,
            w: workspaceId,
            resource: 'parts',
        };
        super.get(opts, cb);
    }
    async createDocument(description, ownerEmail, cb) {
        const opts = {
            path: '/api/documents',
            body: {
                description: description,
                isEmptyContent: true,
                isPublic: true,
                name: 'string',
                notRevisionManaged: true,
                ownerEmail: ownerEmail,
            },
        };
        super.post(opts, cb);
    }
    async getMassProperties(documentId, wvm, wvmId, elementId, cb) {
        const opts = {
            d: documentId,
            e: elementId,
            resource: 'partstudios',
            subresource: 'massproperties',
            query: {
                massAsGroup: false,
            },
        };
        opts[wvm] = wvmId;
        super.get(opts, cb);
    }
    async getBoundingBox(did, wvm, wvmId, eid, cb) {
        const opts = {
            path: `/api/partstudios/d/${did}/${wvm}/${wvmId}/e/${eid}/boundingboxes`,
        };
        super.get(opts, cb);
    }
    async getShadedviews(documentId, wvm, wvmId, elementId, cb) {
        const opts = {
            d: documentId,
            e: elementId,
            resource: 'partstudios',
            subresource: 'shadedviews',
        };
        opts[wvm] = wvmId;
        super.get(opts, cb);
    }
    async getBodyDetailsStudios(documentId, workspaceId, elementId, cb) {
        const opts = {
            d: documentId,
            e: elementId,
            w: workspaceId,
            resource: 'partstudios',
            subresource: 'bodydetails',
        };
        super.get(opts, cb);
    }
    async getSTEP(tid, cb) {
        const opts = {
            path: `/api/translations/${tid}`,
        };
        super.get(opts, cb);
    }
    async createTranslation(documentId, wvm, wvmId, elementId, cb) {
        const opts = {
            d: documentId,
            e: elementId,
            body: {
                unit: 'millimeter',
                formatName: 'STEP',
                destinationName: 'generated',
                storeInDocument: false,
            },
            resource: 'blobelements',
            subresource: 'translations',
        };
        opts[wvm] = wvmId;
        super.post(opts, cb);
    }
    async createPartStudio(documentId, workspaceId, name, cb) {
        const opts = {
            d: documentId,
            w: workspaceId,
            resource: 'partstudios',
        };
        if (typeof name === 'string') {
            opts.body = { name: name };
        }
        return await super.post(opts, cb);
    }
    async deleteElement(documentId, workspaceId, elementId, cb) {
        const opts = {
            d: documentId,
            w: workspaceId,
            e: elementId,
            resource: 'elements',
        };
        super.delete(opts, cb);
    }
    uploadBlobElement(documentId, workspaceId, file, mimeType, cb) {
        const opts = {
            path: `/api/blobelements/d/${documentId}/w/${workspaceId}`,
            file: file,
            mimeType,
        };
        super.upload(opts, cb);
    }
    async getDocuments(queryObject, cb) {
        const opts = {
            path: '/api/documents',
            query: queryObject,
        };
        return await super.get(opts, cb);
    }
    async getEndpoints(cb) {
        const opts = {
            path: '/api/endpoints',
        };
        super.get(opts, cb);
    }
    async partStudioStl(documentId, workspaceId, elementId, cb) {
        const opts = {
            d: documentId,
            w: workspaceId,
            e: elementId,
            resource: 'partstudios',
            subresource: 'stl',
            headers: {
                Accept: 'application/vnd.onshape.v1+octet-stream',
            },
        };
        super.get(opts, cb);
    }
}
exports.onshapeCalls = onshapeCalls;
//# sourceMappingURL=onShape-calls.js.map