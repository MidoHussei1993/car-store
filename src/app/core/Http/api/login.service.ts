import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { END_POINTS } from '../globals';
import { HttpClientService } from '../http-client.service';
import { Store } from '@ngrx/store';
import * as permissionAction from '../../state/action/permission.actions';

const API_URL = END_POINTS.login;

interface LoginResponse {
  token: string;
  menu: any[];
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClientService,
    private store: Store<any>
  ) //  private http:HttpClient
  {}

  login(user: any): Observable<any> {
    return this.http.post({ url: API_URL, body: user }).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        this.store.dispatch(new permissionAction.ADD_MENU_Permission(res.menu));
      })
    );
    //   const headers = new Headers({'Authorization':''});

    //  return this.http.post<any>(API_URL , user)
  }

  getName(id: string): Observable<{UserName: string, NoPassword:number}> {
    return this.http.get<{UserName: string, NoPassword:number}>({url:API_URL + `/${id}`,cacheMins:5});
  }
  // createPassword( userId: string,  password: string ): Observable<void> {
  //   const action = /CreatePassword;
  //   return this.http.post<void>({url:API_URL + action ,body:{ userId , password },cacheMins:5})
  // }
  // ChangePassword( model : any ): Observable<void> {
  //   const action = /CreatePassword;
  //   return this.http.post<void>({url:API_URL + action , body:model,cacheMins:5})
  // }
}
