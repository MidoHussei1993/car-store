import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkRoutingModule } from './mark-routing.module';
import { AddEditMarkComponent } from './add-edit-mark/add-edit-mark.component';
import { ListMarkComponent } from './list-mark/list-mark.component';
import { MarkComponent } from './mark.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddEditMarkComponent, ListMarkComponent, MarkComponent],
  imports: [
    CommonModule,
    MarkRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class MarkModule { }
