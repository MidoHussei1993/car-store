import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/reducer/permission.reducer';
import * as tableSchemaReducer from './state/reducer/table-schema.reducer';
import { PermissionEffects } from './state/effect/permission.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('permission', reducer),
    StoreModule.forFeature('tableSchema', tableSchemaReducer.reducer),
    EffectsModule.forFeature([PermissionEffects])
  ]
})
export class CoreModule { }
