import { Component, OnInit, ViewChild } from "@angular/core";
import { AdvertisementOrGovermentAchievementModel } from "src/app/Shared/Model/advertisement.model";
import { AppComponent } from "src/app/app.component";
import { CommonService } from "src/app/Shared/Service/common.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/Shared/Service/alert.service";

import { IndexModel } from "src/app/Shared/Model/general-model";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Validators, FormControl } from "@angular/forms";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { GovermentAchivementOrAdvertisementService } from "src/app/Shared/Service/goverment-achivement-or-advertisement.service";
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: "app-govermentt-achivement-or-advertisement",
  templateUrl: "./govermentt-achivement-or-advertisement.component.html",
  styleUrls: ["./govermentt-achivement-or-advertisement.component.css"]
})
export class GovermenttAchivementOrAdvertisementComponent implements OnInit {
  model: AdvertisementOrGovermentAchievementModel;
  listmodel: AdvertisementOrGovermentAchievementModel[];
  AdvtPopupHeaderUrl = new FormControl("");
  indexModel: IndexModel;
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "IsGovermentAndAdvertisement",
    "AdvtPopupHeaderUrl",
    "Action"
  ];
  GovermentAchivementOrAdvertisement = new FormControl("", [
    Validators.required
  ]);
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  totalRecords: number;
  constructor(
    private readonly _govermentAchivementOrAdvertisementService: GovermentAchivementOrAdvertisementService,
    private readonly _alertService: AlertService,
    private _router: Router,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent
  ) {
    this._parentApi.setpagelayout(
      "Set Popup For Websites : ",
      "",
      "",
      ""
    );
    this.model = new AdvertisementOrGovermentAchievementModel();
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.GetList();
  }

  saveClick() {

    if (this.GovermentAchivementOrAdvertisement.valid) {
      if (this.model.Id > 0) {
        this._govermentAchivementOrAdvertisementService
          .Edit(this.model)
          .subscribe(
            data => {

              if (data) {
                if (data.IsSuccess) {
                  this.GetList();
                  this._alertService.success(data.Message);
                  this.model = new AdvertisementOrGovermentAchievementModel();
                  this.GovermentAchivementOrAdvertisement.markAsUntouched();
                } else {
                  this._commonService.ScrollingTop();
                  this._alertService.error(data.Message);
                }
              } else {
                this._commonService.ScrollingTop();
                this._alertService.error(data.Message);
              }
            },
            error => {
              this._commonService.ScrollingTop();
              this._alertService.error(GlobalMessagesModel.saveError);
            }
          );
      } else {
        this._govermentAchivementOrAdvertisementService
          .Add(this.model)
          .subscribe(
            data => {

              if (data) {
                if (data.IsSuccess) {
                  this.GetList();
                  this._alertService.success(data.Message);
                  this.model = new AdvertisementOrGovermentAchievementModel();

                  this.GovermentAchivementOrAdvertisement.markAsUntouched();
                } else {
                  this._commonService.ScrollingTop();
                  this._alertService.error(data.Message);
                }
              } else {
                this._commonService.ScrollingTop();
                this._alertService.error(data.Message);
              }
            },
            error => {
              this._commonService.ScrollingTop();
              this._alertService.error(GlobalMessagesModel.saveError);
            }
          );
      }
    }
  }


  GetList() {

    this._govermentAchivementOrAdvertisementService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listmodel = <AdvertisementOrGovermentAchievementModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AdvertisementOrGovermentAchievementModel>(
            this.listmodel
          );
          if (this.indexModel.IsPostBack == false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        //
        this._alertService.error(error.message);
      }
    );
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  SortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }


  getByID(id) {

    this._govermentAchivementOrAdvertisementService.GetById(id).subscribe(
      data => {
        if (data.IsSuccess) {

          this.model = <AdvertisementOrGovermentAchievementModel>data.Data;
          if (this.model.IsAdvertisementorGovermentAchivement) {
            this.model.IsAdvertisementorGovermentAchivement = String(this.model.IsAdvertisementorGovermentAchivement);

          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.error.ExceptionMessage);
      }
    );
  }



}
