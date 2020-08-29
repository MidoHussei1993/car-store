import { Injectable } from '@angular/core';
import { Observable, observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { END_POINTS } from '../globals';
import { TableSchemaFormatted } from 'src/app/shared/models';
import { TableSchema } from '../../models';
import { HttpClientService } from '../http-client.service';

const API_URL = END_POINTS.tableSchema;

@Injectable({
  providedIn: 'root',
})
export class TableSchemaService {
  constructor(private http: HttpClientService) {}

  getMultiable(tableNames: string[]): Observable<TableSchemaFormatted[]> {
    let arrObs = [];
    for (let item of tableNames) {
      arrObs.push(this.get(item));
    }
    return forkJoin(arrObs as TableSchemaFormatted[]);
  }

  // we will use this function
  get(tableName: string): Observable<TableSchemaFormatted> {
    return this.http
      .get<TableSchema[]>({ url: API_URL + `/${tableName}`})
      .pipe(
        map((res) => {
          let tableSchemeformatted: TableSchemaFormatted = {};
          if (!res) {
            return tableSchemeformatted;
          }
          for (let item of res) {
            item.AllowDBNull == 'NO'
              ? (item.AllowDBNull = false)
              : (item.AllowDBNull = true);
            tableSchemeformatted[item.ColumnName] = {
              isRequired: !item.AllowDBNull,
              dataType: this.isNumberDataType(item.DataTypeName)
                ? 'number'
                : 'text',
              maxLength: item.ColumnSize,
            };
          }
          return tableSchemeformatted;
        })
      );
  }
  isNumberDataType(dataTypeName) {
    if (
      dataTypeName == 'smallint' ||
      dataTypeName == 'int' ||
      dataTypeName == 'tinyint' ||
      dataTypeName == 'decimal'
    ) {
      return true;
    }
    return false;
  }
}
