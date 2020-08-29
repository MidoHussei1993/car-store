import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarkComponent } from './list-mark.component';

describe('ListMarkComponent', () => {
  let component: ListMarkComponent;
  let fixture: ComponentFixture<ListMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
