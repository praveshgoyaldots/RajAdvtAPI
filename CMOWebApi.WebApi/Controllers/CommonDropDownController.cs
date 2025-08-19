using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.WebPages.Html;

namespace CMOWebApi.WebAPI.Controllers
{


    public class CommonDropDownController : ApiController
    {
        //sandeep // Tanmaya //paras
        private readonly GetAllDropDownList _dropdown;


        public CommonDropDownController(GetAllDropDownList dropdown)
        {
            _dropdown = dropdown;
        }

        [HttpGet]
        public ServiceResponse<IDictionary<string, object>> AllDropDown(string keys, string userType = "", int userid = 0)
        {
            ServiceResponse<IDictionary<string, object>> objReturn = new ServiceResponse<IDictionary<string, object>>();
            try
            {
                if (!string.IsNullOrEmpty(keys))
                {
                    return _dropdown.AllDropDown(keys, userType, userid);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<IDictionary<string, object>> AllDropDown(List<FilterdDDlModel> model, string userType = "", int userId = 0)
        {
            ServiceResponse<IDictionary<string, object>> objReturn = new ServiceResponse<IDictionary<string, object>>();
            try
            {
                if (model != null && model.Count > 0)
                {
                    return _dropdown.GetFilterdDDl(model, userType, userId);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }


        }
        [HttpGet]
        public ServiceResponse<string> GetKeysForDropdown(string moduleName)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (!string.IsNullOrEmpty(moduleName))
                {
                    return _dropdown.GetKeysForDropdown(moduleName);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }


        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetBlockByDistrict(string code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetBlockByDistict(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetGramPanchayatByBlock(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetGramPanchayatByBlock(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetVillageByGramPanchayat(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetVillageByGramPanchayat(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetLocationByDistrict(int code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetLocationByDistrict(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDepartmentByDepartmentCategory(int code, int admCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDepartmentByDepartmentCategory(code,admCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<VCParticipantDDLModel>> GetVCPaticipantByPaticipantCategory(long vCCode, long code, long dataId)
        {
            ServiceResponse<List<VCParticipantDDLModel>> result = new ServiceResponse<List<VCParticipantDDLModel>>();
            try
            {
                return _dropdown.GetVCPaticipantByPaticipantCategory(vCCode, code, dataId);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetTahsilByDistrict(int code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetTahsilByDistrict(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDepartmentMainMenuByDepartment(int code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDepartmentMainMenuByDepartment(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetModuleCategoryByModule(int moduleCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetModuleCategoryByModule(moduleCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetModuleSubCategoryByModule(int moduleCode, long moduleCatCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetModuleSubCategoryByModule(moduleCode, moduleCatCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetTahsilByMultipleDistrict(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetTahsilByMultipleDistrict(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetBlockByMultipleDistict(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetBlockByMultipleDistict(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }



        //create by paras singh 24-04-2020
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetOffice(string code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetOfficeList(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDistrict(string code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDistrictList(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetParticipant(long code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetParticipant(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        /// <summary>
        /// This method for get participant list on press release add update screen.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetParticipantListForPressRelease(string code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetParticipantListForPressRelease(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        /// <summary>
        /// This method for get participant list on press release add update screen.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetVIPPersonListOfPressRelease(string code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetVIPPersonListOfPressRelease(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        //
        [HttpGet]
        public List<RowYearandDepartment> GetOrderRelatedToYearList(string moduleName)
        {
            try
            {
                return _dropdown.GetOrderRelatedToYearList(moduleName);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public List<RowYearandDepartment> GetOrderRelatedToDepartmentList(DepartmentFilterModel module)
        {
            try
            {
                return _dropdown.GetOrderRelatedToDepartmentList(module);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetCCcategoryByDepartment(int code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetCCcategoryByDepartment(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetOrderSubTypeByType(long typeCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                if (typeCode > 0)
                {
                    return _dropdown.GetOrderSubTypeByType(typeCode);
                }
                return _dropdown.GetOrderSubTypeByType();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetOrderSubTypeByTypeAndDepartment(long typeCode, long departmentCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                if (typeCode > 0 || departmentCode > 0)
                {
                    return _dropdown.GetOrderSubTypeByTypeAndDepartment(typeCode, departmentCode);
                }
                result.IsSuccess = true;
                result.Message = MessageStatus.Success;
                return result;
                //return _dropdown.GetOrderSubTypeByTypeAndDepartment();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetSchemeByDepartment(int isActive, int Code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                if (Code > 0)
                {
                    return _dropdown.GetSchemeByDepartment(isActive, Code);
                }
                return _dropdown.GetSchemeByDepartment(isActive, Code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<DepartmentReferenceModel>> GetCCReferenceByCCCategoryType(long ccCatType)
        {
            ServiceResponse<List<DepartmentReferenceModel>> result = new ServiceResponse<List<DepartmentReferenceModel>>();
            try
            {
                if (ccCatType > 0)
                {
                    return _dropdown.GetCCReferenceByCCCategoryType(ccCatType);
                }
                return _dropdown.GetCCReferenceByCCCategoryType();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<DepartmentReferenceModel>> GetReferenceByDepartment(int dptCode)
        {
            ServiceResponse<List<DepartmentReferenceModel>> result = new ServiceResponse<List<DepartmentReferenceModel>>();
            try
            {
                if (dptCode > 0)
                {
                    return _dropdown.GetReferenceByDepartment(dptCode);
                }
                return result;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        /// <summary>
        /// Get DropDown Data
        /// </summary>
        /// <param name="key">string</param>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        [HttpGet]
        public ServiceResponse<IDictionary<string, object>> GetDropDown(string key, int id = 0, int id2 = 0)
        {
            ServiceResponse<IDictionary<string, object>> objReturn = new ServiceResponse<IDictionary<string, object>>();
            try
            {
                if (!string.IsNullOrEmpty(key))
                {
                    return _dropdown.GetDropDown(key, id, id2);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetSubcategorybydeptandcat(int departmentCode, int categoryCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.Getsubcategory(departmentCode, categoryCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> Getcategorybydepartmentcode(int departmentCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.Getcategorybydepartmentcode(departmentCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }
        /// <summary>
        /// this method for get jankalyan category by department code.
        /// </summary>
        /// <param name="departmentCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetJankalyanCategorybyDepartmentCode(int departmentCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetJankalyanCategorybyDepartmentCode(departmentCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        /// <summary>
        /// this method for get jankalyan category by department code.
        /// </summary>
        /// <param name="departmentCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetJankalyanCategorybyDepartmentAndLoginUser(int departmentCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetJankalyanCategorybyDepartmentAndLoginUser(departmentCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        /// <summary>
        /// this method for get jankalyan category by department code.
        /// </summary>
        /// <param name="departmentCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetJankalyanpressReleaseCategorybyDepartmentAndLoginUser(string departmentCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                if (!string.IsNullOrEmpty(departmentCode))
                {
                    return _dropdown.GetPressReleaseCategorybyDepartment(departmentCode);
                }
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
                
               
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        /// <summary>
        /// this method for get jankalyan entry type by department code. 
        /// </summary>
        /// <param name="departmentCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetJankalyanEntryTypebyDepartmentCode(string departmentCode,int catCode=0)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetJankalyanEntryTypebyDepartmentCode(departmentCode, catCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetImpdecSubcategorybydeptandcat(int departmentCode, int categoryCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetImpdecsubcategory(departmentCode, categoryCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpPost]
        public ServiceResponse<List<VCCreationDDLModel>> GetVCCreationWithFiler(VCCustomFilter model)
        {
            ServiceResponse<List<VCCreationDDLModel>> result = new ServiceResponse<List<VCCreationDDLModel>>();
            try
            {
                return _dropdown.GetVCCreationWithFiler(model);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return null;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetUserListByApplication(string UserType, string DepartmentCode, string office)
        {

            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetUserListByApplication(UserType, DepartmentCode, office);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }

        }


        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDistrictByOffice(int code)
        {

            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDistrictByOffice(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }

        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDistrictByState(int code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDistrictByState(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetAllSSOIDByUserTypeAndDepartment(string userType,string dptCode="")
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetAllSSOIDByUserType(userType, dptCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public IHttpActionResult GetAchievementDepartmentByCatCode(int id, long adminCode = 0, long subCatCode=0)
        {
            ServiceResponse<List<System.Web.Mvc.SelectListItem>> result = new ServiceResponse<List<System.Web.Mvc.SelectListItem>>();
            try
            {
                result.Data = _dropdown.GetAchievementDepartment(adminCode, id, subCatCode);
                result.IsSuccess = true;
                result.Message = MessageStatus.Success;

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;

                return InternalServerError(ex);
            }
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetAchievementAdminDepartmentByCatCode(int id,long subCatCode=0)
        {
            ServiceResponse<List<System.Web.Mvc.SelectListItem>> result = new ServiceResponse<List<System.Web.Mvc.SelectListItem>>();
            try
            {
                result.Data = _dropdown.GetAchievementAdminDepartment( id, subCatCode);
                result.IsSuccess = true;
                result.Message = MessageStatus.Success;

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;

                return InternalServerError(ex);
            }
            return Ok(result);
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetSubCategoryByCategoryCode(int Catcode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetSubCategoryByCategoryCode(Catcode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }
        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetGeneralSubCategory(int CategoryCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetGeneralSubCategory(CategoryCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetCMISAdminDepartmentByModuleCode(decimal code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetCMISAdminDepartmentByModuleCode(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetCMISDepartmentByModuleCode(decimal code, int AdmDepartmentCode = 0)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetCMISDepartmentByModuleCode(code, AdmDepartmentCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetCMISFinancialYearByModuleCode(decimal code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetCMISFinancialYearByModuleCode(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }


        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetChairpersonByMultipleCategory(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetChairpersonByMultipleCategory(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetNewsSubjetByDepartent(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetNewsSubjetByDepartent(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDepartmentByAdminDepartmentCodes(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDepartmentByAdminDepartmentCodes(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetSubSubCategoryBySubCategoryCode(int code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetSubSubCategoryBySubCategoryCode(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<ProjectSchemeCategoryMasterViewModel>> GetProjectSchemeCategoryByDepartment(int dptCode)
        {
            ServiceResponse<List<ProjectSchemeCategoryMasterViewModel>> result = new ServiceResponse<List<ProjectSchemeCategoryMasterViewModel>>();
            try
            {
                if (dptCode > 0)
                {
                    return _dropdown.GetProjectSchemeCategoryByDepartment(dptCode);
                }
                return result;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public IHttpActionResult GetCMISStatusByModuleId(decimal id)
        {
            ServiceResponse<List<System.Web.Mvc.SelectListItem>> result = new ServiceResponse<List<System.Web.Mvc.SelectListItem>>();
            try
            {
                result.Data = _dropdown.GetCMISStatusByModuleId(id);
                result.IsSuccess = true;
                result.Message = MessageStatus.Success;

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;

                return InternalServerError(ex);
            }
            return Ok(result);
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetMLAConstituencyByDistrictCode(string codes)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetMLAConstituencyByDistrictCode(codes);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetPageMasterByPageTypeCode(int pageTypeCode, string applicationCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetPageMasterByPageTypeCode(pageTypeCode, applicationCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetDepartmentByCMOOfficerCode(long code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetDepartmentByCMOOfficerCode(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetCMISDepartmentByCMOOfficerCode(long code)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetCMISDepartmentByCMOOfficerCode(code);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetKPIByDepartmentCode(int dptCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetKPIByDepartmentCode(dptCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }


		[HttpGet]
		public ServiceResponse<List<SelectListItem>> GetParameterCode(int kpiCode)
		{
			ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
			try
			{
				return _dropdown.GetParameterCode(kpiCode);
			}
			catch (Exception ex)
			{
				result.IsSuccess = false;
				result.Message = MessageStatus.Error;
				return result;
			}
		}

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetKPICategoryByDptCodeForDistrict(int dptCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetKPICategoryByDptCodeForDistrict(dptCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetKPICategoryByDptCodeForDepartment(int dptCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetKPICategoryByDptCodeForDepartment(dptCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

        [HttpGet]
        public IHttpActionResult GetLoginUserDepartmentListByAdminDepartment(string admCode, int cMOOfrCode=0)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return Ok(_dropdown.GetLoginUserDepartmentList(admCode, cMOOfrCode));
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetLoginUserDistrictForProject()
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return Ok(_dropdown.GetLoginUserDistrictForProject());
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public ServiceResponse<List<SelectListItem>> GetEntryTypeByCategory(int catCode)
        {
            ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
            try
            {
                return _dropdown.GetEntryTypeByCategory(catCode);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = MessageStatus.Error;
                return result;
            }
        }

		/// <summary>
		/// This method for get department and district wise on seletion o0f radio button then return condition wise record.
		/// </summary>
		/// <param name="code"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<List<SelectListItem>> GetDepartmentDistrictList(int code)
		{
			ServiceResponse<List<SelectListItem>> result = new ServiceResponse<List<SelectListItem>>();
			try
			{
				return _dropdown.GetDepartmentDistrictList(code);
			}
			catch (Exception ex)
			{
				result.IsSuccess = false;
				result.Message = MessageStatus.Error;
				return result;
			}
		}

	}
}
