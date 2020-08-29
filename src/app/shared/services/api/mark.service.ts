import { Injectable } from '@angular/core';
import { END_POINTS } from 'src/app/core/Http/globals';
import { HttpClientService } from 'src/app/core/Http/http-client.service';
import { FilterParams, ResultWithPagination, Mark } from '../../models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.mark;

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClientService) { }
  get(filterParams?: FilterParams):Observable<ResultWithPagination<Mark[]>> {
    return this.http.get<ResultWithPagination<Mark[]>>({url:API_URL   ,params:{
      page: filterParams.pageNumber.toString(),
      limit: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortDirection: filterParams.sortDirection || -1,
        model: filterParams.model
    }});
  }
  getAll(type: number, year:number,serial:number):Observable<Mark>{
    const action = '/GetValue'
    return this.http.get<Mark>({url:API_URL+`/${action}/${type}/${year}/${serial}` ,cacheMins:1})
  }
  getById(id:string):Observable<Mark>{

    return this.http.get<Mark>({url:API_URL+`/${id}`})
  }
  post(model : Mark): Observable<Mark> {
    return this.http.post<Mark>({url:API_URL ,body: model});
  }
  put(model : Mark): Observable<Mark> {
    return this.http.put<Mark>({url:API_URL+`/${model._id}` ,body: model});
  }
  delete(id: string): Observable<string> {
    return this.http.delete<string>({url:API_URL+`/${id}` });
  }
  getNext(id: string): Observable<Mark> {
    const action = "/getNext";
    return this.http.get<Mark>({url:API_URL+action+`/${id}`});
  }
  getPrevious(id: string): Observable<Mark> {
    const action = "/getPrevious";
    return this.http.get<Mark>({url:API_URL+action+`/${id}`});
  }
  getFirst(): Observable<Mark> {
    const action = `/getFirst`;
    return this.http.get<Mark>({url:API_URL+action});
  }
  getLast(): Observable<Mark> {
    const action = `/getLast`;
    return this.http.get<Mark>({url:API_URL+action});
  }
}
