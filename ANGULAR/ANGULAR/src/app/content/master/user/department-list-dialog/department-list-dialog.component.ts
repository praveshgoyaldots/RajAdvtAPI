import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentMasterViewModel } from 'src/app/Shared/Model/Master/department.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentService } from 'src/app/Shared/Service/department.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';

@Component({
  selector: 'app-department-list-dialog',
  templateUrl: './department-list-dialog.component.html',
  styleUrls: ['./department-list-dialog.component.css']
})
export class DepartmentListDialogComponent implements OnInit {

//#region Variable

listModel: DepartmentMasterViewModel[];
dataSource: any;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
id: number;
displayedColumns: string[] = [
  "index",
  "DepartmentTitle",
  "AdmDepartmentTitle",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "AdmDepartmentTitle", Text: "Admin Department" },
  { Value: "DepartmentTitle", Text: "Department Name" },
];
columnsToDisplay: string[] = this.displayedColumns.slice();
indexModel: IndexModel;
totalRecords: number;
isActive: number = 1;

//#endregion

//#region Constructor

constructor(
  public _dialogRef: MatDialogRef<DepartmentListDialogComponent>,
  private readonly _alertService: AlertService,
  private readonly _commonService: CommonService,
  private readonly _departmentService: DepartmentService
) {

  this.indexModel = new IndexModel();
}
//#endregion

//#region Methods

ngOnInit() {
  this.GetList();
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
        //if (!this.indexModel.IsPostBack) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        //}
      }
    },
    (error) => {
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

getActiveDeActiveData(data) {
  
  this.isActive = data;
  this.GetList();
}

onNoClick(): void {
  this._dialogRef.close();
}

//#endregion
}
