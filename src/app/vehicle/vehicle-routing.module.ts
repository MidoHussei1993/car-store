import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleComponent,
    children: [
      {path:'',redirectTo:'list',pathMatch:'full'},
      {
        path: 'list',
        component: ListVehicleComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditVehicleComponent,
        // canDeactivate: [NavigateConfirmationGuard]
      },
      {
        path: 'add',
        component: AddEditVehicleComponent,
        // canDeactivate: [NavigateConfirmationGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
