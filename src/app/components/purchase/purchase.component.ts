import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Rate } from 'src/app/models/rate.model';
import { AppState } from 'src/app/store/app.reducer';
import { Transaction } from '../../models/transaction.model';
import { rate as actions, rate } from '../../store/actions';
import { TransactionService } from '../../services/transaction.service';
import { MatOptionSelectionChange } from '@angular/material/core';


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
export class PurchaseComponent implements OnInit, OnDestroy {
  form: MyForm;
  rateItems: Rate[];

  loading$: Observable<boolean>;
  loading = false;
  rates$: Observable<Rate[]>;
  loaded$ = this.store.select(state => state.rate.loaded);

  loadedSubscription = new Subscription();
  getRatesFromStoreSubscription = new Subscription();
  createTransactionSubscription = new Subscription();

  constructor(private formBuilder: FormBuilder, public store: Store<AppState>,
              private snackBar: MatSnackBar, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      amount: ['', Validators.required],
      changeRate: [1],
      currency: ['', Validators.required]

    }) as MyForm;

    this.loading$ = this.store.select(state => state.rate.loading);
    this.loadedSubscription = this.loaded$.subscribe(loaded => {
      if (!loaded) {
        console.log('NO loaded', loaded);
        this.store.dispatch(new actions.LoadRates());
      } else {
        console.log('loaded', loaded);
        this.getRatesFromStore();
      }
    });
    console.log('los rates:', this.rateItems);
  }

  ngOnDestroy(): void {
    this.createTransactionSubscription.unsubscribe();
    this.getRatesFromStoreSubscription.unsubscribe();
    this.loadedSubscription.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  get ctrls() {
    return this.form.controls;
  }

  isInvalid(ctrl: AbstractControl): boolean {
    return (ctrl.touched && ctrl.invalid);
  }

  getErrorMessage(fc: FormControl): string {
    let resp = '';
    resp += fc.hasError('required') ? 'You must enter a value. ' : '';
    return resp;
  }

  getRatesFromStore(): void {
    this.getRatesFromStoreSubscription = this.store.select(state => state.rate.rates)
      .subscribe(result => {
        this.rateItems = result;
      });
  }

  itemSelected(event: MatOptionSelectionChange, obj: Rate): void
  {
    this.ctrls.changeRate.setValue(obj.sellVal);
  }

  onSubmit(): void {
    this.loading = true;
    // debugger;
    const transaction = {} as Transaction;
    Object.assign(transaction, this.form.value);
    this.transactionService.createTransaction(transaction).subscribe(
      (result) => {
        this.loading = false;
        this.snackBar.open(result.result, 'OK', {
          duration: 5000,
        });
      },
      err => {
        this.loading = false;
        this.snackBar.open(err.error, 'OK', {
          duration: 5000,
        });
      }
    );
  }
}
