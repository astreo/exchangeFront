import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Rate } from 'src/app/models/rate.model';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { rate as actions } from '../../store/actions';
import { LoadRates } from '../../store/actions/rate.actions';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  displayedColumns: string[] = ['currency', 'buyVal', 'sellVal'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  rateItems: Rate[];

  loading$: Observable<boolean>;
  rates$: Observable<Rate[]>;
  loaded$ = this.store.select(state => state.rate.loaded);

  loadedSubsctiption = new Subscription();
  getRatesFromStoreSubscription = new Subscription();


  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(state => state.rate.loading);
    this.loadedSubsctiption = this.loaded$.subscribe(loaded => {
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

  getRatesFromStore(): void {
    this.getRatesFromStoreSubscription = this.store.select(state => state.rate.rates)
      .subscribe(result => {
        this.rateItems = result;
        this.dataSource.data = result;
      });
  }

}
