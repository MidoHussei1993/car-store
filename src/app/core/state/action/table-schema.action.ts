import { Action } from '@ngrx/store';
import { Permission, TableSchemaState } from '../../models/index';
import { TableSchemaFormatted } from 'src/app/shared/models';

export interface TableSchemaPayLoad{
    propertyName: string;
    data: TableSchemaFormatted;
}
export enum TableSchemaActionTypes {
  ADD_TABLE_SCHEMA = '[Table-Schema] Load Permissions',
}

// tslint:disable-next-line: class-name
export class ADD_TABLE_SCHEMA implements Action {
  readonly type = TableSchemaActionTypes.ADD_TABLE_SCHEMA;
  constructor(public payload: TableSchemaPayLoad){}

}

export type TableSchemaActions = ADD_TABLE_SCHEMA;
