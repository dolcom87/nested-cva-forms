import { Component, forwardRef, OnInit } from '@angular/core';
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
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BasicInfoComponent),
      multi: true,
    },
  ],
})
export class BasicInfoComponent
  extends Unsubscribe
  implements OnInit, ControlValueAccessor, Validator
{
  public basicInfoForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public onTouched: () => void = () => {};

  constructor() {
    super();
  }

  ngOnInit(): void {}

  registerOnChange(fn: any): void {
    this.basicInfoForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((v) => fn(v));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.basicInfoForm.disable() : this.basicInfoForm.enable();
  }

  writeValue(val: any): void {
    val && this.basicInfoForm.setValue(val);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('Basic Info validation', control);
    return this.basicInfoForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'basicInfoForm fields are invalid',
          },
        };
  }
}
