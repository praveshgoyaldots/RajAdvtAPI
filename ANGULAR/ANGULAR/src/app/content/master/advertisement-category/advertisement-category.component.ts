import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvCategoryViewModel, AdvCategoryModel } from 'src/app/Shared/Model/Master/AdvCategory.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { AdvCategoryService } from 'src/app/Shared/Service/adv-category.service';
import { AdvertisementCategoryDialogComponent } from './advertisement-category-dialog/advertisement-category-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-advertisement-category',
  templateUrl: './advertisement-category.component.html',
  styleUrls: ['./advertisement-category.component.css']
})
export class AdvertisementCategoryComponent implements OnInit {
  AdvCategory: AdvCategoryModel[];
  AdvCategoryList: AdvCategoryViewModel[];
  indexModel: IndexModel;
  totalRecords: number;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi', 'IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Advertisement Name in English' }, { Value: 'NameHindi', Text: 'Advertisement Name in Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/achievement-category", "/achievement-category/add", "/achievement-category/detail", "/achievement-category/update", "/achievement-category/delete");
  constructor(
    private readonly _advCategoryService: AdvCategoryService,
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,

  ) {
    this._parentApi.setpagelayout(' Advertisement Category :', 'add', 'Create', 'master/advertisementCategory', true);
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._advCategoryService.GetList(this.indexModel).subscribe(
      data => {

        if (data.IsSuccess) {
          this.AdvCategoryList = <AdvCategoryViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AdvCategoryViewModel>(this.AdvCategoryList);
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  OpenDialog(Id) {
    //
    const _dialogRef = this._dialog.open(AdvertisementCategoryDialogComponent, {
      width: '500px',
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      //
      if (result) {
        this.GetList();
      }
    });
  }

  OnDelete(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you sure! want to delete this record?'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._advCategoryService.DeleteAdvCategory(Id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this.GetList();
              this._alertService.success(data.Message);

            }
          },
          error => {
            this._commonService.ScrollingTop();
            this._alertService.error(error.message);
          }
        );
      }
    });



  }
  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }
  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }


  OnActiveStatus(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {

          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose:true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._advCategoryService.ChangeActiveStatus(id).subscribe(
                data => {
                  if (data.IsSuccess) {
                    this.GetList();
                    this._alertService.success(data.Message);
                  } else {
                    this._alertService.error(data.Message);
                  }
                },
                error => {
                  this._alertService.error(error.message);
                }
              );

            }
          });
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  // OnActiveStatus(Id) {

  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: "Do you sure! want to Update this record?",
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this._advCategoryService.ChangeActiveStatus(Id).subscribe(
  //         data => {

  //           if (
  //             (data.IsSuccess)
  //           ) {
  //             this.GetList();
  //             this._alertService.success(data.Message);

  //           }
  //         },
  //         error => {
  //           this._commonService.ScrollingTop();
  //           this._alertService.error(error.message);
  //         }
  //       );
  //     }
  //   });

  // }
}
