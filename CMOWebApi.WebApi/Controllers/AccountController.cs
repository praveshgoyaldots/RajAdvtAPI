using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Controllers
{
    // [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountController : ApiController
    {
        #region ///   Variable   ///
        private readonly ISSOService _ssoService;
        private readonly IUserManagementService _userService;
        private readonly IUserPermissionService _userPermissionService;
        private readonly IMenuService _menuService;
        #endregion

        #region ///    Constructor   ///
        public AccountController(ISSOService ssoService, IUserPermissionService userPermissionService, IUserManagementService userService, IMenuService menuService)
        {
            this._ssoService = ssoService;
            this._userPermissionService = userPermissionService;
            this._userService = userService;
            this._menuService = menuService;
        }
        #endregion

        #region ///   Method   ///
        /// <summary>
        /// Check logged-in user and get their details.
        /// </summary>
        /// <returns>Method returns LoggedInUserDetailViewModel in service response.</returns>
        [HttpGet]
        public ServiceResponse<LoggedInUserDetailViewModel> LogIn(string ssoId = "ROHITJAIN.DOIT")
        {
            ServiceResponse<LoggedInUserDetailViewModel> response = new ServiceResponse<LoggedInUserDetailViewModel>();
            try
            {
                ServiceResponse<UserViewModel> resUserDetail = new ServiceResponse<UserViewModel>();
                LoggedInUserDetailViewModel model = new LoggedInUserDetailViewModel();
                bool resIsSuccess = false;
                string resMessage = MessageStatus.Error;
                int resStatusCode = ResponseStatusCode.error;

                if (!string.IsNullOrEmpty(ssoId))
                {
                    //this condition is added for vertual machine only as discuss by saini sir 25-12-2019
                    // if (ssoId.ToLower()== "VISHALJANGIR.DOIT".ToLower())
                    {
                        resUserDetail = _userService.GetUserDetailBySSOId(ssoId);
                        if (resUserDetail.IsSuccess && resUserDetail.Data != null)
                        {
                            model.UserViewModel = resUserDetail.Data;
                            model.AssignedUserPagePermissionViewModelList = _userPermissionService.GetAssignedUserPagePermissions(resUserDetail.Data.UserId).Data;
                            model.UserMenuViewModelList = _menuService.GetAll(model.AssignedUserPagePermissionViewModelList).Data;
                            model.Token = new TokenValidationHandler().createToken(model.UserViewModel.UserId.ToString() + "~" + model.UserViewModel.UserName);

                            resIsSuccess = true;
                            resMessage = MessageStatus.Success;
                            resStatusCode = ResponseStatusCode.ok;
                        }
                        else
                        {
                            resIsSuccess = false;
                            resMessage = resUserDetail.Message;
                            resStatusCode = resUserDetail.StatusCode;
                        }
                    }
                }
                response.Data = model;
                response.IsSuccess = resIsSuccess;
                response.Message = resMessage;
                response.StatusCode = resStatusCode;
                //response.FilesizeValidation = resUserDetail.FilesizeValidation;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AccountController/ LogIn", ex, ssoId);

                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.Exception = ex.Message;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }

        [HttpPost]
        public void SaveLoginUserLog(LoginUserLogModel model)
        {
            try
            {
                if (model != null)
                {
                    _userService.SaveLoginUserLog(model);
                }

            }
            catch
            {
            }
        }


        /// <summary>
        /// Logout user from SSO.
        /// </summary>
        /// <returns>Method returns void.</returns>
        [HttpGet]
        public void LogOut()
        {
            try
            {
                _ssoService.Logout();
            }
            catch
            {
            }
        }

        /// <summary>
        /// User back to SSO.
        /// </summary>
        /// <returns>Method returns void.</returns>
        [HttpGet]
        public void BackToSSO()
        {
            try
            {
                _ssoService.BackToSSO();
            }
            catch
            {
            }
        }

        [HttpPost]
        public IHttpActionResult MobileAppLogIn(MobileAppLoginModel model)
        {
            try
            {
                return Ok(_userService.MobileAppLogIn(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        #endregion
    }
}