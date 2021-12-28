import { onShapeSign } from './auth/onshape-auth';
import { callBack } from '../types/requestResponse-interface';
export declare class onshapeCalls extends onShapeSign {
    constructor(baseUrl: string, accesKey: string, secretKey: string);
    getParts(documentId: string, wvm: string, wvmId: string, elementId: string, cb: callBack): Promise<void>;
    getListParts(documentId: string, workspaceId: string, cb: callBack): Promise<void>;
    createDocument(description: string, ownerEmail: string, cb: callBack): Promise<void>;
    getMassProperties(documentId: string, wvm: string, wvmId: string, elementId: string, cb: callBack): Promise<void>;
    getBoundingBox(did: string, wvm: string, wvmId: string, eid: string, cb: callBack): Promise<void>;
    getShadedviews(documentId: string, wvm: string, wvmId: string, elementId: string, cb: callBack): Promise<void>;
    getBodyDetailsStudios(documentId: string, workspaceId: string, elementId: string, cb: callBack): Promise<void>;
    getSTEP(tid: string, cb: callBack): Promise<void>;
    createTranslation(documentId: string, wvm: string, wvmId: string, elementId: string, cb: callBack): Promise<void>;
    createPartStudio(documentId: string, workspaceId: string, name: string, cb: callBack): Promise<void>;
    deleteElement(documentId: string, workspaceId: string, elementId: string, cb: callBack): Promise<void>;
    uploadBlobElement(documentId: string, workspaceId: string, file: any, mimeType: string, cb: callBack): void;
    getDocuments(queryObject: any, cb: callBack): Promise<void>;
    getEndpoints(cb: callBack): Promise<void>;
    partStudioStl(documentId: string, workspaceId: string, elementId: string, cb: callBack): Promise<void>;
}
