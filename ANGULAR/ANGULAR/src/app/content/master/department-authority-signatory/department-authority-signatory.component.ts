import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { DepartmentAuthoritySignatoryService } from 'src/app/Shared/Service/dpt-authority-signatory.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DepartmentAuthoritySignatoryViewModel } from 'src/app/Shared/Model/Master/departmentauthoritysignatory.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-department-authority-signatory',
  templateUrl: './department-authority-signatory.component.html',
  styleUrls: ['./department-authority-signatory.component.css']
})
export class DepartmentAuthoritySignatoryComponent implements OnInit {
  listModel: DepartmentAuthoritySignatoryViewModel[];
  dataSource: MatTableDataSource<DepartmentAuthoritySignatoryViewModel>;
  displayedColumns: string[] = ["index","DepartmentTitle", "Name", "Designation","IsActive", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "Name", Text: "Name" },
    { Value: "Designation", Text: "Designation" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/departmentauthoritysignatory", "/master/departmentauthoritysignatory/add", "", "/master/departmentauthoritysignatory/edit", "");

  constructor(
    private _parentComponent: AppComponent,
    private readonly _departmentAuthoritySignatoryService: DepartmentAuthoritySignatoryService,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService) {

       this.Permission.AddPageAccess ? this._parentComponent.setpagelayout("Department Authority Signatory List:", "add", "Create", "master/departmentauthoritysignatoryadd") : this._parentComponent.setpagelayout("Department Authority Signatory List :");

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
    this._departmentAuthoritySignatoryService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <DepartmentAuthoritySignatoryViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<DepartmentAuthoritySignatoryViewModel>(this.listModel);
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

  //#endregion

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

              this._departmentAuthoritySignatoryService.ChangeActiveStatus(id).subscribe(
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
  //       this._departmentAuthoritySignatoryService.ChangeActiveStatus(Id).subscribe(
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
