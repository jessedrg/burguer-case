import { CustomErrors } from './custom-errors';
export declare class NotAuthorizedError extends CustomErrors {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
