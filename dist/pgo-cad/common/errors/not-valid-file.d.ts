import { CustomErrors } from './custom-errors';
export declare class InvalidFile extends CustomErrors {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
