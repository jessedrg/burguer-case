export interface opsInterface {
    [key: string]: any;
    path?: string | undefined;
    mimeType?: string;
    d?: string | undefined;
    file?: any;
    baseUrl?: string | undefined;
    m?: string | undefined;
    v?: string | undefined;
    w?: string | undefined;
    e?: string | undefined;
    resource?: string | undefined;
    subresource?: string | undefined;
    headers?: {
        Accept?: string | undefined;
    };
    query?: any | undefined;
    body?: any | undefined;
}
