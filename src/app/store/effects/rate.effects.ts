import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { rate as actions } from '../actions';
import { of, pipe } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, concatMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { rate as reducer } from '../reducers';
import { RateService } from '../../services/rate.service';

@Injectable()
export class RateEffects {

  constructor(
    private actions$: Actions, public rateService: RateService, public store: Store<AppState>
  ) { }


  @Effect()
  cargarPerfiles$ = this.actions$
    .pipe(
      ofType(actions.LOAD_RATES),
      pipe(
        switchMap((action: actions.LoadRates) => {
          return this.rateService.getRates()
            .pipe(
              map(rates => {
                return new actions.LoadRatesSuccess(rates);
              }),
              catchError((error) => {
                /*Swal.fire({
                  title: 'Error!',
                  text: error.message,
                  type: 'error',
                  confirmButtonText: 'OK'
                });*/
                return of(new actions.LoadRatesFail(error));
              })
            );
        })
      )
    );



}
