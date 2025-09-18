import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { VCParticipantViewModel } from 'src/app/Shared/Model/VC/vc-participant-model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColumnHeaderModel, DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AppComponent } from 'src/app/app.component';
import { VCParticipantService } from 'src/app/Shared/Service/VC/vc-participant.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: 'app-vc-participant-report-dialog',
  templateUrl: './vc-participant-report-dialog.component.html',
  styleUrls: ['./vc-participant-report-dialog.component.css']
})
export class VcParticipantReportDialogComponent implements OnInit {
//#region << Variable >>
listModel: VCParticipantViewModel[];
dataSource: MatTableDataSource<VCParticipantViewModel>;
displayedColumns: string[] = ["index", "VcCreationTitle", "Name", "Designation", "DistrictTitle", "LocationName", "ParticipantCategoryEnglish"];
ViewdisplayedColumns: ColumnHeaderModel[] = [
  { Value: "VcCreationTitle", Text: "VC Name" },
  { Value: "Name", Text: "Participant Name" },
  { Value: "Designation", Text: "Designation" },
  { Value: "DistrictTitle", Text: "District" },
  { Value: "LocationName", Text: "Location" },
  { Value: "ParticipantCategoryEnglish", Text: "Participant Category" }
];

columnsToDisplay: string[] = this.displayedColumns.slice();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
indexModel: IndexModel;
totalRecords: number;

vCCode: number;

//#endregion

//#region << constructor >>

constructor(
  public _dialogRef: MatDialogRef<VcParticipantReportDialogComponent>,
  private readonly _vCParticipantService: VCParticipantService,
  private readonly _alertService: AlertService,
  public readonly _commonService: CommonService,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  this.indexModel = new IndexModel();
  if (data) {
    this.vCCode = Number(data );
    this.GetList();
  }
}
//#endregion

//#region << Method >>
ngOnInit() {

}

SortData(event) {
  this.indexModel.OrderBy = event.active;
  this.indexModel.OrderByAsc = event.direction === AppSetting.orderByDscAsc ? AppSetting.orderByAsc : AppSetting.orderByDsc;
  this.indexModel.IsPostBack = true;
  this.GetList();
}

onPaginateChange(event) {
  this.indexModel.Page = event.pageIndex + 1;
  this.indexModel.PageSize = event.pageSize;
  this.indexModel.IsPostBack = true;
  this.GetList();
}

GetList() {
  this._vCParticipantService.GetParicipantReport(this.indexModel, this.vCCode).subscribe(
    data => {
      if (data.IsSuccess) {
        this.listModel = <VCParticipantViewModel[]>data.Data.Data;
        this.dataSource = new MatTableDataSource<VCParticipantViewModel>(this.listModel);
        if (this.indexModel.IsPostBack === false) {
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


onNoClick(){
  this._dialogRef.close();
}
//#endregion

}
