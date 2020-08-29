import { Action } from '@ngrx/store';
import { Permission } from '../../models/index';

export enum PermissionActionTypes {
  Load_Permissions = '[Permission] Load Permissions',
  UPDATE_PERMISSION_SUCCESS='[Permission] update shop SUCCESS by api',
  UPDATE_PERMISSION_FAIL='[Permission] update shop FAIL by api',
  ADD_MENU_Permission='[Permission] add munu ids and permissions',
  BUSY_LOADING='[BOOLEAN] BUSY LOADING ',
  
}

export class LoadPermissions implements Action {
  readonly type = PermissionActionTypes.Load_Permissions;
}
export class UPDATE_PERMISSION_SUCCESS implements Action {
  readonly type = PermissionActionTypes.UPDATE_PERMISSION_SUCCESS;
  constructor(public payload: Permission[]){}

}
export class UPDATE_PERMISSION_FAIL implements Action {
  readonly type = PermissionActionTypes.UPDATE_PERMISSION_FAIL;
  constructor(public payload: string) {}
}
export class ADD_MENU_Permission implements Action {
  readonly type = PermissionActionTypes.ADD_MENU_Permission;
  constructor(public payload: Permission[]) {}
}
export class BUSY_LOADING implements Action {
  readonly type = PermissionActionTypes.BUSY_LOADING;
  constructor(public payload: boolean) {}
}


export type PermissionActions = 
LoadPermissions |
UPDATE_PERMISSION_SUCCESS |
UPDATE_PERMISSION_FAIL |
ADD_MENU_Permission |
BUSY_LOADING
;
