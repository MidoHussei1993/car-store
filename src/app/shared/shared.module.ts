import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination';
import { TableInfoComponent } from './components/table-info';
import { PageNavigatorComponent } from './components/page-navigator/page-navigator.component';
import { TableBoxComponent } from './components/table-box/table-box.component';
import { FormNavigatorComponent } from './components/form-navigator';

const components = [
  PaginationComponent,
  TableInfoComponent,
  PageNavigatorComponent,
  TableBoxComponent,
  FormNavigatorComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ...components,

  ]
})
export class SharedModule { }
