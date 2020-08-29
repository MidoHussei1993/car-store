import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';
import { VehicleComponent } from './vehicle.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddEditVehicleComponent, ListVehicleComponent, VehicleComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class VehicleModule { }
