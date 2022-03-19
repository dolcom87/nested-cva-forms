import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css'],
})
export class BillingInfoComponent implements OnInit {
  public billingInfoForm: FormGroup = new FormGroup({
    basicInfo: new FormControl(''),
    addressInfo: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  public onSubmit(): void {
    console.log(this.billingInfoForm);
  }
}
