import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentReferenceViewModel } from 'src/app/Shared/Model/Master/department-reference.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DepartmentReferenceService } from 'src/app/Shared/Service/dpt-reference.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-department-reference',
  templateUrl: './department-reference.component.html',
  styleUrls: ['./department-reference.component.css']
})
export class DepartmentReferenceComponent implements OnInit {
  listModel: DepartmentReferenceViewModel[];
  dataSource: MatTableDataSource<DepartmentReferenceViewModel>;
  displayedColumns: string[] = ["index","DepartmentTitle", "Reference", "ReferenceHindi","OrderBy","IsActive", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "Reference", Text: "Reference" },
    { Value: "ReferenceHindi", Text: "Reference in Hindi" },
    { Value: "OrderBy", Text: "Order By" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/departmentreference", "/master/departmentreference/add", "", "/master/departmentreference/edit", "");
  indexModel: IndexModel;
  totalRecords: number;
  //SchemePermission: PermissionModel = this._commonService.GetPagePermission("/scheme", "/scheme/add", "/scheme/detail", "/scheme/update", "/scheme/delete", "/scheme/faq", "/scheme/monitoringparameter","/scheme/lock");
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentComponent: AppComponent,
    private readonly _departmentReferenceService: DepartmentReferenceService,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService) {
    this.Permission.AddPageAccess ? this._parentComponent.setpagelayout("Department Correspondence Copy List:", "add", "Create", "master/departmentreferenceadd") : this._parentComponent.setpagelayout("Department Correspondence Copy List :");
   
    this.indexModel = new IndexModel();
  }
  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.GetList();
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction === AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  GetList() {
    this._departmentReferenceService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <DepartmentReferenceViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<DepartmentReferenceViewModel>(this.listModel);
          if (this.indexModel.IsPostBack === false) {
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

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
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

              this._departmentReferenceService.ChangeActiveStatus(id).subscribe(
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
  //       this._departmentReferenceService.ChangeActiveStatus(Id).subscribe(
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
  //#endregion
}
