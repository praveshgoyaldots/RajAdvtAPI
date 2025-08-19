using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class SchemeController : ApiController
    {
        #region /// variable  ///
        private readonly ISchemeService _schemeService;
        private readonly string _path = FilePath.SchemefaqLocation.GetStringValue();
        private readonly string _schemeLogoLocation = FilePath.SchemeLogoLocation.GetStringValue();
        private readonly string _schemeBannerLocation = FilePath.SchemeBannerLocation.GetStringValue();
        IndexModel model = null;
        #endregion

        #region /// constructor  //
        public SchemeController(ISchemeService schemeService, IndexModel Model)
        {
            model = Model;
            _schemeService = schemeService;
        }
        #endregion

        #region /// Method  //

        #region Scheme Method

        [HttpPost]
        public async Task<ServiceResponse<string>> AssignScheme(AssignSchemeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _schemeService.AssignScheme(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.ExistType;
                    return objReturn;
                }
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
        [HttpGet]
        public async Task<ServiceResponse<AssignSchemeModel>> GetAssignSchemeById(long id)
        {
            ServiceResponse<AssignSchemeModel> objReturn = new ServiceResponse<AssignSchemeModel>();
            try
            {
                if (id > 0)
                {
                    return await _schemeService.GetAssignSchemeById(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;

            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> EditAssignScheme(AssignSchemeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    return await _schemeService.EditAssignScheme(model);
                }

                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }

            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<PagedData<AssignSchemeNameForUserModel>> GetAllAssignSchemeList(IndexModel model, int isActive)
        {
            ServiceResponse<PagedData<AssignSchemeNameForUserModel>> objReturn = new ServiceResponse<PagedData<AssignSchemeNameForUserModel>>();
            try
            {
                objReturn = _schemeService.GetAllAssignSchemeList(model,isActive);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<AssignSchemeModel>> GetSchemeList(IndexModel model)
        {
            ServiceResponse<PagedData<AssignSchemeModel>> objReturn = new ServiceResponse<PagedData<AssignSchemeModel>>();
            try
            {
                objReturn = _schemeService.GetAllSchemeList(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<SetSchemePriorityViewModel>> GetAllPriority(IndexModel model)
        {
            ServiceResponse<PagedData<SetSchemePriorityViewModel>> objReturn = new ServiceResponse<PagedData<SetSchemePriorityViewModel>>();
            try
            {
                objReturn = _schemeService.GetAllPriority(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> SetAllPriority(List<SetSchemePriorityViewModel> model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _schemeService.SetAllPriority(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.SchemeExist;
                    return objReturn;
                }
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<PagedData<ListSchemeModel>> Get(CustomSearchModel model, int isActive)

		{
            ServiceResponse<PagedData<ListSchemeModel>> objReturn = new ServiceResponse<PagedData<ListSchemeModel>>();
            try
            {
                objReturn = _schemeService.GetAll(model, isActive);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        // GET api/<controller>/5
        public async Task<ServiceResponse<SchemeViewModel>> GetById(long id)
        {
            ServiceResponse<SchemeViewModel> objReturn = new ServiceResponse<SchemeViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _schemeService.GetById(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;

            }
            return objReturn;
        }

        [HttpGet]
        // GET api/<controller>/5
        public async Task<ServiceResponse<UpdateBeneficiaryModel>> GetByBeneficiaryId(long id)
        {
            ServiceResponse<UpdateBeneficiaryModel> objReturn = new ServiceResponse<UpdateBeneficiaryModel>();
            try
            {
                if (id > 0)
                {
                    return await _schemeService.GetByBeneficiaryId(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;

            }
            return objReturn;
        }


        [HttpPost]
        public async Task<ServiceResponse<string>> UpdateBeneficiaryCategory(UpdateBeneficiaryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Schemeid > 0)
                {
                    objReturn = await _schemeService.UpdateBeneficiaryCategory(model);
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

        // POST api/<controller>
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(SchemeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    if (_schemeService.IsSchemeAvailable(model.NameEnglish, model.Id))
                    {
                        return await _schemeService.Create(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.SchemeExist;
                        return objReturn;
                    }

                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }

            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public ServiceResponse<string> IsSchmeNotExist(AssignSchemeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (_schemeService.IsSchemeAvailable(model.NameEnglish, model.Id))
                {
                    objReturn.IsSuccess = true;
                    objReturn.Message = MessageStatus.Success;
                    return objReturn;
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.SchemeExist;
                    return objReturn;
                }
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }


        // PUT api/<controller>/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(SchemeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    if (_schemeService.IsSchemeAvailable(model.NameEnglish, model.Id))
                    {
                        return await _schemeService.Edit(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.SchemeExist;
                        return objReturn;
                    }
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }

            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }


        [HttpGet]
        public async Task<ServiceResponse<string>> SetStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _schemeService.UpdateIsActiveStatus(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }



        [HttpGet]
        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _schemeService.LockToggle(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        // DELETE api/<controller>/5
        [HttpPost]
        public ServiceResponse<string> Delete(CommonIdModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = _schemeService.Delete(model);
            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }


        [HttpPost]
        public async Task<ServiceResponse<string>> FAQAddUpdate(SchemeFAQModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    //if (model.FAQList != null && model.FAQList.Count > 0)
                    //{
                    //    for (int i = 0; i < model.FAQList.Count; i++)
                    //    {
                    //        if (!string.IsNullOrEmpty(model.FAQList[i].AttachmentUrl))
                    //        {
                    //            var isValid = CommonUtility.IsAllowedMimeType(model.FAQList[i].AttachmentUrl);
                    //            if (isValid.IsSuccess)
                    //            {
                    //                string path = System.Web.HttpContext.Current.Server.MapPath(_path);
                    //                model.FAQList[i].AttachmentUrl = CommonUtility.SaveFileFromBase64str(model.FAQList[i].AttachmentUrl, path);
                    //            }
                    //            else
                    //            {
                    //                var isValidT = CommonUtility.IsAllowedMimeType(model.FAQList[i].AttachmentUrl);
                    //                if (isValidT.IsSuccess)
                    //                {
                    //                    string path = System.Web.HttpContext.Current.Server.MapPath(_path);
                    //                    model.FAQList[i].AttachmentUrl = CommonUtility.SaveFileFromBase64str(model.FAQList[i].AttachmentUrl, path);
                    //                }
                    //                else
                    //                {
                    //                    return isValidT;
                    //                }
                    //            }
                    //        }
                    //    }
                    //}
                    return await _schemeService.FAQAddUpdate(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<SchemeFAQModel> GetAllFaq(long id)
        {
            ServiceResponse<SchemeFAQModel> objReturn = new ServiceResponse<SchemeFAQModel>();
            try
            {
                if (id > 0)
                {
                    objReturn = _schemeService.GetFaqBySchemeId(id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
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

        #region Monitoring Parameter Method

        [HttpPost]
        public async Task<ServiceResponse<string>> AddMonitoringParameters(SchemeMonitoringParameteModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _schemeService.AddMonitoringParameters(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<SchemeMonitoringParameteModel> GetMonitoringParameters(long id)
        {
            ServiceResponse<SchemeMonitoringParameteModel> objReturn = new ServiceResponse<SchemeMonitoringParameteModel>();
            try
            {
                if (id > 0)
                {
                    return _schemeService.GetMonitoringParameters(id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<string> UpdateMonitoringParametersStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return _schemeService.UpdateMonitoringParametersStatus(id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = string.Empty;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = string.Empty;
            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> GetMonitoringParametersByIdForDataEntry(long id)
        {
            ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> objReturn = new ServiceResponse<MonitoringParametersByIdForDataEntryViewModel>();
            try
            {
                if (id > 0)
                {
                    return _schemeService.GetMonitoringParametersByIdForDataEntry(id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> GetDataEntryListForMonitoringParameters(CustomParameterWithIndex model, long id)
        {
            ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> objReturn = new ServiceResponse<MonitoringParametersByIdForDataEntryViewModel>();
            try
            {
                if (id > 0)
                {
                    return _schemeService.GetDataEntryListForMonitoringParameters(model, id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> AddDataEntryForMonitoringParameters(MonitoringParamDataEntryAddModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _schemeService.AddDataEntryForMonitoringParameters(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> UpdateDataEntryValueForMonitoringParameters(MonitoringParamDataEntryAddModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _schemeService.UpdateDataEntryValueForMonitoringParameters(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    objReturn.Data = null;
                }

            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<MonitoringParameterWithCountModel>> GetAllMPRCountWithScheme(IndexModel model)
        {
            ServiceResponse<PagedData<MonitoringParameterWithCountModel>> objReturn = new ServiceResponse<PagedData<MonitoringParameterWithCountModel>>();
            try
            {
                objReturn = _schemeService.GetAllMPRCountWithScheme(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<MonitoringParameterMonthlyModel>> GetAllMPMonthlyBySchemeId(IndexModel model, long schemeId)
        {
            ServiceResponse<PagedData<MonitoringParameterMonthlyModel>> objReturn = new ServiceResponse<PagedData<MonitoringParameterMonthlyModel>>();
            try
            {
                objReturn = _schemeService.GetAllMPMonthlyBySchemeId(model, schemeId);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion Monitoring Parameter Method

        #endregion Method  




        [HttpGet]
        // api/<controller>/5
        public ServiceResponse<List<SchemeDashboardViewModel>> GetSchemedashboard(string UserType, int UserId)
        {
            ServiceResponse<List<SchemeDashboardViewModel>> objReturn = new ServiceResponse<List<SchemeDashboardViewModel>>();
            try
            {
                objReturn = _schemeService.GetAllSchemeDashboard(UserType, UserId);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        // PUT api/<controller>/5
        [HttpPost]
        public async Task<ServiceResponse<string>> UpdateGroupScheme(SchemeGroupPostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    if (_schemeService.IsSchemeAvailable(model.NameEnglish, model.Id))
                    {
                        return await _schemeService.Edit(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.SchemeExist;
                        return objReturn;
                    }
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }

            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<SchemeGroupViewModel>> GetSchemeGroupById(long id)
        {
            ServiceResponse<SchemeGroupViewModel> objReturn = new ServiceResponse<SchemeGroupViewModel>();
            try
            {
                if (id > 0)
                {
                    objReturn = await _schemeService.GetGroupSchemeById(id);
                 
                }
                else
                {
                    objReturn.Data = null;
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }

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
        public ServiceResponse<List<ContactPersonDetailViewModel>> GetAllContactPersonDetail(ContactPersonDetailModel model)
        {
            ServiceResponse<List<ContactPersonDetailViewModel>> objReturn = new ServiceResponse<List<ContactPersonDetailViewModel>>();
            try
            {
                if (model.schemeId > 0 && model.NodelDepartmentCode > 0)
                {
                 return _schemeService.GetAllContactPersonDetail(model);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    return objReturn;
                }

            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            
          }

    }


}