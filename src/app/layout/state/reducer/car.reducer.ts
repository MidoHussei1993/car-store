import * as fromRoot from '../../../state/state';
import { CarActions, CarActionTypes } from '../action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface State extends fromRoot.State {
   car: CarState
  }
  export interface CarState{
    lastCar:any[]
    error:string;
    busyLoading : boolean;
  }
  export const initialState: CarState = {
    lastCar: [],
    error:null,
    busyLoading : false
  };
  const getCarFeatureState = createFeatureSelector<CarState>('car');
  export const selectLastCarListProperty = createSelector(
    getCarFeatureState,
    (state: CarState) => state.lastCar
  );
export function reducer(state = initialState, action: CarActions): CarState {
    switch (action.type) {
      case CarActionTypes.LAST_ADDED_CAR: {
        return {
          ...state,
          lastCar: action.payload
        }
      }

      default:
        return state;
    }
  }