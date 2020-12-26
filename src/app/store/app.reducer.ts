import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  rate: reducers.rate.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  rate: reducers.rate.reducer,
};
