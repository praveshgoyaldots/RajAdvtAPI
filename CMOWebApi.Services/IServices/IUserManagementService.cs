using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.ModelBinding;

namespace CMOWebApi.Services.IServices
{
    public interface IUserManagementService
    {
        ServiceResponse<PagedData<UserViewModel>> GetAll(IndexModel model, int userId = 0);
        ServiceResponse<string> AddUpdate(UserPostModel model);

        ServiceResponse<UserViewModel> GetById(int id);

        ServiceResponse<dynamic> IsUserNameExist(string userName);
        ServiceResponse<dynamic> IsUserSSOIdExist(string ssoId);
        ModelStateDictionary VerifyUserModel(UserPostModel model);
        ServiceResponse<SSOUserDetailModel> GetSSODetailFromSSO(string ssoId);

        Task<ServiceResponse<string>> UpdateDeleteStatus(int userId);
        Task<ServiceResponse<string>> UpdateActiveStatus(int userId);

        /// <summary>
        /// Get User Detail By SSOId
        /// </summary>
        /// <param name="ssoId"></param>
        /// <returns>Method returns UserViewModel in ServiceResponse.</returns>
        ServiceResponse<UserViewModel> GetUserDetailBySSOId(string ssoId);

        ServiceResponse<List<UserAdminDepartmentViewModel>> GetAdminDepartmentByUserId(int userId);
        ServiceResponse<List<UserDepartmentViewModel>> GetDepartmentByUserId(int userId);

        ServiceResponse<List<UserOfficeViewModel>> GetOfficeByUserId(int userId);

        ServiceResponse<List<UserAchievementSubCategoryViewModel>> GetAchievementSubCategoryByUserId(int userId);

        ServiceResponse<List<UserDivisionViewModel>> GetDivisionByUserId(int userId);

        ServiceResponse<List<UserDistrictViewModel>> GetDistrictByUserId(int userId);

        ServiceResponse<List<UserTehsilViewModel>> GetTehsil(int userId);

        ServiceResponse<List<UserBlockViewModel>> GetBlock(int userId);

        ServiceResponse<string> SaveLoginUserLog(LoginUserLogModel model);

        ServiceResponse<PagedData<UserForNotificationListModel>> GetUseForNotification(UserNotificationFilterModel model);

        ServiceResponse<string> SendNotificationToUser(UserNotificationModel model);

        /// <summary>
        /// Get excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        ServiceResponse<string> ExportUserData(IndexModel model, int userId = 0);
        ServiceResponse<PagedData<UserViewModel>> GetAllUserDetailByFilter(UserDetailFilterModel model);

        ServiceResponse<string> ResetUserSpecificPermission(int userId=0, string userType = "");
        ServiceResponse<List<UserPagePermissionByUserModel>> GetUserPagePermissionByUser(int userId);
        ServiceResponse<List<UserTypeWhichHasApefificPermissionModel>> GetUserTypeWhichHasApefificPermission();
        ServiceResponse<List<UserWhichHasApefificPermissionModel>> GetUserWhichHasApefificPermission(int pageCode);
        ServiceResponse<List<UserWhichHasDefaultPermissionModel>> GetUserWhichHasDefaultPermission(int pageCode);

        #region Mobile APP
        ServiceResponse<UserViewModel> MobileAppLogIn(MobileAppLoginModel model);
        #endregion
    }
}
