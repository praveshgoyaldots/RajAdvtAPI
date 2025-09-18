import { Component, OnInit, ViewChild } from "@angular/core";
import { VCLocationMasterViewModel, VCLocationSearchModel } from "src/app/Shared/Model/VC/vc-locationmaster.model";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { ColumnHeaderModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import {
  PermissionModel,
  IndexModel,
} from "src/app/Shared/Model/general-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { VcLocationmasterService } from "src/app/Shared/Service/VC/vc-locationmaster.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { AddUpdateVCLocationMasterComponent } from "./add-update-vclocation-master/add-update-vclocation-master.component";
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { UserDistrictViewModel, UserViewModel } from 'src/app/Shared/Model/user-model';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';

@Component({
  selector: "app-vc-location-master",
  templateUrl: "./vc-location-master.component.html",
  styleUrls: ["./vc-location-master.component.css"],
})
export class VcLocationMasterComponent implements OnInit {
  //#region Variable
  listModel: VCLocationMasterViewModel[];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id: number;
  displayedColumns: string[] = [
    "index",
    "DistrictTitle",
    // "InchargeTitle",
    "LocationName",
    "VCType",
    // "IsActive",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DistrictTitle", Text: "District" },
    // { Value: "InchargeTitle", Text: "Incharge" },
    { Value: "LocationName", Text: "Location" },
    { Value: "VCType", Text: "VC Type" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/vc/VcLocationMaster",
    "/vc/VcLocationMaster/add",
    "",
    "/vc/VcLocationMaster/edit"
  );
  indexModel: VCLocationSearchModel;
  ddlDistrict: UserDistrictViewModel[];
  totalRecords: number;
  loginData: UserViewModel;
  DistrictCode: number;
  dDLList: DDLModel;
  //#endregion
  constructor(
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _vclocationmasterService: VcLocationmasterService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService
  ) {
    this._parentApi.setpagelayout("VC Location Master:", "", "", "", true);
    this.indexModel = new VCLocationSearchModel();
  }
  //#endregion

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetList();
    this.getDDLList();
  }

  GetList() {
    this._vclocationmasterService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          

          this.listModel = <VCLocationMasterViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<VCLocationMasterViewModel>(
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

  OpenDialog(Id) {
    const _dialogRef = this._dialog.open(AddUpdateVCLocationMasterComponent, {
      width: "500px",
      data: Id,
      disableClose: true,
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
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

  onDelete(id) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you sure! want to delete this record?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._vclocationmasterService.Delete(id).subscribe(
          data => {

            if (
              (data.IsSuccess)
            ) {
              this._commonService.ScrollingTop();
              this._alertService.success(data.Message);
              this.GetList();

            }else{
              this._commonService.ScrollingTop();
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.message);
            this._commonService.ScrollingTop();
          }
        );
      }
    });
  }

  getDDLList() {
    
    this._commonService.GetAllDDL(AppSetting.DDlKeyForLocationMaster).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }
searchClick() {
  
   this.GetList();
}

clearClick() {
  
  this.indexModel = new VCLocationSearchModel();
  this.indexModel.DistrictCode = null;
   this.GetList();
}


  //#endregion
}
