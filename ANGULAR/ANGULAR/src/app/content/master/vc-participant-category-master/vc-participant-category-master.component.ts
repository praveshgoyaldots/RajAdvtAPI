import { Component, OnInit, ViewChild } from "@angular/core";
import { ParticipantCategoryMasterModel } from "src/app/Shared/Model/Master/participant-category-master.model";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource
} from "@angular/material";
import {
  PermissionModel,
  IndexModel
} from "src/app/Shared/Model/general-model";
import { ParticipantCategoryMasterService } from "src/app/Shared/Service/participant-category-master.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import { VcParticipantAddUpdateDialogComponent } from "./vc-participant-add-update-dialog/vc-participant-add-update-dialog.component";

@Component({
  selector: "app-vc-participant-category-master",
  templateUrl: "./vc-participant-category-master.component.html",
  styleUrls: ["./vc-participant-category-master.component.css"]
})
export class VcParticipantCategoryMasterComponent implements OnInit {
  //#region <Variable>

  listModel: ParticipantCategoryMasterModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "NameEnglish",
    "NameHindi",
    "DisplayOrder",
    "IsActive",
    "Action"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "NameEnglish", Text: "Category Name" },
    { Value: "DisplayOrder", Text: "Display Order" },
    { Value: "NameHindi", Text: "Category Name in Hindi" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/vc-participant-category",
    "/master/vc-participant-category/add",
    "",
    "/master/vc-participant-category/edit"
  );
  indexModel: IndexModel;
  totalRecords: number;

  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    private readonly _participantCategoryMasterService: ParticipantCategoryMasterService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private _dialog: MatDialog
  ) {
    this._parentApi.setpagelayout("", "", "", "", true);
    this.indexModel = new IndexModel();
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    
    this._participantCategoryMasterService.GetList(this.indexModel).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.listModel = <ParticipantCategoryMasterModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<
            ParticipantCategoryMasterModel
          >(this.listModel);
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

  openDialog(Id) {
    
    const _dialogRef = this._dialog.open(
      VcParticipantAddUpdateDialogComponent,
      {
        width: "500px",
        data: Id
      }
    );
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  onActiveStatus(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose: true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._participantCategoryMasterService
                .ChangeActiveStatus(id)
                .subscribe(
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

  //#endregion <Method>
}
