import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import {
  TableSchemaActions,
  TableSchemaActionTypes,
} from '../action/table-schema.action';
import { TableSchemaState } from '../../models';

export interface State extends fromRoot.State {
  tableSchema: TableSchemaState;
}

export const initialState: TableSchemaState = {
  Jobs: null,
  Projects: null,
};

// selectors
const getTableSchemaFeatureState = createFeatureSelector<TableSchemaState>('tableSchema');

export const selectSchemaProperty = createSelector(
    getTableSchemaFeatureState,
    (state: TableSchemaState , prop: string) => state[prop]
  );



export function reducer(state = initialState, action: TableSchemaActions): any {
  switch (action.type) {
    case TableSchemaActionTypes.ADD_TABLE_SCHEMA: {
      return {
        ...state,
        [action.payload.propertyName]: action.payload.data,
      };
    }
    default:
      return state;
  }
}
