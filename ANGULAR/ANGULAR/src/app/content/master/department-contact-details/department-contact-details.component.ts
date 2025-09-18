import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentContactDetailsViewModel } from 'src/app/Shared/Model/Master/department-contact-details.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentContactDetailsService } from 'src/app/Shared/Service/dpt-contact-details.service';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-department-contact-details',
  templateUrl: './department-contact-details.component.html',
  styleUrls: ['./department-contact-details.component.css']
})
export class DepartmentContactDetailsComponent implements OnInit {

//#region <Variable>

listModel: DepartmentContactDetailsViewModel[];
indexModel: IndexModel;
totalRecords: number;
dataSource: MatTableDataSource<DepartmentContactDetailsViewModel>;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "DesignationName",
  "OfficerName",
  "MobileNo",
  "Email",
  "SSOID",
  "IsVisibleOnFront",
  "Status",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "DepartmentTitle", Text: "Department" },
 // { Value: "DesignationName", Text: "Designation" },
  { Value: "OfficerName", Text: "Officer Name" },
  { Value: "MobileNo", Text: "Mobile No." },
  { Value: "Email", Text: "Email" },
  { Value: "SSOID", Text: "SSOID" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();
permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/dptcontactdetails",
  "/master/dptcontactdetails/add", "",
  "/master/dptcontactdetails/edit"
);

//#endregion <Variable>

//#region <constructor>

constructor(
  private readonly _alertService: AlertService,
  private readonly _parentApi: AppComponent,
  private readonly _commonService: CommonService,
  private readonly _departmentContactService: DepartmentContactDetailsService,
  private readonly _dialog: MatDialog
) {
  this.permission.AddPageAccess
  ? this._parentApi.setpagelayout(
    "Department Contact Details List:",
    "add",
    "Add",
    "master/dptcontactdetailsaddupdate"
    )
  : this._parentApi.setpagelayout("Department Contact Details List :");
  this.indexModel = new IndexModel();
}

//#endregion <constructor>

//#region <Methods>

ngOnInit() {
  this.GetList();
}

GetList() {
  
  this._departmentContactService.GetList(this.indexModel).subscribe(
    (data) => {
           if (data.IsSuccess) {
        this.listModel = <DepartmentContactDetailsViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<DepartmentContactDetailsViewModel>(
          this.listModel
        );
        if (this.indexModel.IsPostBack === false) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.totalRecords = data.Data.TotalRecords;
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
}

ChangeActiveStatusClick(id) {
    // const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //   width: "500px",
    //   disableClose: true
    // });
    // this._commonService.GenerateOTP().subscribe(
    //   data => {
    //     if (data.IsSuccess) {
    //       _dialogRef.afterClosed().subscribe((result: boolean) => {

    //         if (result) {

              this._departmentContactService.ChangeActiveStatus(id).subscribe(
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

    //         }
    //       });
    //     } else {
    //       this._alertService.error(data.Message);
    //     }
    //   },
    //   error => {
    //     this._alertService.error(error.message);
    //   }
    // );
  }

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.GetList();
  }

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

//#endregion <Methods>
}
