import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { IndexModel } from "../Model/general-model";
import { ProjectMasterModel, ProjectUpdateProgressMappingModel, ProjectReportFilterModel } from "../Model/Master/project-master-model";
import { AppSetting } from '../Model/appsetting';

@Injectable({
  providedIn: "root",
})
export class ProjectMasterService {
  constructor(private readonly _baseService: BaseService) {}
  GetList(model: IndexModel,subSubCatCode) {
    var result = this._baseService.post(AppSetting.ProjectMasterListUrl+subSubCatCode, model);
    return result;
  }

  Add(model: ProjectMasterModel) {
    var result = this._baseService.post(AppSetting.ProjectMasterAddUrl, model);
    return result;
  }

  GetById(id) {
    var result = this._baseService.get(
      AppSetting.ProjectMasterGetByIdUrl + id,
      null
    );
    return result;
  }


  GetDistrictAndAssemblyDepartment(code: number) {
    return this._baseService.get(AppSetting.DistrictAndAssemblyDepartment + code);
  }



  GetProjectMasterWithChildList(id: number) {
    return this._baseService.get(AppSetting.ProjectMasterGetProjectDetailsWithProgressAndChildDataUrl + id);
  }

  Edit(model: ProjectMasterModel) {
    var result = this._baseService.post(AppSetting.ProjectMasterEditUrl, model);
    return result;
  }

  ChangeActiveStatus(id: number) {
    return this._baseService.get(AppSetting.ProjectMasterActiveStatusUrl + id);
  }

  DeleteProjectBySuperAdmin(id: number) {
    return this._baseService.get(AppSetting.DeleteProjectBySuperAdminUrl + id);
  }


 //#region <Update Progrss>

  UpdateProgress(model: ProjectUpdateProgressMappingModel) {
    return this._baseService.post(AppSetting.ProjectUpdateProgressUrl, model);
  }

  GetProjectShtDetailById(id) {
    return this._baseService.get(
      AppSetting.ProjectShtDetailByIdUrl + id,
      null
    );
  }

  GetByprojectProgressId(id) {
    return this._baseService.get(
      AppSetting.ProjectProgressDetailByIdUrl + id,
      null
    );
  }

  EditUpdateProgress(model: ProjectUpdateProgressMappingModel) {
    return this._baseService.post(AppSetting.EditUpdateProgress, model);
  }

  //#endregion<Update Progrss>

   //#region <Project Report>

   GetProjectReport(model: ProjectReportFilterModel) {
    return this._baseService.post(AppSetting.ProjectReportUrl, model);
  }

  ExportProjectReportToExcel(model: ProjectReportFilterModel) {
    return this._baseService.post(AppSetting.ExportProjectReportToExcelUrl, model);
  }

  GetProjectSummaryReport(model: ProjectReportFilterModel) {
    return this._baseService.post(AppSetting.ProjectSummaryReportUrl, model);
  }

  GetSumOfDynamicLabelSummaryReport(model: ProjectReportFilterModel) {
    return this._baseService.post(AppSetting.SumOfDynamicLabelSummaryReportUrl, model);
  }

  GetDepartmentWiseSummaryReport(model: ProjectReportFilterModel) {
    return this._baseService.post(AppSetting.DepartmentWiseSummaryReportUrl, model);
  }

  GetProjectDepartmentStatusSummaryReport(model: ProjectReportFilterModel) {
    return this._baseService.post(AppSetting.ProjectDepartmentStatusSummaryReportUrl, model);
  }

  //#endregion<Project Report>

}
