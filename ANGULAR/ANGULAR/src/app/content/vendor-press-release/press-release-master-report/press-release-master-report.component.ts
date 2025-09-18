import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DdlItemModel, DDLModel } from "src/app/Shared/Model/commonddl.model";
import { PressReleaseFilterModel } from "src/app/Shared/Model/TenderPressRelease/press-release-model";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { PressReleaseService } from "src/app/Shared/Service/TenderPressRelease/press-release.service";

@Component({
  selector: "app-press-release-master-report",
  templateUrl: "./press-release-master-report.component.html",
  styleUrls: ["./press-release-master-report.component.css"],
})
export class PressReleaseMasterReportComponent implements OnInit {
  indexModel: PressReleaseFilterModel;
  totalRecords: number;
  dDLList: DDLModel;
  ddlEntryTypeMaster: DdlItemModel[];
  ddlParticipant: DdlItemModel[];
  constructor(
    private readonly _PressReleaseService: PressReleaseService,
    private _parentComponent: AppComponent,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly router: Router
  ) {
    this.indexModel = new PressReleaseFilterModel();
    this._parentComponent.setpagelayout("Press Release Master Report");

    if (sessionStorage.getItem("PressReleaseSearch")) {
      this.indexModel = <PressReleaseFilterModel>(
        JSON.parse(sessionStorage.getItem("PressReleaseSearch"))
      );

      if (this.indexModel.CategoryCode) {
        this.GetJankalyanEntryTypebyDepartmentCode(
          "",
          this.indexModel.CategoryCode
        );
      }
      if (this.indexModel.VipCategory) {
        this.getParticipantList(this.indexModel.VipCategory);
      }
    }
  }

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.PressReleaseReportDDLKey).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  GetJankalyanEntryTypebyDepartmentCode(DepartmentCode: string, category) {
    if (DepartmentCode || category) {
      this._commonService
        .GetJankalyanEntryTypebyDepartmentCode(
          String(DepartmentCode),
          Number(category)
        )
        .subscribe(
          (data) => {
            if (data.IsSuccess) {
              this.ddlEntryTypeMaster = data.Data as DdlItemModel[];
            }
          },
          (error) => {
            this._alertService.error(error.message);
          }
        );
    } else {
      // this.model.WebsiteName = null;
    }
  }

  getParticipantList(code) {
    if (code) {
      this._commonService.GetVIPPersonListOfPressRelease(code).subscribe(
        (data) => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlParticipant = [];
    }
  }

  getEnglishName(name) {
    return name.replace("Collectorate,", "");
  }

  getActiveDeActiveData(data) {
    this.indexModel.Status = data;
    //this.GetList();
  }

  clearClick() {
    this.indexModel = new PressReleaseFilterModel();
    sessionStorage.removeItem("PressReleaseSearch");
  }

  saveInSession(){
    if (this.indexModel.ToDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.ToDate).getFullYear(),
          new Date(this.indexModel.ToDate).getMonth(),
          new Date(this.indexModel.ToDate).getDate()
        )
      ).toISOString();
      this.indexModel.ToDate = uTCDate;
    }
    if (this.indexModel.FromDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.FromDate).getFullYear(),
          new Date(this.indexModel.FromDate).getMonth(),
          new Date(this.indexModel.FromDate).getDate()
        )
      ).toISOString();
      this.indexModel.FromDate = uTCDate;
    }
    if (this.indexModel.PressReleaseToDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.PressReleaseToDate).getFullYear(),
          new Date(this.indexModel.PressReleaseToDate).getMonth(),
          new Date(this.indexModel.PressReleaseToDate).getDate()
        )
      ).toISOString();
      this.indexModel.PressReleaseToDate = uTCDate;
    }
    if (this.indexModel.PressReleaseFromDate) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.indexModel.PressReleaseFromDate).getFullYear(),
          new Date(this.indexModel.PressReleaseFromDate).getMonth(),
          new Date(this.indexModel.PressReleaseFromDate).getDate()
        )
      ).toISOString();
      this.indexModel.PressReleaseFromDate = uTCDate;
    }
    this.indexModel.Page=1;
  
    if (this.indexModel.DeptValue) {
      this.indexModel.DepartmentCode = String(this.indexModel.DeptValue);
    }
    if (this.indexModel.DistValue) {
      this.indexModel.DistrictCode = String(this.indexModel.DistValue);
    }
    if (this.indexModel.VipCategory) {
      this.indexModel.VIPCategoryCode = String(this.indexModel.VipCategory);
    }
    if (this.indexModel.VipPerson) {
      this.indexModel.VIPPersonCode = String(this.indexModel.VipPerson);
    }

    sessionStorage.setItem("PressReleaseReportSearch", JSON.stringify(this.indexModel));
  }


  showReport(event){
    this.saveInSession();
    if(event.currentTarget.id === "CreatedByUser"){
      this.router.navigateByUrl("/tender-press-release/report/created-by-user");
    }
    else if(event.currentTarget.id === "CategorySubCategory"){
      this.router.navigateByUrl("/tender-press-release/report/category-subcategory");
    }
    else if(event.currentTarget.id === "DeptCatSubcat"){
      this.router.navigateByUrl("/tender-press-release/report/dept-cat-subcat");
    }
    else if(event.currentTarget.id === "LookupCategory"){
      this.router.navigateByUrl("/tender-press-release/report/lookupcategory");
    }
    else if(event.currentTarget.id === "DeptLookupCat"){
      this.router.navigateByUrl("/tender-press-release/report/department-lookupcat");
    }
    else if(event.currentTarget.id === "VIPDepartment"){
      this.router.navigateByUrl("/tender-press-release/report/vip-department");
    }
    else if(event.currentTarget.id === "DistCatSubcat"){
      this.router.navigateByUrl("/tender-press-release/report/dist-cat-subcat");
    }
    else if(event.currentTarget.id === "DistLookupCategory"){
      this.router.navigateByUrl("/tender-press-release/report/dist-lookupcat");
    }
    else if(event.currentTarget.id === "DepartmentDistrict"){
      this.router.navigateByUrl("/tender-press-release/report/department-district");
    }
    else if(event.currentTarget.id === "VIPDistrict"){
      this.router.navigateByUrl("/tender-press-release/report/vip-district");
    }
    else if(event.currentTarget.id === "VIPDeptDist"){
      this.router.navigateByUrl("/tender-press-release/report/vip-dept-dist");
    }
    else if(event.currentTarget.id === "UserDate"){
      this.router.navigateByUrl("/tender-press-release/report/user-date");
    }
  }
}
