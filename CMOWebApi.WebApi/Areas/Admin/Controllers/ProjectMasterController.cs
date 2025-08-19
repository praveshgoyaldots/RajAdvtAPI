using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class ProjectMasterController : ApiController
    {
        #region Variable

        private readonly IProjectMasterService _projectMasterService;

        #endregion

        #region Constructor
        public ProjectMasterController(IProjectMasterService projectMasterService)
        {
            _projectMasterService = projectMasterService;
        }
        #endregion

        #region Methods

        [HttpPost]
        public async Task<ServiceResponse<string>> Add(ProjectMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _projectMasterService.Create(model);

                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }

            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Update(ProjectMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    return await _projectMasterService.Edit(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<ProjectMasterModel>> GetById(long id)
        {
            ServiceResponse<ProjectMasterModel> objReturn = new ServiceResponse<ProjectMasterModel>();
            try
            {
                if (id > 0)
                {
                    return await _projectMasterService.GetById(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<DepartmentMasterModel> GetDistrictAndAssemblyDepartment(long dptCode)
        {
            ServiceResponse<DepartmentMasterModel> objReturn = new ServiceResponse<DepartmentMasterModel>();
            try
            {
                if (dptCode > 0)
                {
                    return _projectMasterService.GetDistrictAndAssemblyDepartment(dptCode);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<PagedData<ProjectMasterViewModel>> Get(ProjectReportFilterModel model, int subSubCatCode)
        {
            ServiceResponse<PagedData<ProjectMasterViewModel>> objReturn = new ServiceResponse<PagedData<ProjectMasterViewModel>>();
            try
            {
                return _projectMasterService.GetAll(model, subSubCatCode);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _projectMasterService.UpdateActiveStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> DeleteProjectBySuperAdmin(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _projectMasterService.DeleteProjectBySuperAdmin(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<ProjectDetailsWithProgressAndChildTableDataModel> GetProjectDetailsWithProgressAndChildData(int id)
        {
            ServiceResponse<ProjectDetailsWithProgressAndChildTableDataModel> objReturn = new ServiceResponse<ProjectDetailsWithProgressAndChildTableDataModel>();
            try
            {
                objReturn = _projectMasterService.GetProjectDetailsWithProgressAndChildData(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        #region Update Progress

        /// <summary>
        /// Update Progress for particular project at a time.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> UpdateProgress(ProjectUpdateProgressMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _projectMasterService.UpdateProgress(model);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> EditUpdateProgress(ProjectUpdateProgressMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _projectMasterService.EditUpdateProgress(model);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public async Task<ServiceResponse<ProjectUpdateProgressMappingModel>> GetProgressById(int id)
        {
            ServiceResponse<ProjectUpdateProgressMappingModel> objReturn = new ServiceResponse<ProjectUpdateProgressMappingModel>();
            try
            {
                objReturn = await _projectMasterService.GetProgressById(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get project master shot detail by project Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<ProjectMasterShorDetailModel> GetProjectShtDetailById(long id)
        {
            ServiceResponse<ProjectMasterShorDetailModel> objReturn = new ServiceResponse<ProjectMasterShorDetailModel>();
            try
            {
                if (id > 0)
                {
                    return _projectMasterService.GetProjectShtDetailById(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion

        #region Reports

        /// <summary>
        /// Get project report by district and MLA constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ProjectReportModel>> GetProjectReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<ProjectReportModel>> objReturn = new ServiceResponse<List<ProjectReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetProjectReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Export project report to excel
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> ExportProjectReportToExcel(ProjectReportFilterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.ExportProjectReportToExcel(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get project summary report of status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ProjectSummaryReportModel>> GetProjectSummaryReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<ProjectSummaryReportModel>> objReturn = new ServiceResponse<List<ProjectSummaryReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetProjectSummaryReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get sum of dynamic label of project summary report of status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<SumOfDynamicLabelSummaryReportModel>> GetSumOfDynamicLabelSummaryReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<SumOfDynamicLabelSummaryReportModel>> objReturn = new ServiceResponse<List<SumOfDynamicLabelSummaryReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetSumOfDynamicLabelSummaryReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get department wise category, Sub category, Sub sub category,With MAL constituency and Without MAL constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>> GetDepartmentWiseSummaryReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>> objReturn = new ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetDepartmentWiseSummaryReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get project status wise department summary report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>> GetProjectDepartmentStatusSummaryReport(ProjectReportFilterModel model)
        {
            ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>> objReturn = new ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>>();
            try
            {
                if (model != null)
                {
                    return _projectMasterService.GetProjectDepartmentStatusSummaryReport(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
        #endregion
    }
}
