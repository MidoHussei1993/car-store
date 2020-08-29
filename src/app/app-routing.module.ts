import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'mark',
    loadChildren: () => import('./mark/mark.module').then(m => m.MarkModule),
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
