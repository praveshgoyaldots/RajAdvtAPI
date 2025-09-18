import { Component, OnInit, ViewChild } from '@angular/core';
import { CCCategoryMasterViewModel } from 'src/app/Shared/Model/Master/cc-category-master-model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router } from '@angular/router';
import { CCCategoryService } from 'src/app/Shared/Service/cc-category.service';
import { AddUpdateCccategoryComponent } from './add-update-cc-category/add-update-cc-category.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-cccategory',
  templateUrl: './cccategory.component.html',
  styleUrls: ['./cccategory.component.css']
})
export class CCCategoryComponent implements OnInit {

  //#region Variable
  listModel: CCCategoryMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'DepartmentTitle', 'Name', 'NameHindi','IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'DepartmentTitle', Text: 'Department' },{ Value: 'Name', Text: 'Name' }, { Value: 'NameHindi', Text: 'Name In Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/cc-category", "/cc-category/add", "","/cc-category/update");
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion

  //#region constructor
  constructor(private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _cCCategoryService: CCCategoryService) {
    this._parentApi.setpagelayout("CC Category:", "", "", "", true);
    this.indexModel = new IndexModel();

  }
  //#endregion

  //#region  Method

  ngOnInit() {
    this.GetList();
  }

  GetList() {

    this._cCCategoryService.GetList(this.indexModel).subscribe(
      data => {

        if (
          (data.IsSuccess)
        ) {
          
          this.listModel = <CCCategoryMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<CCCategoryMasterViewModel>(this.listModel);
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
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

    const _dialogRef = this._dialog.open(AddUpdateCccategoryComponent, {
      width: "500px",
      data: Id,
      disableClose:true
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.GetList();
      }
    });
  }


  OnStatusClick(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {

          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose:true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {

            if (result) {

              this._cCCategoryService.ChangeActiveStatus(id).subscribe(
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


  // OnStatusClick(Id) {

  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: "Do you sure! want to Update Status of this record?",
  //     disableClose:true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this._cCCategoryService.ChangeActiveStatus(Id).subscribe(
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

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }
  //#endregion

}
