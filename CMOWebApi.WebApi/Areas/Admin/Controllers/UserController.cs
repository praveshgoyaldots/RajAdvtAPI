using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    ///[Authorize]
    public class UserController : ApiController
    {
        // GET: api/User
        private readonly IUserManagementService _userManagementService;
        IndexModel model = null;
        public UserController(IUserManagementService userManagementService, IndexModel Model)
        {
            this._userManagementService = userManagementService;
            this.model = Model;
        }
        [HttpPost]
        public ServiceResponse<PagedData<UserViewModel>> Get(IndexModel model, int loginUserId)
        {
            ServiceResponse<PagedData<UserViewModel>> objReturn = new ServiceResponse<PagedData<UserViewModel>>();
            try
            {
                objReturn = _userManagementService.GetAll(model, loginUserId);    
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;

        }

        // GET: api/User/5
        [HttpGet]
        public ServiceResponse<UserViewModel> Get(int id)
        {
            ServiceResponse<UserViewModel> objReturn = new ServiceResponse<UserViewModel>();
            try
            {
                objReturn = _userManagementService.GetById(id);
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
        // POST: api/User
        public ServiceResponse<string> Post(UserPostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    var customModelState = _userManagementService.VerifyUserModel(model);
                    if (customModelState.IsValid)
                    {
                        //if (!string.IsNullOrEmpty(model.ProfilePic))
                        //{
                        //    var isValid = CommonUtility.IsAllowedMimeType(model.ProfilePic);
                        //    if (isValid.IsSuccess)
                        //    {
                        //        string path = HttpContext.Current.Server.MapPath(FilePath.UserProFileSavePath.GetStringValue());
                        //        model.ProfilePic = CommonUtility.SaveFileFromBase64str(model.ProfilePic, path);
                        //    }
                        //    else
                        //    {
                        //        return isValid;
                        //    }
                        //}
                        objReturn = _userManagementService.AddUpdate(model);
                    }
                    else
                    {
                        IEnumerable<ModelError> allErrors = customModelState.Values.SelectMany(v => v.Errors);
                        objReturn.Data = JsonConvert.SerializeObject(allErrors);
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.InvalidData;
                    }
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        // PUT: api/User/5
        [HttpPost]
        public ServiceResponse<string> Put(int id, UserPostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    var customModelState = _userManagementService.VerifyUserModel(model);
                    if (customModelState.IsValid && id > 0)
                    {
                        model.UserId = id;
                        objReturn = _userManagementService.AddUpdate(model);
                    }
                    else
                    {
                        IEnumerable<ModelError> allErrors = customModelState.Values.SelectMany(v => v.Errors);
                        objReturn.Data = JsonConvert.SerializeObject(allErrors);
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.InvalidData;
                    }
                }     
                else
                {
					//START----Modified By Paras 23-04-2020
					//----------------------------------commented
				   //IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
				   //objReturn.Data = JsonConvert.SerializeObject(allErrors);
				   //objReturn.IsSuccess = false;
				   //objReturn.Message = MessageStatus.InvalidData;
				   //-----------------------------------
					var errors = ModelState.Select(x => x.Value.Errors)
										   .Where(y => y.Count > 0)
										   .ToList();

					objReturn.IsSuccess = false;
					objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
					return objReturn;
					//END
					

				}
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // DELETE: api/User/5
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _userManagementService.UpdateDeleteStatus(id);
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
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _userManagementService.UpdateActiveStatus(id);
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
        //[Route("GetSSODetail/{id}")]
        public ServiceResponse<SSOUserDetailModel> GetSSODetail(string id)
        {
            ServiceResponse<SSOUserDetailModel> objReturn = new ServiceResponse<SSOUserDetailModel>();
            try
            {
                objReturn = _userManagementService.GetSSODetailFromSSO(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        [HttpGet]
        //[Route("IsUserSSOIdExist/{id}")]
        public ServiceResponse<dynamic> IsUserSSOIdExist(string id)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                objReturn = _userManagementService.IsUserSSOIdExist(id);
            }
            catch
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;
        }
        [HttpGet]
        //[Route("IsUserNameExist/{id}")]
        public ServiceResponse<dynamic> IsUserNameExist(string id)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                objReturn = _userManagementService.IsUserNameExist(id);
            }
            catch
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;
        }
        [HttpGet]
        public ServiceResponse<List<UserAdminDepartmentViewModel>> GetAdminDepartment(int userId)
        {
            ServiceResponse<List<UserAdminDepartmentViewModel>> objReturn = new ServiceResponse<List<UserAdminDepartmentViewModel>>();
            try
            {
                objReturn = _userManagementService.GetAdminDepartmentByUserId(userId);
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
        public ServiceResponse<List<UserDepartmentViewModel>> GetDepartment(int id)
        {
            ServiceResponse<List<UserDepartmentViewModel>> objReturn = new ServiceResponse<List<UserDepartmentViewModel>>();
            try
            {
                objReturn = _userManagementService.GetDepartmentByUserId(id);
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
        public ServiceResponse<List<UserOfficeViewModel>> GetOffice(int id)
        {
            ServiceResponse<List<UserOfficeViewModel>> objReturn = new ServiceResponse<List<UserOfficeViewModel>>();
            try
            {
                objReturn = _userManagementService.GetOfficeByUserId(id);
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
        public ServiceResponse<List<UserAchievementSubCategoryViewModel>> GetAchievementSubcategory(int id)
            {
            ServiceResponse<List<UserAchievementSubCategoryViewModel>> objReturn = new ServiceResponse<List<UserAchievementSubCategoryViewModel>>();
            try
                {
                objReturn = _userManagementService.GetAchievementSubCategoryByUserId(id);
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
        public ServiceResponse<List<UserDivisionViewModel>> GetDivision(int id)
        {
            ServiceResponse<List<UserDivisionViewModel>> objReturn = new ServiceResponse<List<UserDivisionViewModel>>();
            try
            {
                objReturn = _userManagementService.GetDivisionByUserId(id);
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
        public ServiceResponse<List<UserDistrictViewModel>> GetDistrict(int id)
        {
            ServiceResponse<List<UserDistrictViewModel>> objReturn = new ServiceResponse<List<UserDistrictViewModel>>();
            try
            {
                objReturn = _userManagementService.GetDistrictByUserId(id);
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
        public ServiceResponse<List<UserTehsilViewModel>> GetTehsil(int id)
        {
            ServiceResponse<List<UserTehsilViewModel>> objReturn = new ServiceResponse<List<UserTehsilViewModel>>();
            try
            {
                objReturn = _userManagementService.GetTehsil(id);
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
        public ServiceResponse<List<UserBlockViewModel>> GetBlock(int id)
        {
            ServiceResponse<List<UserBlockViewModel>> objReturn = new ServiceResponse<List<UserBlockViewModel>>();
            try
            {
                objReturn = _userManagementService.GetBlock(id);
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
        public ServiceResponse<PagedData<UserForNotificationListModel>> GetUseForNotification(UserNotificationFilterModel model)
        {
            ServiceResponse<PagedData<UserForNotificationListModel>> objReturn = new ServiceResponse<PagedData<UserForNotificationListModel>>();
            try
            {
                objReturn = _userManagementService.GetUseForNotification(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;

        }

        [HttpPost]
        public ServiceResponse<string> SendNotificationToUser(UserNotificationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn =  _userManagementService.SendNotificationToUser(model);
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
        public ServiceResponse<string> SaveLoginUserLog()
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            LoginUserLogModel model = new LoginUserLogModel();
            try
            {
                objReturn = _userManagementService.SaveLoginUserLog(model);
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
        /// Get excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> ExportUserData(IndexModel model, int loginUserId)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = _userManagementService.ExportUserData(model, loginUserId);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;

        }

        [HttpGet]
        public ServiceResponse<string> ResetUserSpecificPermission(int id=0, string userType = "")
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn =  _userManagementService.ResetUserSpecificPermission(id, userType);
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
        public IHttpActionResult GetUserPagePermissionByUser(int userId)
        {
            try
            {
                return Ok(_userManagementService.GetUserPagePermissionByUser(userId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetUserTypeWhichHasApefificPermission()
        {
            try
            {
                return Ok(_userManagementService.GetUserTypeWhichHasApefificPermission());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetUserWhichHasApefificPermission(int pageCode)
        {
            try
            {
                return Ok(_userManagementService.GetUserWhichHasApefificPermission(pageCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetUserWhichHasDefaultPermission(int pageCode)
        {
            try
            {
                return Ok(_userManagementService.GetUserWhichHasDefaultPermission(pageCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
