import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AppComponent } from "src/app/app.component";
import { PressReleaseFilterModel } from "src/app/Shared/Model/TenderPressRelease/press-release-model";
import { DistLookupCategoryModel } from "src/app/Shared/Model/TenderPressRelease/Report/press-release-summary-report-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { PressReleaseSummaryReportService } from "src/app/Shared/Service/TenderPressRelease/Report/press-release-summary-report.service";

@Component({
  selector: "app-press-release-dist-lookup-category",
  templateUrl: "./press-release-dist-lookup-category.component.html",
  styleUrls: ["./press-release-dist-lookup-category.component.css"],
})
export class PressReleaseDistLookupCategoryComponent implements OnInit {
  indexModel: PressReleaseFilterModel;
  summaryReportList: DistLookupCategoryModel[];
  dataSource: MatTableDataSource<DistLookupCategoryModel>;
  totalEntries: number;
  totalRecords: number;
  displayedColumns: string[] = [
    "sno",
    "district",
    "lookupcategory",
    "total_entries",
  ];
  constructor(
    private readonly _pressReleaseSummaryReportService: PressReleaseSummaryReportService,
    private readonly _alertService: AlertService,
    private _parentComponent: AppComponent
  ) {
    this.indexModel = new PressReleaseFilterModel();
    this._parentComponent.setpagelayout("Press Release Master Report: District Lookup-Category");

    if (sessionStorage.getItem("PressReleaseReportSearch")) {
      this.indexModel = <PressReleaseFilterModel>(
        JSON.parse(sessionStorage.getItem("PressReleaseReportSearch"))
      );
    }
  }

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    this._pressReleaseSummaryReportService
      .GetDistLookupCategory(this.indexModel)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.summaryReportList = <DistLookupCategoryModel[]>data.Data.Data;
            this.dataSource = new MatTableDataSource<DistLookupCategoryModel>(
              this.summaryReportList
            );
            this.totalRecords = data.Data.TotalRecords;
            this.GetTotal();
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  GetTotal() {
    this.totalEntries = this.summaryReportList
      .map((t) => t.Total_Entries)
      .reduce((acc, value) => acc + value, 0);
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }
}
