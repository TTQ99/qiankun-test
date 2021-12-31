import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export class FormValidators extends Validators {
  // 校验去除首尾空格后是否为kong
  static nonEmpty = (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof(control.value) == "string" && (control.value).trim() === ''){
      return { error: true };
    }
    return {};
  }
  // 校验手机号
  static phone = (c:AbstractControl): ValidationErrors | null => {
    let PHONE_REGEXP = /^1[3-9]\d{9}$/;
    if (c.value === null || c.value === undefined || c.value.trim() === ''){
      return {};
    } else {
      return PHONE_REGEXP.test(c.value) ? null : {
        validatePhone: {
          valid: false
        }
      };
    }
  }

}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}
