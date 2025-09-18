import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DDLModel, ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { OrderTypeModel } from 'src/app/Shared/Model/Master/order-Type-master-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { OrderTypeMasterService } from 'src/app/Shared/Service/order-type-master.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-order-type-master',
  templateUrl: './order-type-master.component.html',
  styleUrls: ['./order-type-master.component.css']
})
export class OrderTypeMasterComponent implements OnInit {
//#region << Variable >>
listModel: OrderTypeModel[];
dataSource: MatTableDataSource<OrderTypeModel>;
displayedColumns: string[] = [
  "index",
  "NameHindi",
  "Name",
  "IsActive",
  "Action",
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  // { Value: "NameHindi", Text: "Name Hindi" },
  // { Value: "Name", Text: "Name" },

];

searchColumns: ColumnHeaderModel[] = [
  { Value: "NameHindi", Text: "Name Hindi" },
  { Value: "Name", Text: "Name " },

];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;
MenuClassificationPermission: PermissionModel = this._commonService.GetPagePermission(
  "/master/order-Type-Master",
  "/master/order-Type-Master/add",
  "",
  "/master/order-Type-Master/update"
);

//#endregion

//#region << constructor >>

constructor(
  private _parentComponent: AppComponent,
  private readonly _orderTypeMasterService: OrderTypeMasterService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  private readonly _dialog: MatDialog
) {
  this.MenuClassificationPermission.AddPageAccess
    ? this._parentComponent.setpagelayout(
        "Order Type Master List:",
        "add",
        "Add",
        "/master/order-Type-Master/add"
      )
    : this._parentComponent.setpagelayout("Order Type Master List:");
  this.indexModel = new IndexModel();
}

//#endregion

//#region << Method >>

ngOnInit() {
  this.GetList();
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
  
  this._orderTypeMasterService.GetList(this.indexModel).subscribe(
    (data) => {
      if (data.IsSuccess) {
        
        this.listModel = <OrderTypeModel[]>(
          data.Data.Data
        );
        this.dataSource = new MatTableDataSource<OrderTypeModel>(
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
  
  this._orderTypeMasterService.ChangeActiveStatus(id).subscribe(
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

Reset() {
  this.indexModel = new IndexModel();
  this.GetList();
}
//#endregion
}
