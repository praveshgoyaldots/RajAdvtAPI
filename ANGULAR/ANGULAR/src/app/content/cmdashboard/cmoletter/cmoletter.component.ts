import { CMOLetterService } from "./../../../Shared/Service/CMOLetter.service";
import { AuthenticationService } from "./../../../Shared/Service/authentication.service";
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { ColumnHeaderModel } from "src/app/Shared/Model/commonddl.model";
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { trigger, transition, style, animate } from "@angular/animations";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserViewModel } from "src/app/Shared/Model/user-model";
import { GoogleChartService } from "src/app/Shared/Service/google-chart.service";
import { ZoomCMOLetterdailogComponent } from "./zoom-cmoletterdailog/zoom-cmoletterdailog.component";

@Component({
  selector: "app-cmoletter",
  templateUrl: "./cmoletter.component.html",
  styleUrls: ["./cmoletter.component.css"],
  providers: [CMOLetterService]
})
export class CmoletterComponent implements OnInit {
  @Input() closable = true;

  type = "pie";
  newArray: Array<any> = [];
  piechartArray: Array<any> = [];
  CMOLetterChartList: any[];
  dataSource: MatTableDataSource<any>;
  @Input() charttype: string;
  displayedColumns: string[] = [
    "Module Name",
    "Total Status",
    "Disposed Status",
    "Pending Status",
    "Age Wise Pendency Status"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Module Name", Text: "Particular." },
    { Value: "TotalStatus", Text: "Total Cases" },
    { Value: "DisposedStatus", Text: "Disposed" },
    { Value: "PendingStatus", Text: "Pending" },
    { Value: "AgeWisePendencyStatus", Text: "Age Wise Pendency" }
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public pieChartLabels: string[] = [
    "TotalStatus",
    "DisposedStatus",
    "PendingStatus",
    "AgeWisePendencyStatus"
  ];
  public pieChartType: string;
  public pieChartOptions: any;

  public barChartType = "bar";
  public lineChartType = "line";
  public barChartLegend = true;
  public lineChartLegend = true;
  public gLib: any;
  loginData: UserViewModel;

  constructor(
    // private _appComponet: AppComponent,
    private readonly _cmoletterService: CMOLetterService,
    private _route: ActivatedRoute,
    private gChartService: GoogleChartService,
    public dialog: MatDialog,

    private readonly _authService: AuthenticationService
  ) {
    this.loginData = _authService.GetCurrentUserDetail().UserViewModel;
    this.type =
      this._route.snapshot.params.type == undefined
        ? this.type
        : this._route.snapshot.params.type;
    this.GetList();
    // this._appComponet.setpagelayout("", "", " ", " ", true, true);
  }

  ngOnInit() {}

  chart(type) {
    this.type = type;
    this.chartcall();
  }

  chartcall() {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load("current", { packages: ["corechart", "table"] });
    if (this.type === "pie") {
      this.gLib.charts.setOnLoadCallback(this.drawPieChart.bind(this));
    }
    if (this.type === "line") {
      this.gLib.charts.setOnLoadCallback(this.drawLineChart.bind(this));
    }
    if (this.type === "bar") {
      this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
    }
    if (this.type === "table") {
      this.gLib.charts.setOnLoadCallback(this.drawTableChart.bind(this));
    }
  }
  public drawLineChart() {
    let data, chart;
    let options;
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    options = {
      chartArea: { width: "60%", height: "70%" }
    };
    chart = new this.gLib.visualization.LineChart(
      document.getElementById("cmoletterdiv")
    );
    chart.draw(data, options);
  }

  public drawBarChart() {
    let data, chart;
    let options;

    options = {
      chartArea: { width: "60%", height: "70%" }
    };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);
    chart = new this.gLib.visualization.ColumnChart(
      document.getElementById("cmoletterdiv")
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
      document.getElementById("cmoletterdiv")
    );
    chart.draw(data, options);
    this.gLib.visualization.events.addListener(chart, "select", selectHandler);
    const callthis = this;
    function selectHandler() {
      const selection = chart.getSelection();
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
    let options;
    //options = { chartArea: { width: "90%", height: "100%" } };
    options = { width: 600, height: 200 };
    data = this.gLib.visualization.arrayToDataTable(this.newArray);

    chart = new this.gLib.visualization.Table(
      document.getElementById("cmoletterdiv")
    );
    chart.draw(data, options);
  }

  GetList() {
    this._cmoletterService
      .GetById(this.loginData.DepartmentCodes)
      .subscribe(data => {
        this.newArray.push(this.displayedColumns);
        if (data.IsSuccess) {
          const resultData = <any[]>data.Data;
          resultData.forEach(element => {
            this.newArray.push([
              element.ModuleName,
              element.TotalStatus,
              element.DisposedStatus,
              element.PendingStatus,
              element.AgeWisePendencyStatus
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
            element[4]
          ]);
        }
      });
      data = this.gLib.visualization.arrayToDataTable(
        this.Transpose2DArray(this.piechartArray)
      );
      chart = new this.gLib.visualization.PieChart(
        document.getElementById("cmoletterdiv")
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
    let i,
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

  openDialog() {
    const dialogRef = this.dialog.open(ZoomCMOLetterdailogComponent, {
      width: "95%",
      height: "95%",
      data: this.type
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
