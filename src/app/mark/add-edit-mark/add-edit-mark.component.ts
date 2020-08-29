import { Component, OnInit, ViewChild } from '@angular/core';
import { Mark } from 'src/app/shared/models';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalService } from 'src/app/core/services/swal.service';
import { MarkService, ObjectsOperationsService } from 'src/app/shared/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-mark',
  templateUrl: './add-edit-mark.component.html',
  styleUrls: ['./add-edit-mark.component.scss']
})
export class AddEditMarkComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;

  //rank total count - used to navigate between different page ids (next, previous)
  rank: number;
  totalCount: number =0;
  isEdit: boolean = false;
  busyLoading: boolean = false;
  formSubmitted: boolean = false;
  mainObject: Mark;
  mainObjectBackup: Mark;
  isFormChanged: boolean = false;
  pageURL: string = '/mark';
  constructor(
    private notifier: NotifierService,
    private componentMainService: MarkService,
    private router: Router,
    private route: ActivatedRoute,
    private objectOperator: ObjectsOperationsService,
    private swalService: SwalService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.mainObject = new Mark();
    this.mainObjectBackup = new Mark();
    const params = this.route.snapshot.params;
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.state === 'first') {
      this.isEdit = true;
      this.getFirst();
    } else if (queryParams.state === 'last') {
      this.isEdit = true;
      this.getLast();
    } else {
      if (params.id || params.id == 0) {
        this.isEdit = true;
        this.getById(params.id);
      } else {
        this.navToCreate();
      }
    }
  }
  //navigatetion Section
  getNext() {
    if (this.isFormChanged) {
      this.swalService.navigationConfirmation().then((result) => {
        if (result) {
          this.form.reset();
          this.componentMainService
            .getNext(this.mainObject._id)
            .subscribe(
              this.setClientFromResponseForNavigation.bind(this),
              this.getClintErrorHandler.bind(this)
            );
        }
      });
    } else {
      this.componentMainService
        .getNext(this.mainObject._id)
        .subscribe(
          this.setClientFromResponseForNavigation.bind(this),
          this.getClintErrorHandler.bind(this)
        );
    }
  }
  getPrevious() {
    if (this.isFormChanged) {
      this.swalService.navigationConfirmation().then((result) => {
        if (result) {
          this.form.reset();
          this.componentMainService
            .getPrevious(this.mainObject._id)
            .subscribe(
              this.setClientFromResponseForNavigation.bind(this),
              this.getClintErrorHandler.bind(this)
            );
        }
      });
    } else {
      this.componentMainService
        .getPrevious(this.mainObject._id)
        .subscribe(
          this.setClientFromResponseForNavigation.bind(this),
          this.getClintErrorHandler.bind(this)
        );
    }
  }
  //get first / last -- check if page is edit just change url else if page is create navigate to edit
  getFirst() {
    if (!this.isEdit) {
      this.swalService.navigationConfirmation().then((result) => {
        if (result) {
          this.form.reset();
          this.componentMainService
            .getFirst()
            .subscribe(
              this.setClientFromResponseForNavigation.bind(this),
              this.getClintErrorHandler.bind(this)
            );
          this.isEdit = true;
        }
      });
    } else {
      if (this.isEdit) {
        this.componentMainService
          .getFirst()
          .subscribe(
            this.setClientFromResponseForNavigation.bind(this),
            this.getClintErrorHandler.bind(this)
          );
      } else {
        this.router.navigate([this.pageURL + '/edit/false'], {
          queryParams: { state: 'first' },
        });
      }
    }
  }
  getLast() {
    if (!this.isEdit) {
      this.swalService.navigationConfirmation().then((result) => {
        if (result) {
          this.form.reset();
          this.componentMainService
            .getLast()
            .subscribe(
              this.setClientFromResponseForNavigation.bind(this),
              this.getClintErrorHandler.bind(this)
            );
          this.isEdit = true;
        }
      });
    } else {
      if (this.isEdit) {
        this.componentMainService
          .getLast()
          .subscribe(
            this.setClientFromResponseForNavigation.bind(this),
            this.getClintErrorHandler.bind(this)
          );
      } else {
        this.router.navigate([this.pageURL + '/edit/false'], {
          queryParams: { state: 'last' },
        });
      }
    }
  }

  //navigate to create page if page is create
  navToCreate() {
    if (this.isEdit) {
      if (this.isFormChanged) {
        this.swalService.navigationConfirmation().then((result) => {
          if (result) {
            this.form.reset();
            this.router.navigate([this.pageURL + '/add']);
          }
        });
      } else {
        this.reset();
        this.router.navigate([this.pageURL + '/add']);
      }
    } else {
      this.reset();
    }
  }

  getById(id: string) {
    this.componentMainService
      .getById(id)
      .subscribe(
        this.setClientFromResponse.bind(this),
        this.getClintErrorHandler.bind(this)
      );
  }
  
  //response function
  setClientFromResponseForNavigation(res: Mark) {
    this.location.replaceState(
      this.pageURL + `/edit/${res._id}`
    );
    this.setClientFromResponse(res);
  }
  setClientFromResponse(res: Mark) {
    this.mainObject = res;
    this.mainObjectBackup = Object.assign({}, this.mainObject);
    this.subscribeToFormChanges();
  }
  getClintErrorHandler(err) {
    const errorMessage = err.message || 'غير موجود';
    this.notifier.notify('error', errorMessage);
  }
  subscribeToFormChanges() {
   this.form.valueChanges.subscribe((res) => {
      this.setIsFormChangedTrue();
    });
    this.isFormChanged = false;
  }
  // form changed when add or cancel
  setIsFormChangedTrue() {
    if (!this.mainObject) return;
    if (this.isFormChanged === false) {
      if (this.form.dirty) {
        localStorage.setItem('form-changed', 'true');
        return (this.isFormChanged = true);
      }
      this.isFormChanged = !this.objectOperator.areEqualObjects(
        this.mainObject,
        this.mainObjectBackup
      );
      localStorage.setItem('form-changed', String(this.isFormChanged));
    }
  }
  reset() {
    this.mainObject = new Mark();
    this.isEdit = false;
    this.formSubmitted = false;
  }
  save(...args) {
    this.formSubmitted = true;
    if (args.includes(true)) {
      this.swalService.NotifierError('قم من فضلك باكمال البيانات المطلوبه');
      return;
    }
    this.busyLoading = true;
    if (this.isEdit) {
      this.update();
    } else {
      this.create();
    }
  }
  cancel() {
    if (this.isEdit) {
      this.mainObject = Object.assign({}, this.mainObjectBackup);
    } else {
      this.reset();
    }
  }
  create() {
    this.componentMainService.post(this.mainObject).subscribe(
      (res) => {
        this.notifier.notify('success', 'Done');
        this.busyLoading = false;
        this.formSubmitted = false;
        this.reset();
        this.navToCreate();
      },
      (err) => {
        this.formSubmitted = false;
        this.busyLoading = false;
        let errorMessage = err.message || 'something wrong in receiving  data';
        this.notifier.notify('error', errorMessage);
      }
    );
  }
  update() {
    this.componentMainService
      .put(this.mainObject)
      .subscribe(
        (res) => {
          this.notifier.notify('success', 'Done');
          this.busyLoading = false;
          this.formSubmitted = false;
        },
        (err) => {
          this.busyLoading = false;
          let errorMessage = err.message || 'something wrong in receiving  data';
          this.notifier.notify('error', errorMessage);
        }
      );
  }
  delete() {
    this.swalService
      .showRemoveConfirmation(this.mainObject.name)
      .then((result) => {
        if (result.value) {
          this.componentMainService
            .delete(this.mainObject._id)
            .subscribe(
              (res) => {
                this.notifier.notify('success', 'تم الحذف  بنجاح');
                this.navToCreate();
              },
              (err) => {
                let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
                this.notifier.notify('error', errorMessage);
              }
            );
        }
      });
  }
}
