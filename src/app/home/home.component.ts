import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarService } from '../shared/services/api/car.service';
import { Car } from '../shared/models';
import { Store, select } from '@ngrx/store';
import { selectLastCarListProperty } from '../layout/state/reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy{
 
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    navSpeed: 2500,
    animateIn:'fadeIn',
    animateOut:'fadeOut',
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  isShow: boolean= true;

  lastCars: any[] = []
  private ngUnsubscribe = new Subject();

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.isShow = !this.isShow
    }, 10000);
    this.getLastCar();
  }
  getLastCar(){
    this.store
      .pipe(select(selectLastCarListProperty)).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res=>{
        this.lastCars = res;
        console.table(this.lastCars)
      })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
}
