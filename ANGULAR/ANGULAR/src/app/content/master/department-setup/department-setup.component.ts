import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentSetupViewModel } from 'src/app/Shared/Model/Master/department-setup.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { DepartmentSetupService } from 'src/app/Shared/Service/dpt-setup.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-department-setup',
  templateUrl: './department-setup.component.html',
  styleUrls: ['./department-setup.component.css']
})
export class DepartmentSetupComponent implements OnInit {
  listModel: DepartmentSetupViewModel[];
  dataSource: MatTableDataSource<DepartmentSetupViewModel>;
  displayedColumns: string[] = ["index", "DepartmentTitle","OfficeName","Address1", "Address2","FooterLine1","FooterLine2","IsActive", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "OfficeName", Text: "Office Name" },
    { Value: "Address1", Text: "Header in English 1" },
    { Value: "Address2", Text: "Header in English 2" },
    { Value: "FooterLine1", Text: "Footer Line in English 1" },
    { Value: "FooterLine2", Text: "Footer Line in English 2" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/departmentsetup", "/master/departmentsetup/add", "", "/master/departmentsetup/edit", "");
  totalRecords: number;


  constructor(
    private _parentComponent: AppComponent,
    private readonly _departmentSetupService: DepartmentSetupService,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService) {

    this.Permission.AddPageAccess ? this._parentComponent.setpagelayout("Department Setup List :", "keyboard_backspace", "Back To List", "master/departmentsetupadd") : this._parentComponent.setpagelayout("Department Setup List :");

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
    this._departmentSetupService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <DepartmentSetupViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<DepartmentSetupViewModel>(this.listModel);
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

              this._departmentSetupService.ChangeActiveStatus(id).subscribe(
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
  //       this._departmentSetupService.ChangeActiveStatus(Id).subscribe(
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
