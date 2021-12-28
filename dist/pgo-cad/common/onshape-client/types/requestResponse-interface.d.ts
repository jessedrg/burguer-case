export interface onshapeRes {
    statusCode: number;
    headers: {
        location: string;
    };
    on(value: string, cb: callBack): void;
}
export declare type callBack = (value: any) => void;
