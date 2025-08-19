using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IProjectMasterService
    {
        #region InterFace For Add/Update and GetAll

        /// <summary>
        /// Get all record of project master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<ProjectMasterViewModel>> GetAll(ProjectReportFilterModel model, int subSubCatCode);

        /// <summary>
        /// This for create new record in project master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(ProjectMasterModel model, bool isService = false);

        /// <summary>
        /// Get record by id of project master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<ProjectMasterModel>> GetById(long id);

        ServiceResponse<DepartmentMasterModel> GetDistrictAndAssemblyDepartment(long dptCode);

        /// <summary>
        /// this is for edit the record of project master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(ProjectMasterModel model, bool isService = false);

        /// <summary>
        /// For toggle the status of specific record.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> DeleteProjectBySuperAdmin(long id);

        ServiceResponse<ProjectDetailsWithProgressAndChildTableDataModel> GetProjectDetailsWithProgressAndChildData(int id, bool isBase64File = true);

        #endregion

        #region Front

        ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>> GetAllListByFilter(ProjectSearchModel model, bool isAllRecords = false, bool isBase64File = true);

        ServiceResponse<ProjectMasterFrontViewModel> GetFrontDetailById(long id, bool IsBase64File = false);
        #endregion

        #region Update Progress

        /// <summary>
        /// Update Progress for particular project at a time.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateProgress(ProjectUpdateProgressMappingModel model);

        Task<ServiceResponse<string>> EditUpdateProgress(ProjectUpdateProgressMappingModel model);

        Task<ServiceResponse<ProjectUpdateProgressMappingModel>> GetProgressById(long id);

        /// <summary>
        /// Get project master shot detail by project Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<ProjectMasterShorDetailModel> GetProjectShtDetailById(long id);

        #endregion

        #region Reports

        /// <summary>
        /// Get project report by district and MLA constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ProjectReportModel>> GetProjectReport(ProjectReportFilterModel model);

        /// <summary>
        /// Export project report to excel
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<string> ExportProjectReportToExcel(ProjectReportFilterModel model);

        /// <summary>
        /// Get project summary report of status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ProjectSummaryReportModel>> GetProjectSummaryReport(ProjectReportFilterModel model);

        /// <summary>
        /// Get sum of dynamic label of project summary report of status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<SumOfDynamicLabelSummaryReportModel>> GetSumOfDynamicLabelSummaryReport(ProjectReportFilterModel model);

        /// <summary>
        /// Get department wise category, Sub category, Sub sub category,With MAL constituency and Without MAL constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>> GetDepartmentWiseSummaryReport(ProjectReportFilterModel model);

        /// <summary>
        /// Get project status wise department summary report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>> GetProjectDepartmentStatusSummaryReport(ProjectReportFilterModel model);

        #endregion

        #region Web Service

        /// <summary>
        /// This service use for create/Update record in project master through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> AddUpdateProjectService(WorksEntryServiceModel model, HttpRequestHeaders header = null);

        #endregion
    }
}
