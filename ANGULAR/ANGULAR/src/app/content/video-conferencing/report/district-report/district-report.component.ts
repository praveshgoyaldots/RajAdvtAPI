import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantCountByDistrictReportModel, ParticipantByDistrictReportModel } from 'src/app/Shared/Model/vccreationView.model';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { VcCreationService } from 'src/app/Shared/Service/vc-creation.service';
import { AppComponent } from 'src/app/app.component';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { VCCreationDDLModel } from 'src/app/Shared/Model/VC/vc-participant-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-district-report',
  templateUrl: './district-report.component.html',
  styleUrls: ['./district-report.component.css']
})
export class DistrictReportComponent implements OnInit {

  //#region Variable
  listModel:ParticipantCountByDistrictReportModel[];
  model: ParticipantByDistrictReportModel;
  ddlCreateVCList: VCCreationDDLModel[];
  dDLList: DDLModel;
 dataSource: any;
 totalVCCount: number;
 indexModel: IndexModel;
 displayedColumns: string[] = [
  "index",
  "DistrictTitle",
 "ParticipantCount",
// ""
];
ViewdisplayedColumns: ColumnHeaderModel[] = [
 { Value: "DistrictTitle", Text: "District" },
  //{ Value: "ParticipantCount", Text: "Participant Count" },
  //  { Value: "total", Text: "Total" }
];
columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatSort, {static: true}) sort: MatSort;

//#endregion Variable

//#region constructor
  constructor(
    private readonly _alertService: AlertService,
    private readonly _vccreationService: VcCreationService,
    private _parentComponent: AppComponent,
    public readonly _commonService: CommonService,
  ) {
    this._parentComponent.setpagelayout("Participant Count by District Report List :" , "", "", "");
    this.model=new ParticipantByDistrictReportModel();
    this.indexModel = new IndexModel();
  }

  //#endregion constructor

  //#region Methods
  ngOnInit() {
   // this.GetList();
    this.GetDDLList();
  }

   /** Gets the total Count of all Participant. */
   getTotalCost() {

    this.totalVCCount= this.listModel.map(t => t.ParticipantCount).reduce((acc, value) => acc + value, 0);
  }

  GetDDLList() {

      this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
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

  GetList() {
    this._vccreationService.VCParticipantCountByDistrictReport(this.model).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.listModel = <ParticipantCountByDistrictReportModel[]>data.Data;
          this.dataSource = new MatTableDataSource<ParticipantCountByDistrictReportModel>(this.listModel);
          this.dataSource.sort = this.sort;
          this.getTotalCost();
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  searchClick() {
    this.GetList();
  }

  clearClick() {
    this.model = new ParticipantByDistrictReportModel();
    this.listModel=[];
    // this.GetList();
     this.dataSource = null;
  }


print() {
  let printContents , popupWin ;
  printContents = document.getElementById("test").outerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
     popupWin.document.write(`
      <html>
        <head>
          <title>Summary Report</title>
            <style>
            table th,table td{
              border: 1px solid black;
            }
            table{
              border-collapse: collapse;
            }
            span{
              font-weight: bold;
              margin-bottom: 10px;
            }
            </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
}

//#endregion Methods
}
