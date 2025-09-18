import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvSubCategoryViewModel, AdvSubCategoryModel } from 'src/app/Shared/Model/Master/AdvSubCategory.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AdvSubCategoryService } from 'src/app/Shared/Service/adv-sub-category.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { AdvertisementSubCategoryDialogComponent } from './advertisement-sub-category-dialog/advertisement-sub-category-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { PermissionModel } from 'src/app/Shared/Model/general-model';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-advertisement-sub-category',
  templateUrl: './advertisement-sub-category.component.html',
  styleUrls: ['./advertisement-sub-category.component.css']
})
export class AdvertisementSubCategoryComponent implements OnInit {
  AdvSubCategory: AdvSubCategoryModel[];
  AdvSubCategoryList: AdvSubCategoryViewModel[];


  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi','IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Advertisement Sub Cat. Name in English' }, { Value: 'NameHindi', Text: 'Advertisement Sub Cat. Name in Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/advertisementSubCategory", "/advertisementSubCategory/add", "/advertisementSubCategory/detail", "/advertisementSubCategory/update", "/advertisementSubCategory/delete");
  constructor(
    private readonly _advSubCategoryService: AdvSubCategoryService,
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
  ) {
    this._parentApi.setpagelayout(" Advertisement Sub Category :", "add", "Create", "master/advertisementSubCategory", true);
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._advSubCategoryService.GetList().subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          this.AdvSubCategoryList = <AdvSubCategoryViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<AdvSubCategoryViewModel>(this.AdvSubCategoryList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OpenDialog(Id) {

    const _dialogRef = this._dialog.open(AdvertisementSubCategoryDialogComponent, {
      width: "500px",
      data: Id
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }

  OnDelete(Id) {

    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._advSubCategoryService.DeleteAdvSubCategory(Id).subscribe(
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

              this._advSubCategoryService.ChangeActiveStatus(id).subscribe(
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
  //       this._advSubCategoryService.ChangeActiveStatus(Id).subscribe(
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
