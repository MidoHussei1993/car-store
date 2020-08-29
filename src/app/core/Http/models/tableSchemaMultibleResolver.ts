import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TableSchemaFormatted } from '../../models';
import { TableSchemaService } from '../services/table-schema.service';

@Injectable({
  providedIn: 'root'
})
export class TableSchemaMultibleResolver implements Resolve<TableSchemaFormatted[]> {
  constructor(private tableSchemaService:TableSchemaService) { }

   resolve(route: ActivatedRouteSnapshot) {
    return this.tableSchemaService.getMultiable(route.data.tableNames);
  }

}
