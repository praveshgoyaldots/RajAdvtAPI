import { Component, OnInit, ViewChild } from '@angular/core';
import { RedesignViewForAdminModel } from 'src/app/Shared/Model/advertisement.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdvertisementService } from 'src/app/Shared/Service/advertisement.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-redesign-request-for-admin',
  templateUrl: './redesign-request-for-admin.component.html',
  styleUrls: ['./redesign-request-for-admin.component.css']
})
export class RedesignRequestForAdminComponent implements OnInit {
  requestList: RedesignViewForAdminModel[];

  dataSource: any;
  displayedColumns: string[] = ["index", "Expired", "SubjectEng", "RequestedStatus", "IsUploaded", "IsApproved", "Action"];
  // ViewdisplayedColumns: ColumnHeaderModel[] = [
  //   { Value: "SubjectEng", Text: "Subject English" },
  //   { Value: "RequestedStatus", Text: "Requested Status" },
  //   { Value: "IsUploaded", Text: "IsUploaded" },
  //   { Value: "IsApproved", Text: "IsApproved" }
  // ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: IndexModel;
  totalRecords: number;

  constructor(
    private readonly _advertisementService: AdvertisementService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent
  ) {
    this._parentApi.setpagelayout(
      " Redesign Request :", "", "", "");
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  IsExpired(date: Date) {
    if (date) {
      if (new Date(date).getTime() < new Date().getTime()) {
        return true;
      } else {
        return false;
      }
    }
  }

  GetList() {
    this._advertisementService.GetRedesignListForAdmin(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.requestList = <RedesignViewForAdminModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<RedesignViewForAdminModel>(this.requestList);
          if (!this.indexModel.IsPostBack) {
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

  SortData(event) {
    this.indexModel.IsPostBack = true;
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc = event.direction == AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;

    this.GetList();
  }

  onPaginateChange(event) {

    this.indexModel.IsPostBack = true;
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.GetList();
  }


}
