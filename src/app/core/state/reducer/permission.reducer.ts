import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { PermissionActions, PermissionActionTypes } from '../action/permission.actions';
import { Permission } from '../../models';

export const permissionFeatureKey = 'permission';

export interface State extends fromRoot.State {
  permission: PermissionState
}
export interface PermissionState{
  PermissionList: Permission[];
  error:string;
  busyLoading : boolean;
}

export const initialState: PermissionState = {
  PermissionList: [],
  error:null,
  busyLoading : false
};

//selectors
const getPermissionFeatureState = createFeatureSelector<PermissionState>('permission');

export const selectPermistionListProperty = createSelector(
  getPermissionFeatureState,
  (state: PermissionState) => state.PermissionList
);
export const selectBusyLoading = createSelector(
  getPermissionFeatureState,
  (state: PermissionState) => state.busyLoading
);
export const selectOpenPermistionListProperty = createSelector(
  selectPermistionListProperty,
  (state: Permission[]) => state.map(perm =>{
    return {MenuId:perm.MenuId,Open:perm.Open , Read:perm.Read, Update:perm.Update, Print:perm.Print, Delete:perm.Delete}
  })
);


export function reducer(state = initialState, action: PermissionActions): PermissionState {
  switch (action.type) {
    case PermissionActionTypes.ADD_MENU_Permission: {
      return {
        ...state,
        PermissionList: action.payload
      }
    }
    case PermissionActionTypes.UPDATE_PERMISSION_SUCCESS: {
      return {
        ...state,
        PermissionList: action.payload
      }
    }
    case PermissionActionTypes.UPDATE_PERMISSION_FAIL: {

      return {
        ...state,
        error: action.payload?action.payload :'server error for gitting data'
      }
    }
    case PermissionActionTypes.BUSY_LOADING: {

      return {
        ...state,
        busyLoading: action.payload?action.payload:false
      }
    }
    default:
      return state;
  }
}
