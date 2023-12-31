import { ValidationErrors } from "@angular/forms";

export interface INumericFormControlContext {
    min: number | null;
    max: number | null;
    step: number | null;
    value: number | null;
    type: NumericInputTypes;
    label: string;
    required: boolean;
    controlKey: string;
    errorMessages: ValidationErrors | null;
  }

  export class NumericFormControlContext {
    ctx: INumericFormControlContext;
    errorMessages!: ValidationErrors | null;

    constructor(ctx: INumericFormControlContext) {
      this.ctx = ctx;
      this.buildErrorMessages();
    }

    get min() {    return this.ctx.min;  }
    get max() {    return this.ctx.max;  }
    get step() {    return this.ctx.step;  }
    get value() {    return this.ctx.value;  }
    get type() {    return this.ctx.type;  }
    get label() {    return this.ctx.label;  }
    get required() {    return this.ctx.required;  }
    get controlKey() {    return this.ctx.controlKey;  }

    buildErrorMessages = () => {
      const result: ValidationErrors = {};
      if (this.required) {
        result['required'] = 'This field is required';
      }
      if (this.min) {
        result['min'] = `Minimum is ${this.min}`;
      }
      if (this.max) {
        result['max'] = `Maximum is ${this.max}`;
      }
      result['pattern'] =
        this.type === NumericInputTypes.decimal ? 'nnn.nn' : 'nnnn';
      this.errorMessages = result;
    };
  }

  export enum NumericInputTypes {
    'decimal',
    'integer'
  }
