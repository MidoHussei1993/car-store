import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models';
import { CarService } from 'src/app/shared/services/api/car.service';
import { Store } from '@ngrx/store';
import { LAST_ADDED_CAR } from '../state/action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lastCars: any[] = [];
  
  constructor(
    private carService: CarService,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.getLastAddedCar();
  }
  getLastAddedCar(){
    this.carService.getLast().subscribe(res =>{
      this.lastCars = res;
      this.store.dispatch(new LAST_ADDED_CAR(res));
    })
  }

}
