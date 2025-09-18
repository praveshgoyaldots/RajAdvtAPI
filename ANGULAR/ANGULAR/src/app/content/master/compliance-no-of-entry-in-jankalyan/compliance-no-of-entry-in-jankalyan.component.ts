import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ComplianceNoOfEntryInJankalyanReportModel, CMISReportFilterModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';

@Component({
  selector: 'app-compliance-no-of-entry-in-jankalyan',
  templateUrl: './compliance-no-of-entry-in-jankalyan.component.html',
  styleUrls: ['./compliance-no-of-entry-in-jankalyan.component.css']
})
export class ComplianceNoOfEntryInJankalyanComponent implements OnInit {
//#region Variable
model: ComplianceNoOfEntryInJankalyanReportModel;
filterModel=new CMISReportFilterModel();
department:string='';
module: string='';
totalEntry:number=0;
//#endregion Variable

//#region constructor
constructor(
  private readonly _alertService: AlertService,
  private readonly _jankalyanlogService: JankalyanlogService,
  private _parentComponent: AppComponent,
  public readonly _commonService: CommonService,
  private readonly _route: ActivatedRoute,
) {
  
if(this._route.snapshot.params.dsb && this._route.snapshot.params.dsb!=undefined && this._route.snapshot.params.dsb!='report'){
  this.filterModel.IsDashBoard=true;
 this._parentComponent.setpagelayout(
  "Compliance No Of Entry In Jankalyan Detail",
  "keyboard_backspace",
  "Back To Dashboard",
  "cmdashboard"
);
}else{
  this._parentComponent.setpagelayout(
    "Compliance No Of Entry In Jankalyan Detail:",
    "keyboard_backspace",
    "Back To CMIS Compliance Summary Report List",
    "/master/cmis-dpt-module-summary-report"
  );
}
  if(this._route.snapshot.params.dptCode){
   this.filterModel.DepartmentCode =String(this._route.snapshot.params.dptCode);
   this.filterModel.ModuleId =String(this._route.snapshot.params.moduleId);
   this.filterModel.DepartmentName =String(this._route.snapshot.params.dpt);
   this.filterModel.ModuleName =String(this._route.snapshot.params.module);
   this.filterModel.DepartmentStatus =this._route.snapshot.params.status;
   this.filterModel.NumberOfEntry =Number(this._route.snapshot.params.expected);
   sessionStorage.setItem("EntryInJankalyan",JSON.stringify(this.filterModel));
   this.GetList();
 }

}

//#endregion constructor

//#region Methods

ngOnInit() {
}

GetList() {
  
  this._jankalyanlogService
    .GetComplianceNoOfEntryInJankalyanReportData(this.filterModel)
    .subscribe(
      data => {

        if (data.IsSuccess) {
          this.model = <ComplianceNoOfEntryInJankalyanReportModel>data.Data;
          this.totalEntry=this.model.ProjectsList.length + this.model.GovDocumentList.length + this.model.SchemeList.length +this.model.GeneralEntryList.length
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
}

//#endregion Methods
}
