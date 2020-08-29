import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import * as permissionSelector from '../../state/reducer/permission.reducer';
import { Store, select } from '@ngrx/store';
import { Permission } from '../../models';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionResolver implements Resolve<Permission> {
  constructor(private store: Store<Permission>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store
      .pipe(select(permissionSelector.selectPermistionListProperty))
      .pipe(
        take(1),
        map((permissionList) => {
          return permissionList.find(
            (item) => item.MenuId === route.data.MenuId || 0
          );
        })
      );
  }
}
