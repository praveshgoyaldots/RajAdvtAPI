import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ColumnHeaderModel,

} from "src/app/Shared/Model/commonddl.model";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AdvertisementListModel } from "src/app/Shared/Model/advertisement.model";
import { AdvertisementService } from "src/app/Shared/Service/advertisement.service";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { formatDate } from '@angular/common';

@Component({
  selector: "app-advertisement",
  templateUrl: "./advertisement.component.html",
  styleUrls: ["./advertisement.component.css"],
  providers: [AdvertisementService]
})
export class AdvertisementComponent implements OnInit {
  AdvertisementList: AdvertisementListModel[];

  dataSource: any;
  displayedColumns: string[] = ["index", "SubjectEng", "SubjectHin","ModifiedDate", "Status","Lock", "Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "SubjectEng", Text: "Subject English" },
    { Value: "SubjectHin", Text: "Subject Hindi" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Permission: PermissionModel = this._commonService.GetPagePermission("/advertisement", "/advertisement/add","/advertisement/detail", "/advertisement/update",  "/advertisement/delete");
  indexModel: IndexModel;
  totalRecords: number;

  constructor(
    private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    public readonly _commonService: CommonService
  ) {
    this.Permission.AddPageAccess ? this._parentApi.setpagelayout(" Advertisement :", "", "", "") : this._parentApi.setpagelayout(" Advertisement :");
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  IsExpired(date: Date) {
    if (date) {
      if (new Date(date).getTime() < new Date(formatDate(new Date(), 'yyyy/MM/dd', 'en')).getTime()) {
        return true;
      } else {
        return false;
      }
    }
  }

  GetList() {
    this._advertisementService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.AdvertisementList = <AdvertisementListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AdvertisementListModel>(this.AdvertisementList);
          if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  AdverisementStatus(id) {
    this._advertisementService.ChangeActiveStatus(id).subscribe(
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


  PublishClick(id) {

    this._advertisementService.PublishAdvertisement(id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.GetListByEvent();
          this._alertService.success(data.Message);

        }

      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {

    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  GetListByEvent() {
    this._advertisementService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.AdvertisementList = <AdvertisementListModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AdvertisementListModel>(this.AdvertisementList);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  lockClick(id){
    this._advertisementService.LockToggle(id).subscribe(
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

}
