using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class DepartmentMasterController : ApiController
    {
        private readonly IDepartmentMasterService _DepartmentMasterService;
        private readonly string _departmentfileUpload = FilePath.DepartmentProfileImagePath.GetStringValue();
        IndexModel model = null;

        public DepartmentMasterController(IDepartmentMasterService iDepartmentMasterService, IndexModel indexModel)
        {
            this._DepartmentMasterService = iDepartmentMasterService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<DepartmentMasterViewModel>> Get(IndexModel model, int isActive)
        {
            ServiceResponse<PagedData<DepartmentMasterViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentMasterViewModel>>();
            try
            {
                objReturn = _DepartmentMasterService.GetAll(model, isActive);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<DepartmentMasterModel> Get(long id)
        {
            ServiceResponse<DepartmentMasterModel> objReturn = new ServiceResponse<DepartmentMasterModel>();
            try
            {
                objReturn = _DepartmentMasterService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Post(DepartmentMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _DepartmentMasterService.Create(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                             .Where(y => y.Count > 0)
                                             .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Put(DepartmentMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.DepartmentId > 0)
                {
                    objReturn = await _DepartmentMasterService.Edit(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                              .Where(y => y.Count > 0)
                                              .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _DepartmentMasterService.UpdateStatus(id);
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
        public ServiceResponse<string> TransferMenuClassificationToDepartmentMenu(int dptCode)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = _DepartmentMasterService.TransferMenuClassificationToDepartmentMenu(dptCode);
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
        public ServiceResponse<string> TransferDptMenuToDepartmentSubMenu(int dptCode)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = _DepartmentMasterService.TransferDptMenuToDepartmentSubMenu(dptCode);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #region Report Scheme and department

        /// <summary>
        /// Get Department code with department list for the report which is used by the administrator
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<DepartmentReportModel>> GetDepartmentReport()
        {
            ServiceResponse<List<DepartmentReportModel>> objReturn = new ServiceResponse<List<DepartmentReportModel>>();
            try
            {
                objReturn = _DepartmentMasterService.GetDepartmentReport();
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
        /// Get scheme with department list for the report which is used by the administrator
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<DepartmentSchemeReportModel>> GetDepartmentSchemeReport()
        {
            ServiceResponse<List<DepartmentSchemeReportModel>> objReturn = new ServiceResponse<List<DepartmentSchemeReportModel>>();
            try
            {
                objReturn = _DepartmentMasterService.GetDepartmentSchemeReport();
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

        #region Website Details

        /// <summary>
        /// Get list of login user department for Website Details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<LoginUserDepartmentListModel>> GetLoginUserDepartmentList()
        {
            ServiceResponse<List<LoginUserDepartmentListModel>> objReturn = new ServiceResponse<List<LoginUserDepartmentListModel>>();
            try
            {
                return _DepartmentMasterService.GetLoginUserDepartmentList();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }

        }

        /// <summary>
        /// Update Login User Department Website Details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> UpdateLoginUserDepartment(LoginUserDepartmentListModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.DepartmentId > 0)
                {
                    objReturn = await _DepartmentMasterService.UpdateLoginUserDepartment(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                              .Where(y => y.Count > 0)
                                              .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        #region Department Profile

        /// <summary>
        /// Get Department Profile List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<DepartmentProfileListModel>> GetDepartmentProfileList(DptProfileFilterModel model)
        {
            ServiceResponse<PagedData<DepartmentProfileListModel>> objReturn = new ServiceResponse<PagedData<DepartmentProfileListModel>>();
            try
            {
                return _DepartmentMasterService.GetDepartmentProfileList(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                return objReturn;
            }
        }

        /// <summary>
        /// get department profile by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<DepartmentProfileModel> GetDepartmentProfileById(long id)
        {
            ServiceResponse<DepartmentProfileModel> objReturn = new ServiceResponse<DepartmentProfileModel>();
            try
            {
                return _DepartmentMasterService.GetDepartmentProfileById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                return objReturn;
            }
        }

        /// <summary>
        /// Department Profile Add and Update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> DepartmentProfileAddUpdate(DepartmentProfileModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _DepartmentMasterService.DepartmentProfileAddUpdate(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                              .Where(y => y.Count > 0)
                                              .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Update Department Profile Status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDepartmentProfileStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _DepartmentMasterService.UpdateDepartmentProfileStatus(id);
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
        /// This method is used to check, that the combination of department and entry type is unique or not.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentProfileModel> IsDepartmentProfileExist(DepartmentProfileExistModel model)
        {
            ServiceResponse<DepartmentProfileModel> objReturn = new ServiceResponse<DepartmentProfileModel>();
            try
            {
                objReturn = _DepartmentMasterService.IsDepartmentProfileExist(model);
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
    }
}

