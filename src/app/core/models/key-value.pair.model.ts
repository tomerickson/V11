export interface IKeyValuePair {
    key: string;
    value: any
}

export class KeyValuePair implements IKeyValuePair {
    key: string;
    value: any;
    constructor( key: string, value: any) {
        this.key = key;
        this.value = value;
    }
}