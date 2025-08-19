using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using static CMOWebApi.Core.Enums.AchievementsEnum;
using static CMOWebApi.Core.Enums.DdlKeysEnum;
using static CMOWebApi.Core.Enums.DepartmentCategory;
using static CMOWebApi.Core.Enums.LookUpTypeEnum;
using static CMOWebApi.Core.Enums.SchemeTypeMasterEnum;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.ServiceHelper
{

    // common Dropdown list for all masters
    public class GetAllDropDownList : BaseService
    {
        #region ///   Variable   ///
        IUnitofWork _uow;
        private readonly IOrderService _orderService;
        private readonly UserManagementService _userManagementService;
        #endregion

        #region /// Constructor  ///

        public GetAllDropDownList(IUnitofWork uow, IOrderService orderService, UserManagementService userManagementService)
        {
            _uow = uow;
            _orderService = orderService;
            _userManagementService = userManagementService;
        }
        #endregion

        #region /// Method  ///
        public List<SelectListItem> GetDistrictList(string idsValue, string userType = "", int userId = 0)
        {
            try
            {
                var stateCode = Convert.ToInt32(CommonEnum.CommonCodeEnum.StateCode);

                if (string.IsNullOrEmpty(userType))
                {
                    if (string.IsNullOrEmpty(idsValue))
                    {
                        return _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: f => f.DistrictIsActive && f.DistrictIsDeleted == false && f.District_StateCode == stateCode, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(idsValue);
                        return _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: f => f.DistrictIsActive && f.DistrictIsDeleted == false && f.District_StateCode == stateCode && ids.Contains(f.District_DivisionCode), orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();

                    }
                }

                else
                {
                    List<SqlParameter> objSqlparam = new List<SqlParameter>() { new SqlParameter("UserType", userType), new SqlParameter("UserId", userId) };


                    if (string.IsNullOrEmpty(idsValue))
                    {
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedDistrict_Result>("spCMO_GetNotAssignedDistrict @UserType, @UserId", objSqlparam.ToArray()).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(idsValue);
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedDistrict_Result>("spCMO_GetNotAssignedDistrict @UserType, @UserId", objSqlparam.ToArray()).Where(x => ids.Contains(x.District_DivisionCode)).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDistrictList ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDistrictList ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDistrictList ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }
        public List<SelectListItem> GetSchemeList(string idsValue)
        {
            try
            {
                List<sp_Configuration_Result> objConfigDept = new List<sp_Configuration_Result>();
                List<sp_ConfigurationSCHEME_Result> objConfigScheme = new List<sp_ConfigurationSCHEME_Result>();
                List<sp_ConfigurationSERVICE_Result> objConfigService = new List<sp_ConfigurationSERVICE_Result>();

                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("Value", "1437"));
                spParams.Add(new ObjectParameter("ValueType", "UserId"));
                spParams.Add(new ObjectParameter("department", 0));

                ObjectResult<sp_Configuration_Result> deptResult = _uow.ExeccuteStoreProcedureMultiResult<sp_Configuration_Result>("sp_Configuration", spParams.ToArray());
                objConfigDept.AddRange(deptResult.ToList());
                var schemeResult = deptResult.GetNextResult<sp_ConfigurationSCHEME_Result>();
                objConfigScheme.AddRange(schemeResult.ToList());
                var serviceResult = schemeResult.GetNextResult<sp_ConfigurationSERVICE_Result>();
                objConfigService.AddRange(serviceResult.ToList());
                return null;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetEntryList()
        {
            try
            {
                return _uow.GenericRepository<tblODR_OrderEntryMaster>().GetAll(filter: f => f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Text = x.Title.ToString(), Value = Convert.ToString(x.Code) }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetDistrictKPIList()
        {
            try
            {
                long district = Convert.ToInt64(DepartmentCategoryEnum.District);
                long districtProd = Convert.ToInt64(DepartmentCategoryEnum.DistrictProduction);

                List<UserDepartmentViewModel> dept = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                if (dept != null && dept.Count > 0)
                {
                    return dept.Where(f => f.DepartmentDistrictCode == district || f.DepartmentDistrictCode == districtProd).OrderBy(x => x.DepartmentTitle).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetDepartmentalProgressList()
        {
            try
            {
                long department = Convert.ToInt64(DepartmentCategoryEnum.Department);
                long departmentProd = Convert.ToInt64(DepartmentCategoryEnum.DepartmentProduction);

                List<UserDepartmentViewModel> dept = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                if (dept != null && dept.Count > 0)
                {
                    return dept.Where(f => f.DepartmentDistrictCode == department || f.DepartmentDistrictCode == departmentProd).OrderBy(x => x.DepartmentTitle).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetDepartmentList(string admIdsValue, string userType = "", int userId = 0)
        {
            try
            {
                if (string.IsNullOrEmpty(userType))
                {
                    if (string.IsNullOrEmpty(admIdsValue))
                    {
                        return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                    }
                    else if (!string.IsNullOrEmpty(admIdsValue) && !admIdsValue.Contains("["))
                    {
                        int? AdmCode = Convert.ToInt32(admIdsValue);
                        return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && (AdmCode > 0 ? f.Department_AdmDepartmentCode.Value == AdmCode : true), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(admIdsValue);
                        return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && ids.Contains(f.Department_AdmDepartmentCode.Value), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                    }
                }
                else
                {
                    List<SqlParameter> objSqlparam = new List<SqlParameter>() { new SqlParameter("UserType", userType), new SqlParameter("@UserId", userId) };
                    if (string.IsNullOrEmpty(admIdsValue))
                    {
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedDepartment_Result>("spCMO_GetNotAssignedDepartment  @UserType, @UserId", objSqlparam.ToArray()).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                    }
                    else
                    {
                        List<int> ids = JsonConvert.DeserializeObject<List<int>>(admIdsValue);
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedDepartment_Result>("spCMO_GetNotAssignedDepartment  @UserType, @UserId", objSqlparam.ToArray()).Where(x => ids.Contains(x.Department_AdmDepartmentCode.Value)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                    }


                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetLoginUserDepartmentList(string admCode = "", int cMOOfrCode = 0)
        {
            try
            {
                List<string> admCodes = !string.IsNullOrEmpty(admCode) ? admCode.Split(',').Where(x => Convert.ToInt32(x) > 0).ToList() : new List<string>();
                if (_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue() || _loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue())
                {

                    return _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data.Where(w => (admCodes != null && admCodes.Count > 0 ? admCodes.Contains(Convert.ToString(w.AdmDepartmentCode)) : true) && (cMOOfrCode > 0 ? w.CMOOfficerCode == cMOOfrCode : true)).OrderBy(x => x.DepartmentTitle).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    long district = Convert.ToInt64(DepartmentCategoryEnum.District);
                    long districtProd = Convert.ToInt64(DepartmentCategoryEnum.DistrictProduction);

                    List<UserDepartmentViewModel> dept = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                    if (dept != null && dept.Count > 0)
                    {
                        List<UserDepartmentViewModel> districtList = dept.Where(x => x.DepartmentDistrictCode == district || x.DepartmentDistrictCode == districtProd).ToList();
                        if (districtList != null && districtList.Count > 0)
                        {
                            return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && (cMOOfrCode > 0 ? f.CMOOfficerCode == cMOOfrCode : true), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Where(w => (admCodes != null && admCodes.Count > 0 ? admCodes.Contains(Convert.ToString(w.Department_AdmDepartmentCode)) : true)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                        }
                        else
                        {
                            return dept.Where(w => (admCodes != null && admCodes.Count > 0 ? admCodes.Contains(Convert.ToString(w.AdmDepartmentCode)) : true) && (cMOOfrCode > 0 ? w.CMOOfficerCode == cMOOfrCode : true)).OrderBy(x => x.DepartmentTitle).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                        }
                    }
                    else
                    {
                        return null;
                    }

                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetLoginUserDistrictForProject()
        {
            try
            {
                List<SelectListItem> result = new List<SelectListItem>();

                long department = Convert.ToInt64(DepartmentCategoryEnum.Department);
                long departmentProd = Convert.ToInt64(DepartmentCategoryEnum.DepartmentProduction);

                List<UserDepartmentViewModel> dept = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                if (dept != null && dept.Count > 0)
                {
                    List<UserDepartmentViewModel> departmentList = dept.Where(x => x.DepartmentDistrictCode == department || x.DepartmentDistrictCode == departmentProd).ToList();
                    if (departmentList != null && departmentList.Count > 0)
                    {
                        result = _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: f => f.DistrictIsActive == true && f.DistrictIsDeleted == false && f.District_StateCode == 20, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                    }
                    else
                    {
                        result = _userManagementService.GetDistrictByUserId(_loginUserDetail.UserId).Data.OrderBy(x => x.DistrictTitle).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetLoginUserAdminDepartmentForProjectList()
        {
            try
            {
                if (_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue() || _loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue())
                {
                    return _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data.GroupBy(x => x.AdmDepartmentCode).OrderBy(x => x.FirstOrDefault().AdmDepartmentTitle).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdmDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();
                }
                else
                {
                    long district = Convert.ToInt64(DepartmentCategoryEnum.District);
                    long districtProd = Convert.ToInt64(DepartmentCategoryEnum.DistrictProduction);

                    List<UserDepartmentViewModel> dept = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                    if (dept != null && dept.Count > 0)
                    {
                        List<UserDepartmentViewModel> districtList = dept.Where(x => x.DepartmentDistrictCode == district || x.DepartmentDistrictCode == districtProd).ToList();
                        if (districtList != null && districtList.Count > 0)
                        {
                            return _uow.GenericRepository<tblAdmDepartmentMaster>().GetAll(filter: f => f.AdmDepartmentIsActive == true && f.AdmDepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.AdmDepartmentTitle)).Select(x => new SelectListItem { Value = x.AdmDepartmentCode.ToString(), Text = x.AdmDepartmentTitle }).ToList();
                        }
                        else
                        {
                            return dept.GroupBy(x => x.AdmDepartmentCode).OrderBy(x => x.FirstOrDefault().AdmDepartmentTitle).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdmDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();
                        }
                    }
                    else
                    {
                        return null;
                    }

                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetCategory()
        {
            try
            {
                return _uow.GenericRepository<tblCategoryMaster>().GetAll(filter: f => f.CategoryIsActive && !f.CategoryIsDeleted, orderBy: o => o.OrderBy(x => x.Category)).Select(x => new SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Category }).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<SelectListItem> GetJankalyanCategory()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<SelectListItem> GetPressReleseCategory()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.IsPressRelease == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetPressReleaseCategorybyDepartment(string departmentCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();


                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    result.Data = _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && f.IsPressRelease == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();
                    if (objUserType != null && (objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue() || objUserType.ParrentUserType == UserTypeEnum.SADM.GetStringValue()))
                    {
                        result.Data = _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && f.IsPressRelease == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                    }
                    else
                    {

                        if (!string.IsNullOrEmpty(departmentCode))
                        {
                            List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(departmentCode);
                            result.Data = _uow.GenericRepository<vw_JAN_CategoryMasterList>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.IsPressRelease == true && ids.Contains(x.DepartmentCode), orderBy: o => o.OrderBy(x => x.Name)).ToList().GroupBy(y => y.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                        }
                    }
                }

                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }


        public List<SelectListItem> GetSchemeType()
        {
            try
            {
                return _uow.GenericRepository<tblSchemeTypeMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetSchemeOutput()

        {
            try
            {
                return _uow.GenericRepository<tblSCM_OutputMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetSchemeAreaMaster()
        {
            try
            {
                return _uow.GenericRepository<tblSchemeAreaMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetModeOfDeliveryMaster()
        {
            try
            {
                return _uow.GenericRepository<tblModeOfDeliveryMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getSectorList()
        {
            try
            {
                return _uow.GenericRepository<tblSectorMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        public List<SelectListItem> getImpCategoryList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ImpCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetCommonCategoryLookUpList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.CommonCategoryLookUp);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetPressReleaseLookUpCategoryList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.PressReleaseLookUpCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetPressReleaseDepartmentList()
        {
            try
            {
                return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false
                , orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getProjectStatus()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectStatus);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getProjectStatusForJanklayanHome()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectStatus);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type && (x.Id == 20065 || x.Id == 30093 || x.Id == 30094 || x.Id == 20083)
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetCreatedByUserForProject()
        {
            try
            {
                return _uow.GenericRepository<vwJAN_PROJ_ProjectMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.CreatedBy > 0, orderBy: o => o.OrderBy(x => x.createdByName)).ToList().GroupBy(x => x.CreatedBy).Select(x => new SelectListItem { Value = x.FirstOrDefault().CreatedBy.ToString(), Text = x.FirstOrDefault().createdByName }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetModifiedByUserForDepartmentSubMenu()
        {
            //try
            //{
            //    return _uow.GenericRepository<vwDept_DepartmentSubMenu>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && f.ModifiedBy > 0, orderBy: o => o.OrderBy(x => x.ModifiedByName)).ToList().GroupBy(x => x.ModifiedBy).Select(x => new SelectListItem { Value = x.FirstOrDefault().ModifiedBy.ToString(), Text = x.FirstOrDefault().ModifiedByName + '(' + x.FirstOrDefault().ModifiedUserType + ')' }).ToList();
            //}
            //catch
            //{
                return null;
            //}
        }

        public List<SelectListItem> GetCreatedByDepartmentmenu()
        {
            //try
            //{
            //    return _uow.GenericRepository<vwDept_DepartmentMainMenu>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && f.ModifiedBy > 0, orderBy: o => o.OrderBy(x => x.ModifiedByName)).ToList().GroupBy(x => x.ModifiedBy).Select(x => new SelectListItem { Value = x.FirstOrDefault().ModifiedBy.ToString(), Text = x.FirstOrDefault().ModifiedByName + '(' + x.FirstOrDefault().ModifiedUserType + ')' }).ToList();
            //}
            //catch
            //{
                return null;
            //}
        }

        /// <summary>
        /// This method for department section mapping modifed by user name list.
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetModifiedByDepartmentSectionMapping()
        {
            //try
            //{
            //    return _uow.GenericRepository<vw_Dept_SectionMapping>().GetAll(filter: f => f.IsActive == true && f.Isdeleted == false && f.ModifiedBy > 0, orderBy: o => o.OrderBy(x => x.ModifiedByName)).ToList().GroupBy(x => x.ModifiedBy).Select(x => new SelectListItem { Value = x.FirstOrDefault().ModifiedBy.ToString(), Text = x.FirstOrDefault().ModifiedByName + '(' + x.FirstOrDefault().ModifiedUserType + ')' }).ToList();
            //}
            //catch
            //{
                return null;
            //}
        }


        /// <summary>
        /// This method for press release modifed by user name list.
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetModifiedByPressRelease()
        {
            //try
            //{
            //    return _uow.GenericRepository<vwJAN_PressRelease>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.ModifiedBy > 0, orderBy: o => o.OrderBy(x => x.ModifiedByName)).ToList().GroupBy(x => x.ModifiedBy).Select(x => new SelectListItem { Value = x.FirstOrDefault().ModifiedBy.ToString(), Text = x.FirstOrDefault().ModifiedByName + '(' + x.FirstOrDefault().ModifiedUserType + ')' }).ToList();
            //}
            //catch
            //{
                return null;
            //}
        }

        public List<SelectListItem> getProjectProgram()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectschemeProgram);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetProjectsUrbanorRural()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectsUrbanorRural); return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type, orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetProjectMileStoneStatus()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectMileStoneStatus); return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type, orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetComparativeYearGrandTotal()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ComparativeYearGrandTotal); return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type, orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getProjectYearofInitiation()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.YearofInitiation);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderByDescending(x => x.sortOrder)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getCMOOfficers()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.CMOOfficers);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getDepartmentContactCategory()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.DepartmentContactCategory);
                var records = _uow.GenericRepository<tbllookup>()
                    .GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup))
                    .Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup + (string.IsNullOrEmpty(x.desc) ? "" : " (" + x.desc + ")") })
                    .ToList();
                return records;
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getVCCategory()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.VCCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetChildPageDescriptionCategory()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ChildPageDescriptionCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getProjectProgramSchemeType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectProgramSchemeType);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> getProjectWorkCategory()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ProjectWorkCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperNewsMode()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperNewsMode);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperNewsType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperNewsType);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperSourceType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperSourceType);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperPublicationType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperPublicationType);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperEdition()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperEdition);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperPageNumber()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperPageNumber);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperProgressNewsType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperProgressNewsType);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperCoverageType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.NewspaperCoverageType);
                return _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type
                , orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperMaster()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_News_NewspaperMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetClassificationMaster()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_News_ClassificationMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetNewspaperSubject()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_News_SubjectMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetBeneficiaryCagegory()
        {
            try
            {
                return _uow.GenericRepository<tblBeneficiaryCagegory>().GetAll(filter: x => x.isActive && !x.isDeleted, orderBy: o => o.OrderBy(x => x.ansmtcategory)).Select(x => new SelectListItem { Value = x.cm_ansmtcategoryid.ToString(), Text = x.ansmtcategory }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetSectorMasterList()
        {
            try
            {
                return _uow.GenericRepository<tblSectorMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetOrderTypeList()
        {
            try
            {
                return _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetFrontExistingOrderTypeList()
        {
            //try
            //{
            //    return _uow.GenericRepository<vw_Jan_FrontOrderTypeMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            //}
            //catch (Exception ex)
            //{
                return null;
            //}
        }





        public List<OrderTypeMasterModel> GetOrderTypeWithRequiredDataList()
        {
            try
            {
                List<OrderTypeMasterModel> dataObj = new List<OrderTypeMasterModel>();

                List<tblOrderTypeMaster> objData = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblOrderTypeMaster, OrderTypeMasterModel>();
                });
                IMapper mapper = config.CreateMapper();
                dataObj = mapper.Map(objData, dataObj);

                return dataObj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetGenerateOrderType()
        {
            try
            {
                return _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete && x.IsSystemGenerated == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetSchemeMaster()
        {
            try
            {
                return _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.NameHindi }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetProjectCategory()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_PROJ_ProjectCategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetProjectSubCategory()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetProjectSubSubCategory()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetCMISReportModules()
        {
            try
            {
                return _uow.GenericRepository<CMISNEW_CM_MODULEMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete && x.IsVisibleOnFrontHome == true, orderBy: o => o.OrderBy(x => x.modulename)).Select(x => new SelectListItem { Value = x.cm_moduleid.ToString(), Text = x.modulename }).ToList();
            }
            catch
            {
                return null;
            }
        }
        /// <summary>
        /// Get KPI Category Master List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetKPICategoryList()
        {
            try
            {
                return _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted && x.IsDepartment == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetKPICategoryByDptCodeForDepartment(int dptCode)
        {
            try
            {
                List<System.Web.WebPages.Html.SelectListItem> data = new List<System.Web.WebPages.Html.SelectListItem>();
                if (dptCode > 0)
                {
                    data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted && x.IsDepartment == true && x.DepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted && x.IsDepartment == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetKPICategoryByDptCodeForDistrict(int dptCode)
        {
            try
            {
                List<System.Web.WebPages.Html.SelectListItem> data = new List<System.Web.WebPages.Html.SelectListItem>();
                if (dptCode > 0)
                {
                    data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted && x.IsDistrict == true && x.DepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted && x.IsDistrict == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get KPI Category Master List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetYearMasterList()
        {
            try
            {
                return _uow.GenericRepository<tblCPT_YearMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.YearName)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.YearName }).ToList();
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Get menu classifiaction page type List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetMenuClassificationPageTypeList()
        {
            try
            {
                return _uow.GenericRepository<tblDept_ClassificationPageType>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.NameHindi)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.NameHindi }).ToList();
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Get menu classifiaction List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetMenuClassificationList()
        {
            try
            {
                return _uow.GenericRepository<tblDept_MenuClassification>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.NameHindi)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.NameHindi }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetDepartmentSubMenuList(int deptId = 0)
        {
            try
            {
                return _uow.GenericRepository<tblDept_DepartmentSubMenu>().GetAll(filter: x => x.IsActive && !x.IsDelete && (deptId == 0 || x.DepartmentCode == deptId), orderBy: o => o.OrderBy(x => x.DisplayNameEnglish)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.DisplayNameEnglish }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetModuleCategoryList()
        {
            try
            {
                var dataList = from ModuleNameOfWebsiteEnum e in Enum.GetValues(typeof(ModuleNameOfWebsiteEnum))
                               select new SelectListItem
                               {
                                   Value = Convert.ToString((int)e),
                                   Text = e.GetStringValue()
                               };
                return dataList.OrderBy(x => x.Text).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetHospitalType()
        {
            try
            {
                var dataList = from ChiranjeeviHospitalTypeEnum e in Enum.GetValues(typeof(ChiranjeeviHospitalTypeEnum))
                               select new SelectListItem
                               {
                                   Value = Convert.ToString((int)e),
                                   Text = e.GetStringValue()
                               };
                return dataList.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetHospitalEmpanelmentType()
        {
            try
            {
                var dataList = from ChiranjeeviempanelmentTypeEnum e in Enum.GetValues(typeof(ChiranjeeviempanelmentTypeEnum))
                               select new SelectListItem
                               {
                                   Value = Convert.ToString((int)e),
                                   Text = e.GetStringValue()
                               };
                return dataList.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// Get Physical Unit List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetPhysicalUnitList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.PhysicalUnit);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Get Department Section Master
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetDepartmentSectionMasterList()
        {
            try
            {
                return _uow.GenericRepository<tblDept_SectionMaster>().GetAll(orderBy: o => o.OrderBy(x => x.ComponentName), filter: x => x.IsActive == true).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.ComponentName }).ToList();
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Get Month List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetMonthList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.Month);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.sortOrder), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// GetFinancial Unit List
        /// </summary>
        /// <returns></returns>
        public List<SelectListItem> GetFinancialUnitList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.FinancialUnit);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }



        public List<SelectListItem> GetPageMasterDetails()
        {
            try
            {
                return _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(orderBy: o => o.OrderBy(x => x.PageTitle)).Select(x => new SelectListItem { Value = x.PageCode.ToString(), Text = x.PageTitle }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetPageMasterforCMISCompliance()
        {
            try
            {
                return _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(filter: f => f.IsConnectWithCMIS == true, orderBy: o => o.OrderBy(x => x.PageTitle)).Select(x => new SelectListItem { Value = x.PageCode.ToString(), Text = x.PageTitle }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetSchemeName()
        {
            try
            {
                return _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetSchemeFaqMaster()
        {
            try
            {
                return _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: x => !x.IsDeleted, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.NameEnglish + " / " + x.NameHindi }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetAdvCategoryMaster()
        {
            try
            {
                return _uow.GenericRepository<tblADV_CategoryMaster>().GetAll(filter: x => x.IsActive == true && x.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetAdvSubCategoryMaster()
        {
            try
            {
                return _uow.GenericRepository<tblADV_SubCategoryMaster>().GetAll(filter: x => x.IsActive == true && x.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<RowYearandDepartment> GetOrderRelatedToYearList(string moduleName)
        {
            try
            {
                ServicerequestModel objReq = new ServicerequestModel();
                objReq._parameters[0].getiview.@params.Servicetype = "Years";
                objReq._parameters[0].getiview.@params.pmodulename = moduleName;
                RelatedToParameterServiceModel result = _orderService.RelatedToAPICall(objReq);
                if (result.result.Count > 0)
                {
                    return result.result[0].row;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<RowYearandDepartment> GetOrderRelatedToYearList()
        {
            try
            {
                ServicerequestModel objReq = new ServicerequestModel();
                objReq._parameters[0].getiview.@params.Servicetype = "Years";
                RelatedToParameterServiceModel result = _orderService.RelatedToAPICall(objReq);
                if (result.result.Count > 0)
                {
                    return result.result[0].row;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<RowYearandDepartment> GetOrderRelatedToDepartmentList(DepartmentFilterModel module)
        {
            try
            {
                ServicerequestModel objReq = new ServicerequestModel();
                objReq._parameters[0].getiview.@params.Servicetype = "Department";
                objReq._parameters[0].getiview.@params.pmodulename = module.ModuleName;
                objReq._parameters[0].getiview.@params.pprj_year = module.Year;
                RelatedToParameterServiceModel result = _orderService.RelatedToAPICall(objReq);
                if (result.result.Count > 0)
                {
                    return result.result[0].row;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<RowYearandDepartment> GetOrderRelatedToDepartmentList()
        {
            try
            {
                ServicerequestModel objReq = new ServicerequestModel();
                objReq._parameters[0].getiview.@params.Servicetype = "Department";
                RelatedToParameterServiceModel result = _orderService.RelatedToAPICall(objReq);
                if (result.result.Count > 0)
                {
                    return result.result[0].row;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #region LookupMaster

        private List<SelectListItem> GetLookUpType()
        {
            try
            {
                return _uow.GenericRepository<tbllookuptype>().GetAll(filter: x => x.isActive == true, orderBy: o => o.OrderBy(x => x.lookupType)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookupType }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetLookUpForOtherType(string type)
        {
            try
            {
                return _uow.GenericRepository<tblMonitoringParameterLookup>().GetAll(filter: x => x.IsActive == true && x.TypeCode.ToLower() == type.ToLower(), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetMonitoringParameterLookUpType()
        {
            try
            {
                return _uow.GenericRepository<tblMonitoringParameterLookupType>().GetAll(filter: x => x.IsActive == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.LookupTypeCode.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetOrderIssueByList()
        {
            try
            {
                string strOrderIssueBy = LookUpTypeEnumKeys.OrderIssueBy.GetStringValue();
                return _uow.GenericRepository<vwLookupMaster>().GetAll(filter: x => x.LookupType == strOrderIssueBy, orderBy: o => o.OrderBy(x => x.Lookup)).Select(x => new SelectListItem { Value = x.LookupId.ToString(), Text = x.Lookup }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetOrderModuleNameList()
        {
            try
            {
                string strModuleName = LookUpTypeEnumKeys.ModuleName.GetStringValue();
                return _uow.GenericRepository<vwLookupMaster>().GetAll(filter: x => x.LookupType == strModuleName, orderBy: o => o.OrderBy(x => x.Lookup)).Select(x => new SelectListItem { Value = x.LookupId.ToString(), Text = x.Lookup }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetPaymentThrough()
        {
            try
            {
                string strPaymentThrough = LookUpTypeEnumKeys.PaymentThrough.GetStringValue();
                return _uow.GenericRepository<vwLookupMaster>().GetAll(filter: x => x.LookupType == strPaymentThrough, orderBy: o => o.OrderBy(x => x.Lookup)).Select(x => new SelectListItem { Value = x.LookupId.ToString(), Text = x.Lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetModeofPayment()
        {
            try
            {
                string strModeofPayment = LookUpTypeEnumKeys.ModeofPayment.GetStringValue();
                return _uow.GenericRepository<vwLookupMaster>().GetAll(filter: x => x.LookupType == strModeofPayment, orderBy: o => o.OrderBy(x => x.Lookup)).Select(x => new SelectListItem { Value = x.LookupId.ToString(), Text = x.Lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetPaymentDisbursementMode()
        {
            try
            {
                string strPaymentDisbursementMode = LookUpTypeEnumKeys.PaymentDisbursementMode.GetStringValue();
                return _uow.GenericRepository<vwLookupMaster>().GetAll(filter: x => x.LookupType == strPaymentDisbursementMode, orderBy: o => o.OrderBy(x => x.Lookup)).Select(x => new SelectListItem { Value = x.LookupId.ToString(), Text = x.Lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetGender()
        {
            try
            {
                string strGender = LookUpTypeEnumKeys.Gender.GetStringValue();
                return _uow.GenericRepository<vwLookupMaster>().GetAll(filter: x => x.LookupType == strGender, orderBy: o => o.OrderBy(x => x.Lookup)).Select(x => new SelectListItem { Value = x.Lookup.ToString(), Text = x.Lookup }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion

        private List<SelectListItem> GetUserType(string userType = "")
        {
            try
            {
                if (!string.IsNullOrEmpty(userType))
                {
                    return _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.IsActive && !x.IsDelete && !(userType.Equals(UserTypeEnum.ADM.GetStringValue()) || userType.Equals(UserTypeEnum.SADM.GetStringValue())) ? x.ParrentUserType.Equals(userType) : x.UserType.Equals(x.UserType), orderBy: o => o.OrderBy(x => x.UserTypeTitle)).Select(x => new SelectListItem { Value = x.UserType.ToString(), Text = x.UserTypeTitle }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.UserTypeTitle)).Select(x => new SelectListItem { Value = x.UserType.ToString(), Text = x.UserTypeTitle }).ToList();
                }

            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetTitle()
        {
            try
            {
                return _uow.GenericRepository<tblTitleMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.TitleName)).Select(x => new SelectListItem { Value = x.TitleName, Text = x.TitleName }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetNameTitle()
        {
            try
            {
                return _uow.GenericRepository<tblTitleMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.TitleName)).Select(x => new SelectListItem { Value = x.TitleId.ToString(), Text = x.TitleName }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetDesignation()
        {
            try
            {
                return _uow.GenericRepository<tblDesignationMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.DesignationCode.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetDesignationForPressRelease()
        {
            try
            {
                return _uow.GenericRepository<tblDesignationMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete && x.IsMLA == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.DesignationCode.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }


        private List<SelectListItem> GetUserGroup()
        {
            try
            {
                return _uow.GenericRepository<tblGroupMaster>().GetAll(filter: x => x.GroupIsActive && !x.GroupIsDeleted, orderBy: o => o.OrderBy(x => x.GroupTitle)).Select(x => new SelectListItem { Value = x.GroupCode.ToString(), Text = x.GroupTitle }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        private List<SelectListItem> GetDistrict()
        {
            try
            {
                var stateCode = Convert.ToInt32(CommonEnum.CommonCodeEnum.StateCode);
                return _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: x => x.DistrictIsActive && x.DistrictIsDeleted == false && x.District_StateCode == stateCode, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetAdminDepartment()
        {
            try
            {
                return _uow.GenericRepository<tblAdmDepartmentMaster>().GetAll(filter: x => x.AdmDepartmentIsActive && !x.AdmDepartmentIsDeleted, orderBy: o => o.OrderBy(x => x.AdmDepartmentTitle)).Select(x => new SelectListItem { Value = x.AdmDepartmentCode.ToString(), Text = x.AdmDepartmentTitle }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetDivision(string userType = "", int userId = 0)
        {
            try
            {
                if (string.IsNullOrEmpty(userType))
                {
                    return _uow.GenericRepository<tblDivisionMaster>().GetAll(filter: x => x.DivisionIsActive && !x.DivisionIsDeleted, orderBy: o => o.OrderBy(x => x.DivisionTitle)).Select(x => new SelectListItem { Value = x.DivisionCode.ToString(), Text = x.DivisionTitle }).ToList();
                }

                else
                {
                    List<SqlParameter> objSqlparam = new List<SqlParameter>() { new SqlParameter("UserType", userType), new SqlParameter("@UserId", userId) };

                    return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedDivision_Result>("spCMO_GetNotAssignedDivision @UserType, @UserId", objSqlparam.ToArray()).Select(x => new SelectListItem { Value = x.DivisionCode.ToString(), Text = x.DivisionTitle }).ToList();
                }

            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetParliamentConstituency()
        {
            try
            {
                return _uow.GenericRepository<tblPConstituancyMaster>().GetAll(filter: x => x.PConstituancyIsActive && !x.PConstituancyIsDeleted, orderBy: o => o.OrderBy(x => x.PConstituancyTitle)).Select(x => new SelectListItem { Value = x.PConstituancyCode.ToString(), Text = x.PConstituancyTitle }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetAssemblyConstituency(string _PConstituancyIds)
        {
            try
            {
                if (string.IsNullOrEmpty(_PConstituancyIds))
                {
                    return _uow.GenericRepository<tblMLAConstituancyMaster>().GetAll(filter: x => x.MLAConstituancyIsActive && !x.MLAConstituancyIsDeleted, orderBy: o => o.OrderBy(x => x.MLAConstituancyTitle)).Select(x => new SelectListItem { Value = x.MLAConstituancyCode.ToString(), Text = x.MLAConstituancyTitle }).ToList();
                }
                else
                {
                    List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(_PConstituancyIds);
                    return _uow.GenericRepository<tblMLAConstituancyMaster>().GetAll(filter: x => x.MLAConstituancyIsActive && !x.MLAConstituancyIsDeleted && ids.Contains(x.MLAConstituancy_PConstituancyCode), orderBy: o => o.OrderBy(x => x.MLAConstituancyTitle)).Select(x => new SelectListItem { Value = x.MLAConstituancyCode.ToString(), Text = x.MLAConstituancyTitle }).ToList();
                }
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetBlock(string districtIds = "", string userType = "", int userId = 0)
        {
            try
            {
                if (string.IsNullOrEmpty(userType))
                {
                    if (string.IsNullOrEmpty(districtIds))
                    {
                        return _uow.GenericRepository<tblBlockMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.BlockName)).Select(x => new SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(districtIds);
                        return _uow.GenericRepository<tblBlockMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete && ids.Contains(x.DistrictCode), orderBy: o => o.OrderBy(x => x.BlockName)).Select(x => new SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                    }
                }
                else
                {
                    List<SqlParameter> objSqlparam = new List<SqlParameter>() { new SqlParameter("UserType", userType), new SqlParameter("@UserId", userId) };
                    if (string.IsNullOrEmpty(districtIds))
                    {
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedBlock_Result>("spCMO_GetNotAssignedBlock @UserType, @UserId", objSqlparam.ToArray()).Select(x => new SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(districtIds);
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedBlock_Result>("spCMO_GetNotAssignedBlock @UserType, @UserId", objSqlparam.ToArray()).Where(x => ids.Contains(x.DistrictCode)).Select(x => new SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                    }
                }
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetTehsil(string districtIds, string userType = "", int userId = 0)
        {
            try
            {
                if (string.IsNullOrEmpty(userType))
                {


                    if (string.IsNullOrEmpty(districtIds))
                    {
                        return _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: x => x.TehsilIsActive && !x.TehsilIsDeleted, orderBy: o => o.OrderBy(x => x.TehsilTitle)).Select(x => new SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(districtIds);
                        return _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: x => x.TehsilIsActive && !x.TehsilIsDeleted && ids.Contains(x.Tehsil_DistrictCode), orderBy: o => o.OrderBy(x => x.TehsilTitle)).Select(x => new SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                    }
                }
                else
                {
                    List<SqlParameter> objSqlparam = new List<SqlParameter>() { new SqlParameter("UserType", userType), new SqlParameter("@UserId", userId) };

                    if (string.IsNullOrEmpty(districtIds))
                    {
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedTehsil_Result>("spCMO_GetNotAssignedTehsil  @UserType, @UserId", objSqlparam.ToArray()).Select(x => new SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                    }
                    else
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(districtIds);
                        return _uow.ExeccuteStoreProcedure<spCMO_GetNotAssignedTehsil_Result>("spCMO_GetNotAssignedTehsil @UserType, @UserId", objSqlparam.ToArray()).Where(x => ids.Contains(x.Tehsil_DistrictCode)).Select(x => new SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                    }
                }
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetUsers(string userType)
        {
            try
            {
                if (string.IsNullOrEmpty(userType))
                {
                    return _uow.GenericRepository<tblUserMaster>().GetAll(filter: f => f.UserIsActive && !f.UserIsDeleted, orderBy: o => o.OrderBy(x => x.SSOID)).Select(x => new SelectListItem { Value = x.UserId.ToString(), Text = x.SSOID }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblUserMaster>().GetAll(filter: f => f.UserIsActive && !f.UserIsDeleted && f.UserType == userType, orderBy: o => o.OrderBy(x => x.SSOID)).Select(x => new SelectListItem { Value = x.UserId.ToString(), Text = x.SSOID }).ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetApplicationType()
        {
            try
            {
                return _uow.GenericRepository<tblApplicationMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.ApplicationTitle)).Select(x => new SelectListItem { Value = x.ApplicationCode.ToString(), Text = x.ApplicationTitle }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetPageType()
        {
            try
            {
                return _uow.GenericRepository<tblPageTypeMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.PageTypeName)).Select(x => new SelectListItem { Value = x.PageTypeCode.ToString(), Text = x.PageTypeName }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetApplicationMenu(string applicationCode)
        {
            try
            {
                if (string.IsNullOrEmpty(applicationCode))
                {
                    return _uow.GenericRepository<tblMenuMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete, orderBy: o => o.OrderBy(x => x.MenuTitle)).Select(x => new SelectListItem { Value = x.MenuCode.ToString(), Text = x.MenuTitle }).ToList();
                }
                else
                {

                    return _uow.GenericRepository<tblMenuMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete && x.ApplicationCode == applicationCode, orderBy: o => o.OrderBy(x => x.MenuTitle)).Select(x => new SelectListItem { Value = x.MenuCode.ToString(), Text = x.MenuTitle }).ToList();
                }
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetParticipant(long PartictipantCategoryCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (PartictipantCategoryCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.ParticipantCategoryId == PartictipantCategoryCode, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
                }


                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        ///  This method for get participant list on press release add update screen.
        /// </summary>
        /// <param name="PartictipantCategoryCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetParticipantListForPressRelease(string PartictipantCategoryCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(PartictipantCategoryCode))
                {
                    var participantlist = PartictipantCategoryCode.Split(',');
                    result.Data = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && participantlist.Contains(x.ParticipantCategoryId.ToString()), orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
                }


                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        ///  This method for get participant list on press release add update screen.
        /// </summary>
        /// <param name="PartictipantCategoryCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetVIPPersonListOfPressRelease(string PartictipantCategoryCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(PartictipantCategoryCode))
                {
                    var participantlist = PartictipantCategoryCode.Split(',');
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && participantlist.Contains(x.DesignationCode.ToString()), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.DisplayName }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.DisplayName }).ToList();
                }


                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }



        private List<SelectListItem> GetReferencee()
        {
            try
            {
                return _uow.GenericRepository<tblReferenceeMaster>().GetAll(filter: x => x.ReferenceeIsActive && !x.ReferenceeIsDeleted, orderBy: o => o.OrderBy(x => x.ReferenceeName)).Select(x => new SelectListItem { Value = x.ReferenceeCode.ToString(), Text = x.ReferenceeName }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetAdvNotificationType()
        {
            try
            {
                return _uow.GenericRepository<tblNotificationUserTypeMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }


        private List<SelectListItem> GetAdvPlatformType()
        {
            try
            {
                return _uow.GenericRepository<tblPlatformMaster>().GetAll(orderBy: o => o.OrderBy(x => x.PlatformId), filter: x => x.IsActive == true && x.IsDelete == false).Select(x => new SelectListItem { Value = x.PlatformId.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetSchemeCommonType()
        {
            try
            {

                return _uow.GenericRepository<tblSCM_TypeMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();

            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeTypeDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.SchemeType);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeProgramAreaDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.SchemeProgrammeArea);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeEligibilityDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.EligibilityCriteria);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeNameOfDocument()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.NameOfDocument);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetListOfRequiredDocDDL()
        {
            try
            {

                return _uow.GenericRepository<tblSCM_RequiredDocumentCategoryMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemePayFeeDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.HowtoPayFees);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetSchemeModeOfDisbursementDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.ModeofDisbursement);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetSchemePaymentDisbursementFrequencyDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.PaymentDisbursementFrequency);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetSchemeModeOfDeliveryDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.ModeofDelivery);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetSchemeListOfOtherDocDDL()
        {
            try
            {
                var type = Convert.ToInt64(TypeMasterEnum.ListOfOtherDoc);
                return _uow.GenericRepository<tblSCM_SchemeCommonMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.SchemeTypeCode == type).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeOwnedBy()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.SchemeOwnedBy);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetMenuClassificationType()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.MenuClassificationType);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }
        /// <summary>
        /// this method for getting advertisement pop up category
        /// </summary>
        /// <returns></returns>
        private List<SelectListItem> GetAdvertisementPopUpCategory()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.AdvertisementPopupCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }


        private List<SelectListItem> GetComparativeTargetBased()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ComparativeParameterTargetBased);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetDepartmentDistrictButtonList()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.GeneralDepartment_DistrictMapping);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetModuleForClient()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ClientModule);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetEntryType()
        {
            try
            {

                return _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetPriorityType()
        {
            try
            {

                return _uow.GenericRepository<tblCOMPS_PriorityMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetModuleType()
        {
            try
            {

                return _uow.GenericRepository<tblCOMPS_ModuleMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetEntryTypeMaster()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDeleted == false).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetDepartmentContactDesignationMaster()
        {
            try
            {
                return _uow.GenericRepository<tblDesignationMaster>().GetAll(orderBy: o => o.OrderBy(x => x.DisplayOrder).ThenBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsShowOnDepartmentContactDetails == true).Select(x => new SelectListItem { Value = x.DesignationCode.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSSOIdList()
        {
            try
            {
                return _uow.GenericRepository<tblUserMaster>().GetAll(orderBy: o => o.OrderBy(x => x.SSOID), filter: x => x.UserIsActive == true && x.UserIsDeleted == false).Select(x => new SelectListItem { Value = x.SSOID.ToString(), Text = x.SSOID }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetDepartmentCategory()
        {
            try
            {
                return _uow.GenericRepository<tblDepartmentCategoryMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDeleted == false).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetCompliantActionModule()
        {
            try
            {
                if (_loginUserDetail.SSOID.ToLower() == "CMISNEWTEST1".ToLower())
                {
                    return _uow.GenericRepository<tblCOMPS_StatusMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsDevAction == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
                }
                else if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    return _uow.GenericRepository<tblCOMPS_StatusMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsAdmAction == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
                }


                else if ((_loginUserDetail.UserType != UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType != UserTypeEnum.SADM.GetStringValue()))

                {
                    return _uow.GenericRepository<tblCOMPS_StatusMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsUserAction == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetCompliantFilterModule()
        {
            try
            {
                if (_loginUserDetail.SSOID.ToLower() == "CMISNEWTEST1".ToLower())
                {
                    return _uow.GenericRepository<tblCOMPS_StatusMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsDevFilter == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
                }
                else if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))

                {
                    return _uow.GenericRepository<tblCOMPS_StatusMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsAdmFilter == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
                }
                else if ((_loginUserDetail.UserType != UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType != UserTypeEnum.SADM.GetStringValue()))

                {
                    return _uow.GenericRepository<tblCOMPS_StatusMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDelete == false && x.IsUserFilter == true).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeRGDPSAct()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.RGDPSAct);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetSchemeServiceRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.SchemeServiceRadio);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetDepartmentDistrictonMasterRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.departmentandistrictradio);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetStateAndDistrictLevelRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.PressReleaseStateandDistrict);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }
        private List<SelectListItem> GetDepartmentSubMenuShowAsSeparateRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.DepartmentSubMenuShowAsSeparate);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetDepartmentSubMenuRedirectionManagementRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.DepartmentSubMenuRedirectionManagement);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }


        /// <summary>
        /// Get Department and category radio button on E-Booklet 
        /// </summary>
        /// <returns></returns>
        private List<SelectListItem> GetDepartmentCategoryRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.EBookletCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetComparativeParameterCategory()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ComparativeParameterCategory);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> LinkedtoScheme()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.LinkedToScheme);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetApplyForScheme()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ApplyForScheme);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeExpriedOn()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.SchemeExpriedOn);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeServiceFee()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ServiceFee);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeModeofApplying()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ModeofApplying);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemePaymentDisbursementFrequency()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.PaymentDisbursementFrequency);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeListOfRequiredDoc()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.ListOfRequiredDoc);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeMadeOfApplingOnlineAndBoth()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.MadeOfApplingOnlineAndBoth);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeMonitoringParameters()
        {
            try
            {
                return _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().GetAll(orderBy: o => o.OrderBy(x => x.Name), filter: x => x.IsActive == true && x.IsDeleted == false).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetAdvertisementIsPushOrPull()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.AdvertisementIsPullorIsPush);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeTypeRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpTypeEnumKeys.SchemeType);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }


        private List<SelectListItem> GetOfficeTypeRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpEnumKeys.OfficeType);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        private List<SelectListItem> GetVcLocationTypeRadio()
        {
            try
            {
                var type = Convert.ToInt64(LookUpEnumKeys.VCLocationType);
                return _uow.GenericRepository<tbllookup>().GetAll(orderBy: o => o.OrderBy(x => x.lookup), filter: x => x.isActive == true && x.lookupTypeId == type).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public List<SelectListItem> GetOffice()
        {
            try
            {

                return _uow.GenericRepository<vwOfficeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.OfficeName)).Select(x => new SelectListItem { Value = x.OfficeCode.ToString(), Text = x.OfficeName }).ToList();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetCitizenLetterAttachment()
        {
            try
            {
                return _uow.GenericRepository<tblCitizenAttachmentMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Attachment)).Select(x => new SelectListItem { Value = x.AttachmentCode.ToString(), Text = x.Attachment }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetURLType()
        {
            try
            {
                List<SelectListItem> objURl = new List<SelectListItem>()
                {
 new SelectListItem(){ Text= "ADD",Value="ADD"},
 new SelectListItem(){ Text= "EDIT",Value="EDIT"},
 new SelectListItem(){ Text= "VIEW",Value="VIEW"},
 new SelectListItem(){ Text= "DELETE",Value="DELETE"}
                };

                return objURl;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetHelpDocType()
        {
            try
            {
                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    return _uow.GenericRepository<tblHelpDocumentType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();
                    if (objUserType != null && objUserType.ParrentUserType == UserTypeEnum.SADM.GetStringValue())
                    {
                        return _uow.GenericRepository<tblHelpDocumentType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                    }
                    else
                    {
                        return _uow.GenericRepository<tblHelpDocumentType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && f.SSOID.Trim().ToLower() == _loginUserDetail.SSOID.Trim().ToLower(), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetHelpDocTypeOnWebServiceMaster()
        {
            try
            {

                return _uow.GenericRepository<tblHelpDocumentType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && f.IsShowInWebServiceMaster == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();

            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetNotificationTemplateType()
        {
            try
            {
                return _uow.GenericRepository<tblNotificationTemplateType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetUserByAdminDepartmentType()
        {
            try
            {
                List<SelectListItem> data = _uow.ExeccuteStoreProcedure<sp_GetUserbyDepartmentOfLoginUser_Result>("sp_GetUserbyDepartmentOfLoginUser @UserId",
               new SqlParameter("UserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }).OrderBy(x => x.UserName).Select(x => new SelectListItem { Value = x.SSOID.ToString(), Text = x.UserName }).ToList();
                return data;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetSchemePageType()
        {
            try
            {
                return _uow.GenericRepository<tblSCM_SchemePageType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<DepartmentAuthoritySignatoryModel> GetAuthoritySignatory()
        {
            try
            {
                List<DepartmentAuthoritySignatoryModel> result = new List<DepartmentAuthoritySignatoryModel>();
                List<tblODR_GNRT_DepartmentAuthoritySignatory> data = _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_GNRT_DepartmentAuthoritySignatory, DepartmentAuthoritySignatoryModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<DepartmentReferenceModel> GetReference()
        {
            try
            {
                List<DepartmentReferenceModel> result = new List<DepartmentReferenceModel>();
                List<tblODR_GNRT_DepartmentReference> data = _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.OrderBy)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_GNRT_DepartmentReference, DepartmentReferenceModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<VCCreationDDLModel> GetVCCreation()
        {
            try
            {


                List<VCCreationDDLModel> result = new List<VCCreationDDLModel>();
                List<vwVC_DdlView> data = _uow.GenericRepository<vwVC_DdlView>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Date)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_DdlView, VCCreationDDLModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<VCCreationDDLModel> GetCurrentDateVC()
        {
            try
            {
                DateTime date = DateTime.Now.Date;
                List<VCCreationDDLModel> result = new List<VCCreationDDLModel>();
                List<tblVCCreation> data = _uow.GenericRepository<tblVCCreation>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && f.Date >= date, orderBy: o => o.OrderBy(x => x.Date)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblVCCreation, VCCreationDDLModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetAchievementCategoryByDeptuser(string usertype)
        {
            try
            {

                if (usertype == "DPTO" || usertype == "DPTS")
                {
                    return _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.CategoryIsVisible == true, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Title }).ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetAchievementSubCategoryByCategoryCode(int CategoryCode)
        {
            try
            {

                if (CategoryCode > 0)
                {
                    return _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.CategoryCode == CategoryCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        private List<SelectListItem> GetImportantDecisionSubCategoryByCategoryCode(int CategoryCode)
        {
            try
            {

                if (CategoryCode > 0)
                {
                    return _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.CategoryCode == CategoryCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> Getddluserlist(int userid)
        {
            try
            {

                if (userid > 0)
                {
                    return _uow.GenericRepository<vwCMO_UserListBy>().GetAll(filter: null, orderBy: o => o.OrderBy(x => x.UserName)).Select(x => new SelectListItem { Value = x.UserIdCode.ToString(), Text = x.UserName }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vwCMO_UserListBy>().GetAll(filter: null, orderBy: o => o.OrderBy(x => x.UserName)).Select(x => new SelectListItem { Value = x.UserIdCode.ToString(), Text = x.UserName }).ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }





        public ServiceResponse<string> GetKeysForDropdown(string moduleName)
        {
            ServiceResponse<string> objReturn = new ServiceHelper.ServiceResponse<string>();
            try
            {
                if (moduleName.ToLower().Equals("scheme"))
                {
                    objReturn = SetResultStatus("ddlBeneficiarytype,ddlCategory,ddlSchemeType,ddlSchemeOutput,ddlModeofPayment,ddlPaymentDisbursementMode,ddPaymentThrough,ddlModeOfDelivery,ddlSchemeArea", MessageStatus.Success, true);
                }
                if (moduleName.ToLower().Equals("order"))
                {
                    objReturn = SetResultStatus("ddlBeneficiarytype,ddlCategory,ddlSchemeType,ddlSchemeOutput,ddlModeofPayment,ddlPaymentDisbursementMode,ddPaymentThrough,ddlModeOfDeliveryMaster", MessageStatus.Success, true);
                }
                if (moduleName.ToLower().Equals("advertisement"))
                {
                    objReturn = SetResultStatus("ddlCategory,ddlBeneficiarytype,ddlDepartment,ddldistrict", MessageStatus.Success, true);
                }
            }
            catch
            {
                objReturn = SetResultStatus("", MessageStatus.Error, false);
            }
            return objReturn;
        }

        public List<SelectListItem> GetMappingTableNameList()
        {
            try
            {
                List<SelectListItem> data = new List<SelectListItem>();
                data = _uow.GenericRepository<tblMonitoringParameterLookupType>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.LookupTypeCode.ToString(), Text = x.Name }).ToList();

                data.Add(new SelectListItem { Text = "Department Master", Value = "tblDepartmentMaster" });
                data.Add(new SelectListItem { Text = "Category Master", Value = "tblCategoryMaster" });
                data.Add(new SelectListItem { Text = "Beneficiary Cagegory", Value = "tblBeneficiaryCagegory" });
                return data;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SelectListItem> GetContactPersonType()
        {
            try
            {
                return _uow.GenericRepository<tblSCM_ContactPersonTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetAchievementCategory(int Dptcode = 0)
        {
            try
            {
                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    return _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsActive && !f.IsDeleted, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();
                    if (objUserType != null && (objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue() || objUserType.ParrentUserType == UserTypeEnum.SADM.GetStringValue()))
                    {
                        return _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsActive && !f.IsDeleted, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Title }).ToList();
                    }
                    else
                    {
                        //return _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsActive && !f.IsDeleted && f.de, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Title }).ToList();

                        return _uow.GenericRepository<vw_AchievementCategorylist>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.DepartmentCode == Dptcode, orderBy: o => o.OrderBy(x => x.Title)).ToList().GroupBy(y => y.CategoryCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().CategoryCode.ToString(), Text = x.FirstOrDefault().Title }).ToList();

                    }

                }


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetVCMode()
        {
            try
            {
                return _uow.GenericRepository<tblVCModeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetVCType()
        {
            try
            {
                return _uow.GenericRepository<tblVCTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetVCParticipantCategory()
        {
            try
            {
                return _uow.GenericRepository<tblVCParticipantCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetOrderSubType(long typeCode = 0)
        {
            try
            {

                if (typeCode > 0)
                {
                    return _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete == false && f.IsActive == true && f.TypeCode == typeCode, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(X => X.Code).Select(x => new SelectListItem { Text = x.FirstOrDefault().Name.ToString(), Value = Convert.ToString(x.FirstOrDefault().Code) }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(X => X.Code).Select(x => new SelectListItem { Text = x.FirstOrDefault().Name.ToString(), Value = Convert.ToString(x.FirstOrDefault().Code) }).ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetOrderSubTypeByType(long typeCode = 0)
        {
            try
            {
                List<System.Web.WebPages.Html.SelectListItem> data = new List<System.Web.WebPages.Html.SelectListItem>();
                if (typeCode > 0)
                {
                    data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete == false && f.IsActive == true && f.TypeCode == typeCode, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                }
                else
                {
                    data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                }
                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetOrderSubTypeByTypeAndDepartment(long typeCode = 0, long departmentCode = 0)
        {
            try
            {
                List<System.Web.WebPages.Html.SelectListItem> data = new List<System.Web.WebPages.Html.SelectListItem>();
                if (typeCode > 0 && departmentCode > 0)
                {
                    data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete.Value == false && f.IsActive.Value == true && f.TypeCode.Value == typeCode &&
                    (f.IsApplicableToAllDPT.Value == true || f.DepartmentCode.Value == departmentCode)
                    , orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.FirstOrDefault().Name.ToString(), Value = Convert.ToString(x.FirstOrDefault().Code) }).ToList();
                }
                else if (typeCode > 0)
                {
                    data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete.Value == false && f.IsActive.Value == true && f.TypeCode.Value == typeCode && (f.IsApplicableToAllDPT.Value == true ? true : false), orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.FirstOrDefault().Name.ToString(), Value = Convert.ToString(x.FirstOrDefault().Code) }).ToList();
                }
                else if (departmentCode > 0)
                {

                    data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete == false && f.IsActive == true && (f.IsApplicableToAllDPT == true || f.DepartmentCode.Value == departmentCode), orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.FirstOrDefault().Name.ToString(), Value = Convert.ToString(x.FirstOrDefault().Code) }).ToList();
                }
                else
                {
                    data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsDelete == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.FirstOrDefault().Name.ToString(), Value = Convert.ToString(x.FirstOrDefault().Code) }).ToList();
                }

                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<DepartmentReferenceModel>> GetReferenceByDepartment(int dptCode)
        {
            try
            {
                List<DepartmentReferenceModel> result = new List<DepartmentReferenceModel>();

                List<tblODR_GNRT_DepartmentReference> data = _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.DepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.OrderBy)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_GNRT_DepartmentReference, DepartmentReferenceModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);

                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<DepartmentReferenceModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<ProjectSchemeCategoryMasterViewModel>> GetProjectSchemeCategoryByDepartment(int dptCode)
        {
            try
            {
                List<ProjectSchemeCategoryMasterViewModel> result = new List<ProjectSchemeCategoryMasterViewModel>();

                List<vwJAN_PROJ_ProjectSchemeCategoryMaster> data = _uow.GenericRepository<vwJAN_PROJ_ProjectSchemeCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.ProgramSchemeName)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_PROJ_ProjectSchemeCategoryMaster, ProjectSchemeCategoryMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);

                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ProjectSchemeCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<DepartmentReferenceModel>> GetCCReferenceByCCCategoryType(long ccCatType = 0)
        {
            try
            {
                List<DepartmentReferenceModel> data = new List<DepartmentReferenceModel>();
                List<vwODR_GNRT_AssignedCCCategoryReference> dataObj = new List<vwODR_GNRT_AssignedCCCategoryReference>();

                if (ccCatType > 0)
                {
                    dataObj = _uow.GenericRepository<vwODR_GNRT_AssignedCCCategoryReference>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && f.CCCategoryCode == ccCatType, orderBy: o => o.OrderBy(x => x.Reference)).ToList();
                }
                else
                {
                    dataObj = _uow.GenericRepository<vwODR_GNRT_AssignedCCCategoryReference>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Reference)).ToList();
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_GNRT_AssignedCCCategoryReference, DepartmentReferenceModel>();
                });
                IMapper mapper = config.CreateMapper();
                data = mapper.Map(dataObj, data);

                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<VCParticipantDDLModel>> GetVCPaticipantByPaticipantCategory(long vCCode, long code, long dataId)
        {
            try
            {
                List<VCParticipantDDLModel> data = new List<VCParticipantDDLModel>();
                List<tblVCParticipantMaster> dataObj = new List<tblVCParticipantMaster>();

                List<tblVCParticipant> objVC = _uow.GenericRepository<tblVCParticipant>().GetAll(filter: x => x.VCCreateCode == vCCode && x.IsActive == true && x.IsDeleted == false && (dataId > 0 ? x.Id != dataId : true)).ToList();
                List<long?> vCs = new List<long?>(objVC.Select(x => x.ParticipantCode).ToList());

                dataObj = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && f.ParticipantCategoryId == code && !vCs.Contains(f.Code), orderBy: o => o.OrderBy(x => x.NameEnglish)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblVCParticipantMaster, VCParticipantDDLModel>();
                });
                IMapper mapper = config.CreateMapper();
                data = mapper.Map(dataObj, data);

                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetBlockByDistict(string code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(code))
                {
                    var codeList = code.Split(',');
                    result.Data = _uow.GenericRepository<tblBlockMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && codeList.Contains(f.DistrictCode.ToString()), orderBy: o => o.OrderBy(x => x.BlockName)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblBlockMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.BlockName)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetGramPanchayatByBlock(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    var codeList = codes.Split(',');
                    result.Data = _uow.GenericRepository<tblJAN_GramPanchayatMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && codeList.Contains(f.BlockCode.ToString()), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_GramPanchayatMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetVillageByGramPanchayat(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    var codeList = codes.Split(',');
                    result.Data = _uow.GenericRepository<tblJAN_VillageMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && codeList.Contains(f.GramPanchayatCode.ToString()), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_VillageMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetLocationByDistrict(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblVCLocationMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.DistrictCode == code, orderBy: o => o.OrderBy(x => x.Location)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Location }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblVCLocationMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Location)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Location }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDepartmentByDepartmentCategory(int code, int admCode)
        {
            try
            {
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0 || admCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && (admCode > 0 ? f.Department_AdmDepartmentCode == admCode : true) && (code > 0 ? f.DepartmentCategoryCode == code : true) && depIds.Contains(f.DepartmentCode), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && depIds.Contains(f.DepartmentCode), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetDepartmentForCategoryOne(int code = 0)
        {
            try
            {
                long type = Convert.ToInt64(DepartmentCategoryEnum.DepartmentCategory);
                if (code > 0)
                {
                    return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false
               && f.DepartmentCategoryCode == type && f.Department_AdmDepartmentCode == code
               , orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false
               && f.DepartmentCategoryCode == type
               , orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetDepartmentForCMISReport()
        {
            try
            {
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                return _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && !string.IsNullOrEmpty(f.CMISDeptID) && depIds.Contains(f.DepartmentCode), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.CMISDeptID.ToString(), Text = x.DepartmentTitle }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetCMISBudgetYear()
        {
            try
            {
                return _uow.GenericRepository<cm_budgetyear>().GetAll(filter: f => f.currentgovyear == "T", orderBy: o => o.OrderByDescending(x => x.JankalyanId)).Select(x => new SelectListItem { Value = x.JankalyanId.ToString(), Text = x.budgetyear }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetMLAConstituency()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetMLAConstituencyWithDistrictName()
        {
            try
            {
                return _uow.GenericRepository<vwJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name + "( " + x.DistrictTitle + " )" }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetMPConstituency()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetProjectMileStone()
        {
            try
            {
                return _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetTahsilByDistrict(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: f => f.TehsilIsActive == true && f.TehsilIsDeleted == false && f.Tehsil_DistrictCode == code, orderBy: o => o.OrderBy(x => x.TehsilTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: f => f.TehsilIsActive == true && f.TehsilIsDeleted == false, orderBy: o => o.OrderBy(x => x.TehsilTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDepartmentMainMenuByDepartment(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                result.Data = _uow.GenericRepository<tblDept_DepartmentMainMenu>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && (code > 0 ? f.DepartmentCode == code : true), orderBy: o => o.OrderBy(x => x.DisplayNameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.DisplayNameEnglish }).ToList();

                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetModuleCategoryByModule(int moduleCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (moduleCode == 1)
                {
                    result.Data = _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else if (moduleCode == 2)
                {
                    result.Data = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else if (moduleCode == 3)
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.CategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else if (moduleCode == 4)
                {
                    result.Data = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else if (moduleCode == 5)
                {
                    result.Data = _uow.GenericRepository<CMISNEW_CM_MODULEMaster>().GetAll(filter: x => x.IsActive && !x.IsDelete && x.IsVisibleOnFrontHome == true, orderBy: o => o.OrderBy(x => x.modulename)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.cm_moduleid.ToString(), Text = x.modulename }).ToList();
                }
                else if (moduleCode == 10)
                {
                    var type = Convert.ToInt64(LookUpTypeEnumKeys.DepartmentContactCategory);
                    result.Data = _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == type, orderBy: o => o.OrderBy(x => x.lookup)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Id.ToString(), Text = x.lookup }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetModuleSubCategoryByModule(int moduleCode, long moduleCatCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (moduleCode == 3)
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.CategoryCode == moduleCatCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else if (moduleCode == 4)
                {
                    result.Data = _uow.GenericRepository<tblODR_SubTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && f.TypeCode == moduleCatCode, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }

                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));

            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetBlockByMultipleDistict(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    var codeList = codes.Split(',');

                    result.Data = _uow.GenericRepository<tblBlockMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && codeList.Contains(f.DistrictCode.ToString()), orderBy: o => o.OrderBy(x => x.BlockName)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblBlockMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.BlockName)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.BlockCode.ToString(), Text = x.BlockName }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetChairpersonByMultipleCategory(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    var codeList = codes.Split(',');

                    result.Data = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && codeList.Contains(f.ParticipantCategoryId
                        .ToString()), orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.NameEnglish }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetTahsilByMultipleDistrict(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    var codeList = codes.Split(',');

                    result.Data = _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: f => f.TehsilIsActive == true && f.TehsilIsDeleted == false && codeList.Contains(f.Tehsil_DistrictCode.ToString()), orderBy: o => o.OrderBy(x => x.TehsilTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: f => f.TehsilIsActive == true && f.TehsilIsDeleted == false, orderBy: o => o.OrderBy(x => x.TehsilTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.TehsilCode.ToString(), Text = x.TehsilTitle }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetOfficeList(string code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(code))
                {

                    var codes = code.Split(',');

                    result.Data = _uow.GenericRepository<tblOfficeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && codes.Contains(f.DepartmentCode.ToString()), orderBy: o => o.OrderBy(x => x.OfficeName)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.OfficeCode.ToString(), Text = x.OfficeName }).ToList();

                }
                else
                {
                    result.Data = _uow.GenericRepository<tblOfficeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false, orderBy: o => o.OrderBy(x => x.OfficeName)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.OfficeCode.ToString(), Text = x.OfficeName }).ToList();

                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDistrictList(string code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(code))
                {

                    var codes = code.Split(',');

                    result.Data = _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: f => f.DistrictIsActive == true && f.DistrictIsDeleted == false && codes.Contains(f.DistrictCode.ToString()), orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();

                }
                else
                {
                    result.Data = _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: f => f.DistrictIsActive == true && f.DistrictIsDeleted == false, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();

                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetSchemeByDepartment(int isActive, int Code = 0)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                if (Code > 0)
                {

                    result.Data = _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == (isActive >= 0 ? (isActive == 0 ? false : true) : f.IsActive) && f.NodelDepartmentCode == Code, orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.NameEnglish.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                }
                else
                {

                    result.Data = _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == (isActive >= 0 ? (isActive == 0 ? false : true) : f.IsActive), orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.NameEnglish.ToString(), Value = Convert.ToString(x.Code) }).ToList();

                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetCCcategoryByDepartment(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.DepartmentCode == code, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetSchemes(int departmentCode)
        {
            try
            {
                return _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: x => x.IsActive && !x.IsDeleted && (departmentCode == 0 || departmentCode == x.NodelDepartmentCode), orderBy: o => o.OrderBy(x => x.NameEnglish)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.NameEnglish + " / " + x.NameHindi }).ToList();
            }
            catch
            {
                return null;
            }
        }


        public List<SelectListItem> GetGalleryUploadType()
        {
            try
            {
                List<SelectListItem> objList = new List<SelectListItem>();
                objList.Add(new SelectListItem() { Text = GalleryUploadType.Photo.GetStringValue(), Value = GalleryUploadType.Photo.GetStringValue() });
                objList.Add(new SelectListItem() { Text = GalleryUploadType.Video.GetStringValue(), Value = GalleryUploadType.Video.GetStringValue() });
                objList.Add(new SelectListItem() { Text = GalleryUploadType.URL.GetStringValue(), Value = GalleryUploadType.URL.GetStringValue() });
                objList.Add(new SelectListItem() { Text = GalleryUploadType.VIDEO_URL.GetStringValue(), Value = GalleryUploadType.VIDEO_URL.GetStringValue() });
                objList.Add(new SelectListItem() { Text = GalleryUploadType.PDF.GetStringValue(), Value = GalleryUploadType.PDF.GetStringValue() });
                return objList;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetManualType()
        {
            try
            {
                List<SelectListItem> objList = new List<SelectListItem>();
                objList.Add(new SelectListItem() { Text = ManualTypeEnum.SystemManual.GetStringValue(), Value = (Convert.ToInt32(ManualTypeEnum.SystemManual)).ToString() });
                objList.Add(new SelectListItem() { Text = ManualTypeEnum.UserManual.GetStringValue(), Value = (Convert.ToInt32(ManualTypeEnum.UserManual)).ToString() });
                return objList;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetCancellationReason()
        {
            try
            {
                return _uow.GenericRepository<tblODR_CancellationReasonMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<VCCreationDDLModel>> GetVCCreationWithFiler(VCCustomFilter model)
        {
            try
            {
                DateTime? date = DateTime.Now.Date;

                List<VCCreationDDLModel> result = new List<VCCreationDDLModel>();
                List<vwVC_DdlView> data = _uow.GenericRepository<vwVC_DdlView>().GetAll(filter: f => f.IsActive == true && f.IsDelete == false && (model.IsAllVC ? f.Date >= date : true) && (model.Date != null ? f.Date == model.Date : true) && (model.TypeCode > 0 ? f.TypeCode == model.TypeCode : true), orderBy: o => o.OrderBy(x => x.Date)).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_DdlView, VCCreationDDLModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);
                return SetResultStatus<List<VCCreationDDLModel>>(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        /// <summary>
        /// Get DropDown Data
        /// </summary>
        /// <param name="key">string</param>
        /// <param name="id">int</param>
        /// <param name="id2">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public ServiceResponse<IDictionary<string, object>> GetDropDown(string key, int id = 0, int id2 = 0)
        {
            ServiceResponse<IDictionary<string, object>> objReturn = new ServiceResponse<IDictionary<string, object>>();
            IDictionary<string, object> Data = new Dictionary<string, object>();
            try
            {
                if (!string.IsNullOrEmpty(key))
                {
                    var temp = Data.Where(x => x.Key == key).FirstOrDefault().Key;
                    if (temp == null)
                    {
                        // Schemes
                        if (key.Equals(DdlKeys.ddlSchemes.ToString()))
                        {
                            List<SelectListItem> obj = GetSchemes(id);
                            Data.Add(key, obj);
                        }
                        else if (key.Equals(DdlKeys.ddlDepartmentSubMenuList.ToString()))
                        {
                            List<SelectListItem> obj = GetDepartmentSubMenuList(id);
                            Data.Add(key, obj);
                        }
                    }
                }
                objReturn.Data = Data;
                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.InvalidData;
                return objReturn;
            }
        }

        public List<SelectListItem> GetStateList()
        {
            try
            {
                return _uow.GenericRepository<tblStateMaster>().GetAll(filter: f => f.StateIsDeleted == false && f.StateIsActive == true, orderBy: o => o.OrderBy(x => x.State)).Select(x => new SelectListItem { Text = x.State.ToString(), Value = Convert.ToString(x.StateCode) }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetAchievementAdminDepartment(int CategoryCode = 0, long subCatCode = 0)
        {
            try
            {


                return _uow.GenericRepository<vwADV_Achievements>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (CategoryCode > 0 ? f.AchievementCategoryCode == CategoryCode : true)
               && (subCatCode > 0 ? f.AchievementSubCategoryCode == subCatCode : true)
                , orderBy: o => o.OrderBy(x => x.AdmDepartment)).ToList().GroupBy(x => x.AdmDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdmDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartment }).ToList();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetAchievementDepartment(long admIdsValue = 0, int CategoryCode = 0, long subCatCode = 0)
        {
            try
            {


                if (admIdsValue > 0)
                {

                    return _uow.GenericRepository<vwADV_Achievements>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (CategoryCode > 0 ? (f.AchievementCategoryCode == CategoryCode) : true)
                    && (subCatCode > 0 ? (f.AchievementSubCategoryCode == subCatCode) : true)
                    && (admIdsValue > 0 ? f.AdmDepartmentCode.Value == admIdsValue : true), orderBy: o => o.OrderBy(x => x.Department)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().Department }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vwADV_Achievements>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (CategoryCode > 0 ? f.AchievementCategoryCode == CategoryCode : true)
                     && (subCatCode > 0 ? (f.AchievementSubCategoryCode == subCatCode) : true)
                    , orderBy: o => o.OrderBy(x => x.Department)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().Department }).ToList();
                }





            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetCMISStatusByModuleId(decimal moduleId)
        {
            try
            {
                if (moduleId > 0)
                {
                    return _uow.GenericRepository<CMISNEW_cm_pstatusdtl>().GetAll(filter: f => f.IsActive == true && f.OLDModuleID == moduleId, orderBy: o => o.OrderBy(x => x.status)).ToList().Select(x => new SelectListItem { Value = x.status, Text = x.status }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<CMISNEW_cm_pstatusdtl>().GetAll(filter: f => f.IsActive == true, orderBy: o => o.OrderBy(x => x.status)).ToList().Select(x => new SelectListItem { Value = x.status, Text = x.status }).ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        private List<SelectListItem> GetOrderDepartment(long admIdsValue = 0)
        {
            try
            {


                if (admIdsValue > 0)
                {

                    return _uow.GenericRepository<vwODR_OrderDetailMaster>().GetAll(filter: f => f.isactive == true && f.IsDeleted == false && (admIdsValue > 0 ? f.AdmDepartmentCode.Value == admIdsValue : true), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vwODR_OrderDetailMaster>().GetAll(filter: f => f.isactive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();
                }





            }
            catch (Exception ex)
            {
                return null;
            }
        }
        private List<SelectListItem> GetOrderAdminDepartment()
        {
            try
            {


                return _uow.GenericRepository<vwODR_OrderDetailMaster>().GetAll(filter: f => f.isactive == true && f.IsDeleted == false && !string.IsNullOrEmpty(f.AdmDepartmentTitle), orderBy: o => o.OrderBy(x => x.AdmDepartmentTitle)).ToList().GroupBy(x => x.AdmDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdmDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();





            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeDepartment(long admIdsValue = 0)
        {
            try
            {


                if (admIdsValue > 0)
                {

                    return _uow.GenericRepository<vwSCM_FrontPortalListView>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (admIdsValue > 0 ? f.AdminDepartmentCode.Value == admIdsValue : true), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.NodelDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().NodelDepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vwSCM_FrontPortalListView>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.NodelDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().NodelDepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();
                }





            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetSchemeAdminDepartment()
        {
            try
            {


                return _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && !string.IsNullOrEmpty(f.AdminDepartmentTitle), orderBy: o => o.OrderBy(x => x.AdminDepartmentTitle)).ToList().GroupBy(x => x.AdminDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdminDepartmentCode.ToString(), Text = x.FirstOrDefault().AdminDepartmentTitle }).ToList();

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        private List<SelectListItem> GetCMISModule()
        {
            try
            {

                return _uow.GenericRepository<vw_CMISModuleData>().GetAll(filter: x => x.isActive && !x.isDelete, orderBy: o => o.OrderBy(x => x.modulename)).ToList().GroupBy(x => x.ModuleID).Select(x => new SelectListItem { Value = x.FirstOrDefault().ModuleID.ToString(), Text = x.FirstOrDefault().modulename }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetCMISAchievementAdmDepartment()
        {
            try
            {


                return _uow.GenericRepository<vw_CMISAchievement>().GetAll(filter: f => f.IsActive == true, orderBy: o => o.OrderBy(x => x.AdmDepartmentTitle)).ToList().GroupBy(x => x.AdminDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdminDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetCabinetMinisterList()
        {
            try
            {
                var cabinetCode = Convert.ToInt64(MinisterListEnum.CabinetMinister);
                return _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.DesignationCode == cabinetCode, orderBy: o => o.OrderBy(x => x.Name)).ToList().Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.MLANameEng }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetStateMinisterList()
        {
            try
            {
                var StateCode = Convert.ToInt64(MinisterListEnum.StateMinister);
                return _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.DesignationCode == StateCode, orderBy: o => o.OrderBy(x => x.Name)).ToList().Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.MLANameEng }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<SelectListItem> GetCMISAchievementDepartment(long admIdsValue = 0)
        {
            try
            {

                if (admIdsValue > 0)
                {
                    return _uow.GenericRepository<vw_CMISAchievement>().GetAll(filter: f => f.IsActive == true && f.AdminDepartmentCode == admIdsValue, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vw_CMISAchievement>().GetAll(filter: f => f.IsActive == true, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();

                }



            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public ServiceResponse<IDictionary<string, object>> AllDropDown(string keys, string userType = "", int userId = 0)
        {
            ServiceResponse<IDictionary<string, object>> objReturn = new ServiceResponse<IDictionary<string, object>>();
            IDictionary<string, object> Data = new Dictionary<string, object>();
            try
            {
                if (!string.IsNullOrEmpty(keys))
                {
                    foreach (var item in keys.Split(','))
                    {
                        var temp = Data.Where(x => x.Key == item).FirstOrDefault().Key;
                        if (temp == null)
                        {
                            if (item.Equals(DdlKeys.ddlEntry.ToString()))
                            {
                                List<SelectListItem> obj = GetEntryList();
                                Data.Add(item, obj);
                            } //State
                            else if (item.Equals(DdlKeys.ddlState.ToString()))
                            {
                                List<SelectListItem> obj = GetStateList();
                                Data.Add(item, obj);
                            }
                            //Category
                            else if (item.Equals(DdlKeys.ddlCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetCategory();
                                Data.Add(item, obj);
                            }

                            //Jankalyan Category
                            else if (item.Equals(DdlKeys.ddlJankalyanCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetJankalyanCategory();
                                Data.Add(item, obj);
                            }
                            //Press Release Category
                            else if (item.Equals(DdlKeys.ddlPressReleaseCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetPressReleseCategory();
                                Data.Add(item, obj);
                            }
                            //Common Department
                            else if (item.Equals(DdlKeys.ddlDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentList(string.Empty, userType, userId);
                                Data.Add(item, obj);
                            }
                            //login user Department
                            else if (item.Equals(DdlKeys.ddlUserDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetLoginUserDepartmentList();
                                Data.Add(item, obj);
                            }
                            //login user Admin Department
                            else if (item.Equals(DdlKeys.ddlUserAdminDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetLoginUserAdminDepartmentForProjectList();
                                Data.Add(item, obj);
                            }
                            //Scheme Department
                            else if (item.Equals(DdlKeys.ddlDepartmentScheme.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeDepartment();
                                Data.Add(item, obj);
                            }
                            //Scheme Admin Department
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentScheme.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeAdminDepartment();
                                Data.Add(item, obj);
                            }
                            //Order Department
                            else if (item.Equals(DdlKeys.ddlDepartmentOrder.ToString()))
                            {
                                List<SelectListItem> obj = GetOrderDepartment();
                                Data.Add(item, obj);
                            }

                            //Order Admin Department
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentOrder.ToString()))
                            {
                                List<SelectListItem> obj = GetOrderAdminDepartment();
                                Data.Add(item, obj);
                            }


                            //Award Department
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentAward.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(Convert.ToInt32(AchievementCategoryEnum.Awards));
                                Data.Add(item, obj);
                            }

                            //Award Department
                            else if (item.Equals(DdlKeys.ddlDepartmentAward.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Awards));
                                Data.Add(item, obj);
                            }

                            //Award Department
                            else if (item.Equals(DdlKeys.ddlDepartmentAward.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Awards));
                                Data.Add(item, obj);
                            }
                            //Award SubCategory Award
                            else if (item.Equals(DdlKeys.ddlSubCategoryAward.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Awards));
                                Data.Add(item, obj);
                            }

                            //Achievements admin Department
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentAchievements.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(Convert.ToInt32(AchievementCategoryEnum.DepartmentalAchievements));
                                Data.Add(item, obj);
                            }

                            //Achievement  Department
                            else if (item.Equals(DdlKeys.ddlDepartmentAchievement.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.DepartmentalAchievements));

                                Data.Add(item, obj);
                            }
                            //Achievement Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryAchievement.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.DepartmentalAchievements));
                                Data.Add(item, obj);
                            }

                            //Achievements admin Department
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentImportantDecision.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(Convert.ToInt32(AchievementCategoryEnum.ImportantDecisions));
                                Data.Add(item, obj);
                            }


                            //Important Decision Department
                            else if (item.Equals(DdlKeys.ddlDepartmentImportantDecision.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ImportantDecisions));

                                Data.Add(item, obj);
                            }

                            //Important Decision Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryImportantDecision.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ImportantDecisions));
                                Data.Add(item, obj);
                            }

                            // CMSpeech
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentCMSpeech.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.CMSpeech));

                                Data.Add(item, obj);
                            }

                            // CMSpeech
                            else if (item.Equals(DdlKeys.ddlDepartmentCMSpeech.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.CMSpeech));

                                Data.Add(item, obj);
                            }
                            //CMSpeech Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryCMSpeech.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.CMSpeech));
                                Data.Add(item, obj);
                            }

                            // MobileApplication
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentMobileApplication.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.MobileApplication));

                                Data.Add(item, obj);
                            }

                            // MobileApplication
                            else if (item.Equals(DdlKeys.ddlDepartmentMobileApplication.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.MobileApplication));

                                Data.Add(item, obj);
                            }
                            //MobileApplication Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryMobileApplication.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.MobileApplication));
                                Data.Add(item, obj);
                            }

                            // Website
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentWebsite.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Website));

                                Data.Add(item, obj);
                            }

                            // Website
                            else if (item.Equals(DdlKeys.ddlDepartmentWebsite.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Website));

                                Data.Add(item, obj);
                            }
                            //Website Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryWebsite.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Website));
                                Data.Add(item, obj);
                            }

                            // Service
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentServicesOfferedbyDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ServicesOfferedbyDepartment));

                                Data.Add(item, obj);
                            }

                            // Service
                            else if (item.Equals(DdlKeys.ddlDepartmentServicesOfferedbyDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ServicesOfferedbyDepartment));

                                Data.Add(item, obj);
                            }
                            //ServicesOfferedbyDepartment Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryServicesOfferedbyDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ServicesOfferedbyDepartment));
                                Data.Add(item, obj);
                            }

                            // LetterstoCentralGovt
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentLetterstoCentralGovt.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.LetterstoCentralGovt));

                                Data.Add(item, obj);
                            }

                            // LetterstoCentralGovt
                            else if (item.Equals(DdlKeys.ddlDepartmentLetterstoCentralGovt.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.LetterstoCentralGovt));

                                Data.Add(item, obj);
                            }
                            //LetterstoCentralGovt Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryLetterstoCentralGovt.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.LetterstoCentralGovt));
                                Data.Add(item, obj);
                            }

                            // ProgramVideo
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentProgramVideo.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ProgramVideo));

                                Data.Add(item, obj);
                            }

                            // ProgramVideo
                            else if (item.Equals(DdlKeys.ddlDepartmentProgramVideo.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ProgramVideo));

                                Data.Add(item, obj);
                            }
                            //ProgramVideo Subcategory
                            else if (item.Equals(DdlKeys.ddlSubCategoryProgramVideo.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.ProgramVideo));
                                Data.Add(item, obj);
                            }


                            // Departmental Photo Gallery
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentDepartmentalPhotoGallery.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.DepartmentalPhotoGallery));

                                Data.Add(item, obj);
                            }

                            //  Photo Gallery
                            else if (item.Equals(DdlKeys.ddlDepartmentDepartmentalPhotoGallery.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.DepartmentalPhotoGallery));

                                Data.Add(item, obj);
                            }

                            //  Photo Gallery
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentPhotoGallery.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.PhotoGallery));

                                Data.Add(item, obj);
                            }

                            // Departmental Photo Gallery
                            else if (item.Equals(DdlKeys.ddlDepartmentPhotoGallery.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.PhotoGallery));

                                Data.Add(item, obj);
                            }



                            //  Employment
                            else if (item.Equals(DdlKeys.ddlAdminDepartmentEmployment.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementAdminDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Employment));

                                Data.Add(item, obj);
                            }

                            // Employment
                            else if (item.Equals(DdlKeys.ddlDepartmentEmployment.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.Employment));

                                Data.Add(item, obj);
                            }


                            //Scheme Type
                            else if (item.Equals(DdlKeys.ddlSchemeType.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeType();
                                Data.Add(item, obj);
                            }
                            // GetDepartment list for cmis report
                            else if (item.Equals(DdlKeys.ddlDepartmentForCMISReport.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentForCMISReport();
                                Data.Add(item, obj);
                            }

                            // Budget Year list for cmis 
                            else if (item.Equals(DdlKeys.ddlCMISBudgetYear.ToString()))
                            {
                                List<SelectListItem> obj = GetCMISBudgetYear();
                                Data.Add(item, obj);
                            }

                            // GetDepartment list behalf of department category
                            else if (item.Equals(DdlKeys.ddlDepartmentListByCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentForCategoryOne();
                                Data.Add(item, obj);
                            }
                            //Beneficiary Category
                            else if (item.Equals(DdlKeys.ddlBeneficiaryCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetBeneficiaryCagegory();
                                Data.Add(item, obj);
                            }
                            //Scheme Output
                            else if (item.Equals(DdlKeys.ddlSchemeOutput.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeOutput();
                                Data.Add(item, obj);
                            }
                            //Mode of Payment
                            else if (item.Equals(DdlKeys.ddlModeofPayment.ToString()))
                            {
                                List<SelectListItem> obj = GetModeofPayment();
                                Data.Add(item, obj);
                            }
                            //Payment Through
                            else if (item.Equals(DdlKeys.ddPaymentThrough.ToString()))
                            {
                                List<SelectListItem> obj = GetPaymentThrough();
                                Data.Add(item, obj);
                            }
                            //Payment Disbursement Mode
                            else if (item.Equals(DdlKeys.ddlPaymentDisbursementMode.ToString()))
                            {
                                List<SelectListItem> obj = GetPaymentDisbursementMode();
                                Data.Add(item, obj);
                            }
                            //Mode Of Delivery
                            else if (item.Equals(DdlKeys.ddlModeOfDelivery.ToString()))
                            {
                                List<SelectListItem> obj = GetModeOfDeliveryMaster();
                                Data.Add(item, obj);
                            }
                            //Scheme Area
                            else if (item.Equals(DdlKeys.ddlSchemeArea.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeAreaMaster();
                                Data.Add(item, obj);
                            }
                            //District
                            else if (item.Equals(DdlKeys.ddlDistrict.ToString()))
                            {
                                List<SelectListItem> obj = GetDistrictList(string.Empty, userType, userId);
                                Data.Add(item, obj);
                            }
                            //Sector
                            else if (item.Equals(DdlKeys.ddlSector.ToString()))
                            {
                                List<SelectListItem> obj = getSectorList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlImpCategory.ToString()))
                            {
                                List<SelectListItem> obj = getImpCategoryList();
                                Data.Add(item, obj);
                            }
                            // get project status
                            else if (item.Equals(DdlKeys.ddlProjectStatus.ToString()))
                            {
                                List<SelectListItem> obj = getProjectStatus();
                                Data.Add(item, obj);
                            }
                            // get project status for jankalyan home 
                            else if (item.Equals(DdlKeys.ddlProjectStatusForJankalyanHome.ToString()))
                            {
                                List<SelectListItem> obj = getProjectStatusForJanklayanHome();
                                Data.Add(item, obj);
                            }
                            // get project created by user list
                            else if (item.Equals(DdlKeys.ddlCreatedByUserForProject.ToString()))
                            {
                                List<SelectListItem> obj = GetCreatedByUserForProject();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlModifiedByUserForDepartmentSubMenu.ToString()))
                            {
                                List<SelectListItem> obj = GetModifiedByUserForDepartmentSubMenu();
                                Data.Add(item, obj);
                            }
                            // get project program
                            else if (item.Equals(DdlKeys.ddlProjectProgram.ToString()))
                            {
                                List<SelectListItem> obj = getProjectProgram();
                                Data.Add(item, obj);
                            }
                            // get project year of initiation
                            else if (item.Equals(DdlKeys.ddlProjectYearOfInitiation.ToString()))
                            {
                                List<SelectListItem> obj = getProjectYearofInitiation();
                                Data.Add(item, obj);
                            }
                            // get Comparative parameter Year or Grand Total
                            else if (item.Equals(DdlKeys.ddlComparativeYearGrandTotal.ToString()))
                            {
                                List<SelectListItem> obj = GetComparativeYearGrandTotal();
                                Data.Add(item, obj);
                            }
                            // get CMO Officers
                            else if (item.Equals(DdlKeys.ddlCMOOfficers.ToString()))
                            {
                                List<SelectListItem> obj = getCMOOfficers();
                                Data.Add(item, obj);
                            }
                            // get tDepartment Contact Category
                            else if (item.Equals(DdlKeys.ddlDepartmentContactCategory.ToString()))
                            {
                                List<SelectListItem> obj = getDepartmentContactCategory();
                                Data.Add(item, obj);
                            }
                            // get VC catgory
                            else if (item.Equals(DdlKeys.ddlVCCategory.ToString()))
                            {
                                List<SelectListItem> obj = getVCCategory();
                                Data.Add(item, obj);
                            }

                            // Get MLA Constituency With Designation
                            else if (item.Equals(DdlKeys.ddlMLAConstituencyWithDesignation.ToString()))
                            {
                                List<SelectListItem> obj = GetMLAConstituencyWithDesignation();
                                Data.Add(item, obj);
                            }
                            // get Project Work Category
                            else if (item.Equals(DdlKeys.ddlProjectWorkCategory.ToString()))
                            {
                                List<SelectListItem> obj = getProjectWorkCategory();
                                Data.Add(item, obj);
                            }
                            // get  project category
                            else if (item.Equals(DdlKeys.ddlProjectCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetProjectCategory();
                                Data.Add(item, obj);
                            }
                            // get  project sub category
                            else if (item.Equals(DdlKeys.ddlProjectSubCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetProjectSubCategory();
                                Data.Add(item, obj);
                            }
                            // get  project sub sub category
                            else if (item.Equals(DdlKeys.ddlProjectSubSubCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetProjectSubSubCategory();
                                Data.Add(item, obj);
                            }
                            // get Project Program Scheme Type
                            else if (item.Equals(DdlKeys.ddlProjectProgramSchemeType.ToString()))
                            {
                                List<SelectListItem> obj = getProjectProgramSchemeType();
                                Data.Add(item, obj);
                            }
                            // Get Child Page Description Category
                            else if (item.Equals(DdlKeys.ddlChildPageDescriptionCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetChildPageDescriptionCategory();
                                Data.Add(item, obj);
                            }
                            // Get Page Master Details
                            else if (item.Equals(DdlKeys.ddlPageMasterDetails.ToString()))
                            {
                                List<SelectListItem> obj = GetPageMasterDetails();
                                Data.Add(item, obj);
                            }
                            // Get Page Master Details
                            else if (item.Equals(DdlKeys.ddlPageMasterforCMISCompliance.ToString()))
                            {
                                List<SelectListItem> obj = GetPageMasterforCMISCompliance();
                                Data.Add(item, obj);
                            }
                            //Order Sector
                            else if (item.Equals(DdlKeys.ddlOrderSector.ToString()))
                            {
                                List<SelectListItem> obj = GetSectorMasterList();
                                Data.Add(item, obj);
                            }
                            //Order Type
                            else if (item.Equals(DdlKeys.ddlOrderType.ToString()))
                            {
                                List<SelectListItem> obj = GetOrderTypeList();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlFrontOrderType.ToString()))
                            {
                                List<SelectListItem> obj = GetFrontExistingOrderTypeList();
                                Data.Add(item, obj);
                            }




                            //Generate Order Type
                            else if (item.Equals(DdlKeys.ddlGenerateOrderType.ToString()))
                            {
                                List<SelectListItem> obj = GetGenerateOrderType();
                                Data.Add(item, obj);
                            }
                            //Order Issue By
                            else if (item.Equals(DdlKeys.ddlOrderIssueBy.ToString()))
                            {
                                List<SelectListItem> obj = GetOrderIssueByList();
                                Data.Add(item, obj);
                            }
                            //Order Module Name
                            else if (item.Equals(DdlKeys.ddlOrderModuleName.ToString()))
                            {
                                List<SelectListItem> obj = GetOrderModuleNameList();
                                Data.Add(item, obj);
                            }
                            //Order Related To Year
                            else if (item.Equals(DdlKeys.ddlOrderRelatedToYear.ToString()))
                            {
                                List<RowYearandDepartment> obj = GetOrderRelatedToYearList();
                                Data.Add(item, obj);
                            }
                            //Order Related To Department
                            else if (item.Equals(DdlKeys.ddlOrderRelatedToDepartment.ToString()))
                            {
                                List<RowYearandDepartment> obj = GetOrderRelatedToDepartmentList();
                                Data.Add(item, obj);
                            }
                            //Lookup Type
                            else if (item.Equals(DdlKeys.ddlLookUpType.ToString()))
                            {
                                List<SelectListItem> obj = GetLookUpType();
                                Data.Add(item, obj);
                            }
                            //Scheme
                            else if (item.Equals(DdlKeys.ddlSchemeMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeMaster();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemefaqMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeFaqMaster();
                                Data.Add(item, obj);
                            }

                            //Advertisement Category
                            else if (item.Equals(DdlKeys.ddlAdvCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetAdvCategoryMaster();
                                Data.Add(item, obj);
                            }
                            //Advertisement SubCategory
                            else if (item.Equals(DdlKeys.ddlAdvSubCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetAdvSubCategoryMaster();
                                Data.Add(item, obj);
                            }
                            //User Type
                            else if (item.Equals(DdlKeys.ddlUserType.ToString()))
                            {
                                List<SelectListItem> obj = GetUserType(userType);
                                Data.Add(item, obj);
                            }
                            //Title
                            else if (item.Equals(DdlKeys.ddlTitle.ToString()))
                            {
                                List<SelectListItem> obj = GetTitle();
                                Data.Add(item, obj);
                            }
                            //Title
                            else if (item.Equals(DdlKeys.ddlNameTitle.ToString()))
                            {
                                List<SelectListItem> obj = GetNameTitle();
                                Data.Add(item, obj);
                            }
                            //Designation
                            else if (item.Equals(DdlKeys.ddlDesignation.ToString()))
                            {
                                List<SelectListItem> obj = GetDesignation();
                                Data.Add(item, obj);
                            }
                            //Designation
                            else if (item.Equals(DdlKeys.ddlDesignationForPressRelease.ToString()))
                            {
                                List<SelectListItem> obj = GetDesignationForPressRelease();
                                Data.Add(item, obj);
                            }
                            //User Group
                            else if (item.Equals(DdlKeys.ddlUserGroup.ToString()))
                            {
                                List<SelectListItem> obj = GetUserGroup();
                                Data.Add(item, obj);
                            }
                            //Admin Department
                            else if (item.Equals(DdlKeys.ddlAdminDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetAdminDepartment();
                                Data.Add(item, obj);
                            }
                            //Admin Department
                            else if (item.Equals(DdlKeys.ddlDistrict.ToString()))
                            {
                                List<SelectListItem> obj = GetDistrict();
                                Data.Add(item, obj);
                            }
                            //Division
                            else if (item.Equals(DdlKeys.ddlDivision.ToString()))
                            {
                                List<SelectListItem> obj = GetDivision(userType, userId);
                                Data.Add(item, obj);
                            }
                            //ParliamentConstituency
                            else if (item.Equals(DdlKeys.ddlParliamentConstituency.ToString()))
                            {
                                List<SelectListItem> obj = GetParliamentConstituency();
                                Data.Add(item, obj);
                            }
                            //AssemblyConstituency
                            else if (item.Equals(DdlKeys.ddlAssemblyConstituency.ToString()))
                            {
                                List<SelectListItem> obj = GetAssemblyConstituency(string.Empty);
                                Data.Add(item, obj);
                            }
                            //Block
                            else if (item.Equals(DdlKeys.ddlBlock.ToString()))
                            {
                                List<SelectListItem> obj = GetBlock(string.Empty, userType, userId);
                                Data.Add(item, obj);
                            }
                            //Tehsil
                            else if (item.Equals(DdlKeys.ddlTehsil.ToString()))
                            {
                                List<SelectListItem> obj = GetTehsil(string.Empty, userType, userId);
                                Data.Add(item, obj);
                            }
                            //Gender
                            else if (item.Equals(DdlKeys.ddlGender.ToString()))
                            {
                                List<SelectListItem> obj = GetGender();
                                Data.Add(item, obj);
                            }
                            //User
                            else if (item.Equals(DdlKeys.ddlUser.ToString()))
                            {
                                List<SelectListItem> obj = GetUsers("");
                                Data.Add(item, obj);
                            }
                            //Application Type
                            else if (item.Equals(DdlKeys.ddlApplicationType.ToString()))
                            {
                                List<SelectListItem> obj = GetApplicationType();
                                Data.Add(item, obj);
                            }
                            //Page Type
                            else if (item.Equals(DdlKeys.ddlPageType.ToString()))
                            {
                                List<SelectListItem> obj = GetPageType();
                                Data.Add(item, obj);
                            }
                            //Application Menu
                            else if (item.Equals(DdlKeys.ddlApplicationMenu.ToString()))
                            {
                                List<SelectListItem> obj = GetApplicationMenu("");
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlAdvertisementNotification.ToString()))
                            {
                                List<SelectListItem> obj = GetAdvNotificationType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlPlatformMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetAdvPlatformType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCommonMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeCommonType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeServiceType.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeTypeDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeServiceProgramArea.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeProgramAreaDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeEligibility.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeEligibilityDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeListOfRequiredDoc.ToString()))
                            {
                                List<SelectListItem> obj = GetListOfRequiredDocDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemePayFees.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemePayFeeDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeModeOfDisbursement.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeModeOfDisbursementDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemePaymentDisbursementFrequency.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemePaymentDisbursementFrequencyDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeModeOfDelivery.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeModeOfDeliveryDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeListOfOtherDoc.ToString()))
                            {

                                List<SelectListItem> obj = GetSchemeListOfOtherDocDDL();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemeNameOfDocument.ToString()))
                            {

                                List<SelectListItem> obj = GetSchemeNameOfDocument();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioSchemeOwnedBy.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeOwnedBy();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioRGDPSAct.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeRGDPSAct();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioSchemeService.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeServiceRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioDepartmentDistrict.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentDistrictonMasterRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioLinkedToScheme.ToString()))
                            {
                                List<SelectListItem> obj = LinkedtoScheme();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioApplyForScheme.ToString()))
                            {
                                List<SelectListItem> obj = GetApplyForScheme();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioSchemeExpriedOn.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeExpriedOn();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioSchemeModeofApplying.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeModeofApplying();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioServiceFee.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeServiceFee();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioPaymentDisbursementFrequency.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemePaymentDisbursementFrequency();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioListOfRequiredDoc.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeListOfRequiredDoc();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioMadeOfApplingOnlineAndBoth.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeMadeOfApplingOnlineAndBoth();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlMonitoringParameters.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeMonitoringParameters();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioIsPushOrIsPull.ToString()))
                            {
                                List<SelectListItem> obj = GetAdvertisementIsPushOrPull();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlOffice.ToString()))
                            {
                                List<SelectListItem> obj = GetOffice();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlNotificationTemplateType.ToString()))
                            {
                                List<SelectListItem> obj = GetNotificationTemplateType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlReferencee.ToString()))
                            {
                                List<SelectListItem> obj = GetReferencee();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlLMS_LetterAction.ToString()))
                            {
                                List<SelectListItem> obj = GetLMS_LetterAction();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlVIPLMS_LetterAction.ToString()))
                            {
                                List<SelectListItem> obj = GetVIPLMS_LetterAction();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlURLType.ToString()))
                            {
                                List<SelectListItem> obj = GetURLType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlHelpDocType.ToString()))
                            {
                                List<SelectListItem> obj = GetHelpDocType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlHelpDocTypeOnWebServiceMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetHelpDocTypeOnWebServiceMaster();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlSchemeName.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeName();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlTableName.ToString()))
                            {
                                List<SelectListItem> obj = GetMappingTableNameList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlMonitoringParameterLookUpType.ToString()))
                            {
                                List<SelectListItem> obj = GetMonitoringParameterLookUpType();
                                Data.Add(item, obj);
                            }
                            //GetUserByAdminDepartment
                            else if (item.Equals(DdlKeys.ddlUserByAdminDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetUserByAdminDepartmentType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSchemePageType.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemePageType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioSchemeType.ToString()))
                            {
                                List<SelectListItem> obj = GetSchemeTypeRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioOfficeType.ToString()))
                            {
                                List<SelectListItem> obj = GetOfficeTypeRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioVcLocationType.ToString()))
                            {
                                List<SelectListItem> obj = GetVcLocationTypeRadio();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlAuthoritySignatory.ToString()))
                            {
                                List<DepartmentAuthoritySignatoryModel> obj = GetAuthoritySignatory();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCCReference.ToString()))
                            {
                                List<DepartmentReferenceModel> obj = GetReference();
                                Data.Add(item, obj);
                            }
                            //Citizen Letter Attachment
                            else if (item.Equals(DdlKeys.ddlCitizenLetterAttachment.ToString()))
                            {
                                List<SelectListItem> obj = GetCitizenLetterAttachment();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlContactPersonType.ToString()))
                            {
                                List<SelectListItem> obj = GetContactPersonType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlAchievementCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementCategory(Convert.ToInt32(userType));
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlAchievementSubCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(0);
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlImportantDecisionSubCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetImportantDecisionSubCategoryByCategoryCode(0);
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddluserlist.ToString()))
                            {
                                List<SelectListItem> obj = Getddluserlist(0);
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlOrderSubType.ToString()))
                            {
                                List<SelectListItem> obj = GetOrderSubType();
                                Data.Add(item, obj);
                            }

                            // Gallery File Upload Types
                            else if (item.Equals(DdlKeys.ddlGalleryUploadType.ToString()))
                            {
                                List<SelectListItem> obj = GetGalleryUploadType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlManualType.ToString()))
                            {
                                List<SelectListItem> obj = GetManualType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCancellationReason.ToString()))
                            {
                                List<SelectListItem> obj = GetCancellationReason();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCreateVCList.ToString()))
                            {
                                List<VCCreationDDLModel> obj = GetVCCreation();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlVCParticipantCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetVCParticipantCategory();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlVCMode.ToString()))
                            {
                                List<SelectListItem> obj = GetVCMode();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlVCType.ToString()))
                            {
                                List<SelectListItem> obj = GetVCType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCurrentDateVC.ToString()))
                            {
                                List<VCCreationDDLModel> obj = GetCurrentDateVC();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlClientModule.ToString()))
                            {
                                List<SelectListItem> obj = GetModuleForClient();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlAchievementDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetAchievementDepartment(CategoryCode: Convert.ToInt32(AchievementCategoryEnum.DepartmentalAchievements));
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlEntryTypeModule.ToString()))
                            {
                                List<SelectListItem> obj = GetEntryType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlPriorityModule.ToString()))
                            {
                                List<SelectListItem> obj = GetPriorityType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlModuleName.ToString()))
                            {
                                List<SelectListItem> obj = GetModuleType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCompliantAction.ToString()))
                            {
                                List<SelectListItem> obj = GetCompliantActionModule();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCompliantFilter.ToString()))
                            {
                                List<SelectListItem> obj = GetCompliantFilterModule();
                                Data.Add(item, obj);
                            } //Order With Required Type
                            else if (item.Equals(DdlKeys.OrderWithRequiredType.ToString()))
                            {
                                List<OrderTypeMasterModel> obj = GetOrderTypeWithRequiredDataList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlEntryTypeMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetEntryTypeMaster();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlDptContactDesignation.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentContactDesignationMaster();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlSSOId.ToString()))
                            {
                                List<SelectListItem> obj = GetSSOIdList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlDepartmentCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentCategory();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCMISModule.ToString()))
                            {
                                List<SelectListItem> obj = GetCMISModule();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioProjectsUrbanorRural.ToString()))
                            {
                                List<SelectListItem> obj = GetProjectsUrbanorRural();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlMLAConstituency.ToString()))
                            {
                                List<SelectListItem> obj = GetMLAConstituency();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlMLAConstituencyWithDistrictName.ToString()))
                            {
                                List<SelectListItem> obj = GetMLAConstituencyWithDistrictName();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlMPConstituency.ToString()))
                            {
                                List<SelectListItem> obj = GetMPConstituency();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlProjectMileStone.ToString()))
                            {
                                List<SelectListItem> obj = GetProjectMileStone();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlProjectMileStoneStatus.ToString()))
                            {
                                List<SelectListItem> obj = GetProjectMileStoneStatus();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlCMISAchievementAdmDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetCMISAchievementAdmDepartment();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCMISAchievementDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetCMISAchievementDepartment();
                                Data.Add(item, obj);
                            }
                            // Newspaper News Mode
                            else if (item.Equals(DdlKeys.ddlNewspaperNewsMode.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperNewsMode();
                                Data.Add(item, obj);
                            }
                            // Newspaper News Type
                            else if (item.Equals(DdlKeys.ddlNewspaperNewsType.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperNewsType();
                                Data.Add(item, obj);
                            }
                            // Newspaper Source Type
                            else if (item.Equals(DdlKeys.ddlNewspaperSourceType.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperSourceType();
                                Data.Add(item, obj);
                            }
                            // Newspaper Subject
                            else if (item.Equals(DdlKeys.ddlNewspaperSubject.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperSubject();
                                Data.Add(item, obj);
                            }
                            // Newspaper Master
                            else if (item.Equals(DdlKeys.ddlNewspaperMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperMaster();
                                Data.Add(item, obj);
                            }
                            // Newspaper Classification Master
                            else if (item.Equals(DdlKeys.ddlNewspaperClassification.ToString()))
                            {
                                List<SelectListItem> obj = GetClassificationMaster();
                                Data.Add(item, obj);
                            }
                            // Newspaper Publication Type
                            else if (item.Equals(DdlKeys.ddlNewspaperPublicationType.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperPublicationType();
                                Data.Add(item, obj);
                            }
                            // Newspaper Publication Type
                            else if (item.Equals(DdlKeys.ddlNewspaperPublicationType.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperPublicationType();
                                Data.Add(item, obj);
                            }
                            // Newspaper Edition
                            else if (item.Equals(DdlKeys.ddlNewspaperEdition.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperEdition();
                                Data.Add(item, obj);
                            }
                            // Newspaper Page Number
                            else if (item.Equals(DdlKeys.ddlNewspaperPageNumber.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperPageNumber();
                                Data.Add(item, obj);
                            }
                            // Newspaper Progress News Type
                            else if (item.Equals(DdlKeys.ddlNewspaperProgressNewsType.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperProgressNewsType();
                                Data.Add(item, obj);
                            }
                            // Newspaper Coverage Type
                            else if (item.Equals(DdlKeys.ddlNewspaperCoverageType.ToString()))
                            {
                                List<SelectListItem> obj = GetNewspaperCoverageType();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectAdmDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectAdmDepartment();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectDepartment();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingProjectWorkType.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectWorkType();
                                Data.Add(item, obj);

                            }
                            else if (item.Equals(DdlKeys.ddlExistingProjectCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectCategory();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectSubCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectSubCategory();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingProjectSchemeProgram.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectSchemeProgram();
                                Data.Add(item, obj);
                            }



                            else if (item.Equals(DdlKeys.ddlExistingProjectMLAConstituency.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectMLAConstituency();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectMPConstituency.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectMPConstituency();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectStatus.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectStatus();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingProjectSector.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectSector();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectStartYear.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectStartYear();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingProjectMLADistrict.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingProjectDistrit();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingNewsAdmDepartment.ToString()))
                            {

                                List<SelectListItem> obj = GetExistingNewsAdminDepartment();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingNewsDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingNewsDepartment();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingNewsSubject.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingNewsSubject();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingNewsPaper.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingNewsPaper();
                                Data.Add(item, obj);
                            }

                            else if (item.Equals(DdlKeys.ddlExistingNewsPublicationType.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingNewsPublicationType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlExistingNewsCoverageType.ToString()))
                            {
                                List<SelectListItem> obj = GetExistingNewsCoverageType();
                                Data.Add(item, obj);
                            } // get  CMIS Module For Report
                            else if (item.Equals(DdlKeys.ddlCMISReportModules.ToString()))
                            {
                                List<SelectListItem> obj = GetCMISReportModules();
                                Data.Add(item, obj);
                            }
                            //KPI Category
                            else if (item.Equals(DdlKeys.ddlKPICategory.ToString()))
                            {
                                List<SelectListItem> obj = GetKPICategoryList();
                                Data.Add(item, obj);
                            }
                            //Physical Unit
                            else if (item.Equals(DdlKeys.ddlPhysicalUnit.ToString()))
                            {
                                List<SelectListItem> obj = GetPhysicalUnitList();
                                Data.Add(item, obj);
                            }
                            //Month dropdown
                            else if (item.Equals(DdlKeys.ddlMonth.ToString()))
                            {
                                List<SelectListItem> obj = GetMonthList();
                                Data.Add(item, obj);
                            }
                            //financial Unit
                            else if (item.Equals(DdlKeys.ddlFinancialUnit.ToString()))
                            {
                                List<SelectListItem> obj = GetFinancialUnitList();
                                Data.Add(item, obj);
                            }
                            //financial year master
                            else if (item.Equals(DdlKeys.ddlYearMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetYearMasterList();
                                Data.Add(item, obj);
                            }
                            //Radio button for Ebooklet category 
                            else if (item.Equals(RadioButtonKeys.RadioDepartmentCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentCategoryRadio();
                                Data.Add(item, obj);
                            }
                            //Comparative Parameter Category
                            else if (item.Equals(DdlKeys.ddlComparativeParameterCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetComparativeParameterCategory();
                                Data.Add(item, obj);
                            }
                            //get department for  district kpi 
                            else if (item.Equals(DdlKeys.ddlDepartmentForDistrictKPIList.ToString()))
                            {
                                List<SelectListItem> obj = GetDistrictKPIList();
                                Data.Add(item, obj);
                            } //Department for Departmental progress
                            else if (item.Equals(DdlKeys.ddlDepartmentForDepartmentalProgressList.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentalProgressList();
                                Data.Add(item, obj);
                            }
                            //This condition for get menu classification type radio button from lookup
                            else if (item.Equals(RadioButtonKeys.RadioMenuClassificationType.ToString()))
                            {
                                List<SelectListItem> obj = GetMenuClassificationType();
                                Data.Add(item, obj);
                            }

                            //This condition for get menu classification type radio button from lookup
                            else if (item.Equals(DdlKeys.ddlAdvertisementPopUpCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetAdvertisementPopUpCategory();
                                Data.Add(item, obj);
                            }
                            //comparative Target based radio button from lookup
                            else if (item.Equals(RadioButtonKeys.RadioParameterTargetBased.ToString()))
                            {
                                List<SelectListItem> obj = GetComparativeTargetBased();
                                Data.Add(item, obj);
                            }
                            //This method for menu classification  page type
                            else if (item.Equals(DdlKeys.ddlClassificationPageType.ToString()))
                            {
                                List<SelectListItem> obj = GetMenuClassificationPageTypeList();
                                Data.Add(item, obj);
                            }
                            //This method for menu classification 
                            else if (item.Equals(DdlKeys.ddlClassification.ToString()))
                            {
                                List<SelectListItem> obj = GetMenuClassificationList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlModuleCategoryList.ToString()))
                            {
                                List<SelectListItem> obj = GetModuleCategoryList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlDepartmentSubMenuList.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentSubMenuList();
                                Data.Add(item, obj);
                            }
                            //This method for get state minsiter 
                            else if (item.Equals(DdlKeys.ddlStateMinister.ToString()))
                            {
                                List<SelectListItem> obj = GetStateMinisterList();
                                Data.Add(item, obj);
                            }

                            //This method for get cabinet minsiter 
                            else if (item.Equals(DdlKeys.ddlCabinetMinister.ToString()))
                            {
                                List<SelectListItem> obj = GetCabinetMinisterList();
                                Data.Add(item, obj);
                            }

                            //this method for department and district radio button
                            else if (item.Equals(RadioButtonKeys.RadioDepartmentDistrictbutton.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentDistrictButtonList();
                                Data.Add(item, obj);
                            }
                            //this condition for creating state and district level radio button
                            else if (item.Equals(RadioButtonKeys.RadioStateDistrict.ToString()))
                            {
                                List<SelectListItem> obj = GetStateAndDistrictLevelRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioDepartmentSubMenuShowAsSeparate.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentSubMenuShowAsSeparateRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(RadioButtonKeys.RadioDepartmentSubMenuRedirectionManagement.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentSubMenuRedirectionManagementRadio();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlCommonCategoryLookup.ToString()))
                            {
                                List<SelectListItem> obj = GetCommonCategoryLookUpList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlPressReleaseLookupCategory.ToString()))
                            {
                                List<SelectListItem> obj = GetPressReleaseLookUpCategoryList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlPressReleaseDepartment.ToString()))
                            {
                                List<SelectListItem> obj = GetPressReleaseDepartmentList();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlHospitalType.ToString()))
                            {
                                List<SelectListItem> obj = GetHospitalType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlEmpanelmentType.ToString()))
                            {
                                List<SelectListItem> obj = GetHospitalEmpanelmentType();
                                Data.Add(item, obj);
                            }
                            else if (item.Equals(DdlKeys.ddlDepartmentSectionMaster.ToString()))
                            {
                                List<SelectListItem> obj = GetDepartmentSectionMasterList();
                                Data.Add(item, obj);
                            }
                            // get Department menu modified by user list
                            else if (item.Equals(DdlKeys.ddlCreatedByDepartmentMenu.ToString()))
                            {
                                List<SelectListItem> obj = GetCreatedByDepartmentmenu();
                                Data.Add(item, obj);
                            }
                            // get Department section Mapping modified by user list
                            else if (item.Equals(DdlKeys.ddlModifiedByUserForDepartmentSectionMapping.ToString()))
                            {
                                List<SelectListItem> obj = GetModifiedByDepartmentSectionMapping();
                                Data.Add(item, obj);
                            }
                            // get press release list modified by user list
                            else if (item.Equals(DdlKeys.ddlModifiedBypressRelease.ToString()))
                            {
                                List<SelectListItem> obj = GetModifiedByPressRelease();
                                Data.Add(item, obj);
                            }
                        }


                    }
                }
                objReturn.Data = Data;
                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.InvalidData;
                return objReturn;
            }
        }

        public ServiceResponse<IDictionary<string, object>> GetFilterdDDl(List<FilterdDDlModel> model = null, string userType = "", int userId = 0)
        {
            ServiceResponse<IDictionary<string, object>> objReturn = new ServiceResponse<IDictionary<string, object>>();
            IDictionary<string, object> Data = new Dictionary<string, object>();
            try
            {
                foreach (var item in model)
                {
                    if (item.FilterFor.Equals(DdlKeys.ddlDepartment.ToString()))
                    {
                        List<SelectListItem> obj = GetDepartmentList(item.Value, userType, userId);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetDistrictList(item.Value, userType, userId);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlBlock.ToString()))
                    {
                        List<SelectListItem> obj = GetBlock(item.Value, userType, userId);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlTehsil.ToString()))
                    {
                        List<SelectListItem> obj = GetTehsil(item.Value, userType, userId);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlAssemblyConstituency.ToString()))
                    {
                        List<SelectListItem> obj = GetAssemblyConstituency(item.Value);
                        Data.Add(item.FilterFor, obj);
                    }
                    //else if (item.FilterFor.Equals(DdlKeys.ddlService.ToString()))
                    //    {
                    //    List<SelectListItem> obj = GetServiceList(item.Value);
                    //    Data.Add(item.FilterFor, obj);
                    //    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlScheme.ToString()))
                    {
                        List<SelectListItem> obj = GetSchemeList(item.Value);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlApplicationMenu.ToString()))
                    {
                        List<SelectListItem> obj = GetApplicationMenu(item.Value);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlAchievementCategory.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementCategoryByDeptuser(userType);
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlAchievementSubCategory.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementSubCategoryByCategoryCode(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlOrderSubType.ToString()))
                    {
                        List<SelectListItem> obj = GetOrderSubType(Convert.ToInt64(item.Value));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlAchievementDepartment.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.DepartmentalAchievements));
                        Data.Add(item.FilterFor, obj);


                    }

                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentAchievement.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.DepartmentalAchievements));
                        Data.Add(item.FilterFor, obj);


                    }

                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentAward.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.Awards));
                        Data.Add(item.FilterFor, obj);


                    }

                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentImportantDecision.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.ImportantDecisions));
                        Data.Add(item.FilterFor, obj);


                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentCMSpeech.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.CMSpeech));
                        Data.Add(item.FilterFor, obj);


                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentWebsite.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.Website));
                        Data.Add(item.FilterFor, obj);


                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentServicesOfferedbyDepartment.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.ServicesOfferedbyDepartment));
                        Data.Add(item.FilterFor, obj);
                    }

                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentMobileApplication.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.MobileApplication));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentProgramVideo.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.ProgramVideo));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentLetterstoCentralGovt.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.LetterstoCentralGovt));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentDepartmentalPhotoGallery.ToString()))
                    {
                        List<SelectListItem> obj = GetAchievementDepartment(Convert.ToInt64(item.Value), Convert.ToInt32(AchievementCategoryEnum.DepartmentalPhotoGallery));
                        Data.Add(item.FilterFor, obj);
                    }


                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentOrder.ToString()))
                    {
                        List<SelectListItem> obj = GetOrderDepartment(Convert.ToInt64(item.Value));
                        Data.Add(item.FilterFor, obj);

                    }


                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentScheme.ToString()))
                    {
                        List<SelectListItem> obj = GetSchemeDepartment(Convert.ToInt64(item.Value));
                        Data.Add(item.FilterFor, obj);

                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectSubCategory.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectSubCategory(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);

                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectSubCategoryForDptDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectSubCategoryForDptDistrict(item.Value, Convert.ToInt32(userType));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectSchemeProgramForDptDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectSchemeProgramForDptDistrict(item.Value, Convert.ToInt32(userType));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectCategoryForDptDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectCategoryForDptDistrict(item.Value, Convert.ToInt32(userType));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectWorkTypeForDptDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectWorkTypeForDptDistrict(item.Value, Convert.ToInt32(userType));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectAssemblyConstituencyForDptDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectAssemblyConstituencyForDptDistrict(item.Value, Convert.ToInt32(userType));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectYearsForDptDistrict.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectYearsForDptDistrict(item.Value, Convert.ToInt32(userType));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectMLAConstituency.ToString()))
                    {

                        List<SelectListItem> obj = GetExistingProjectMLAConstituency(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);

                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingNewsDepartment.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingNewsDepartment(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectDepartment.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectDepartment(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlExistingProjectWorkType.ToString()))
                    {
                        List<SelectListItem> obj = GetExistingProjectWorkType(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);

                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlDepartmentListByCategory.ToString()))
                    {
                        List<SelectListItem> obj = GetDepartmentForCategoryOne(Convert.ToInt32(item.Value));
                        Data.Add(item.FilterFor, obj);
                    }
                    else if (item.FilterFor.Equals(DdlKeys.ddlCMISAchievementDepartment.ToString()))
                    {
                        List<SelectListItem> obj = GetCMISAchievementDepartment(Convert.ToInt64(item.Value));
                        Data.Add(item.FilterFor, obj);
                    }

                }
                objReturn.Data = Data;
                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                return objReturn;

            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.InvalidData;
                return objReturn;
            }

        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> Getsubcategory(int departmentCode, int categoryCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                if (categoryCode > 0 && departmentCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && (x.IsApplicableToAllDPT == true ? true : x.DepartmentCode == departmentCode) && x.CategoryCode == categoryCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();

                }
                else if (categoryCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && (x.IsApplicableToAllDPT == true ? true : false) && x.CategoryCode == categoryCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Title.ToString(), Value = Convert.ToString(x.SubCategoryCode) }).ToList();
                }

                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> Getcategorybydepartmentcode(int departmentCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                if (_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue() || _loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue())
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Title.ToString(), Value = Convert.ToString(x.CategoryCode) }).ToList();


                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();
                    if (objUserType != null && (objUserType.ParrentUserType == UserTypeEnum.SADM.GetStringValue() || objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue()))
                    {
                        result.Data = _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Title.ToString(), Value = Convert.ToString(x.CategoryCode) }).ToList();
                    }
                    else if (departmentCode > 0)
                    {
                        result.Data = _uow.GenericRepository<vw_AchievementCategorylist>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.DepartmentCode == departmentCode, orderBy: o => o.OrderBy(x => x.Title)).ToList().GroupBy(y => y.CategoryCode).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().CategoryCode.ToString(), Text = x.FirstOrDefault().Title }).ToList();
                    }
                    //else
                    //{
                    //    result.Data = _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Title.ToString(), Value = Convert.ToString(x.CategoryCode) }).ToList();
                    //}


                }


                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetJankalyanCategorybyDepartmentAndLoginUser(int departmentCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    result.Data = _uow.GenericRepository<vw_JAN_CategoryMasterList>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.IsPressRelease == false && (departmentCode == 0 || x.DepartmentCode == departmentCode), orderBy: o => o.OrderBy(x => x.Name)).ToList().GroupBy(y => y.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();

                    if (objUserType != null && (objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue() || objUserType.ParrentUserType == UserTypeEnum.SADM.GetStringValue()))
                    {
                        result.Data = _uow.GenericRepository<vw_JAN_CategoryMasterList>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.IsPressRelease == false && (departmentCode == 0 || x.DepartmentCode == departmentCode), orderBy: o => o.OrderBy(x => x.Name)).ToList().GroupBy(y => y.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();

                        //result.Data = _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && f.IsPressRelease == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                    }
                    else
                    {
                        result.Data = _uow.GenericRepository<vw_JAN_CategoryMasterList>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.IsPressRelease == false && x.DepartmentCode == departmentCode, orderBy: o => o.OrderBy(x => x.Name)).ToList().GroupBy(y => y.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                    }
                }

                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetJankalyanCategorybyDepartmentCode(int departmentCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                if (departmentCode > 0)
                {
                    result.Data = _uow.GenericRepository<vw_JAN_CategoryMasterList>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.IsPressRelease == false && x.DepartmentCode == departmentCode, orderBy: o => o.OrderBy(x => x.Name)).ToList().GroupBy(y => y.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_CategoryMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && f.IsPressRelease == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                }

                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetJankalyanEntryTypebyDepartmentCode(string departmentCode, int catCode = 0)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {
                    result.Data = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (catCode == 0 || f.JankalyanCategoryCode == catCode), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();

                    if (objUserType != null && (objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue() || objUserType.ParrentUserType == UserTypeEnum.SADM.GetStringValue()))
                    {
                        result.Data = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (catCode == 0 || f.JankalyanCategoryCode == catCode), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                    }
                    else if (!string.IsNullOrEmpty(departmentCode))
                    {
                        List<int?> ids = JsonConvert.DeserializeObject<List<int?>>(departmentCode);
                        result.Data = _uow.GenericRepository<vw_JAN_EntryTypeMasterList>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && (catCode == 0 || x.JankalyanCategoryCode == catCode) && ids.Contains(x.DepartmentCode), orderBy: o => o.OrderBy(x => x.Name)).ToList().GroupBy(y => y.Code).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                    }
                    else
                    {
                        result.Data = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true && (catCode == 0 || f.JankalyanCategoryCode == catCode), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Name.ToString(), Value = Convert.ToString(x.Code) }).ToList();
                    }
                }

                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }


        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetImpdecsubcategory(int departmentCode, int categoryCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (categoryCode > 0 && departmentCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && (x.IsApplicableToAllDPT == true ? true : x.DepartmentCode == departmentCode) && x.CategoryCode == categoryCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();

                }
                else if (categoryCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && (x.IsApplicableToAllDPT == true ? true : false) && x.CategoryCode == categoryCode, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetAll(filter: f => f.IsDeleted == false && f.IsActive == true, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Text = x.Title.ToString(), Value = Convert.ToString(x.SubCategoryCode) }).ToList();
                }


                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch
            {
                return null;
            }
        }
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDistrictByOffice(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<vwCMO_DistrictByOffice>().GetAll(filter: f => f.OfficeCode == code, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                }
                //else
                //{
                //    result.Data = _uow.GenericRepository<vwCMO_DistrictByOffice>().GetAll(null, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                //}
                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDistrictByState(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: f => f.District_StateCode == code, orderBy: o => o.OrderBy(x => x.DistrictTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DistrictCode.ToString(), Text = x.DistrictTitle }).ToList();
                }

                return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetSubCategoryByCategoryCode(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetAll(filter: f => f.CategoryCode == code && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetGeneralSubCategory(int CategoryCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (CategoryCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: f => f.CategoryCode == CategoryCode && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Title)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SubCategoryCode.ToString(), Text = x.Title }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetSubSubCategoryBySubCategoryCode(int code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: f => (f.SubCategoryCode == code || f.IsApplicableToAll == true) && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDepartmentByCMOOfficerCode(long code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {
                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.CMOOfficerCode == code && f.DepartmentIsActive == true && f.DepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetKPIByDepartmentCode(int dptCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (dptCode > 0)
                {
                    tblDepartmentMaster Dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == dptCode).FirstOrDefault();
                    //*Todo Also add live department and district radio button id in enum.
                    if (Dept.DepartmentDistrictCode == Convert.ToInt32(DepartmentCategoryEnum.District) || Dept.DepartmentDistrictCode == Convert.ToInt32(DepartmentCategoryEnum.DistrictProduction))
                    {
                        result.Data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: f => (f.IsDistrict == true) && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                    }
                    else
                    {
                        result.Data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: f => (f.DepartmentCode == dptCode || f.IsAplicableToAllDpt == true) && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                        //result.Data = _uow.GenericRepository<tblCPT_KPICategoryMaster>().GetAll(filter: f =>  f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                    }
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        /// <summary>
        /// get parameter code list
        /// </summary>
        /// <param name="kpiCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetParameterCode(int kpiCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (kpiCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().GetAll(filter: f => (f.KPICategoryCode == kpiCode) && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.PhysicalParameter)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.PhysicalParameter }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblCPT_ComparativeParameterMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.PhysicalParameter)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.PhysicalParameter }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetEntryTypeByCategory(int catCode)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (catCode > 0)
                {
                    result.Data = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: f => f.JankalyanCategoryCode == catCode && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetCMISDepartmentByCMOOfficerCode(long code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();

                result.Data = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data.Where(w => (code > 0 ? w.CMOOfficerCode == code : true)).OrderBy(x => x.DepartmentTitle).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();

                //if (code > 0)
                //{
                //    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => !string.IsNullOrEmpty(f.CMISDeptID) && f.CMOOfficerCode == code && f.DepartmentIsActive == true && f.DepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.CMISDeptID.ToString(), Text = x.DepartmentTitle }).ToList();
                //}
                //else
                //{
                //    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => !string.IsNullOrEmpty(f.CMISDeptID) && f.DepartmentIsActive == true && f.DepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.CMISDeptID.ToString(), Text = x.DepartmentTitle }).ToList();
                //}
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetMLAConstituencyByDistrictCode(string discrictCodes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(discrictCodes))
                {
                    var codeList = discrictCodes.Split(',');

                    result.Data = _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => codeList.Contains(f.DistrictCode.ToString()) && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetMLAConstituencyWithDesignation()
        {
            try
            {
                return _uow.GenericRepository<vwJAN_PROJ_MLAConstituencyMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.MLANameEng)).Select(x => new SelectListItem { Value = x.Code.ToString(), Text = x.MLANameEng + "(" + x.DesignationName + ")" }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetPageMasterByPageTypeCode(int pageTypeCode, string applicationCode = "")
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                //if (pageTypeCode > 0)
                //{
                result.Data = _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(filter: x => (pageTypeCode == 0 || x.PageTypeCode == pageTypeCode) && (applicationCode == "" || x.ApplicationCode == applicationCode), orderBy: o => o.OrderBy(x => x.PageTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.PageCode.ToString(), Text = x.PageTitle }).ToList();
                //}
                //else
                //{
                //    result.Data = _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(filter: x => !string.IsNullOrEmpty(applicationCode) ? x.ApplicationCode == applicationCode : true, orderBy: o => o.OrderBy(x => x.PageTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.PageCode.ToString(), Text = x.PageTitle }).ToList();
                //}
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetAllSSOIDByUserType(string userType, string dptCode = "")
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                //if (!string.IsNullOrEmpty(userType))
                //{
                //    result.Data = _uow.GenericRepository<vwUserDetail>().GetAll(orderBy: o => o.OrderBy(x => x.SSOID), filter: x => x.UserIsActive == true && (!string.IsNullOrEmpty(dptCode)?dptCode.Contains(x.DepartmentCodes) :true) && x.UserIsDeleted == false && x.UserType.Trim().ToLower() == userType.Trim().ToLower()).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SSOID.ToString(), Text = x.SSOID }).ToList();
                //}
                //else
                //{
                //    result.Data = _uow.GenericRepository<vwUserDetail>().GetAll(orderBy: o => o.OrderBy(x => x.SSOID), filter: x => x.UserIsActive == true && (!string.IsNullOrEmpty(dptCode) ? dptCode.Contains(x.DepartmentCodes) : true) && x.UserIsDeleted == false).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.SSOID.ToString(), Text = x.SSOID }).ToList();
                //}

                var code = Convert.ToInt32(dptCode);
                if (userType == UserTypeEnum.ADM.GetStringValue() || userType == UserTypeEnum.SADM.GetStringValue())
                {
                    result.Data = _uow.GenericRepository<tblUserMaster>().GetAll(filter: f => f.UserIsActive == true && f.UserIsDeleted == false && f.UserType.Trim().ToLower() == userType.Trim().ToLower(), orderBy: o => o.OrderBy(x => x.SSOID)).ToList().GroupBy(x => x.UserId).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().SSOID.ToString(), Text = x.FirstOrDefault().SSOID }).ToList();
                }
                else
                {
                    if (!string.IsNullOrEmpty(userType) && code == 0)
                    {
                        result.Data = _uow.GenericRepository<tblUserMaster>().GetAll(filter: f => f.UserIsActive == true && f.UserIsDeleted == false && f.UserType.Trim().ToLower() == userType.Trim().ToLower(), orderBy: o => o.OrderBy(x => x.SSOID)).ToList().GroupBy(x => x.UserId).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().SSOID.ToString(), Text = x.FirstOrDefault().SSOID }).ToList();
                    }
                    else if (!string.IsNullOrEmpty(userType) && code > 0)
                    {
                        result.Data = _uow.GenericRepository<vwUserListWithDepartment>().GetAll(filter: f => f.UserIsActive == true && f.UserIsDeleted == false && f.UserType.Trim().ToLower() == userType.Trim().ToLower() && (code > 0 ? f.DepartmentCode == code : true), orderBy: o => o.OrderBy(x => x.SSOID)).ToList().GroupBy(x => x.UserId).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().SSOID.ToString(), Text = x.FirstOrDefault().SSOID }).ToList();
                    }
                    else
                    {
                        result.Data = _uow.GenericRepository<vwUserListWithDepartment>().GetAll(filter: f => f.UserIsActive == true && f.UserIsDeleted == false && (code > 0 ? f.DepartmentCode == code : true), orderBy: o => o.OrderBy(x => x.SSOID)).ToList().GroupBy(x => x.UserId).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().SSOID.ToString(), Text = x.FirstOrDefault().SSOID }).ToList();
                    }

                }


                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetUserListByApplication(string UserType, string DepartmentCode, string office)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                List<SqlParameter> sqlParam = new List<SqlParameter>();

                sqlParam.Add(new SqlParameter("usertype", SqlDbType.NVarChar) { Value = UserType ?? (object)DBNull.Value });
                sqlParam.Add(new SqlParameter("department", SqlDbType.NVarChar) { Value = DepartmentCode ?? (object)DBNull.Value });
                sqlParam.Add(new SqlParameter("office", SqlDbType.NVarChar) { Value = office ?? (object)DBNull.Value });
                List<sp_getuserlistbyapplication_Result> userlist = _uow.ExeccuteStoreProcedure<sp_getuserlistbyapplication_Result>("sp_getuserlistbyapplication @usertype,@department,@office", sqlParam.ToArray()).OrderBy(x => x.SSOID).ToList();


                if (userlist != null && userlist.Count > 0)
                {
                    result.Data = userlist.Select(item => new System.Web.WebPages.Html.SelectListItem
                    {
                        Text = Convert.ToString(item.SSOID),
                        Value = Convert.ToString(item.UserId),

                    }).ToList();


                    return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
                }
                else
                {
                    return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
                }
                //return SetResultStatus<List<System.Web.WebPages.Html.SelectListItem>>(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetCMISFinancialYearByModuleCode(decimal code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {

                    result.Data = _uow.GenericRepository<vw_CMISModuleData>().GetAll(filter: f => f.isActive == true && f.isDelete == false && (code > 0 ? f.ModuleID.Value == code : true), orderBy: o => o.OrderBy(x => x.Financial_Year)).ToList().GroupBy(x => x.Financial_Year).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().Financial_Year.ToString(), Text = x.FirstOrDefault().Financial_Year }).ToList();


                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetCMISAdminDepartmentByModuleCode(decimal code)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0)
                {

                    result.Data = _uow.GenericRepository<vw_CMISModuleData>().GetAll(filter: f => f.isActive == true && f.isDelete == false && f.DepartmentCode > 0 && (code > 0 ? f.ModuleID.Value == code : true), orderBy: o => o.OrderBy(x => x.AdmDepartmentTitle)).ToList().GroupBy(x => x.AdminDepartmentCode).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().AdminDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();

                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetCMISDepartmentByModuleCode(decimal code, int AdmDepartmentCode = 0)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (code > 0 && AdmDepartmentCode == 0)
                {

                    result.Data = _uow.GenericRepository<vw_CMISModuleData>().GetAll(filter: f => f.isActive == true && f.isDelete == false && f.JanDepartmentCode > 0 && (code > 0 ? f.ModuleID.Value == code : true), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.JanDepartmentCode).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().JanDepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();


                }
                else if (AdmDepartmentCode > 0 && code > 0)
                {
                    result.Data = _uow.GenericRepository<vw_CMISModuleData>().GetAll(filter: f => f.isActive == true && f.isDelete == false && f.JanDepartmentCode > 0 && (code > 0 ? f.ModuleID.Value == code : true) && (f.AdminDepartmentCode == AdmDepartmentCode), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.JanDepartmentCode).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().JanDepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<vw_CMISModuleData>().GetAll(filter: f => f.isActive == true && f.isDelete == false && f.JanDepartmentCode > 0 && (code > 0 ? f.ModuleID.Value == code : true) && (AdmDepartmentCode > 0 ? f.AdminDepartmentCode.Value == AdmDepartmentCode : true), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.JanDepartmentCode).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.FirstOrDefault().JanDepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();

                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetNewsSubjetByDepartent(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    string[] codeList = codes.Split(',');

                    result.Data = _uow.GenericRepository<tblJAN_News_SubjectMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && (codeList.Contains(f.DepartmentCode
                        .ToString()) || f.IsSubjectVisibleToAllDepartment == true), orderBy: o => o.OrderBy(x => x.Name)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.Code.ToString(), Text = x.Name }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDepartmentByAdminDepartmentCodes(string codes)
        {
            try
            {
                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (!string.IsNullOrEmpty(codes))
                {
                    var codeList = codes.Split(',');

                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && codeList.Contains(f.Department_AdmDepartmentCode
                        .ToString()), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectAdmDepartment()
        {
            try
            {

                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingDepartment>().GetAll(orderBy: o => o.OrderBy(x => x.AdmDepartmentTitle)).GroupBy(x => x.AdmDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdmDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();



            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectDepartment(int code = 0)
        {
            try
            {
                if (code > 0)
                {
                    return _uow.GenericRepository<vw_PROJ_FRONT_ExstingDepartment>().GetAll(filter: x => x.AdmDepartmentCode == code, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.NodalDepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vw_PROJ_FRONT_ExstingDepartment>().GetAll(orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new SelectListItem { Value = x.NodalDepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }



            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectWorkType(int subCategoryCode = 0)
        {
            try
            {

                if (subCategoryCode > 0)
                {
                    return _uow.GenericRepository<vwJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: f => (f.IsApplicableToAll.Value == true || f.SubCategoryCode == subCategoryCode) && f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.Code).Select(x => new SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vwJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.Code).Select(x => new SelectListItem { Value = x.FirstOrDefault().Code.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetExistingProjectCategory()
        {
            try
            {

                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingCategory>().GetAll(orderBy: o => o.OrderBy(x => x.CategoryName)).Select(x => new SelectListItem { Value = x.ProjectCategoryCode.ToString(), Text = x.CategoryName }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectSubCategoryForDptDistrict(string status = "", int dptCode = 0)
        {
            try
            {
                if (!string.IsNullOrEmpty(status))
                {
                    var statusCodes = status.Split(',').ToList();

                    return _uow.GenericRepository<vw_Jan_Front_ProjectMasterWithDptWebsite>().GetAll(filter: f => !f.IsDeleted && f.IsActive && statusCodes.Contains(f.ProjectStatusCode.ToString()) && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.ProjectSubCategoryCode)).GroupBy(x => x.ProjectSubCategoryCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().ProjectSubCategoryCode.ToString(), Text = x.FirstOrDefault().SubCategoryName }).ToList();

                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectSchemeProgramForDptDistrict(string status = "", int dptCode = 0)
        {
            try
            {
                if (!string.IsNullOrEmpty(status))
                {
                    var statusCodes = status.Split(',').ToList();

                    return _uow.GenericRepository<vw_Jan_Front_ProjectMasterWithDptWebsite>().GetAll(filter: f => !f.IsDeleted && f.IsActive && statusCodes.Contains(f.ProjectStatusCode.ToString()) && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.ProjectSchemeProgramName)).GroupBy(x => x.ProjectSchemeProgramCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().ProjectSchemeProgramCode.ToString(), Text = x.FirstOrDefault().ProjectSchemeProgramName }).ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectCategoryForDptDistrict(string status = "", int dptCode = 0)
        {
            try
            {
                if (!string.IsNullOrEmpty(status))
                {
                    var statusCodes = status.Split(',').ToList();

                    return _uow.GenericRepository<vw_Jan_Front_ProjectMasterWithDptWebsite>().GetAll(filter: f => !f.IsDeleted && f.IsActive && statusCodes.Contains(f.ProjectStatusCode.ToString()) && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.CategoryName)).GroupBy(x => x.ProjectCategoryCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().ProjectCategoryCode.ToString(), Text = x.FirstOrDefault().CategoryName }).ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectYearsForDptDistrict(string status = "", int dptCode = 0)
        {
            try
            {
                if (!string.IsNullOrEmpty(status))
                {
                    var statusCodes = status.Split(',').ToList();

                    return _uow.GenericRepository<vw_Jan_Front_ProjectMasterWithDptWebsite>().GetAll(filter: f => !f.IsDeleted && f.IsActive && statusCodes.Contains(f.ProjectStatusCode.ToString()) && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.YearOfInitiationName)).GroupBy(x => x.YearOfInitiationCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().YearOfInitiationCode.ToString(), Text = x.FirstOrDefault().YearOfInitiationName }).ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectWorkTypeForDptDistrict(string status = "", int dptCode = 0)
        {
            try
            {
                if (!string.IsNullOrEmpty(status))
                {
                    var statusCodes = status.Split(',').ToList();

                    return _uow.GenericRepository<vw_Jan_Front_ProjectMasterWithDptWebsite>().GetAll(filter: f => !f.IsDeleted && f.IsActive && statusCodes.Contains(f.ProjectStatusCode.ToString()) && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.WorkTypeName)).GroupBy(x => x.WorkTypeCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().WorkTypeCode.ToString(), Text = x.FirstOrDefault().WorkTypeName }).ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectAssemblyConstituencyForDptDistrict(string status = "", int dptCode = 0)
        {
            try
            {
                if (!string.IsNullOrEmpty(status))
                {
                    var statusCodes = status.Split(',').ToList();

                    return _uow.GenericRepository<vw_JAN_PROJ_ExstingMLAConstituencyDistrictDpt>().GetAll(filter: f => statusCodes.Contains(f.ProjectStatusCode.ToString()) && f.NodalDepartmentCode == dptCode, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.MLAConstituencyCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().MLAConstituencyCode.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectSubCategory(int CategoryCode = 0)
        {
            try
            {
                if (CategoryCode > 0)
                {


                    return _uow.GenericRepository<vw_Jan_Front_ProjectMaster>().GetAll(filter: f => !f.IsDeleted && f.IsActive && f.ProjectCategoryCode == CategoryCode, orderBy: o => o.OrderBy(x => x.ProjectSubCategoryCode)).GroupBy(x => x.ProjectSubCategoryCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().ProjectSubCategoryCode.ToString(), Text = x.FirstOrDefault().SubCategoryName }).ToList();

                }
                else
                {
                    return _uow.GenericRepository<vw_Jan_Front_ProjectMaster>().GetAll(orderBy: o => o.OrderBy(x => x.SubCategoryName)).GroupBy(x => x.ProjectSubCategoryCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().ProjectSubCategoryCode.ToString(), Text = x.FirstOrDefault().SubCategoryName }).ToList();
                }




            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectSchemeProgram()
        {
            try
            {

                return _uow.GenericRepository<vw_Jan_Front_ProjectMaster>().GetAll(orderBy: o => o.OrderBy(x => x.ProjectSchemeProgramName)).GroupBy(x => x.ProjectSchemeProgramCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().ProjectSchemeProgramCode.ToString(), Text = x.FirstOrDefault().ProjectSchemeProgramName }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetExistingProjectStatus()
        {
            try
            {

                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingProjectStatus>().GetAll(orderBy: o => o.OrderBy(x => x.StatusName)).Select(x => new SelectListItem { Value = x.ProjectStatusCode.ToString(), Text = x.StatusName }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectMLAConstituency(int Code = 0)
        {
            try
            {
                if (Code > 0)
                {


                    return _uow.GenericRepository<vw_PROJ_FRONT_ExstingMLAConstituency>().GetAll(filter: x => x.DistrictCode == Code, orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.MLAConstituency).Select(x => new SelectListItem { Value = x.FirstOrDefault().MLAConstituency.Value.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }
                else
                {
                    return _uow.GenericRepository<vw_PROJ_FRONT_ExstingMLAConstituency>().GetAll(orderBy: o => o.OrderBy(x => x.Name)).GroupBy(x => x.MLAConstituency).Select(x => new SelectListItem { Value = x.FirstOrDefault().MLAConstituency.Value.ToString(), Text = x.FirstOrDefault().Name }).ToList();
                }


            }

            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectMPConstituency()
        {
            try
            {

                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingMPConstituency>().GetAll(orderBy: o => o.OrderBy(x => x.Name)).Select(x => new SelectListItem { Value = x.MPConstituency.Value.ToString(), Text = x.Name }).ToList();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectSector()
        {
            try
            {

                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingSector>().GetAll(orderBy: o => o.OrderBy(x => x.SectorName)).Select(x => new SelectListItem { Value = x.DevelopmentSectorCode.ToString(), Text = x.SectorName }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetExistingProjectStartYear()
        {
            try
            {

                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingYearOfInitiation>().GetAll(orderBy: o => o.OrderBy(x => x.YearOfInitiationName)).Select(x => new SelectListItem { Value = x.YearOfInitiationCode.ToString(), Text = x.YearOfInitiationName }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingProjectDistrit()
        {
            try
            {
                return _uow.GenericRepository<vw_PROJ_FRONT_ExstingMLAConstituencyDistricts>().GetAll(orderBy: o => o.OrderBy(x => x.DistrictTitle)).GroupBy(x => x.DistrictCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DistrictCode.ToString(), Text = x.FirstOrDefault().DistrictTitle }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingNewsAdminDepartment()
        {
            try
            {


                return _uow.GenericRepository<vw_NEWS_FRONT_ExstingDepartment>().GetAll(orderBy: o => o.OrderBy(x => x.DepartmentCategoryCode).ThenBy(x => x.AdmDepartmentTitle)).ToList().GroupBy(x => x.AdmDepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().AdmDepartmentCode.ToString(), Text = x.FirstOrDefault().AdmDepartmentTitle }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<SelectListItem> GetExistingNewsDepartment(int AdmDepartmentCode = 0)
        {
            try
            {

                if (AdmDepartmentCode > 0)
                {

                    return _uow.GenericRepository<vw_NEWS_FRONT_ExstingDepartment>().GetAll(filter: x => x.AdmDepartmentCode == AdmDepartmentCode, orderBy: o => o.OrderBy(x => x.DepartmentCategoryCode).ThenBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();

                }
                else
                {
                    return _uow.GenericRepository<vw_NEWS_FRONT_ExstingDepartment>().GetAll(orderBy: o => o.OrderBy(x => x.DepartmentCategoryCode).ThenBy(x => x.DepartmentTitle)).ToList().GroupBy(x => x.DepartmentCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().DepartmentCode.ToString(), Text = x.FirstOrDefault().DepartmentTitle }).ToList();

                }



            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingNewsSubject()
        {
            try
            {

                return _uow.GenericRepository<vw_Jan_Front_NewsPaperProgressDetail>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.IsVisibleToPublic == true && f.ProgressIsVisibleToPublic == true, orderBy: o => o.OrderBy(x => x.SubjectName)).ToList().GroupBy(x => x.SubjectCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().SubjectCode.ToString(), Text = x.FirstOrDefault().SubjectName }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingNewsPaper()
        {
            try
            {

                return _uow.GenericRepository<vw_Jan_Front_NewsPaperProgressDetail>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.IsVisibleToPublic == true && f.ProgressIsVisibleToPublic == true, orderBy: o => o.OrderBy(x => x.NewsPaperName)).ToList().GroupBy(x => x.NewsPaperCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().NewsPaperCode.ToString(), Text = x.FirstOrDefault().NewsPaperName }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<SelectListItem> GetExistingNewsPublicationType()
        {
            try
            {

                return _uow.GenericRepository<vw_Jan_Front_NewsPaperProgressDetail>().GetAll(filter: f => f.IsActive == true && f.IsDeleted == false && f.IsVisibleToPublic == true && f.ProgressIsVisibleToPublic == true, orderBy: o => o.OrderBy(x => x.PublicationTypeTitle)).ToList().GroupBy(x => x.PublicationTypeCode).Select(x => new SelectListItem { Value = x.FirstOrDefault().PublicationTypeCode.ToString(), Text = x.FirstOrDefault().PublicationTypeTitle }).ToList();


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<SelectListItem> GetExistingNewsCoverageType()
        {
            try
            {

                return _uow.GenericRepository<tbllookup>().GetAll().Join(_uow.GenericRepository<tblJAN_News_NewspaperCoverageTypes>().GetAll(filter: x => x.tblJAN_News_NewspaperProgressMapping.IsVisibleToPublic == true && x.tblJAN_News_NewspaperProgressMapping.tblJAN_News_NewspaperTransaction.IsVisibleToPublic == true && x.tblJAN_News_NewspaperProgressMapping.IsActive).GroupBy(x => x.CoverageTypeCode).ToList(),
               mstr => mstr.Id,
               trans => trans.FirstOrDefault().CoverageTypeCode,
               (mster, trans) => new SelectListItem
               {
                   Value = mster.Id.ToString(),
                   Text = mster.lookup
               }).OrderBy(x => x.Text).ToList();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #region LMS

        private List<SelectListItem> GetLMS_LetterAction()
        {
            try
            {
                List<SelectListItem> actionList = new List<SelectListItem>();
                actionList.Add(new SelectListItem() { Text = "Pending", Value = "Pending" });
                actionList.Add(new SelectListItem() { Text = "Interim", Value = "Interim" });
                actionList.Add(new SelectListItem() { Text = "Disposed", Value = "Disposed" });
                return actionList;
            }
            catch
            {
                return null;
            }
        }

        #endregion

        #region VIPLMS

        private List<SelectListItem> GetVIPLMS_LetterAction()
        {
            try
            {
                List<SelectListItem> actionList = new List<SelectListItem>();
                actionList.Add(new SelectListItem() { Text = "Pending", Value = "Pending" });
                actionList.Add(new SelectListItem() { Text = "Interim", Value = "Interim" });
                actionList.Add(new SelectListItem() { Text = "Disposed", Value = "Disposed" });
                return actionList;
            }
            catch
            {
                return null;
            }
        }

        #endregion

        /// <summary>
        /// This method for get department and district wise on seletion o0f radio button then return condition wise record.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> GetDepartmentDistrictList(int Code)
        {
            try
            {


                ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>> result = new ServiceResponse<List<System.Web.WebPages.Html.SelectListItem>>();
                if (Code == Convert.ToInt64(GeneralCategoryEnum.Department) || Code == Convert.ToInt64(GeneralCategoryEnumProd.Department))
                {
                    var deptCodeLocal = Convert.ToInt32(DepartmentCategoryEnum.Department);
                    var deptCodeProd = Convert.ToInt32(DepartmentCategoryEnum.DepartmentProduction);

                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && ((f.DepartmentDistrictCode == deptCodeLocal) || (f.DepartmentDistrictCode == deptCodeProd)), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else if (Code == Convert.ToInt64(GeneralCategoryEnum.District) || Code == Convert.ToInt64(GeneralCategoryEnumProd.District))
                {
                    var distLocal = Convert.ToInt32(DepartmentCategoryEnum.District);
                    var distProd = Convert.ToInt32(DepartmentCategoryEnum.DistrictProduction);

                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false && ((f.DepartmentDistrictCode == distLocal) || (f.DepartmentDistrictCode == distProd)), orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                else
                {
                    result.Data = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: f => f.DepartmentIsActive == true && f.DepartmentIsDeleted == false, orderBy: o => o.OrderBy(x => x.DepartmentTitle)).Select(x => new System.Web.WebPages.Html.SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();
                }
                return SetResultStatus(result.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
    #endregion
}

