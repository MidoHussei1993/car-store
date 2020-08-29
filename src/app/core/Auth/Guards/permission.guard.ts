import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PermissionState } from '../../state/reducer/permission.reducer';
import * as permissionSelector from '../../state/reducer/permission.reducer';
import * as permissionAction from '../../state/action/permission.actions';
import { UsersPermsService } from '../../Http/api/users-perms.service';
import { AuthenticationService } from '../services/authentication.services';
import { SwalService } from '../../services/swal.service';
interface MenuPerm {
  Open: boolean;
  MuneId: number;
}
@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  permissionId: number;
  permissionList: any[] = [];
  constructor(
    private router: Router,
    private swalService: SwalService,
    private usersPermsService: UsersPermsService,
    private authenticationService: AuthenticationService,
    private store: Store<PermissionState>
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    this.loadpermissionList();
    if (this.permissionList.length < 1) {
      const userId = this.authenticationService.getStoredUserId();
      const loadedPermission = await this.usersPermsService.getUserPermissions(userId).toPromise();
      this.permissionList = loadedPermission;
      this.store.dispatch(
        new permissionAction.UPDATE_PERMISSION_SUCCESS(loadedPermission)
      );
     
    }
    if(next.data['MenuId'] == 'HOME') return true;
    this.permissionId = next.data['MenuId'] as number;
    // if(!this.permissionId || !this.permissionList){
    // this.navigateToHome()
    //   return false;
    // }
    let pagePermission = null;
    
     pagePermission = await this.permissionList.find((item) => item.MenuId == this.permissionId)
   
    if(!pagePermission || (pagePermission.Open == false)){
      this.swalService.NotifierError('ليس لديك صلاحيه للدخول الي هذه الشاشه')
      return false
    }
    return pagePermission.Open ? pagePermission.Open : false;
  }

  loadpermissionList() {
    this.store
      .pipe(select(permissionSelector.selectOpenPermistionListProperty))
      .subscribe((res) => {
        this.permissionList = res;
      });
  }
  navigateToHome() {
    this.router.navigate(['pages/home']);
  }
}
