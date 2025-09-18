import { Component, OnInit, ViewChild } from "@angular/core";
import { ComplainEntryTypeMasterViewModel } from "src/app/Shared/Model/Master/complain-entry-type-master-model";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { IndexModel, PermissionModel } from "src/app/Shared/Model/general-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { ComplainEntryTypeMasterService } from "src/app/Shared/Service/complain-entry-type-master.service";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AddUpdateEntryTypeComponent } from "./add-update-entry-type/add-update-entry-type.component";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";


@Component({
  selector: 'app-entry-type',
  templateUrl: './entry-type.component.html',
  styleUrls: ['./entry-type.component.css']
})
export class EntryTypeComponent implements OnInit {

  //#region Variable
  listModel: ComplainEntryTypeMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = ['index', 'Name', 'NameHindi', 'IsActive', 'Action'];
  ViewdisplayedColumns: ColumnHeaderModel[] = [{ Value: 'Name', Text: 'Entry Type Name' }, { Value: 'NameHindi', Text: 'Entry Type Name In Hindi' }];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission("/compliant/master/entrytype", "/compliant/master/entrytype/add", "", "/compliant/master/entrytype/edit", "");
  indexModel: IndexModel;
  totalRecords: number;
  //#endregion
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _router: Router,
    private readonly _complainEntryTypeMasterService: ComplainEntryTypeMasterService) {
    this._parentApi.setpagelayout("", "", "", "", true);
    this.indexModel = new IndexModel();

  }
  //#endregion

  ngOnInit() {
    this.GetList();
  }


  GetList() {
    this._complainEntryTypeMasterService.GetList(this.indexModel).subscribe(
      data => {
        if ((data.IsSuccess)) {
          this.listModel = <ComplainEntryTypeMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<ComplainEntryTypeMasterViewModel>(this.listModel);
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
    const _dialogRef = this._dialog.open(AddUpdateEntryTypeComponent, {
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
          const _dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            width: "50%",
            data: GlobalMessagesModel.ConfirmStatusChanged
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._complainEntryTypeMasterService.ChangeActiveStatus(id).subscribe(
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
