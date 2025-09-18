import { OnInit, ViewChild, Component, Inject } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import {
  CMISTaskModel,
  ListCMISTaskModel
} from "src/app/Shared/Model/CMISTask-Model";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { GoogleChartService } from "src/app/Shared/Service/google-chart.service";
import { ActivatedRoute } from "@angular/router";
import { CMISTaskService } from "src/app/Shared/Service/CMISTask.sercice";
import { AppComponent } from "src/app/app.component";
import { UserViewModel } from "src/app/Shared/Model/user-model";

@Component({
  selector: "app-zoomcmistaskdailog",
  templateUrl: "./zoomcmistaskdailog.component.html",
  styleUrls: ["./zoomcmistaskdailog.component.css"]
})
export class ZoomcmistaskdailogComponent implements OnInit {
  newArray: Array<any> = [];
  piechartArray: Array<any> = [];
  CMISTaskChartList: any[];
  dataSource: MatTableDataSource<any>;
  CMISTaskList: ListCMISTaskModel[];
  startDate: string;
  endDate: string;

  displayedColumns: string[] = [
    "Task",
    "Total Announcement",
    "No Action Taken",
    "Task Initiated",
    "Sanction Issued",
    "Task in Progress",
    "Not Feasible",
    "Continuous Nature",
    "Task Completed"
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
  private gLib: any;
  loginData: UserViewModel;

  constructor(
    private readonly _cmistaskService: CMISTaskService,
    private _route: ActivatedRoute,
    private gChartService: GoogleChartService,
    private readonly _authService: AuthenticationService,
    public dialog: MatDialogRef<ZoomcmistaskdailogComponent>,
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
  }
  private drawLineChart() {
    let data, chart;
    var options;
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    chart = new this.gLib.visualization.LineChart(
      document.getElementById("cmistaskchartZoomdiv")
    );
    chart.draw(data, options);
  }

  private drawBarChart() {
    let data, chart;
    var options;

    options = { chartArea: { width: "60%", height: "90%" } };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    chart = new this.gLib.visualization.ColumnChart(
      document.getElementById("cmistaskchartZoomdiv")
    );
    chart.draw(data, options);
  }

  private drawPieChart() {
    let data, chart;
    var options;
    let selectmodule = "";

    options = { chartArea: { width: "100%", height: "100%" }, is3D: true };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.PieChart(
      document.getElementById("cmistaskchartZoomdiv")
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
    options = { chartArea: { width: "60%", height: "70%" } };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.Table(
      document.getElementById("cmistaskchartZoomdiv")
    );
    chart.draw(data, options);

    this.dataSource = new MatTableDataSource<CMISTaskModel>(this.CMISTaskList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  GetList() {
    this._cmistaskService
      .GetById(this.loginData.DepartmentCodes, this.startDate, this.endDate)
      .subscribe(data => {
        this.newArray = [];
        this.newArray.push(this.displayedColumns);
        if (data.IsSuccess) {
          this.CMISTaskList = <CMISTaskModel[]>data.Data;
          let resultData = <any[]>data.Data;
          resultData.forEach(element => {
            this.newArray.push([
              element.Task,
              element.TotalAnnouncement,
              element.NoActionTaken,
              element.TaskInitiated,
              element.SanctionIssued,
              element.TaskinProgress,
              element.NotFeasible,
              element.ContinuousNature,
              element.TaskCompleted
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
            element[3],
            element[4],
            element[5],
            element[6],
            element[7],
            element[8]
          ]);
        }
      });
      data = this.gLib.visualization.arrayToDataTable(
        this.Transpose2DArray(this.piechartArray)
      );
      chart = new this.gLib.visualization.PieChart(
        document.getElementById("cmistaskchartZoomdiv")
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
  oncloseClick() {
    this.dialog.close();
  }
}
