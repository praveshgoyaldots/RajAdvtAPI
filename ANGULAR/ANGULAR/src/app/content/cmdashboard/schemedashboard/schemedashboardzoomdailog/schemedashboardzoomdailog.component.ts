import { OnInit, Input, Component, ViewChild, Inject } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { SchemeDashboardService } from "src/app/Shared/Service/SchemeDashboard.service";
import { ActivatedRoute } from "@angular/router";
import { GoogleChartService } from "src/app/Shared/Service/google-chart.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { UserViewModel } from "src/app/Shared/Model/user-model";

@Component({
  selector: "app-schemedashboardzoomdailog",
  templateUrl: "./schemedashboardzoomdailog.component.html",
  styleUrls: ["./schemedashboardzoomdailog.component.css"]
})
export class SchemedashboardzoomdailogComponent implements OnInit {
  newArray: Array<any> = [];
  piechartArray: Array<any> = [];
  SchemeChartList: any[];
  dataSource: MatTableDataSource<any>;

  @Input() charttype: string;

  displayedColumns: string[] = [
    "Scheme Name",
    "Target",
    "Achievement",
    "No of benificiary"
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public pieChartType: string;
  public pieChartOptions: any;

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
    private readonly _schemedashboardservice: SchemeDashboardService,
    private _route: ActivatedRoute,
    private gChartService: GoogleChartService,
    private readonly _authService: AuthenticationService,
    public dialog: MatDialogRef<SchemedashboardzoomdailogComponent>,
    @Inject(MAT_DIALOG_DATA) public type: string
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

    // this.Getswaparray("VIP");
  }

  public drawLineChart() {
    let data, chart;
    var options;
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    options = {
      chartArea: { width: "60%", height: "65%" }
    };

    chart = new this.gLib.visualization.LineChart(
      document.getElementById("schemedashboardzoomdiv")
    );
    chart.draw(data, options);
  }
  public drawBarChart() {
    let data, chart;
    var options;

    options = { chartArea: { width: "60%", height: "65%" } };

    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    chart = new this.gLib.visualization.ColumnChart(
      document.getElementById("schemedashboardzoomdiv")
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
      document.getElementById("schemedashboardzoomdiv")
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
    options = { chartArea: { width: "60%", height: "65%" } };
    // options = { width: "50", height: "200" };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.Table(
      document.getElementById("schemedashboardzoomdiv")
    );
    chart.draw(data, options);
  }

  GetList() {
    this._schemedashboardservice
      .GetById(this.loginData.UserType, this.loginData.UserId)
      .subscribe(data => {
        this.newArray.push(this.displayedColumns);
        if (data.IsSuccess) {
          let resultData = <any[]>data.Data;
          resultData.forEach(element => {
            this.newArray.push([
              element.SchemeName,
              element.Target,
              element.Achievement,
              element.NoofBenificiary
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
      is3D: true,
      chartArea: { width: "100%", height: "100%" }
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
            element[3]
          ]);
        }
      });
      data = this.gLib.visualization.arrayToDataTable(
        this.Transpose2DArray(this.piechartArray)
      );
      chart = new this.gLib.visualization.PieChart(
        document.getElementById("schemedashboardzoomdiv")
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
    var i,
      j,
      t = [];
    for (i = 0; i < h; i++) {
      t[i] = [];
      for (j = 0; j < w; j++) {
        t[i][j] = selectArray[j][i];
      }
    }
    return t;
  }
  oncloseClick() {
    this.dialog.close();
  }
}
