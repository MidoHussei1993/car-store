import { Component, OnInit } from '@angular/core';
import { Car, FilterParams } from 'src/app/shared/models';
import { SwalService } from 'src/app/core/services/swal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/shared/services/api/car.service';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.scss']
})
export class ListVehicleComponent implements OnInit {
  dataList:Car[] = [];
  filter = new FilterParams();
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  busyLoading: boolean = false;
  properties: string[] = ['_id','model','mark','fuel','drive','license']
  titles: string[] = ['serial','model','mark','fuel','drive','license', 'choices']
  constructor( 
       private carService:CarService,
    private swalService : SwalService,
    private router : Router,
    ) { }

    ngOnInit(): void {
      this.filter.pageNumber = 1;
      this.filter.pageSize = 10;
      this.filter.model = 'car';
      this.filter.searchValue = '';
      this.GetAll();
 
    }
  

    GetAll() {
      this.carService.get(this.filter)
      .subscribe(res => {
        this.dataList = res.result;
        console.table(res.result)
        this.totalNumberOfItems = res.pagination.totalItems;
        this.totalNumberOfPages = res.pagination.totalPages;
        this.filter.pageNumber = res.pagination.currentPage;
        this.filter.pageSize = res.pagination.pageSize;
      },err =>{
        this.busyLoading = false;
        let errorMessage = err.message ||'لا يوجد بيانات';
        this.swalService.NotifierError( errorMessage);
        this.dataList = [];
        this.totalNumberOfItems = 0;
        this.totalNumberOfPages = 0;
        this.filter.pageNumber = 1;
        this.filter.pageSize = 10;
      })
  }
  
  changePageNumber(pageNumber) {
      this.filter.pageNumber = pageNumber;
      this.GetAll();
  }
  
  changePageSize(pageSize) {
      this.filter.pageSize = pageSize;
      this.GetAll();
  }
  
  search(event) {
      this.filter.pageSize = 10;
      this.filter.searchValue = event;
      this.GetAll();
  }
  
  removeSearch() {
      this.filter.searchValue = ''
  }
  setPageSize(pagesize: number) {
      this.filter.pageSize = pagesize;
      this.GetAll();
  }
  
  navigate(){
    this.router.navigate([`/vehicle/add`]);
  }
  edit({_id}){
    this.router.navigate([`/vehicle/edit/${_id}`]);
  }
  
  delete({_id}){
    this.carService.delete(_id).subscribe(res=>
    {
      this.swalService.Notifier( "تم الحذف");
      this.GetAll();
  
    }
    ,err=>{
      this.busyLoading = false;
        let errorMessage = err.message ||'حدث خطأ اثناء الحذف';
        this.swalService.NotifierError( errorMessage);
  
    });
  }
  }
  