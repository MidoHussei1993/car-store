import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from '../globals';



const API_URL = END_POINTS.usersPerms;

@Injectable({
  providedIn: 'root'
})
export class UsersPermsService {
    
    constructor(
        private http: HttpClient
    ) { }

    get(id: string): Observable<any[]> {
      return this.http.get<any[]>(API_URL + `/${id}`);
    }
    selectAll(id: string): Observable<any[]> {
      const action = "/CheckAll";
      return this.http.put<any[]>(API_URL + action + `/${id}/true`, {});
    }
    deselectAll(id: string): Observable<any[]> {
      const action = "/CheckAll";
      return this.http.put<any[]>(API_URL + action + `/${id}/false`, {});
    }

    getUserPermissions(id: string): Observable<any[]>  {
        return this.get(id);
    }


}