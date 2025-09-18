import { GoogleChartService } from "./../../../Shared/Service/google-chart.service";
import { RecruitmentStatusService } from "./../../../Shared/Service/RecruitmentStatus.service";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { DatePipe } from "@angular/common";
import { RecruitmentStatusFilterComponent } from "./recruitment-status-filter/recruitment-status-filter.component";
import { ZoomrecruitmentstatusComponent } from "./zoomrecruitmentstatus/zoomrecruitmentstatus.component";

@Component({
  selector: "app-recruitmentstatus",
  templateUrl: "./recruitmentstatus.component.html",
  styleUrls: ["./recruitmentstatus.component.css"]
})
export class RecruitmentStatusComponent implements OnInit {
  type: string = "line";

  newArray: Array<any> = [];
  piechartArray: Array<any> = [];
  CMOLetterChartList: any[];
  dataSource: MatTableDataSource<any>;
  startDate: string;
  endDate: string;

  @Input() charttype: string;

  displayedColumns: string[] = [
    "Department",
    "Total Vacancy",
    "Requisition Sent to Recruitment Institution",
    "Advertisement Published",
    "Examination Conducted",
    "Appointment Letters Issued",
    "Court Cases"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Department", Text: "Department." },
    { Value: "TotalVacancy", Text: "Total Vacancy" },
    {
      Value: "Recruitment_Institution",
      Text: "Requisition Sent to Recruitment Institution"
    },
    { Value: "Advertisement_Published", Text: "Advertisement Published" },
    { Value: "Examination_Conducted", Text: "Examination_Conducted" },
    { Value: "Appointment_Letters_Issued", Text: "Appointment Letters Issued" },
    { Value: "Court_Cases", Text: "Court Cases" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public pieChartType: string;
  public pieChartOptions: any;

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  onChartClick(event) {
    console.log(event);
  }
  //#endregion
  chartOptions = {
    responsive: true
  };

  public barChartType = "bar";
  public lineChartType = "line";
  public barChartLegend = true;
  public lineChartLegend = true;
  public gLib: any;

  loginData: UserViewModel;

  constructor(
    private _appComponet: AppComponent,
    private readonly _recruitmentstatusservice: RecruitmentStatusService,
    private _route: ActivatedRoute,
    private gChartService: GoogleChartService,
    private readonly _authService: AuthenticationService,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) {
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
    this.type =
      this._route.snapshot.params.type == undefined
        ? this.type
        : this._route.snapshot.params.type;
    this.GetList();
    this._appComponet.setpagelayout("", "", "", "", true, true);
  }

  ngOnInit() { }

  chart(type) {
    this.type = type;

    this.chartcall();
  }

  chartcall() {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load("current", { packages: ["corechart", "table"] });

    if (this.type == "pie") {
      this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
    }
    if (this.type == "line") {
      this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
    }
    if (this.type == "bar") {
      this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
    }
    if (this.type == "table") {
      this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
    }

    // this.Getswaparray("VIP");
  }
  public drawLineChart() {
    let data, chart;
    var options;
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    options = { chartArea: { width: "60%", height: "70%" } };

    chart = new this.gLib.visualization.LineChart(
      document.getElementById("recruitmentstatusdiv")
    );
    chart.draw(data, options);
  }

  public drawBarChart() {
    let data, chart;
    var options;

    options = { chartArea: { width: "60%", height: "70%" } };

    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    chart = new this.gLib.visualization.ColumnChart(
      document.getElementById("recruitmentstatusdiv")
    );
    chart.draw(data, options);
  }

  public drawPieChart() {
    let data, chart;
    var options;
    let selectmodule = "";

    options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.PieChart(
      document.getElementById("recruitmentstatusdiv")
    );
    chart.draw(data, options);
    this.gLib.visualization.events.addListener(chart, "select", selectHandler);
    let callthis = this;
    function selectHandler() {
      var selection = chart.getSelection();
      for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null) {
          selectmodule = data.getFormattedValue(item.row, 0);
        }
      }
      callthis.GetSelectedData(selectmodule);
    }
  }

  public drawTableChart() {
    let data, chart;
    var options;
    // options = { chartArea: { width: "60%", height: "70%" } };
    options = { width: 600, height: 200 };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.Table(
      document.getElementById("recruitmentstatusdiv")
    );
    chart.draw(data, options);
  }

  GetList() {
    this._recruitmentstatusservice
      .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
      .subscribe(data => {
        this.newArray = [];
        this.newArray.push(this.displayedColumns);
        if (data.IsSuccess) {
          let resultData = <any[]>data.Data;
          resultData.forEach(element => {
            this.newArray.push([
              element.Department,
              element.TotalVacancy,
              element.Recruitment_Institution,
              element.Advertisement_Published,
              element.Examination_Conducted,
              element.Appointment_Letters_Issued,
              element.Court_Cases
            ]);
          });
          this.chartcall();
        }
      });
  }

  GetSelectedData(selectModule) {
    let data, chart, options;
    options = {
      title: selectModule,
      titleTextStyle: {
        color: "#26389b",
        fontSize: 15
      },
      chartArea: { width: "100%", height: "100%" },
      is3D: true
    };

    data = this.newArray;
    if (data) {
      let resultData = <any[]>data;
      resultData.forEach(element => {
        if (element[0] == selectModule) {
          this.piechartArray = [];
          this.piechartArray.push(this.displayedColumns);
          this.piechartArray.push([
            element[0],
            element[1],
            element[2],
            element[3],
            element[4],
            element[5],
            element[6]
          ]);
        }
      });
      data = this.gLib.visualization.arrayToDataTable(
        this.Transpose2DArray(this.piechartArray)
      );
      chart = new this.gLib.visualization.PieChart(
        document.getElementById("recruitmentstatusdiv")
      );
      chart.draw(data, options);
    }
  }

  Transpose2DArray(selectArray) {
    var w = selectArray.length || 0;
    var h = selectArray[0] instanceof Array ? selectArray[0].length : 0;

    // In case it is a zero matrix, no transpose routine needed.
    if (h === 0 || w === 0) {
      return [];
    }

    /**
     * @var {Number} i Counter
     * @var {Number} j Counter
     * @var {Array} t Transposed data is stored in this array.
     */
    var i,
      j,
      t = [];

    // Loop through every item in the outer array (height)
    for (i = 0; i < h; i++) {
      // Insert a new row (array)
      t[i] = [];

      // Loop through every item per item in outer array (width)
      for (j = 0; j < w; j++) {
        // Save transposed data.
        t[i][j] = selectArray[j][i];
      }
    }

    return t;
  }

  openZoomDialog() {
    const dialogRef = this.dialog.open(ZoomrecruitmentstatusComponent, {
      width: "95%",
      height: "95%",
      data: this.type
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RecruitmentStatusFilterComponent, {
      width: "500px",
      data: { startDate: null, endDate: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.startDate = this.datepipe.transform(result.startDate, "MM-dd-yyyy"); // <string>result.startDate;
      this.endDate = this.datepipe.transform(result.endDate, "MM-dd-yyyy"); //<string>result.endDate;
      this.GetList();
    });
  }
}

export interface DialogData {
  startDate: string;
  endDate: string;
}
