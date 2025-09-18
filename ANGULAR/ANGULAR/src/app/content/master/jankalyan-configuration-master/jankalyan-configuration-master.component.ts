import { AddUpdateStatusComponent } from './../../complaint-software/Masters/status/add-update-status/add-update-status.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { PermissionModel, IndexModel } from 'src/app/Shared/Model/general-model';
import { JankalyanConfigurationMasterModel } from 'src/app/Shared/Model/Master/jankalyan-configuration-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { JankalyanConfigurationService } from 'src/app/Shared/Service/jankalyan-configuration.service';
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource
} from "@angular/material";
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-jankalyan-configuration-master',
  templateUrl: './jankalyan-configuration-master.component.html',
  styleUrls: ['./jankalyan-configuration-master.component.css']
})
export class JankalyanConfigurationMasterComponent implements OnInit {
//#region <Variable>

listModel: JankalyanConfigurationMasterModel[];
dataSource: any;
  displayedColumns: string[] = ["index", "IsDIPR_IdMandatory", "Name", "Address", "PhoneNo", "Email", "IsActive", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Name", Text: "Name" },
    { Value: "Address", Text: "Address" },
    { Value: "PhoneNo", Text: "PhoneNo" },
    { Value: "Email", Text: "Email" },
  ];
columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
Permission: PermissionModel = this._commonService.GetPagePermission(
  "/master/jan-configuraton-master",
  "/master/jan-configuraton-master/add",
  "",
  "/master/jan-configuraton-master/update"
);
indexModel: IndexModel;
totalRecords: number;

//#endregion <Variable>

//#region <Constructor>

constructor(
  private readonly _jankalyanConfigurationService: JankalyanConfigurationService,
  private readonly _commonService: CommonService,
  private readonly _alertService: AlertService,
  private _parentComponent: AppComponent,
  private _dialog: MatDialog
) {
  this.Permission.AddPageAccess
  ? this._parentComponent.setpagelayout(
      "Jankalyan Configuration List:",
      "add",
      "Add",
      "/master/jan-configuraton-master/add"
    )
  : this._parentComponent.setpagelayout("Jankalyan Configuration List:");
  this.indexModel = new IndexModel();
}

//#endregion <Constructor>

//#region <Method>

ngOnInit() {
  this.GetList();
}

  GetList() {
  this._jankalyanConfigurationService.GetList(this.indexModel).subscribe(
    data => {
      if (data.IsSuccess) {
        console.log(data.Data.Data)
        this.listModel = <JankalyanConfigurationMasterModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<JankalyanConfigurationMasterModel>(
          this.listModel
        );
        this.dataSource.paginator = this.paginator;
        this.totalRecords = data.Data.TotalRecords;
        this.dataSource.sort = this.sort;
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

onPaginateChange(event) {
  this.indexModel.Page = event.pageIndex + 1;
  this.indexModel.PageSize = event.pageSize;
  this.GetList();
}

sortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc =
    event.direction == AppSetting.orderByDscAsc
      ? AppSetting.orderByAsc
      : AppSetting.orderByDsc;
  this.GetList();
}

onActiveStatus(id) {
  
  // this._commonService.GenerateOTP().subscribe(
  //   data => {
  //     if (data.IsSuccess) {
  //       const _dialogRef = this._dialog.open(OTPDialogComponent, {
  //         width: "500px",
  //         disableClose: true
  //       });
  //       _dialogRef.afterClosed().subscribe((result: boolean) => {
  //         if (result) {
            this._jankalyanConfigurationService.ChangeActiveStatus(id).subscribe(
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

//#endregion <Method>
}
