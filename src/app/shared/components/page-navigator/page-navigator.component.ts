import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('Pagetitle') Pagetitle = '';
  // tslint:disable-next-line: no-input-rename
  @Input('module') moduleTitle = '';
  // tslint:disable-next-line: no-input-rename
  @Input('active') activetitle = '';
  @Input('mainIcon') mainIcon?
  @Input('subIcon') subIcon?



  constructor() { }

  ngOnInit(): void {
  }

}
