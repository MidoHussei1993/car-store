import { Component, OnInit } from '@angular/core';
import { FilterParams, Mark } from 'src/app/shared/models';
import { SwalService } from 'src/app/core/services/swal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MarkService } from 'src/app/shared/services/api/mark.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-list-mark',
  templateUrl: './list-mark.component.html',
  styleUrls: ['./list-mark.component.scss'],
})
export class ListMarkComponent implements OnInit {
  dataList: Mark[] = [];
  filter = new FilterParams();
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  busyLoading: boolean = false;
  properties: string[] = ['name'];
  titles: string[] = ['name', 'choices'];
  constructor(
    private markService: MarkService,
    private swalService: SwalService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filter.pageNumber = 1;
    this.filter.pageSize = 10;
    this.filter.model = 'mark';
    this.filter.searchValue = ' ';
    this.GetAll();
  }

  async canDeactivate() {
    return true;
  }
  GetAll() {
    this.markService.get(this.filter).subscribe(
      (res) => {
        this.dataList = res.result;
        this.totalNumberOfItems = res.pagination.totalItems;
        this.totalNumberOfPages = res.pagination.totalPages;
        this.filter.pageNumber = res.pagination.currentPage;
        this.filter.pageSize = res.pagination.pageSize;
      },
      (err) => {
        this.busyLoading = false;
        let errorMessage = err.text || 'لا يوجد بيانات';
        this.swalService.NotifierError(errorMessage);
        this.dataList = [];
        this.totalNumberOfItems = 0;
        this.totalNumberOfPages = 0;
        this.filter.pageNumber = 1;
        this.filter.pageSize = 10;
      }
    );
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
    this.filter.searchValue = '';
  }
  setPageSize(pagesize: number) {
    this.filter.pageSize = pagesize;
    this.GetAll();
  }

  navigate() {
    this.router.navigate([`/mark/add`]);
  }
  edit({ _id }) {
    this.router.navigate([`/mark/edit/${_id}`]);
  }

  delete({ _id }) {
    this.markService.delete(_id).subscribe(res => {
        this.notifier.notify('success', `${res}`);
        console.log(res)
        this.GetAll();
      },err => {
        this.busyLoading = false;
        console.log(err);
        let errorMessage = err.text || 'something is wrong on deleteing';
        this.notifier.notify('error', errorMessage);
      }
    );
  }
}
