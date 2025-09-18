import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NoOfComplianceDetailModel, CMISReportFilterModel, NoOfComplianceDetailReportModel } from 'src/app/Shared/Model/Master/jankalyanLogMaster.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { JankalyanlogService } from 'src/app/Shared/Service/jankalyanlog.service';

@Component({
  selector: 'app-no-of-compliance',
  templateUrl: './no-of-compliance.component.html',
  styleUrls: ['./no-of-compliance.component.css']
})
export class NoOfComplianceComponent implements OnInit {
//#region Variable
model: NoOfComplianceDetailModel;
projectModel:NoOfComplianceDetailReportModel[];
orderModel:NoOfComplianceDetailReportModel[];
schemeModel:NoOfComplianceDetailReportModel[];
achievmentModel:NoOfComplianceDetailReportModel[];
filterModel=new  CMISReportFilterModel();
department:string='';
module: string='';
//#endregion Variable

//#region constructor
constructor(
  private readonly _alertService: AlertService,
  private readonly _jankalyanlogService: JankalyanlogService,
  private _parentComponent: AppComponent,
  public readonly _commonService: CommonService,
  private readonly _route: ActivatedRoute,
) {
  
  if(this._route.snapshot.params.dsb  && this._route.snapshot.params.dsb!=undefined){
   this._parentComponent.setpagelayout(
    "No Of Compliance",
    "keyboard_backspace",
    "Back To Dashboard",
    "cmdashboard"
  );
  }else{
    this._parentComponent.setpagelayout(
      "No Of Compliance:",
      "keyboard_backspace",
      "Back To CMIS Compliance Summary Report List",
      "/master/cmis-dpt-module-summary-report"
    );
  }
  if(this._route.snapshot.params.dptCode){
   this.filterModel.DepartmentCode =String(this._route.snapshot.params.dptCode);
   this.filterModel.ModuleId =String(this._route.snapshot.params.moduleId);
   this.department =String(this._route.snapshot.params.dpt);
   this.module =String(this._route.snapshot.params.module);
   this.filterModel.DepartmentStatus =this._route.snapshot.params.status;
   this.GetList();
 }
}

//#endregion constructor

//#region Methods

ngOnInit() {
}

GetList() {
  
  this._jankalyanlogService
    .GetNoOfComplianceDetailData(this.filterModel)
    .subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <NoOfComplianceDetailModel>data.Data;
          if(this.model && this.model.NoOfComplianceDetailList){
this.projectModel=this.model.NoOfComplianceDetailList.filter(x=>x.ModuleName=='Projects')
this.orderModel=this.model.NoOfComplianceDetailList.filter(x=>x.ModuleName=='Order')
this.achievmentModel=this.model.NoOfComplianceDetailList.filter(x=>x.ModuleName=='Achievement')
this.schemeModel=this.model.NoOfComplianceDetailList.filter(x=>x.ModuleName=='Scheme')
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
}

//#endregion Methods
}
