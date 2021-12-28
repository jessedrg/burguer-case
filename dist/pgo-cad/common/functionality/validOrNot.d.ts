import { ValidOrNot } from '../../types/functionality-types';
export declare const validOrNot: ({ solids, meshes, compo, other }: ValidOrNot) => {
    valid: boolean;
    error?: undefined;
} | {
    valid: boolean;
    error: string;
};
