import { CustomErrors } from './custom-errors';
export declare class BadRequestError extends CustomErrors {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
