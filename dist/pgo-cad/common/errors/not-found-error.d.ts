import { CustomErrors } from './custom-errors';
export declare class NotFoundError extends CustomErrors {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
