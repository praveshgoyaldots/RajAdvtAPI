import { Component, OnInit, Inject } from "@angular/core";
import { CMISComplianceModel } from "src/app/Shared/Model/Master/jankalyanLogMaster.model";
import { FormControl, Validators } from "@angular/forms";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { JankalyanlogService } from "src/app/Shared/Service/jankalyanlog.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";

@Component({
  selector: "app-cmis-compliance",
  templateUrl: "./cmis-compliance.component.html",
  styleUrls: ["./cmis-compliance.component.css"]
})
export class CmisComplianceComponent implements OnInit {
  //#region <Variable>

  model: CMISComplianceModel;
  workType = new FormControl("");
  categoryCode = new FormControl("");
  subCategory = new FormControl("");
  ExpactedNoOfEntries = new FormControl("", [Validators.required]);
  dDLList: DDLModel;
  cMISNew_Trans_CoreId:number;
  CMIS_AchievementId: number;
  moduleName: string;
  //#endregion <Variable>

  //#region <Constructor>

  constructor(
    public readonly _dialogRef: MatDialogRef<CmisComplianceComponent>,
    private readonly _alertService: AlertService,
    private readonly _jankalyanlogService: JankalyanlogService,
    private readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.model = new CMISComplianceModel();
    if (data) {
      this.cMISNew_Trans_CoreId = data.TransId;
      this.moduleName = data.ModuleName;
      this.CMIS_AchievementId=data.CMIS_AchievementId;
      this.GetById();
    }
  }

  //#endregion <Constructor>

  //#region <Method>

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForCMISCompliance).subscribe(
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

  GetById() {
    this._jankalyanlogService
      .GetCMISComplianceById(this.cMISNew_Trans_CoreId,this.CMIS_AchievementId)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            if (data.Data) {

            this.model = <CMISComplianceModel>data.Data;
            if (this.model.CategoryCode) {
              this.model.CategoryCode = String(this.model.CategoryCode);
            }
            if (this.model.SubCategoryCode) {
              this.model.SubCategoryCode = String(this.model.SubCategoryCode);
            }
            if (this.model.WorksTypeCode) {
              this.model.WorksTypeCode = String(this.model.WorksTypeCode);
            }
            if (this.model.PageCode) {
              this.model.PageCode = String(this.model.PageCode);
            }
          }else{
            this.model = new CMISComplianceModel();
          }
          this.model.CMISNew_Trans_CoreId=this.cMISNew_Trans_CoreId;
          this.model.CMIS_AchievementId=this.CMIS_AchievementId;
          this.model.ModuleName=this.moduleName;
          }
        },
        error => {
          this.model = new CMISComplianceModel();
          this._alertService.error(error.message);
        }
      );
  }

  SaveClick() {
    this.categoryCode.markAsTouched();
    this.subCategory.markAsTouched();
    this.workType.markAsTouched();
    this.ExpactedNoOfEntries.markAsTouched();
    if (
      this.subCategory.valid &&
      this.categoryCode.valid &&
      this.workType.valid &&
      this.ExpactedNoOfEntries.valid
    ) {
      this._jankalyanlogService.AddUpdateCMISCompliance(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._dialogRef.close(true);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          console.log(error);
          this._alertService.error(error.message);
        }
      );
    }
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  //#endregion <Method>
}
