import { Action } from '@ngrx/store';

export enum CarActionTypes {
    LAST_ADDED_CAR='[CAR] the last cars added to database',
    
  }
  
export class LAST_ADDED_CAR implements Action {
    readonly type = CarActionTypes.LAST_ADDED_CAR;
    constructor(public payload: any[]) {}
  }

  export type CarActions = LAST_ADDED_CAR;