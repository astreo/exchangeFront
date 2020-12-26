import { Action } from '@ngrx/store';
import { Rate } from '../../models/rate.model';

export const LOAD_RATES = '[rates] Load rates';
export const LOAD_RATES_FAIL = '[rates] Load rates FAIL';
export const LOAD_RATES_SUCCESS = '[rates] Load rates SUCCESS';

export class LoadRates implements Action {
  readonly type = LOAD_RATES;
  constructor() {}
}

export class LoadRatesFail implements Action {
  readonly type = LOAD_RATES_FAIL;
  constructor( public payload: any ) {}
}

export class LoadRatesSuccess implements Action {
  readonly type = LOAD_RATES_SUCCESS;
  constructor(public rates: Rate[]) {}
}

export type action = LoadRates | LoadRatesSuccess | LoadRatesFail;
