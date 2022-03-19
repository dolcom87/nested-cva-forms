import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from '../../shared/unsubscribe';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
  ],
})
export class AddressInfoComponent
  extends Unsubscribe
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  public addressInfoForm: FormGroup = new FormGroup({
    addressLine: new FormControl('', [Validators.required]),
    areaCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
    ]),
  });

  public onTouched: () => void = () => {};

  constructor() {
    super();
  }

  ngOnInit(): void {}

  registerOnChange(fn: any): void {
    this.addressInfoForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((v) => fn(v));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressInfoForm.disable() : this.addressInfoForm.enable();
  }

  writeValue(val: any): void {
    val && this.addressInfoForm.setValue(val);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('Address Info validation', control);
    return this.addressInfoForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'addressInfoForm fields are invalid',
          },
        };
  }
}
