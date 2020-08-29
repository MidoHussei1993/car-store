import { Injectable } from '@angular/core';
import { END_POINTS } from 'src/app/core/Http/globals';
import { HttpClientService } from 'src/app/core/Http/http-client.service';
import { Car, FilterParams, ResultWithPagination } from '../../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = END_POINTS.car;
@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClientService) {}

  get(filterParams?: FilterParams):Observable<any> {
    return this.http.get<ResultWithPagination<any[]>>({url:API_URL   ,params:{
      page: filterParams.pageNumber.toString(),
      limit: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortDirection: filterParams.sortDirection || -1,
        model: filterParams.model
    }}).pipe(
      map((res) => {
        if(!res.result) return new ResultWithPagination<any[]>();

     return  {
      pagination:res.pagination,
      result:res.result.map((item: any) => {
        item.drive = item.drive?'automatic':'manual'
        item.fuel = item.fuel?'gasoline':'solar';
        item.mark=item.mark.name;
        item.mainImage = item.mainImage?`${END_POINTS.baseUrl+'/'+ item.mainImage}`:'';
        item.type = item.type?'new':'used';
        return item
    })
     }

      })
    );
  }

  getLast(): Observable<any> {
    const action = '/lastInserted';
    return this.http
      .get<any[]>({ url: API_URL + action, cacheMins: 3 })
      .pipe(
        map((res) => {
          console.log(res)
          // if(!res) return {}
       return   res.map((item: any) => {
              item.drive = item.drive?'automatic':'manual'
              item.fuel = item.fuel?'gasoline':'solar';
              item.mainImage = item.mainImage?`${END_POINTS.baseUrl+'/'+ item.mainImage}`:'';
              item.type = item.type?'new':'used';
              return item
          });
        })
      );
  }
  getAll(type: number, year:number,serial:number):Observable<Car>{
    const action = '/GetValue'
    return this.http.get<Car>({url:API_URL+`/${action}/${type}/${year}/${serial}` ,cacheMins:1})
  }
  post(model : Car): Observable<Car> {
    return this.http.post<Car>({url:API_URL ,body: model});
  }
  put(model : Car): Observable<Car> {
    return this.http.put<Car>({url:API_URL+`/${model._id}` ,body: model});
  }
  delete(id: string): Observable<Car> {
    return this.http.delete<Car>({url:API_URL+`/${id}` });
  }
  getNext(id: string): Observable<Car> {
    const action = "/getNext";
    return this.http.get<Car>({url:API_URL+action+`/${id}`});
  }
  getPrevious(id: string): Observable<Car> {
    const action = "/getPrevious";
    return this.http.get<Car>({url:API_URL+action+`/${id}`});
  }
  getFirst(id: string): Observable<Car> {
    const action = `/getFirst`;
    return this.http.get<Car>({url:API_URL+action});
  }
  // getLast(id: string): Observable<Car> {
  //   const action = `/getLast`;
  //   return this.http.get<Car>({url:API_URL+action});
  // }
}
