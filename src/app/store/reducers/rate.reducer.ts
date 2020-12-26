import { Action } from '@ngrx/store';
import { Rate } from '../../models/rate.model';
import { rate as actions } from '../actions';

export interface State {
  rates: Rate[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: State = {
  rates: null,
  loaded: false,
  loading: false,
  error: null
};

export function reducer(state = initialState, action: actions.action): State {
  switch (action.type) {
    case actions.LOAD_RATES:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.LOAD_RATES_SUCCESS:
      console.log('ingreso success');
      return {
        ...state,
        loading: false,
        loaded: true,
        rates: [...action.rates ]
      };

    case actions.LOAD_RATES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          status: action.payload.status,
          message: action.payload.message,
          url: action.payload.url
        }
      };

    default:
      return state;
  }
}
