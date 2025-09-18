import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { AddUpdateDepartmentComponent } from "./add-update-department/add-update-department.component";
import {
  IndexModel,
  PermissionModel,
} from "src/app/Shared/Model/general-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { DepartmentService } from "src/app/Shared/Service/department.service";
import { DepartmentMasterViewModel, DepartmentReportModel, DepartmentSchemeReportModel } from "src/app/Shared/Model/Master/department.model";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";

@Component({
  selector: "app-department-master",
  templateUrl: "./department-master.component.html",
  styleUrls: ["./department-master.component.css"],
})
export class DepartmentMasterComponent implements OnInit {
  //#region Variable
  listModel: DepartmentMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "Code",
    "AdmDepartmentTitle",
    "DepartmentCategoryName",
    "DepartmentTitle",
    "DepartmentTitleHindi",
    "DepartmentIsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "AdmDepartmentTitle", Text: "Admin Department" },
    { Value: "DepartmentCategoryName", Text: "Department Category" },
    { Value: "DepartmentTitle", Text: "Department Name in English" },
    //{ Value: "DepartmentTitleHindi", Text: "Department Name In Hindi" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/DepartmentMaster",
    "/master/DepartmentMaster/add",
    "",
    "/master/DepartmentMaster/edit",
    "",
    "master/DepartmentMaster/TransferallMenu"
  );
  indexModel: IndexModel;
  totalRecords: number;
  isActive: number = 1;
  //#endregion

  //#region <Report Scheme and department Variable>

departmentReportList: DepartmentReportModel[];
departmentSchemeReportList: DepartmentSchemeReportModel[];

  //#endregion <Report Scheme and department Variable>

  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _departmentService: DepartmentService
  ) {
    //  this._parentApi.setpagelayout("Department Master:", "", "", "", true);
    // this._parentApi.setpagelayout(
    //   "Department Master List:",
    //   "add",
    //   "Create",
    //   "/master/DepartmentMasteradd"
    // );
    this.Permission.AddPageAccess
      ? this._parentApi.setpagelayout(
        "Department Master List:",
        "add",
        "Create",
        "/master/DepartmentMasteradd"
        )
      : this._parentApi.setpagelayout("Department Master List :");

    this.indexModel = new IndexModel();
    
    this.Permission;
  }
  //#endregion

  ngOnInit() {
    this.GetList();
    this.getDepartmentReport();
    this.getDepartmentSchemeReport();
  }

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.GetList();
  }

  GetList() {
    this.indexModel.OrderByAsc = 1;
    this._departmentService.GetList(this.indexModel, this.isActive).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.listModel = <DepartmentMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<DepartmentMasterViewModel>(
            this.listModel
          );
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  OnStatusClick(id) {
  this._departmentService.ChangeActiveStatus(id).subscribe(
    (data) => {
      if (data.IsSuccess) {
        this.GetList();
        this._alertService.success(data.Message);
      } else {
        this._alertService.error(data.Message);
      }
    },
    (error) => {
      this._alertService.error(error.message);
    }
  );
  }

  TransferMenu(departmentCode) {
    this._departmentService.TransferMenuClassificationToDepartmentMenu(departmentCode).subscribe(
      (data) => {
        
        if (data.IsSuccess) {
          this.GetList();
          this._alertService.success(data.Message);
          this._commonService.ScrollingTop();
        } else {
          this._alertService.error(data.Message);
          this._commonService.ScrollingTop();
        }
      },
      (error) => {
        this._alertService.error(error.message);
        this._commonService.ScrollingTop();
      }
    );
    }


    TransferDptMenuToDepartmentSubMenu(departmentCode) {
      this._departmentService.TransferDptMenuToDepartmentSubMenu(departmentCode).subscribe(
        (data) => {
          
          if (data.IsSuccess) {
            this.GetList();
            this._alertService.success(data.Message);
            this._commonService.ScrollingTop();
          } else {
            this._alertService.error(data.Message);
            this._commonService.ScrollingTop();
          }
        },
        (error) => {
          this._alertService.error(error.message);
          this._commonService.ScrollingTop();
        }
      );
      }

  // OnStatusClick(id) {
  //   
  //   this._commonService.GenerateOTP().subscribe(
  //     (data) => {
  //       if (data.IsSuccess) {
  //         const _dialogRef = this._dialog.open(OTPDialogComponent, {
  //           width: "500px",
  //           disableClose: true,
  //         });
  //         _dialogRef.afterClosed().subscribe((result: boolean) => {
  //           if (result) {
  //             this._departmentService.ChangeActiveStatus(id).subscribe(
  //               (data) => {
  //                 if (data.IsSuccess) {
  //                   this.GetList();
  //                   this._alertService.success(data.Message);
  //                 } else {
  //                   this._alertService.error(data.Message);
  //                 }
  //               },
  //               (error) => {
  //                 this._alertService.error(error.message);
  //               }
  //             );
  //           }
  //         });
  //       } else {
  //         this._alertService.error(data.Message);
  //       }
  //     },
  //     (error) => {
  //       this._alertService.error(error.message);
  //     }
  //   );
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

  getActiveDeActiveData(data) {
    
    this.isActive = data;
    this.GetList();
  }

  //#endregion

  //#region <Report Scheme and department>

  printDepartment(id){
          // print START
          let printContents , popupWin ;
  printContents = document.getElementById(id).outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Report</title>
            <style>
            table th,table td{
              border: 1px solid black;
            }
            table{
              border-collapse: collapse;
            }
            span{
              font-weight: bold;
              margin-bottom: 10px;
            }
            </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();

    // print END
  }

  getDepartmentReport() {
    this._departmentService.GetDepartmentReport().subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.departmentReportList = <DepartmentReportModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  getDepartmentSchemeReport() {
    this._departmentService.GetDepartmentSchemeReport().subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.departmentSchemeReportList = <DepartmentSchemeReportModel[]>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  //#endregion <Report Scheme and department>


}
