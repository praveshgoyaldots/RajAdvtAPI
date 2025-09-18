import { OTPDialogComponent } from "./../../../otp-dialog/otp-dialog.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import {
  IndexModel,
  PermissionModel
} from "src/app/Shared/Model/general-model";
import { OrderSubTypeMasterService } from "src/app/Shared/Service/order-sub-type-master.service";
import { AddUpdateOrdersubtypeComponent } from "./add-update-ordersubtype/add-update-ordersubtype.component";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { OrderSubTypeMasterViewModel } from "src/app/Shared/Model/Master/order-SubType-Master-model";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: "app-order-subtype-master",
  templateUrl: "./order-subtype-master.component.html",
  styleUrls: ["./order-subtype-master.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class OrderSubtypeMasterComponent implements OnInit {
  //#region Variable
  listModel: OrderSubTypeMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "TypeName",
    "Name",
    "NameHindi",
    "CreatedByName",
    "ModifiedDate",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "TypeName", Text: "Government Order Type" },
    // { Value: "Name", Text: "Name" },
    { Value: "CreatedByName", Text: "Created By" },
    // { Value: "NameHindi", Text: "Name In Hindi" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/orderSubtype",
    "/orderSubtype/add",
    "",
    "/orderSubtype/edit"
  );
  indexModel: IndexModel;
  totalRecords: number;
  fromDate: Date | string;
  toDate: Date | string;
  //#endregion
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _orderSubTypeMasterService: OrderSubTypeMasterService
  ) {
    this._parentApi.setpagelayout(
      "Document Sub Type Master:",
      "",
      "",
      "",
      true
    );
    this.indexModel = new IndexModel();
  }
  //#endregion

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    

        this._orderSubTypeMasterService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <OrderSubTypeMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<OrderSubTypeMasterViewModel>(
            this.listModel
          );
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
    const _dialogRef = this._dialog.open(AddUpdateOrdersubtypeComponent, {
      width: "500px",
      data: Id,
      disableClose: true
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
            disableClose: true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._orderSubTypeMasterService.ChangeActiveStatus(id).subscribe(
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
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  //   OnStatusClick(Id) {
  
  //     const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //       width: '350px',
  //       data: "Do you sure! want to Update Status of this record?",
  //       disableClose:true
  //     });
  //     dialogRef.afterClosed().subscribe(result => {

  //       if (result) {
  //         this._orderSubTypeMasterService.ChangeActiveStatus(Id).subscribe(
  //           data => {

  //             if (
  //               (data.IsSuccess)
  //             ) {
  //               this.GetList();
  //               this._alertService.success(data.Message);

  //             }
  //           },
  //           error => {
  //             this._commonService.ScrollingTop();
  //             this._alertService.error(error.message);
  //           }
  //         );
  //       }
  //     });

  //   }

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


  searchClick(){

    if (this.fromDate) {
      const uTCFromDate = new Date(
      Date.UTC(
      new Date(this.fromDate).getFullYear(),
      new Date(this.fromDate).getMonth(),
      new Date(this.fromDate).getDate()
      )
      )
      this.fromDate = uTCFromDate;
      }

      if (this.toDate) {
      const uTCToDate = new Date(
      Date.UTC(
      new Date(this.toDate).getFullYear(),
      new Date(this.toDate).getMonth(),
      new Date(this.toDate).getDate()
      )
      )
      this.toDate = uTCToDate;
      }


    if ( this.fromDate  &&  this.toDate ) {
      this.indexModel.AdvanceSearchModel = { FromDate: this.fromDate,ToDate: this.toDate };
    } else if( this.fromDate ){
      this.indexModel.AdvanceSearchModel = { FromDate: this.fromDate };
    } else if( this.toDate ){
      this.indexModel.AdvanceSearchModel = { ToDate: this.toDate };
    }
    this.GetList();
  }

  clearClick(){
    this.fromDate = null;
    this.toDate = null;
    this.indexModel = new IndexModel();
    this.GetList();
  }
  //#endregion
}
