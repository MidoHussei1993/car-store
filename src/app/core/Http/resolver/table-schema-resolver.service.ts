import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TableSchemaFormatted, TableSchemaState } from '../../models';
import { TableSchemaService } from '../services/table-schema.service';
import { Store, select } from '@ngrx/store';
import * as TableScheamAction from '../../state/action/table-schema.action';
import * as TableScheamSelector from '../../state/reducer/table-schema.reducer';
import { tap, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TableSchemaResolver implements Resolve<TableSchemaFormatted> {
  munu: any;
  constructor(
    private tableSchemaService: TableSchemaService,
    private store: Store<TableSchemaState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getTableSchema(route.data.tableName);
    if(!this.munu){
      return this.tableSchemaService.get(route.data.tableName).pipe(
        tap((res: TableSchemaFormatted) => {
          this.store.dispatch(
            new TableScheamAction.ADD_TABLE_SCHEMA({
              data: res,
              propertyName: route.data.tableName,
            })
          );
        })
      );
    }else{
      return this.munu;
    }
    
  }
  getTableSchema(currentRoute){
    this.store.pipe(select(TableScheamSelector.selectSchemaProperty, currentRoute)).pipe(take(1))
    .subscribe(res =>{
      this.munu = res;
    })
  }



}
