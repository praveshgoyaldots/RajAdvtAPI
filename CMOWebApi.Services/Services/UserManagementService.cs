using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.ModelBinding;
using static CMOWebApi.Core.Enums.FileValiodation;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.UserEnum;


namespace CMOWebApi.Services.Services
{
    public class UserManagementService : BaseService, IUserManagementService
    {
        #region /// Variable ///
        IUnitofWork _uow;
        string filePath = HttpContext.Current.Server.MapPath(FilePath.UserProFileSavePath.GetStringValue());
        string appPSWD = ConfigurationManager.AppSettings["AppPSWD"];

        #endregion

        #region /// Cunstroctor  ///
        public UserManagementService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region /// Public Method   ///
        /// <summary>
        /// GEt All User 
        /// </summary>
        /// <param name="model">IndexModel</param>
        /// <returns>List Of Userdata</returns>
        public ServiceResponse<PagedData<UserViewModel>> GetAll(IndexModel model, int userId = 0)
        {
            ServiceResponse<PagedData<UserViewModel>> objReturn = new ServiceResponse<PagedData<UserViewModel>>();
            try
            {
                string fromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("CreatedFrom") ? (model.AdvanceSearchModel["CreatedFrom"].ToString()) : string.Empty) : string.Empty;

                string toDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("CreatedTo") ? (model.AdvanceSearchModel["CreatedTo"].ToString()) : string.Empty) : string.Empty;

                string isExportToExcel = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("IsExportToExcel") ? (model.AdvanceSearchModel["IsExportToExcel"].ToString()) : string.Empty) : string.Empty;

                if (Convert.ToBoolean(isExportToExcel))
                {
                    model.PageSize = 101;
                }

                PagedData<UserViewModel> resulData = new PagedData<UserViewModel>();
                object[] spParam = new object[15];
                spParam[0] = userId;
                spParam[1] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? string.Join(",", Convert.ToString(model.AdvanceSearchModel["DepartmentCode"].ToString())) : string.Empty) : string.Empty;
                spParam[2] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("OfficeCode") ? Convert.ToString(model.AdvanceSearchModel["OfficeCode"].ToString()) : string.Empty) : string.Empty;
                spParam[3] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DistrictCode") ? Convert.ToString(model.AdvanceSearchModel["DistrictCode"].ToString()) : string.Empty) : string.Empty;
                spParam[4] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("KeywordSearch") ? Convert.ToString(model.AdvanceSearchModel["KeywordSearch"].ToString()) : string.Empty) : string.Empty;
                spParam[5] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("UserTypes") ? Convert.ToString(model.AdvanceSearchModel["UserTypes"].ToString()) : string.Empty) : string.Empty;
                spParam[6] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Activeview") ? Convert.ToInt32(model.AdvanceSearchModel["Activeview"].ToString()) : -1) : -1;
                spParam[7] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("OfficeActiveview") ? Convert.ToInt32(model.AdvanceSearchModel["OfficeActiveview"].ToString()) : -1) : -1; spParam[8] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("SSOID") ? Convert.ToString(model.AdvanceSearchModel["SSOID"].ToString()) : string.Empty) : string.Empty;
                spParam[9] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("UserName") ? Convert.ToString(model.AdvanceSearchModel["UserName"].ToString()) : string.Empty) : string.Empty;
                spParam[10] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Email") ? Convert.ToString(model.AdvanceSearchModel["Email"].ToString()) : string.Empty) : string.Empty;
                spParam[11] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Mobile") ? Convert.ToString(model.AdvanceSearchModel["Mobile"].ToString()) : string.Empty) : string.Empty;
                spParam[12] = Convert.ToDateTime(fromDate).ToString("MM-dd-yyyy");
                spParam[13] = Convert.ToDateTime(toDate).ToString("MM-dd-yyyy");
                spParam[14] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("IsShowUserWithSpecificPermission") ? Convert.ToBoolean(model.AdvanceSearchModel["IsShowUserWithSpecificPermission"].ToString()) : false) : false;
                model.OrderByAsc = 1;
                PagedData<spGetUserListByPermission_Result> data = GenericGridCall<spGetUserListByPermission_Result>.ListView(spParam, model.PageSize, x => x.DepartmentNames, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spGetUserListByPermission_Result, UserViewModel>()
                     .ForMember(dest => dest.ProfilePic, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.ProfilePic) ? null : CommonUtility.GetBase64strFromFilePath(filePath + src.ProfilePic)));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<UserViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords,
                    headersName: new string[] { "S.NO.", "User Name", "SSOID", "User Type", "Office Name", "District", "Department", "User Email", "Mobile", "UserIsActive" });
                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<UserViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Add User 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> AddUpdate(UserPostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                string mappingparamStr = string.Empty;

                if (!string.IsNullOrEmpty(model.ProfilePic))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ProfilePic, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(FilePath.UserProFileSavePath.GetStringValue());
                        model.ProfilePic = CommonUtility.SaveFileFromBase64str(model.ProfilePic, path);
                    }
                    else
                    {
                        return isValid;
                    }
                }


                List<SqlParameter> param = SetSp_AddUpdateUserParam(model, out mappingparamStr);
                sp_AddUpdateUser_Result Result = _uow.ExeccuteStoreProcedure<sp_AddUpdateUser_Result>("sp_AddUpdateUser " + mappingparamStr, param.ToArray()).FirstOrDefault();
                _uow.save();
                //if add
                if (Result.UserId > 0 && model.UserId == 0)
                {
                    objReturn = SetResultStatus(Result.UserId.ToString(), MessageStatus.Create, true);
                }
                //if Update
                else if (Result.UserId > 0 && model.UserId > 0)
                {
                    objReturn = SetResultStatus(Result.ToString(), MessageStatus.Update, true);
                }
                else
                {
                    objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
                }
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

            return objReturn;
        }

        /// <summary>
        /// Check SSOId Exist
        /// </summary>
        /// <param name="ssoId"></param>
        /// <returns>ServiceResponse<SSO Id></returns>
        public ServiceResponse<dynamic> IsUserSSOIdExist(string ssoId)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                var user = _uow.GenericRepository<tblUserMaster>().GetAll(filter: x => !x.UserIsDeleted && x.SSOID.ToLower() == ssoId.ToLower()).FirstOrDefault();
                if (user != null)
                {
                    objReturn = SetResultStatus((object)true, MessageStatus.Exist, true);
                }
                else
                {
                    objReturn = SetResultStatus((object)false, MessageStatus.NotExist, true);

                }
            }
            catch
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;
        }

        /// <summary>
        /// Check User Exist
        /// </summary>
        /// <param name="UserName"></param>
        /// <returns>ServiceResponse<UserName Id></returns>
        public ServiceResponse<dynamic> IsUserNameExist(string userName)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                var user = _uow.GenericRepository<tblUserMaster>().GetAll(filter: x => !x.UserIsDeleted && x.UserName.ToLower() == userName.ToLower()).FirstOrDefault();
                if (user != null)
                {
                    objReturn = SetResultStatus((object)true, MessageStatus.Exist, true);
                }
                else
                {
                    objReturn = SetResultStatus((object)false, MessageStatus.NotExist, true);

                }
            }
            catch
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;
        }

        /// <summary>
        /// Verify UserPostModel
        /// </summary>
        /// <param name="model">UserPostModel</param>
        /// <returns>ModelState</returns>
        public ModelStateDictionary VerifyUserModel(UserPostModel model)
        {
            ModelStateDictionary modelState = new ModelStateDictionary();
            try
            {

                if (model != null)
                {
                    if (model.UserType == UserTypeEnum.CMOO.GetStringValue() || model.UserType == UserTypeEnum.CMOS.GetStringValue())
                    {
                        if (model.Group == null || model.Group < 1)
                        {
                            modelState.AddModelError("GroupCode", "Group is Required!");
                        }
                    }
                    else if (model.UserType == UserTypeEnum.DCOM.GetStringValue())
                    {
                        if (model.Division == null || model.Division.Count < 1)
                        {
                            modelState.AddModelError("Division", "Division is Required!");
                        }
                    }
                    else if (model.UserType == UserTypeEnum.COLL.GetStringValue())
                    {
                        if (model.District == null)
                        {
                            modelState.AddModelError("District", "District is Required!");
                        }
                    }
                    else if (model.UserType == UserTypeEnum.BDO.GetStringValue())
                    {
                        if (model.Block == null || model.Block.Count < 1)
                        {
                            modelState.AddModelError("Block", "Block is Required!");
                        }
                    }
                    else if (model.UserType == UserTypeEnum.TEHDR.GetStringValue())
                    {
                        if (model.Tehsil == null || model.Tehsil.Count < 1)
                        {
                            modelState.AddModelError("Tehsil", "Tehsil is Required!");
                        }
                    }

                    else if (model.UserType == UserTypeEnum.DPTO.GetStringValue() || model.UserType == UserTypeEnum.DPTS.GetStringValue())
                    {
                        if (model.Department == null || model.Department.Count < 1)
                        {
                            modelState.AddModelError("Department", "Department is Required!");
                        }
                    }

                    else if (model.UserType == UserTypeEnum.TLO.GetStringValue())
                    {
                        if (model.Department == null || model.Department.Count < 1)
                        {
                            modelState.AddModelError("Department", "Department is Required!");
                        }
                    }
                    else if (model.UserType == UserTypeEnum.MNSTR.GetStringValue())
                    {
                        if (model.Department == null || model.Department.Count < 1)
                        {
                            modelState.AddModelError("Department", "Department is Required!");
                        }
                    }
                    else if (model.UserType == UserTypeEnum.MLAMP.GetStringValue())
                    {

                        if (model.ParConstituancy == null || model.ParConstituancy.Count < 1)
                        {
                            modelState.AddModelError("ParConstituancy", "Parliament Constituancy is Required!");
                        }
                    }
                    //else if (model.UserType == UserTypeEnum.DLO.GetStringValue())
                    //    {
                    //    if (model.District == null || model.District.Count < 1)
                    //        {
                    //        modelState.AddModelError("District", "District is Required!");
                    //        }
                    //    }

                    //else if (model.UserType == UserTypeEnum.DLS.GetStringValue())
                    //    {
                    //    if ((model.Tehsil == null || model.Tehsil.Count < 1 ) || (model.Block == null || model.Block.Count < 1))
                    //        {
                    //        modelState.AddModelError("Tehsil", "Tehsil is Required!");
                    //        }
                    //    }

                }
                else
                {
                    modelState.AddModelError("model", "Model is null");
                }
            }
            catch (System.Exception ex)
            {
                modelState.AddModelError("model", ex.Message);
            }

            return modelState;
        }
        /// <summary>
        /// get detail by Userid
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<UserViewModel> GetById(int id)
        {
            ServiceResponse<UserViewModel> objReturn = new ServiceResponse<UserViewModel>();
            try
            {
                vwUserDetail objUser = _uow.GenericRepository<vwUserDetail>().GetAll(filter: x => x.UserId == id).FirstOrDefault();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserDetail, UserViewModel>()
                     .ForMember(dest => dest.ProfilePic, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.ProfilePic) ? null : CommonUtility.GetBase64strFromFilePath(filePath + src.ProfilePic)));
                });
                IMapper mapper = config.CreateMapper();
                objReturn.Data = mapper.Map(objUser, objReturn.Data);

                if (objReturn.Data != null)
                {
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, true);
                }

            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<UserViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Get SSO Detail by sso Id from SSO server
        /// </summary>
        /// <param name="ssoId">SSO ID</param>
        /// <returns>User Detail</returns>
        public ServiceResponse<SSOUserDetailModel> GetSSODetailFromSSO(string ssoId)
        {
            ServiceResponse<SSOUserDetailModel> objReturn = new ServiceHelper.ServiceResponse<SSOUserDetailModel>();
            try
            {

                string UserName = ConfigurationManager.AppSettings["SSoUserName"];
                string UserPassword = ConfigurationManager.AppSettings["SSoPassword"];
                SSOUserDetailModel userDetail = new SSOUserDetailModel();
                using (RAJSSO.SSO SSO = new RAJSSO.SSO())
                {
                    RAJSSO.SSOUserDetail SSOUserDetail = SSO.GetUserDetail(ssoId, UserName, UserPassword);
                    if (SSOUserDetail != null && !string.IsNullOrEmpty(SSOUserDetail.SSOID))
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<RAJSSO.SSOUserDetail, SSOUserDetailModel>()
                            .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Photo) ? null : "data:image/jpeg;base64," + src.Photo));
                        });
                        IMapper mapper = config.CreateMapper();
                        userDetail = mapper.Map(SSOUserDetail, userDetail);
                        objReturn = SetResultStatus(userDetail, MessageStatus.Success, true);
                    }
                    else
                    {
                        objReturn = SetResultStatus(userDetail, MessageStatus.NoRecord, false);
                    }
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
        /// Get User Detail By SSOId
        /// </summary>
        /// <param name="ssoId"></param>
        /// <returns>Method returns UserViewModel in ServiceResponse.</returns>
        public ServiceResponse<UserViewModel> GetUserDetailBySSOId(string ssoId)

        {
            ServiceResponse<UserViewModel> response = new ServiceResponse<UserViewModel>();
            try
            {
                CreateLogHelper.CreateLogFile("GetUserDetailBySSOId ssoId :" + ssoId + "/" + DateTime.Now + " \n");
                var userDetail = _uow.ExeccuteStoreProcedure<spGetUserDetailBySSOId_Result>("spGetUserDetailBySSOId @SSOId",
                    new SqlParameter("@SSOId", SqlDbType.NVarChar) { Value = ssoId }
                ).FirstOrDefault();

                CreateLogHelper.CreateLogFile("GetUserDetailBySSOId userDetail :" + userDetail + " \n");

                if (userDetail != null)
                {


                    if (userDetail.IsValidOffice)
                    {

                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<spGetUserDetailBySSOId_Result, UserViewModel>()
                                .ForMember(dest => dest.ProfilePic, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.ProfilePic) ? null : CommonUtility.GetBase64strFromFilePath(filePath + src.ProfilePic)))
                             //.ForMember(dest => dest.FileSize, opt => opt.MapFrom(src => src.FileSize != null && src.FileSize>0 ? src.FileSize : Convert.ToInt64(SchemeValueTypeEnumKeyForFile.Size))); //TODO
                             .ForMember(dest => dest.FileSize, opt => opt.MapFrom(src => Convert.ToInt64(SchemeValueTypeEnumKeyForFile.Size)));
                        });
                        response.Data = Mapper.Map<spGetUserDetailBySSOId_Result, UserViewModel>(userDetail);
                        response = SetResultStatus(response.Data, MessageStatus.Success, true);

                        var district = _uow.GenericRepository<vwOfficeWithDistrict>().GetAll(filter: x => x.OfficeCode.Value == (response.Data.OfficeCode != null ? response.Data.OfficeCode : 0)).FirstOrDefault();
                        if (district != null)
                            response.Data.DistrictOffice = district.DistrictTitle != null ? district.DistrictTitle : "";
                    }
                    else
                    {
                        response = SetResultStatus<UserViewModel>(null, MessageStatus.UserNOTMAP, false);
                    }
                }
                else
                {
                    response = SetResultStatus<UserViewModel>(null, MessageStatus.UserNOTMAP, false);
                }



                // Generate login Log
                LoginUserLogModel objLog = new LoginUserLogModel();
                objLog.SSOID = ssoId;
                objLog.LoginTime = DateTime.Now;
                if (response.Data != null)
                {
                    objLog.UserName = response.Data.UserName;
                    objLog.LoginLogOutStaus = CustomMessageStatus.Loginsuccess;
                }
                else
                {
                    objLog.LoginLogOutStaus = CustomMessageStatus.fail;
                }

                SaveLoginUserLog(objLog);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("UserManagementService/ GetUserDetailBySSOId", ex, ssoId);
                response = SetResultStatus<UserViewModel>(null, MessageStatus.Error, false, ex.Message);
            }
            //response.FilesizeValidation = _loginUserDetail.FileSize > 0 ? _loginUserDetail.FileSize.ToString() : Convert.ToInt64(SchemeValueTypeEnumKeyForFile.Size).ToString();
            return response;
        }

        /// <summary>
        /// Update Delete Status
        /// If user Is deleted=true then false else true
        /// </summary>
        /// <param name="userId">user Id</param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int userId)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblUserMaster user = _uow.GenericRepository<tblUserMaster>().GetAll(filter: x => x.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    user.UserIsDeleted = !user.UserIsDeleted;
                    await _uow.GenericRepository<tblUserMaster>().UpdateAsync(user);
                    _uow.save();
                    objReturn = SetResultStatus(user.UserName, MessageStatus.Update, true);
                }
                else
                {
                    objReturn = SetResultStatus(string.Empty, MessageStatus.NotExist, true);
                    objReturn.Data = null;
                }
            }
            catch (Exception ex)
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;

        }
        /// <summary>
        /// Update Active Status
        /// If user Is Activated=true then false else true
        /// </summary>
        /// <param name="userId">user Id</param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int userId)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblUserMaster user = _uow.GenericRepository<tblUserMaster>().GetAll().FirstOrDefault(x => x.UserId == userId);
                if (user != null)
                {
                    user.UserIsActive = !user.UserIsActive;
                    await _uow.GenericRepository<tblUserMaster>().UpdateAsync(user);
                    _uow.save();
                    objReturn = SetResultStatus(user.UserName, MessageStatus.StatusUpdate, true);
                }
                else
                {
                    objReturn = SetResultStatus(string.Empty, MessageStatus.NotExist, true);
                    objReturn.Data = null;
                }
            }
            catch (Exception ex)
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;

        }
        /// <summary>
        /// Get AdminDepartment by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>Department List</returns>
        public ServiceResponse<List<UserAdminDepartmentViewModel>> GetAdminDepartmentByUserId(int userId)
        {
            ServiceResponse<List<UserAdminDepartmentViewModel>> objReturn = new ServiceResponse<List<UserAdminDepartmentViewModel>>();
            try
            {
                if (userId > 0)
                {
                    //List<spCMO_GetAdmDepartmentByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetAdmDepartmentByUserId_Result>("spCMO_GetAdmDepartmentByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();
                    //var config = new MapperConfiguration(cfg =>
                    //{
                    //    cfg.CreateMap<spCMO_GetAdmDepartmentByUserId_Result, UserAdminDepartmentViewModel>();

                    //});
                    //IMapper mapper = config.CreateMapper();
                    //objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get Department by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>Department List</returns>
        public ServiceResponse<List<UserDepartmentViewModel>> GetDepartmentByUserId(int userId)
        {
            ServiceResponse<List<UserDepartmentViewModel>> objReturn = new ServiceResponse<List<UserDepartmentViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetDepartmentByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetDepartmentByUserId_Result>("spCMO_GetDepartmentByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spCMO_GetDepartmentByUserId_Result, UserDepartmentViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        /// <summary>
        /// Get Office by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>Office List</returns>
        public ServiceResponse<List<UserOfficeViewModel>> GetOfficeByUserId(int userId)
        {
            ServiceResponse<List<UserOfficeViewModel>> objReturn = new ServiceResponse<List<UserOfficeViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetOfficeByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetOfficeByUserId_Result>("spCMO_GetOfficeByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spCMO_GetOfficeByUserId_Result, UserOfficeViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public ServiceResponse<List<UserAchievementSubCategoryViewModel>> GetAchievementSubCategoryByUserId(int userId)
        {
            ServiceResponse<List<UserAchievementSubCategoryViewModel>> objReturn = new ServiceResponse<List<UserAchievementSubCategoryViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetAchievementSubCategoryByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetAchievementSubCategoryByUserId_Result>("spCMO_GetAchievementSubCategoryByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spCMO_GetAchievementSubCategoryByUserId_Result, UserAchievementSubCategoryViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get Division by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>Division List</returns>
        public ServiceResponse<List<UserDivisionViewModel>> GetDivisionByUserId(int userId)
        {
            ServiceResponse<List<UserDivisionViewModel>> objReturn = new ServiceResponse<List<UserDivisionViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetDivisionByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetDivisionByUserId_Result>("spCMO_GetDivisionByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spCMO_GetDivisionByUserId_Result, UserDivisionViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get District by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>District List</returns>
        public ServiceResponse<List<UserDistrictViewModel>> GetDistrictByUserId(int userId)
        {
            ServiceResponse<List<UserDistrictViewModel>> objReturn = new ServiceResponse<List<UserDistrictViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetDistrictByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetDistrictByUserId_Result>("spCMO_GetDistrictByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).OrderBy(x => x.DistrictTitle).ToList();
                    var config = new MapperConfiguration(cfg =>
                   {
                       cfg.CreateMap<spCMO_GetDistrictByUserId_Result, UserDistrictViewModel>();

                   });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        /// <summary>
        /// Get Tehsil by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>Tehsil List</returns>
        public ServiceResponse<List<UserTehsilViewModel>> GetTehsil(int userId)
        {
            ServiceResponse<List<UserTehsilViewModel>> objReturn = new ServiceResponse<List<UserTehsilViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetTehsilByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetTehsilByUserId_Result>("spCMO_GetTehsilByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spCMO_GetTehsilByUserId_Result, UserTehsilViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get Block by userid
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>Block List</returns>
        public ServiceResponse<List<UserBlockViewModel>> GetBlock(int userId)
        {
            ServiceResponse<List<UserBlockViewModel>> objReturn = new ServiceResponse<List<UserBlockViewModel>>();
            try
            {
                if (userId > 0)
                {
                    List<spCMO_GetBlockByUserId_Result> objResult = _uow.ExeccuteStoreProcedure<spCMO_GetBlockByUserId_Result>("spCMO_GetBlockByUserId @userId", new SqlParameter("userId", SqlDbType.Int) { Value = userId }).ToList();
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spCMO_GetBlockByUserId_Result, UserBlockViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<string> SaveLoginUserLog(LoginUserLogModel model)
        {
            try
            {
                ServiceResponse<string> objReturn = new ServiceResponse<string>();
                tblLoginUserLog obj = new tblLoginUserLog();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<LoginUserLogModel, tblLoginUserLog>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                //obj.LoginTime = DateTime.Now;
                obj.IPAddress = CommonUtility.GetIpAddress();
                //obj.SSOID = _loginUserDetail.SSOID;
                //obj.UserName = _loginUserDetail.UserName;

                _uow.GenericRepository<tblLoginUserLog>().Add(obj);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);


            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("SaveLoginUserLog ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("SaveLoginUserLog ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("SaveLoginUserLog ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Save, false);
            }
        }

        /// <summary>
        /// Get User List with Department and office for sending notification
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<UserForNotificationListModel>> GetUseForNotification(UserNotificationFilterModel model)
        {
            try
            {
                PagedData<UserForNotificationListModel> responseList = new PagedData<UserForNotificationListModel>();
                PagedData<vwGetUserForNotification> objList = GenericGridCall<vwGetUserForNotification>.ListView(model.PageSize, x => x.UserEmail, x => (model.OfficeCode > 0 ? x.OfficeCode == model.OfficeCode : true) && (model.DepartmentCode > 0 ? x.User_DepartmentCode == model.DepartmentCode : true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwGetUserForNotification, UserForNotificationListModel>()
                     .ForMember(des => des.OfficeName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.OfficeName) ? x.OfficeName : "--"))
                      .ForMember(des => des.DepartmentTitle, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DepartmentTitle) ? x.DepartmentTitle : "--"))
                       .ForMember(des => des.UserName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.UserName) ? x.UserName : "--"))
                        .ForMember(des => des.UserEmail, src => src.MapFrom(x => !string.IsNullOrEmpty(x.UserEmail) ? x.UserEmail : "--"))
                         .ForMember(des => des.Mobile, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Mobile) ? x.Mobile : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                PagedData<UserForNotificationListModel>.ReturnCustomizeData(responseList, model.PageSize, objList.TotalRecords);
                return SetResultStatus(responseList, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<UserForNotificationListModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Send Notification to selected user and some custom numbers also
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> SendNotificationToUser(UserNotificationModel model)
        {
            try
            {
                CreateLogHelper.CreateLogFile("Send Notification To user  :" + DateTime.Now.ToString() + "\n");
                if (model.MobileNo != null && model.MobileNo.Count > 0 && !string.IsNullOrEmpty(model.Content))
                {
                    if (model.IsSelectAll == true)
                    {
                        List<tblUserMaster> userData = _uow.GenericRepository<tblUserMaster>().GetAll(filter: x => !string.IsNullOrEmpty(x.Mobile) && (model.FilterModel.OfficeCode > 0 ? x.OfficeCode == model.FilterModel.OfficeCode : true) && (model.FilterModel.DepartmentCode > 0 ? x.User_DepartmentCode == model.FilterModel.DepartmentCode : true)).ToList();

                        model.MobileNo = userData.Where(z => !string.IsNullOrEmpty(z.Mobile) && !model.UnSelectedList.Contains(z.Mobile)).Select(x => x.Mobile).ToList();
                    }
                    if (!string.IsNullOrEmpty(model.MobileNumber))
                    {
                        model.MobileNo.AddRange(model.MobileNumber.Split(','));
                    }
                    CreateLogHelper.CreateLogFile("Mobile No like :- " + string.Join(",", model.MobileNo) + "\n");

                    var isSMSSent = SmsHelper.SendSms(model.MobileNo, model.Content);

                    CreateLogHelper.CreateLogFile("SMS Status :- " + isSMSSent.responseCode.ToString() + "\n");
                    if (isSMSSent.responseCode == 200)
                    {
                        return SetResultStatus(string.Empty, MessageStatus.SMSSendSuccess, true);
                    }

                }
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ServiceResponse<string> ExportUserData(IndexModel model, int userId = 0)
        {
            try
            {
                ServiceResponse<PagedData<UserViewModel>> objReturn = new ServiceResponse<PagedData<UserViewModel>>();
                objReturn = GetAll(model, userId);
                string data = ExportToExcel(objReturn.Data);
                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportUserData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportUserData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportUserData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }
        /// <summary>
        /// Get User Detail by filter
        /// </summary>
        /// <param name="model"> Single DepartmentCode, multiple usertype with Comma saprated string</param>
        /// <returns>User Detail</returns>
        public ServiceResponse<PagedData<UserViewModel>> GetAllUserDetailByFilter(UserDetailFilterModel model)
        {
            ServiceResponse<PagedData<UserViewModel>> objReturn = new ServiceResponse<PagedData<UserViewModel>>();
            try
            {


                PagedData<UserViewModel> resulData = new PagedData<UserViewModel>();
                object[] spParam = new object[2];
                spParam[0] = model.DepartmentCode == null ? 0 : model.DepartmentCode;
                spParam[1] = !string.IsNullOrEmpty(model.UserType) ? model.UserType : string.Empty;


                PagedData<sp_GetUserDetailByDeptAndUType_Result> data = GenericGridCall<sp_GetUserDetailByDeptAndUType_Result>.ListView(spParam, model.PageSize, x => x.DepartmentNames, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_GetUserDetailByDeptAndUType_Result, UserViewModel>()
                     .ForMember(dest => dest.ProfilePic, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.ProfilePic) ? null : CommonUtility.GetBase64strFromFilePath(filePath + src.ProfilePic)));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<UserViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);
                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<UserViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<string> ResetUserSpecificPermission(int userId = 0, string userType = "")
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                spJAN_ResetUserSpecificPermission_Result data = _uow.ExeccuteStoreProcedure<spJAN_ResetUserSpecificPermission_Result>("spJAN_ResetUserSpecificPermission @UserId,@UserType",
                new SqlParameter("UserId", SqlDbType.Int) { Value = userId }
                , new SqlParameter("UserType", SqlDbType.NVarChar) { Value = !string.IsNullOrEmpty(userType) ? userType : string.Empty }).FirstOrDefault();
                var id = data.UserId;
                objReturn.Message = MessageStatus.ResetUserSpecificPermission;
                objReturn.IsSuccess = true;
            }
            catch (Exception ex)
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;

        }

        public ServiceResponse<List<UserPagePermissionByUserModel>> GetUserPagePermissionByUser(int userId)
        {
            try
            {
                List<UserPagePermissionByUserModel> resultData = new List<UserPagePermissionByUserModel>();

                List<vwUserPagePermissionByUser> result = _uow.GenericRepository<vwUserPagePermissionByUser>().GetAll(filter: x => x.UserId == userId).OrderBy(x => x.ApplicationTitle).ThenBy(t => t.PageTitle).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserPagePermissionByUser, UserPagePermissionByUserModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(result, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetUserPagePermissionByUser ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserPagePermissionByUser ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserPagePermissionByUser ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<UserPagePermissionByUserModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<UserTypeWhichHasApefificPermissionModel>> GetUserTypeWhichHasApefificPermission()
        {
            try
            {
                List<UserTypeWhichHasApefificPermissionModel> resultData = new List<UserTypeWhichHasApefificPermissionModel>();

                List<vwUserTypeWhichHasApefificPermission> result = _uow.GenericRepository<vwUserTypeWhichHasApefificPermission>().GetAll().OrderBy(x => x.UserTypeTitle).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserTypeWhichHasApefificPermission, UserTypeWhichHasApefificPermissionModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(result, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetUserTypeWhichHasApefificPermission ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserTypeWhichHasApefificPermission ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserTypeWhichHasApefificPermission ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<UserTypeWhichHasApefificPermissionModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<UserWhichHasApefificPermissionModel>> GetUserWhichHasApefificPermission(int pageCode)
        {
            try
            {
                List<UserWhichHasApefificPermissionModel> resultData = new List<UserWhichHasApefificPermissionModel>();

                List<vwUserWhichHasApefificPermission> result = _uow.GenericRepository<vwUserWhichHasApefificPermission>().GetAll(filter: x => x.PageCode == pageCode).OrderBy(x => x.UserTypeTitle).ThenBy(t => t.UserName).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserWhichHasApefificPermission, UserWhichHasApefificPermissionModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(result, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetUserWhichHasApefificPermission ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserWhichHasApefificPermission ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserWhichHasApefificPermission ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<UserWhichHasApefificPermissionModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<UserWhichHasDefaultPermissionModel>> GetUserWhichHasDefaultPermission(int pageCode)
        {
            try
            {
                List<UserWhichHasDefaultPermissionModel> resultData = new List<UserWhichHasDefaultPermissionModel>();

                List<vwUserWhichHasDefaultPermission> result = _uow.GenericRepository<vwUserWhichHasDefaultPermission>().GetAll(filter: x => x.PageCode == pageCode).OrderBy(x => x.UserTypeTitle).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserWhichHasDefaultPermission, UserWhichHasDefaultPermissionModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(result, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetUserWhichHasDefaultPermission ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserWhichHasDefaultPermission ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetUserWhichHasDefaultPermission ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<UserWhichHasDefaultPermissionModel>>(null, MessageStatus.Error, false);
            }
        }
        #endregion

        #region ///   Private Method   ///

        /// <summary>
        /// Set Sp_AddUpdateUser Parameters
        /// </summary>
        /// <param name="model">User Post Model</param>
        /// <param name="mappingparamStr">Mapping stirng related to parameter</param>
        /// <returns>List<SqlParameter></returns>
        private List<SqlParameter> SetSp_AddUpdateUserParam(UserPostModel model, out string mappingparamStr)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            string mapStr = string.Empty;
            try
            {
                mapStr += "@UserID";
                sqlParam.Add(new SqlParameter("UserID", SqlDbType.Int) { Value = model.UserId });

                mapStr += ",@UserType";
                sqlParam.Add(new SqlParameter("UserType", SqlDbType.NVarChar) { Value = model.UserType ?? (object)DBNull.Value });

                mapStr += ",@SSOID";
                sqlParam.Add(new SqlParameter("SSOID", SqlDbType.NVarChar) { Value = model.SSOID ?? (object)DBNull.Value });

                mapStr += ",@Title";
                sqlParam.Add(new SqlParameter("Title", SqlDbType.NVarChar) { Value = model.Title ?? (object)DBNull.Value });

                mapStr += ",@UserName";
                sqlParam.Add(new SqlParameter("UserName", SqlDbType.NVarChar) { Value = model.UserName ?? (object)DBNull.Value });

                mapStr += ",@DesignationCode";
                sqlParam.Add(new SqlParameter("DesignationCode", SqlDbType.Int) { Value = model.Designation ?? (object)DBNull.Value });

                mapStr += ",@Gender";
                sqlParam.Add(new SqlParameter("Gender", SqlDbType.NVarChar) { Value = model.Gender ?? (object)DBNull.Value });

                mapStr += ",@UserEmail";
                sqlParam.Add(new SqlParameter("UserEmail", SqlDbType.NVarChar) { Value = model.UserEmail ?? (object)DBNull.Value });

                mapStr += ",@Mobile";
                sqlParam.Add(new SqlParameter("Mobile", SqlDbType.NVarChar) { Value = model.Mobile ?? (object)DBNull.Value });

                mapStr += ",@IPNo";
                sqlParam.Add(new SqlParameter("IPNo", SqlDbType.NVarChar) { Value = model.IPNo ?? (object)DBNull.Value });

                mapStr += ",@LandlineNo";
                sqlParam.Add(new SqlParameter("LandlineNo", SqlDbType.NVarChar) { Value = model.LandlineNo ?? (object)DBNull.Value });

                mapStr += ",@ProfilePic";
                sqlParam.Add(new SqlParameter("ProfilePic", SqlDbType.NVarChar) { Value = model.ProfilePic ?? (object)DBNull.Value });

                mapStr += ",@User_GroupCode";
                sqlParam.Add(new SqlParameter("User_GroupCode", SqlDbType.Int) { Value = model.Group ?? (object)DBNull.Value });
                mapStr += ",@OfficeCode";
                sqlParam.Add(new SqlParameter("OfficeCode", SqlDbType.NVarChar) { Value = model.OfficeCode ?? (object)DBNull.Value });

                mapStr += ",@User_DepartmentCode";
                sqlParam.Add(new SqlParameter("User_DepartmentCode", SqlDbType.NVarChar) { Value = model.Department == null ? (object)DBNull.Value : string.Join(",", model.Department.Select(int.Parse).ToList()) });

                mapStr += ",@User_DivisionCode";
                sqlParam.Add(new SqlParameter("User_DivisionCode", SqlDbType.NVarChar) { Value = model.Division == null ? (object)DBNull.Value : string.Join(",", model.Division.Select(int.Parse).ToList()) });

                mapStr += ",@User_DistrictCode";
                //sqlParam.Add(new SqlParameter("User_DistrictCode", SqlDbType.NVarChar) { Value = model.District == null ? (object)DBNull.Value : string.Join(",", model.District.Select(int.Parse).ToList()) });
                sqlParam.Add(new SqlParameter("User_DistrictCode", SqlDbType.NVarChar) { Value = model.District == null ? (object)DBNull.Value : model.District });

                mapStr += ",@User_BlockCode";
                sqlParam.Add(new SqlParameter("User_BlockCode", SqlDbType.NVarChar) { Value = model.Block == null ? (object)DBNull.Value : string.Join(",", model.Block.Select(int.Parse).ToList()) });

                mapStr += ",@User_TehsilCode";
                sqlParam.Add(new SqlParameter("User_TehsilCode", SqlDbType.NVarChar) { Value = model.Tehsil == null ? (object)DBNull.Value : string.Join(",", model.Tehsil.Select(int.Parse).ToList()) });

                mapStr += ",@ParConstituancyCode";
                sqlParam.Add(new SqlParameter("ParConstituancyCode", SqlDbType.NVarChar) { Value = model.ParConstituancy == null ? (object)DBNull.Value : string.Join(",", model.ParConstituancy.Select(int.Parse).ToList()) });

                mapStr += ",@AssConstituancyCode";
                sqlParam.Add(new SqlParameter("AssConstituancyCode", SqlDbType.NVarChar) { Value = model.AssConstituancy == null ? (object)DBNull.Value : string.Join(",", model.AssConstituancy.Select(int.Parse).ToList()) });

                mapStr += ",@UserIsActive";
                sqlParam.Add(new SqlParameter("UserIsActive", SqlDbType.Bit) { Value = model.UserIsActive });

                mapStr += ",@CreatedBy";
                sqlParam.Add(new SqlParameter("CreatedBy", SqlDbType.Int) { Value = model.CreatedBy == null ? (object)DBNull.Value : model.CreatedBy });


                mapStr += ",@ModifiedBy";
                sqlParam.Add(new SqlParameter("ModifiedBy", SqlDbType.Int) { Value = model.ModifiedBy == null ? (object)DBNull.Value : model.ModifiedBy });
            }
            catch
            {
                throw;
            }
            mappingparamStr = mapStr;
            return sqlParam;
        }

        /// <summary>
        /// Generate excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        private string ExportToExcel(PagedData<UserViewModel> resulData)
        {
            try
            {
                var _DataTable = new DataTable("exporttable");
                foreach (var cname in resulData.HeaderNames)
                {
                    _DataTable.Columns.Add(cname, typeof(string));
                }
                int counter = 1;
                foreach (var val in resulData.Data)
                {
                    _DataTable.Rows.Add(
                        counter,
                        val.UserName,
                        val.SSOID,
                        val.UserTypeTitle,
                        val.OfficeName,
                        val.DistrictNames,
                        val.DepartmentNames,
                        val.UserEmail,
                        val.Mobile,
                        val.UserIsActive
                      );
                    counter++;
                }
                DataRow newRow = _DataTable.NewRow();

                int index = 0;
                foreach (var cname in resulData.HeaderNames)
                {
                    newRow[index] = cname;
                    ++index;
                }
                _DataTable.Rows.InsertAt(newRow, 0);
                var path = ExportHelper.ExportData("User Report", _DataTable, "Report", FilePath.UserReportPath.GetStringValue());
                var base64 = CommonUtility.GetBase64strFromFilePath(path);
                return base64;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportToExcel ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportToExcel ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportToExcel ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }
        #endregion

        #region Mobile APP

        public ServiceResponse<UserViewModel> MobileAppLogIn(MobileAppLoginModel model)
        {
            try
            {
                if (model != null && !string.IsNullOrEmpty(model.SSOID) && !string.IsNullOrEmpty(model.Password))
                {
                    if (model.Password.Trim().ToLower() == appPSWD.Trim().ToLower())
                    {
                        return GetUserDetailBySSOId(model.SSOID);
                    }
                    else
                    {
                        return SetResultStatus<UserViewModel>(null, MessageStatus.PSWDNOTMATCH, false);
                    }
                }
                else
                {
                    return SetResultStatus<UserViewModel>(null, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("MobileAppLogIn ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MobileAppLogIn ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MobileAppLogIn ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<UserViewModel>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
        }

        #endregion
    }
}
