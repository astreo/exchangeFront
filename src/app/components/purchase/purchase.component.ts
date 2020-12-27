import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';

declare class MyFormDataStructure {
  fields: Transaction;
  controls: {
    userId: AbstractControl;
    amount: AbstractControl;
    changeRate: AbstractControl;
    currency: AbstractControl;
  };
}

declare interface MyForm extends FormGroup {
  value: MyFormDataStructure['fields'];
  controls: MyFormDataStructure['controls'];
}


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  form: MyForm;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      amount: ['', Validators.required],
      changeRate: ['', Validators.required],
      currency: ['', Validators.required]

    }) as MyForm;
  }

  get ctrls() {
    return this.form.controls;
  }

  isInvalid(ctrl: AbstractControl) {
    return (ctrl.touched && ctrl.invalid);
  }

  getErrorMessage(fc: FormControl) {
    let resp = '';
    resp += fc.hasError('required') ? 'You must enter a value. ' : '';
    return resp;
  }

  onSubmit() {
  }
}
