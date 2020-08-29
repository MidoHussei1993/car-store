import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as permissinAction from '../action/permission.actions'
import { PermissionState } from '../reducer/permission.reducer';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { UsersPermsService } from '../../Http/api/users-perms.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class PermissionEffects {



  constructor(private actions$: Actions,
    private permissin: UsersPermsService,
    ) {}

    @Effect()
    loadShopList$ : Observable<Action>= this.actions$.pipe(
      
        //filter action to get just  load action of type shopping
        ofType(permissinAction.PermissionActionTypes.Load_Permissions)
        //this for each emit of load will call shop services
        ,mergeMap((action : permissinAction.LoadPermissions)=>this.permissin.getUserPermissions('mm')
        //pass data to success action
        .pipe( map((shopList:any[])=> new permissinAction.UPDATE_PERMISSION_SUCCESS(shopList),
        catchError(err => of(new permissinAction.UPDATE_PERMISSION_FAIL(err)))
        ))
        )
    )
    // @Effect()
    // updateShop$ = this.actions$.pipe(
    //     //filter action to get just  load action of type shopping
    //     ofType(permissinAction.ShoppingActionTypes.UPDATE_SHOP),
    //     //pull(get) off the payload from action
    //     map((action:permissinAction.UPDATE_SHOP)=>action.payload)
    //     //this for each emit of load will call shop services
    //     ,mergeMap((shop: Shopping)=>this.shopService.putShop(shop)
    //     //pass data to success action
    //     .pipe( map((shop:Shopping)=> new permissinAction.UPDATE_SHOP_SUCCESS(shop),
    //     catchError(err => of(new permissinAction.UPDATE_SHOP_FAIL(err)))
    //     ))
    //     )
    // )

}
