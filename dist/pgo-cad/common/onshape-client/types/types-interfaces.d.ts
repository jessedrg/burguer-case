/// <reference types="node" />
import { Url } from 'url';
export interface methodExtension extends Url {
    method?: string;
    headers?: any;
}
