export interface IKeyValuePair {
  key: string;
  value: any;
}

export class KeyValuePair implements IKeyValuePair {
  key: string;
  value: any;

  constructor(kvp: { key: string; value: any }) {
    this.key = kvp.key;
    this.value = kvp.value;
  }

  /**
   * String representation: key=value
   * @returns
   */
  asString = () => {
    return `${this.key}=${this.value}`;
  }
}
