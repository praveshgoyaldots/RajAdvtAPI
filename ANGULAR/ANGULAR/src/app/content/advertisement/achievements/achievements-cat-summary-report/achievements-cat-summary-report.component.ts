import { MatTableDataSource, MAT_DATE_FORMATS, DateAdapter } from "@angular/material";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AchievementsCategoryCountReportModel } from "./../../../../Shared/Model/achievement-model";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ColumnHeaderModel,
  DDLModel
} from "src/app/Shared/Model/commonddl.model";
import { MatSort } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { AppComponent } from "src/app/app.component";
import { AchievementService } from "src/app/Shared/Service/achievement.service";
import { DepartmentCategoryReportFilterModel } from "src/app/Shared/Model/orderlist.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DepartmentCategoryEnum } from 'src/app/Shared/Enum/Common.enum';
import { DatePipe } from '@angular/common';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/Shared/Model/format-datepicker';

@Component({
  selector: "app-achievements-cat-summary-report",
  templateUrl: "./achievements-cat-summary-report.component.html",
  styleUrls: ["./achievements-cat-summary-report.component.css"],
  providers: [DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class AchievementsCatSummaryReportComponent implements OnInit {
  //#region <Variables>

  listModel: AchievementsCategoryCountReportModel[];
  model: DepartmentCategoryReportFilterModel;
  dDLList: DDLModel;
  dataSource: any;
  totalAwards: number;
  totalBannerImage: number;
  totalDepartmentalAchievements: number;
  totalExternalLink: number;
  totalNewsTicker: number;
  totalPhotoGallery: number;
  totalVideos: number;
  totalPublications: number;
  totalUpcomingEvents: number;
  total: number;
  totalAdvertisement: number;
  totalAudio: number;
  totalPosters: number;
  totalImportantDecisions: number;
  totalCabinetDecisions: number;
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "Advertisement",
    "Audio",
    "Awards",
    "BannerImage",
    "CabinetDecisions",
    "DepartmentalAchievements",
    "ExternalLink",
    "NewsTicker",
    "ImportantDecisions",
    "PhotoGallery",
    "Posters",
    //"Publications",
    "UpcomingEvents",
    "Videos",
    "Total"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //#endregion <Variables>

  //#region <Constructor>

  constructor(
    private readonly _achievementService: AchievementService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private _parentApi: AppComponent
  ) {
    this._parentApi.setpagelayout(
      "General Entry Category Summary Report",
      "",
      "",
      ""
    );
    this.model = new DepartmentCategoryReportFilterModel();
    this.GetDDLList();
  }

  //#endregion <Constructor>

  //#region <Methods>

  ngOnInit() {

    this.model.DepartmentCategoryCode = String(DepartmentCategoryEnum.Category);
    //this.GetDDLList();
    //this.GetList();
  }

  GetDDLList() {
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForAllModuleReport)
      .subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.dDLList = <DDLModel>data.Data;

          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  searchClick() {
    if (this.model.EntryToDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.model.EntryToDate).getFullYear(),
          new Date(this.model.EntryToDate).getMonth(),
          new Date(this.model.EntryToDate).getDate()
        )
      ).toISOString();
      this.model.EntryToDate = uTCDate;
    }
    if (this.model.EntryFromDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.model.EntryFromDate).getFullYear(),
          new Date(this.model.EntryFromDate).getMonth(),
          new Date(this.model.EntryFromDate).getDate()
        )
      ).toISOString();
      this.model.EntryFromDate = uTCDate;
    }

    this.GetList();
  }

  clearClick() {
    this.model = new DepartmentCategoryReportFilterModel();
    this.GetList();
  }

  GetList() {
    
    this._achievementService
      .GetAchievementsCategoryWiseSummaryReport(this.model)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            this.listModel = <AchievementsCategoryCountReportModel[]>data.Data;
            this.getTotalRecord();
            this.dataSource = new MatTableDataSource<
              AchievementsCategoryCountReportModel
            >(this.listModel);
            this.dataSource.sort = this.sort;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  getTotalRecord() {
    this.totalVideos = this.listModel
      .map(t => t.Videos)
      .reduce((acc, value) => acc + value, 0);

    this.totalAwards = this.listModel
      .map(t => t.Awards)
      .reduce((acc, value) => acc + value, 0);

    this.totalBannerImage = this.listModel
      .map(t => t.BannerImage)
      .reduce((acc, value) => acc + value, 0);

    this.totalDepartmentalAchievements = this.listModel
      .map(t => t.DepartmentalAchievements)
      .reduce((acc, value) => acc + value, 0);

    this.totalExternalLink = this.listModel
      .map(t => t.ExternalLink)
      .reduce((acc, value) => acc + value, 0);

    this.totalNewsTicker = this.listModel
      .map(t => t.NewsTicker)
      .reduce((acc, value) => acc + value, 0);

    this.totalPhotoGallery = this.listModel
      .map(t => t.PhotoGallery)
      .reduce((acc, value) => acc + value, 0);

    this.totalPublications = this.listModel
      .map(t => t.Publications)
      .reduce((acc, value) => acc + value, 0);

    this.totalUpcomingEvents = this.listModel
      .map(t => t.UpcomingEvents)
      .reduce((acc, value) => acc + value, 0);

    this.total = this.listModel
      .map(t => t.Total)
      .reduce((acc, value) => acc + value, 0);

    this.totalAdvertisement = this.listModel
      .map(t => t.Advertisement)
      .reduce((acc, value) => acc + value, 0);

    this.totalAudio = this.listModel
      .map(t => t.Audio)
      .reduce((acc, value) => acc + value, 0);

    this.totalPosters = this.listModel
      .map(t => t.Posters)
      .reduce((acc, value) => acc + value, 0);

    this.totalCabinetDecisions = this.listModel
      .map(t => t.CabinetDecisions)
      .reduce((acc, value) => acc + value, 0);

    this.totalImportantDecisions = this.listModel
      .map(t => t.ImportantDecisions)
      .reduce((acc, value) => acc + value, 0);
  }

  //#endregion <Methods>
}
