import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMarkComponent } from './list-mark/list-mark.component';
import { AddEditMarkComponent } from './add-edit-mark/add-edit-mark.component';
import { MarkComponent } from './mark.component';


const routes: Routes = [
  {
    path: '',
    component: MarkComponent,
    children: [
      {path:'',redirectTo:'list',pathMatch:'full'},
      {
        path: 'list',
        component: ListMarkComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditMarkComponent,
        // canDeactivate: [NavigateConfirmationGuard]
      },
      {
        path: 'add',
        component: AddEditMarkComponent,
        // canDeactivate: [NavigateConfirmationGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkRoutingModule { }
