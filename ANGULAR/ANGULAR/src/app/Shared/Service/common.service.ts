import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AppSetting } from "../Model/appsetting";
import {
  RequestServiceModel,
  ResponseServiceModel,
} from "../Model/service.model";
import { AuthenticationService } from "./authentication.service";
import { ColumnHeaderModel } from "../Model/commonddl.model";
import { PermissionModel, ExportToExcelModel, SendNotificationToDeptOfficerModel, ConnectWithCMISFilterModel, IndexModel } from "../Model/general-model";
import { DepartmentFilterModel } from "../Model/orderlist.model";
import { TemplateVerifyModel } from "../Model/generate-order.model";
import { VCCustomFilter } from "../Model/VC/vc-participant-model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  data: number[] = [];
  constructor(
    private readonly _baseService: BaseService,
    private readonly _auth: AuthenticationService,
    private router: Router
  ) {}

  GetAllDDL(model: any, usertype = "", userId = 0) {
    return this._baseService.get(
      AppSetting.GetDDlUrl +
        model +
        "&userType=" +
        usertype +
        "&userid=" +
        userId
    );
  }
  GetDDL(key: any, id: any = 0, id2: any = 0) {
    return this._baseService.get(
      AppSetting.GetSingleDDlUrl + key + "&id=" + id + "&id2=" + id2
    );
  }
  GetBlockByDistrict(code: string) {
    return this._baseService.get(AppSetting.GetBlockByDistrictUrl + code);
  }
  GetGramPanchayatByBlock(code: string) {
    return this._baseService.get(AppSetting.GramPanchayatByBlockUrl + code);
  }
  GetVillageByGramPanchayat(code: string) {
    return this._baseService.get(AppSetting.VillageByGramPanchayatUrl + code);
  }

  GetLocationByDistrict(code: number) {
    return this._baseService.get(AppSetting.GetLocationByDistrictUrl + code);
  }

  GetVCPaticipantByPaticipantCategory(
    code: number,
    vCCode: number,
    dataId: number
  ) {
    return this._baseService.get(
      AppSetting.GetParticipantByCategoryUrl +
        code +
        "&vCCode=" +
        vCCode +
        "&dataId=" +
        dataId
    );
  }

  GetOfficeList(code: string) {
    return this._baseService.get(AppSetting.GetOfficeList + code);
  }

  GetDistrictList(code: number) {
    return this._baseService.get(AppSetting.GetDistrictList + code);
  }

  GetParticipantList(code: number) {
    return this._baseService.get(AppSetting.GetParticipantList + code);
  }

  GetVIPPersonListOfPressRelease(code: number) {
    return this._baseService.get(AppSetting.GetVIPPersonListOfPressRelease + code);
  }

  GetSchemeList(code: number, isActive: number) {
    return this._baseService.get(
      AppSetting.GetSchemeList + code + "&isActive=" + isActive
    );
  }

  GetTahsilByBlock(code: number) {
    return this._baseService.get(AppSetting.GetTahsilByBlockUrl + code);
  }

  GetTahsilByMultipleDistrict(code: string) {
    return this._baseService.get(
      AppSetting.GetTahsilByMultipleDistrictUrl + code
    );
  }

  GetBlockByMultipleDistrict(code: string) {
    return this._baseService.get(
      AppSetting.GetBlockByMultipleDistrictUrl + code
    );
  }
  GetDistrictByOffice(code: number) {
    return this._baseService.get(AppSetting.GetDistrictByOfficeUrl + code);
  }

  GetCCcategoryByDepartment(code: number) {
    return this._baseService.get(
      AppSetting.GetCCcategoryByDepartmentUrl + code
    );
  }

  GetsubcategoryList(departmentCode: number, categoryCode: number) {
    return this._baseService.get(
      AppSetting.GetAchievementsubcategoryList +
        "&departmentCode=" +
        departmentCode +
        "&categoryCode=" +
        categoryCode
    );
  }

  GetImpdecsubcategoryList(departmentCode: number, categoryCode: number) {
    return this._baseService.get(
      AppSetting.GetImpDecisionsubcategoryList +
        "departmentCode=" +
        departmentCode +
        "&categoryCode=" +
        categoryCode
    );
  }

  GetUserList(departmentCode: number, categoryCode: number) {
    return this._baseService.get(
      AppSetting.GetImpDecisionsubcategoryList +
        "departmentCode=" +
        departmentCode +
        "&categoryCode=" +
        categoryCode
    );
  }

  Getcategorybydepartmentcode(departmentCode: number) {
    return this._baseService.get(AppSetting.Getcategorybydepartmentcode + departmentCode);
  }

  GetJankalyanCategorybyDepartmentCode(departmentCode: number) {
    return this._baseService.get(AppSetting.GetJankalyanCategorybyDepartmentCode + departmentCode);
  }

  GetJankalyanCategorybyDepartmentAndLoginUser(departmentCode: number) {
    return this._baseService.get(AppSetting.JankalyanCategorybyDepartmentAndLoginUserURL + departmentCode);
  }

  GetJankalyanpressReleaseCategorybyDepartmentAndLoginUser(departmentCode: string) {
    return this._baseService.get(AppSetting.GetJankalyanpressReleaseCategorybyDepartmentAndLoginUser + departmentCode);
  }

  GetJankalyanEntryTypebyDepartmentCode(departmentCode: string,catCode: number=0) {
    return this._baseService.get(AppSetting.GetJankalyanEntryTypebyDepartmentCode + departmentCode + '&catCode='+catCode);
  }

  GetGeneralSubCategory(CategoryCode: number) {
    return this._baseService.get(AppSetting.GetGeneralSubCategory + CategoryCode);
  }

  GetOrderSubTypeByType(code: number) {
    return this._baseService.get(AppSetting.GetOrderSubTypeByTypeUrl + code);
  }

  GetOrderSubTypeByTypeAndDepartment(departmentCode: number, code: number) {
    return this._baseService.get(
      AppSetting.GetOrderSubTypeByTypeAndDepartment +
        "departmentCode=" +
        departmentCode +
        "&TypeCode=" +
        code
    );
  }

  GetCCReferenceByCCCategory(code: number) {
    return this._baseService.get(
      AppSetting.GetCCReferenceByCCCategoryUrl + code
    );
  }

  GetReferenceByDepartment(code: number) {
    return this._baseService.get(
      AppSetting.GetCCReferenceByDepartmentUrl + code
    );
  }

  SaveLoginUserLog() {
    return this._baseService.get(AppSetting.SaveLoginUserLogUrl);
  }

  GetOrderRelatedToYearList(moduleName: string) {
    return this._baseService.get(
      AppSetting.GetRelatedToYearListUrl + moduleName
    );
  }

  GetOrderRelatedToDepartmentList(model: DepartmentFilterModel) {
    return this._baseService.post(
      AppSetting.GetRelatedToDepartmentListUrl,
      model
    );
  }

  GetVCCreationWithFiler(model: VCCustomFilter) {
    return this._baseService.post(AppSetting.GetVCCreationWithFilerUrl, model);
  }

  GetFilterdDDL(model: any, usertype = "", userId = 0) {
    return this._baseService.post(
      AppSetting.GetFilterdDDlUrl +
        "?userType=" +
        usertype +
        "&userid=" +
        userId,
      model
    );
  }

  GetSchemeDepartment(id) {
    return this._baseService.get(
      AppSetting.BaseApiUrl + AppSetting.GetAdvertisementListUrl + id
    );
  }

  // GetDistrictbyState(id) {
  //   return this._baseService.get(
  //     AppSetting.BaseApiUrl + AppSetting.GetDistrictbyStateListUrl + id
  //   );
  // }

  GetAllKeyforDDL(model: any) {
    return this._baseService.get(AppSetting.GetKeysForDropdownUrl + model);
  }

  ScrollingTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  ShowData(data: string) {
    var temp = data.split(",");
    for (var i = 0; i < temp.length; i++) {
      this.data[i] = parseInt(temp[i]);
    }
    return this.data;
  }

  ThirdPartyService(model: ResponseServiceModel): any {
    //var result= this._baseService.post(AppSetting.ServiceAPIUrl+"?Data="+ JSON.stringify(AppSetting.serviceAPIModel),null);
    let resObj = new ResponseServiceModel();

    //  let yearobj=new RequestServiceModel();
    //  yearobj._parameters[0].getiview.params.Servicetype="Years";

    return this._baseService.post(AppSetting.OrderRelatedToUrl, model);
  }

  IsNullOrEmpty(strValue: any) {
    if (
      strValue != null &&
      strValue != undefined &&
      strValue != "null" &&
      strValue != "undefined" &&
      String(strValue).replace(/^\s+|\s+$/gm, "") !== ""
    ) {
      return false;
    }
    return true;
  }

  numberOnly(event, isCommaOrDash: boolean = false): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (isCommaOrDash) {
      if (charCode == 44 || charCode == 45) {
        return true;
      }
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public IsAccessibleUrl(requestedUrl: string): boolean {
    return this._auth.IsAccessibleUrl(requestedUrl);
  }

  public getMonthYear(addMonth: number) {
    var date = new Date();
    var month = (date.getMonth() + addMonth) % 12;
    var monthCodes: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthCodes[month] + " " + date.getFullYear();
  }

  ObjectToJsonByKeyValuePair(key, value): string {
    if (key && value) {
      if (
        !this.IsNullOrEmpty(key.trim()) &&
        !this.IsNullOrEmpty(value.trim())
      ) {
        const objJson = {};
        objJson[key.trim()] = value.trim();
        return JSON.stringify(objJson);
      }
    }
  }

  ObjectToJson(keys: ColumnHeaderModel[], value): string {
    if (keys.length > 0 && !this.IsNullOrEmpty(value)) {
      const objJson = {};
      keys.forEach((element) => {
        objJson[element.Value] = value;
      });
      return JSON.stringify(objJson);
    }
  }

  GetPagePermission(
    ListUrl: string = "",
    AddUrl: string = "",
    DetailUrl: string = "",
    UpdateUrl: string = "",
    DeleteUrl: string = "",
    Custom1Url: string = "",
    Custom2Url: string = "",
    Custom3Url: string = ""
  ): PermissionModel {
    let model = new PermissionModel();
    model.ListPageAccess =
      ListUrl != "" ? this._auth.IsAccessibleUrl(ListUrl) : false;
    model.AddPageAccess =
      AddUrl != "" ? this._auth.IsAccessibleUrl(AddUrl) : false;
    model.DetailPageAccess =
      DetailUrl != "" ? this._auth.IsAccessibleUrl(DetailUrl) : false;
    model.UpdatePageAccess =
      UpdateUrl != "" ? this._auth.IsAccessibleUrl(UpdateUrl) : false;
    model.DeletePageAccess =
      DeleteUrl != "" ? this._auth.IsAccessibleUrl(DeleteUrl) : false;
    model.Custome1PageAccess =
      Custom1Url != "" ? this._auth.IsAccessibleUrl(Custom1Url) : false;
    model.Custom2PageAccess =
      Custom2Url != "" ? this._auth.IsAccessibleUrl(Custom2Url) : false;
    model.Custom3PageAccess =
      Custom3Url != "" ? this._auth.IsAccessibleUrl(Custom3Url) : false;
    return model;
  }

  GetHelpDocument(module: string,isBase64=true) {
    return this._baseService.get(AppSetting.GetHelpDocUrl + module +'&isBase64='+isBase64);
  }

  GenerateOTP() {
    return this._baseService.get(AppSetting.GenerateOTPUrl);
  }

  VeriftTemplate(model: TemplateVerifyModel) {
    const result = this._baseService.post(AppSetting.TemplateVerifyUrl, model);
    return result;
  }

  VerifyOTP(oTP: string) {
    return this._baseService.get(AppSetting.VerifyOTPUrl + oTP);
  }

  ConvertMbintoByte(data) {
    return data * 1024 * 1024;
  }

  SendNotification(model) {
    const result = this._baseService.post(
      AppSetting.CommonSendNotificationUrl,
      model
    );
    return result;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  GetDepartmentByDepartmentCategory(code: number, admCode: number) {
    return this._baseService.get(AppSetting.GetDepartmentByDepartmentCategoryUrl + code + '&admCode='+ admCode);
  }

  GetAllSSOIDByUserType(userType: string, dptCode='') {
    return this._baseService.get(AppSetting.GetAllSSOIDByUserTypeUrl + userType +'&dptCode=' + dptCode);
  }

  GetAchievementCategoryByCode(code: number) {
    return this._baseService.get(AppSetting.GetAchievementCategoryByCodeUrl + code);
  }

  GetSubCategoryByCategoryCode(code: number) {
    return this._baseService.get(AppSetting.GetSubCategoryByCategoryCodeUrl + code);
  }

  GetDepartmentMainMenuByDepartment(code: number) {
    return this._baseService.get(AppSetting.GetDepartmentMainMenuByDepartment   + code);
  }
  GetModuleCategoryByModule(code: number) {
    return this._baseService.get(AppSetting.GetModuleCategoryByModule   + code);
  }

  GetModuleSubCategoryByModule(moduleCode=0,moduleCatCode=0) {
    return this._baseService.get(AppSetting.ModuleSubCategoryByModuleURL   + moduleCode +'&moduleCatCode='+moduleCatCode);
  }

  GetChairpersonByMultipleCategory(code: number) {
    return this._baseService.get(AppSetting.GetChairpersonByMultipleCategoryUrl + code);
  }

  GetNewsSubjetByDepartent(code: string) {
    return this._baseService.get(AppSetting.GetNewsSubjetByDepartentUrl + code);
  }

  GetDepartmentByAdminDepartmentCodes(code: string) {
    return this._baseService.get(AppSetting.DepartmentByAdminDepartmentCodestUrl + code);
  }

  GetSubSubCategoryBySubCategoryCode(code: number) {
    return this._baseService.get(AppSetting.GetSubSubCategoryBySubCategoryCodeUrl + code);
  }

  getMLAByDisctrictCode(code) {
    return this._baseService.get(AppSetting.getMLAByDisctrictCodeUrl + code);
  }

  GetProjectSchemeCategoryByDepartment(code: number) {
    return this._baseService.get(AppSetting.ProjectSchemeCategoryByDepartmentUrl + code);
  }

  GetCMISStatusByModuleId(code: number) {
    return this._baseService.get(AppSetting.CMISStatusByModuleIdUrl + code);
  }

  GetPageMasterByPageTypeCode(pageTypeCode: number, applicationCode: string) {
    return this._baseService.get(AppSetting.PageMasterByPageTypeCodeUrl + pageTypeCode + '&applicationCode=' + applicationCode);
  }

  ExportToExcel(model: ExportToExcelModel) {
    return this._baseService.post(AppSetting.ExportToExcelUrl, model);
  }

  SendNotificationToDepartmentOfficer(model: SendNotificationToDeptOfficerModel) {
    return this._baseService.post(AppSetting.SendNotificationToDepartmentOfficerUrl , model);
  }

  GetConnectWithCMISData(model: ConnectWithCMISFilterModel) {
    return this._baseService.post(AppSetting.GetConnectWithCMISDataUrl , model);
  }

  GetDepartmentByCMOOfficerCode(code: number) {
    return this._baseService.get(AppSetting.GetDepartmentByCMOOfficerCodeUrl + code);
  }

  GetCMISDepartmentByCMOOfficerCode(code: number) {
    return this._baseService.get(AppSetting.GetCMISDepartmentByCMOOfficerCodeUrl + code);
  }

  GetKPIByDepartmentCode(code: number) {
    return this._baseService.get(AppSetting.KPIByDepartmentCodeUrl + code);
  }

  GetKPICategoryByDptCodeForDistrict(code: number) {
    return this._baseService.get(AppSetting.KPICategoryByDptCodeForDistrictUrl + code);
  }

  GetKPICategoryByDptCodeForDepartment(code: number) {
    return this._baseService.get(AppSetting.KPICategoryByDptCodeForDepartmentUrl + code);
  }

  GetLoginUserDepartmentListByAdminDepartment(code: string,cMOOfrCode=0) {
    return this._baseService.get(AppSetting.LoginUserDepartmentListByAdminDepartmentUrl + code +'&cMOOfrCode='+cMOOfrCode);
  }

  GetLoginUserDistrictForProject() {
    return this._baseService.get(AppSetting.GetLoginUserDistrictForProjectUrl);
  }

  GetEntryTypeByCategory(code: number) {
    return this._baseService.get(AppSetting.EntryTypeByCategoryUrl + code);
  }

  // This method for get department list on condition wise department/district code is similar then return record.
  GetDepartmentDistrictList(code: number) {
    return this._baseService.get(AppSetting.GetDepartmentDistrictListUrl + code);
  }

  GetAllTestimonialForBackend(model: IndexModel) {
    return this._baseService.post(AppSetting.GetAllTestimonialForBackend, model);
  }

  UpdateStatus(id) {
    return this._baseService.get(AppSetting.UpdateTestimonialStatus + id, null);
  }

  //#region To maintatin state from 'back' button press
  modelSetGet(model: any, isSet: boolean = false, listName: string = this.router.url) {
    if (isSet) {
      sessionStorage.setItem("postBackSearch_" + listName, JSON.stringify(model));
      return model;
    } else {
      if (sessionStorage.getItem("postBackSearch_" + listName) != undefined) {

        return JSON.parse(sessionStorage.getItem("postBackSearch_" + listName));
      } else {
        sessionStorage.setItem("postBackSearch_" + listName, JSON.stringify(model));
        return model;
      }
    }
  }

//#endregion
}
