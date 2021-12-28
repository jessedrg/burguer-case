export declare abstract class CustomErrors extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
