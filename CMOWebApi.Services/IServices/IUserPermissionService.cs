using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
    public interface IUserPermissionService
    {
        #region Default Page Permission
        /// <summary>
        /// Get default permissions by user type and application
        /// </summary>
        /// <param name="applicationCode"></param>
        /// <param name="userType"></param>
        /// <returns>Method returns DefaultPagePermissionViewModel list ServiceResponse.</returns>
        ServiceResponse<List<DefaultPagePermissionViewModel>> GetDefaultPagePermissions(string applicationCode, string userType);

        /// <summary>
        /// Save default page permissions
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns>Method returns string ServiceResponse.</returns>
        ServiceResponse<string> SaveDefaultPagePermission(List<DefaultPagePermissionViewModel> modelList);
        #endregion

        #region User Page Permission
        /// <summary>
        /// Get user page permissions by application
        /// </summary>
        /// <param name="applicationCode"></param>
        /// <param name="userId"></param>
        /// <returns>Method returns AppUserPagePermissionViewModel list ServiceResponse.</returns>

        ServiceResponse<List<AppUserPagePermissionViewModel>> GetUserPagePermissionsByApplication(string applicationCode, int userId);



        #region User Default Page Permission
        /// <summary>
        /// Get user Default page permissions by application
        /// </summary>
        /// <param name="applicationCode"></param>
        /// <param name="userId"></param>
        /// <returns>Method returns DefaultPagePermissionViewModel list ServiceResponse.</returns>

        ServiceResponse<List<DefaultPagePermissionViewModel>> GetUserPagePermissionsByApplicationGetDefault(string applicationCode, int userId);

        #endregion




        /// <summary>
        /// Save user page permissions
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns>Method returns string ServiceResponse.</returns>
        ServiceResponse<string> SaveUserPagePermissions(List<AppUserPagePermissionViewModel> modelList);
        #endregion

        /// <summary>
        /// Get assigned page permissions of user for all applications
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Method returns AssignedUserPagePermissionViewModel list ServiceResponse.</returns>
        ServiceResponse<List<AssignedUserPagePermissionViewModel>> GetAssignedUserPagePermissions(int userId);

    }
}
