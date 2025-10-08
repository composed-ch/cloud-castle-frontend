import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function minUniqueChars(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = (control.value ?? '') as string;
    if (!v) return null;
    const unique = new Set([...v]).size;
    return unique >= min ? null : { minUniqueChars: { required: min, actual: unique } };
  };
}

export function matchFields(fieldA: string, fieldB: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fg = group as FormGroup;
    const a = fg.get(fieldA)?.value;
    const b = fg.get(fieldB)?.value;
    const confirmCtrl = fg.get(fieldB);
    if (!confirmCtrl) return null;

    if (a === b) {
      const errs = { ...(confirmCtrl.errors || {}) };
      delete errs['mismatch'];
      confirmCtrl.setErrors(Object.keys(errs).length ? errs : null);
      return null;
    } else {
      confirmCtrl.setErrors({ ...(confirmCtrl.errors || {}), mismatch: true });
      return { mismatch: true };
    }
  };
}