import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
} from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IndexModel,
  PermissionModel,
} from "src/app/Shared/Model/general-model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { ColumnHeaderModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import { ComparativeParameterMasterViewModel } from "src/app/Shared/Model/Camparetive/comparative-parameter-model";
import { AppComponent } from "src/app/app.component";
import { ComparativeParameterMasterService } from "src/app/Shared/Service/Comperative/comparative-parameter-master.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";

@Component({
  selector: "app-camparative-parameter-master",
  templateUrl: "./camparative-parameter-master.component.html",
  styleUrls: ["./camparative-parameter-master.component.css"],
})
export class CamparativeParameterMasterComponent implements OnInit {
  //#region << Variable >>
  listModel: ComparativeParameterMasterViewModel[];
  dataSource: MatTableDataSource<ComparativeParameterMasterViewModel>;
  displayedColumns: string[] = [
    "index",
    "PhysicalParameter",
    "FinancialParameter",
    "DepartmentTitle",
    "KPICategoryName",
    "Description1",
    "Description2",
    "IsFinancial",
    "IsPhysical",
    // "IsDepartment",
    // "IsDistrict",
    "SchemeName",
    "Status",
    "Action",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "PhysicalParameter", Text: "Physical Parameter Name" },
    { Value: "FinancialParameter", Text: "Financial Parameter Name" },
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "KPICategoryName", Text: "KPI Category Name" },
    { Value: "SchemeName", Text: "Scheme" },
    { Value: "Description1", Text: "Description 1" },
    { Value: "Description2", Text: "Description 2" },
  ];

  searchColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" },
    { Value: "KPICategoryName", Text: "KPI Category Name" },
    { Value: "SchemeName", Text: "Scheme" },
    { Value: "Description1", Text: "Description 1" },
    { Value: "Description2", Text: "Description 2" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  totalRecords: number;
  SchemePermission: PermissionModel = this._commonService.GetPagePermission(
    "/camparative/camparativeparameter",
    "/camparative/camparativeparameter/add",
    "",
    "/camparative/camparativeparameter/update"
  );
parameterCategoryCode: number;
dDLList: DDLModel;
  //#endregion

  //#region << constructor >>

  constructor(
    private _parentComponent: AppComponent,
    private readonly _ComparativeParameterMasterService: ComparativeParameterMasterService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog
  ) {
    this.SchemePermission.AddPageAccess
      ? this._parentComponent.setpagelayout(
          "Parameter  List:",
          "add",
          "Add",
          "camparative/add"
        )
      : this._parentComponent.setpagelayout("Camparative Parameter  List:");
    this.indexModel = new IndexModel();
  }

  //#endregion

  //#region << Method >>

  ngOnInit() {
    this.GetList();
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ComparativeParameterDDLKey).subscribe(
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

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction === AppSetting.orderByDscAsc
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

  GetList() {
    
    if(this.parameterCategoryCode)
    {
    this.indexModel.AdvanceSearchModel = {
      parameterCategoryCode: this.parameterCategoryCode
    }
  }else{
      this.indexModel.AdvanceSearchModel=null;
    };

    this._ComparativeParameterMasterService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          
          this.listModel = <ComparativeParameterMasterViewModel[]>(
            data.Data.Data
          );
          this.dataSource = new MatTableDataSource<ComparativeParameterMasterViewModel>(
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

  statusClick(id) {
    this._ComparativeParameterMasterService.ChangeActiveStatus(id).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.GetList();
          this._commonService.ScrollingTop();
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

  SearchByKeyword(event) {
    
    this.indexModel.Search = event;
    this.GetList();
  }

  onClearclick() {
    this.parameterCategoryCode =null;
  }
  //#endregion
}
