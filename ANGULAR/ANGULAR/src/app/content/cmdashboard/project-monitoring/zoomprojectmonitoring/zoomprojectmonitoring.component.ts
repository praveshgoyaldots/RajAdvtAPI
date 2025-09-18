import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { ProjectMonitoringService } from "src/app/Shared/Service/ProjectMonitoring.service";
import { ActivatedRoute } from "@angular/router";
import { GoogleChartService } from "src/app/Shared/Service/google-chart.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";

@Component({
  selector: "app-zoomprojectmonitoring",
  templateUrl: "./zoomprojectmonitoring.component.html",
  styleUrls: ["./zoomprojectmonitoring.component.css"]
})
export class ZOOMProjectmonitoringComponent implements OnInit {
  newArray: Array<any> = [];
  piechartArray: Array<any> = [];
  dataSource: MatTableDataSource<any>;

  @Input() charttype: string;
  startDate: string;
  endDate: string;
  displayedColumns: string[] = [
    "Department",
    "Total No. Of Ongoing Projects",
    "Total Project Cost",
    "0-3 Month",
    "4-6 Month",
    "7-12 Month",
    "Projects Require High Level Intervention"
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
    private readonly _projectmonitoringservice: ProjectMonitoringService,
    private _route: ActivatedRoute,
    private gChartService: GoogleChartService,
    public dialog: MatDialogRef<ZOOMProjectmonitoringComponent>,
    @Inject(MAT_DIALOG_DATA) public type: string,
    private readonly _authService: AuthenticationService
  ) {
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
    this.type =
      this._route.snapshot.params.type == undefined
        ? this.type
        : this._route.snapshot.params.type;
    this.GetList();
  }

  ngOnInit() {}

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
  }
  public drawLineChart() {
    let data, chart;
    var options;
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    options = { chartArea: { width: "60%", height: "70%" } };

    chart = new this.gLib.visualization.LineChart(
      document.getElementById("projectmonitoringzoomdiv")
    );
    chart.draw(data, options);
  }

  public drawBarChart() {
    let data, chart;
    let options;

    options = { chartArea: { width: "60%", height: "70%" } };

    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    chart = new this.gLib.visualization.ColumnChart(
      document.getElementById("projectmonitoringzoomdiv")
    );
    chart.draw(data, options);
  }

  public drawPieChart() {
    let data, chart;
    let options;
    let selectmodule = "";

    options = { chartArea: { width: "100%", height: "100%" }, is3D: true };

    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.PieChart(
      document.getElementById("projectmonitoringzoomdiv")
    );
    chart.draw(data, options);
  }

  public drawTableChart() {
    const options = { chartArea: { width: "60%", height: "70%" } };
    const data = this.gLib.visualization.arrayToDataTable(this.newArray);
    const chart = new this.gLib.visualization.Table(
      document.getElementById("projectmonitoringzoomdiv")
    );
    chart.draw(data, options);
  }

  GetList() {
    this._projectmonitoringservice
      .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
      .subscribe(data => {
        this.newArray = [];
        this.newArray.push(this.displayedColumns);
        if (data.IsSuccess) {
          const resultData = <any[]>data.Data;
          resultData.forEach(element => {
            this.newArray.push([
              element.Department,
              element.OnGoingProject,
              element.TotalProjectCost,
              element.WithinThreeMonth,
              element.WithinSixMonth,
              element.WithinYearMonth,
              element.ProjectReqIntervention
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
      chartArea: { width: "100%", height: "100%" }
    };

    data = this.newArray;
    if (data) {
      const resultData = <any[]>data;
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
        document.getElementById("projectmonitoringzoomdiv")
      );
      chart.draw(data, options);
    }
  }

  Transpose2DArray(selectArray) {
    const w = selectArray.length || 0;
    const h = selectArray[0] instanceof Array ? selectArray[0].length : 0;

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
  oncloseClick() {
    this.dialog.close();
  }
}
