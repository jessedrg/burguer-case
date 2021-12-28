import { opsInterface } from '../../types/ops-interface';
import { callBack } from '../../types/requestResponse-interface';
export declare class onShapeSign {
    private baseUrl;
    private accesKey;
    private secretKey;
    private protocol;
    private creds;
    constructor(baseUrl: string, accesKey: string, secretKey: string);
    private buildNonce;
    private buildHeaders;
    private buildDWMVEPath;
    private buildQueryString;
    private inputHeadersFromOpts;
    protected get(opts: opsInterface, cb: any): void;
    protected post(opts: opsInterface, cb: callBack): void;
    protected delete(opts: opsInterface, cb: callBack): void;
    protected upload(opts: opsInterface, cb: callBack): void;
}
