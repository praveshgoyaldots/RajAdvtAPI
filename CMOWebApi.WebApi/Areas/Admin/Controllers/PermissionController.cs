using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class PermissionController : ApiController
    {
        // GET: api/Permission
        private readonly IUserPermissionService _userPermissionService;

        public PermissionController(IUserPermissionService userPermissionService)
        {
            this._userPermissionService = userPermissionService;
        }

        #region Default Page Permission

        [HttpGet]
        public ServiceResponse<List<DefaultPagePermissionViewModel>> GetDefaultPagePermission(string applicationCode, string userType)
        {
            ServiceResponse<List<DefaultPagePermissionViewModel>> response = new ServiceResponse<List<DefaultPagePermissionViewModel>>();
            try
            {
                response = _userPermissionService.GetDefaultPagePermissions(applicationCode, userType);
                response.StatusCode = ResponseStatusCode.ok;
            }
            catch
            {
                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }

        [HttpPost]
        public ServiceResponse<string> SaveDefaultPagePermission(List<DefaultPagePermissionViewModel> modelList)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                if (modelList != null && modelList.Count > 0)
                {
                    return _userPermissionService.SaveDefaultPagePermission(modelList);
                }
                else
                {
                    response.Data = null;
                    response.IsSuccess = false;
                    response.Message = MessageStatus.Error;
                    response.StatusCode = ResponseStatusCode.error;
                }
            }
            catch
            {
                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }

        #endregion

        #region User Page Permission

        [HttpGet]
        public ServiceResponse<List<AppUserPagePermissionViewModel>> GetUserPagePermissionByApplication(string applicationCode, int userId)
        {
            ServiceResponse<List<AppUserPagePermissionViewModel>> response = new ServiceResponse<List<AppUserPagePermissionViewModel>>();
            try
            {
                response = _userPermissionService.GetUserPagePermissionsByApplication(applicationCode, userId);
                response.StatusCode = ResponseStatusCode.ok;
            }
            catch
            {
                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }

        [HttpGet]
        public ServiceResponse<List<DefaultPagePermissionViewModel>> GetUserPagePermissionByApplicationGetDefault(string applicationCode, int userId)
        {
            ServiceResponse<List<DefaultPagePermissionViewModel>> response = new ServiceResponse<List<DefaultPagePermissionViewModel>>();
            try
            {
                response = _userPermissionService.GetUserPagePermissionsByApplicationGetDefault(applicationCode, userId);
                response.StatusCode = ResponseStatusCode.ok;
            }
            catch
            {
                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }







        [HttpPost]
        public ServiceResponse<string> SaveUserPagePermission(List<AppUserPagePermissionViewModel> modelList)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                if (modelList != null && modelList.Count > 0)
                {
                    return _userPermissionService.SaveUserPagePermissions(modelList);
                }
                else
                {
                    response.Data = null;
                    response.IsSuccess = false;
                    response.Message = MessageStatus.Error;
                    response.StatusCode = ResponseStatusCode.error;
                }
            }
            catch
            {
                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }

        #endregion
        
        [HttpGet]
        public ServiceResponse<List<AssignedUserPagePermissionViewModel>> GetAssignedUserPagePermission(int userId)
        {
            ServiceResponse<List<AssignedUserPagePermissionViewModel>> response = new ServiceResponse<List<AssignedUserPagePermissionViewModel>>();
            try
            {
                response = _userPermissionService.GetAssignedUserPagePermissions(userId);
                response.StatusCode = ResponseStatusCode.ok;
            }
            catch
            {
                response.Data = null;
                response.IsSuccess = false;
                response.Message = MessageStatus.Error;
                response.StatusCode = ResponseStatusCode.error;
            }
            return response;
        }

    }
}