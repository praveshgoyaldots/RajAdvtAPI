using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;

namespace CMOWebApi.Services.Services
{
    public class UserPermissionService : BaseService, IUserPermissionService
    {
        IUnitofWork _uow;

        public UserPermissionService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #region Default Page Permission

        /// <summary>
        /// Get default permissions by user type and application
        /// </summary>
        /// <param name="applicationCode"></param>
        /// <param name="userType"></param>
        /// <returns>Method returns DefaultPagePermissionViewModel list ServiceResponse.</returns>
        public ServiceResponse<List<DefaultPagePermissionViewModel>> GetDefaultPagePermissions(string applicationCode, string userType)
        {
            ServiceResponse<List<DefaultPagePermissionViewModel>> response = new ServiceResponse<List<DefaultPagePermissionViewModel>>();
            List<DefaultPagePermissionViewModel> defaultPermissionList = new List<DefaultPagePermissionViewModel>();
            try
            {
                var permissionList = _uow.ExeccuteStoreProcedure<spGetDefaultPermissions_Result>("spGetDefaultPermissions @Application, @UserType",
                    new SqlParameter("@Application", SqlDbType.NVarChar) { Value = applicationCode },
                    new SqlParameter("@UserType", SqlDbType.NVarChar) { Value = userType }
                ).ToList();

                if (permissionList != null && permissionList.Count > 0)
                {
                    foreach (var permission in permissionList)
                    {
                        DefaultPagePermissionViewModel permissionViewModel = new DefaultPagePermissionViewModel();

                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<spGetDefaultPermissions_Result, DefaultPagePermissionViewModel>();
                        });
                        permissionViewModel = Mapper.Map<spGetDefaultPermissions_Result, DefaultPagePermissionViewModel>(permission);
                        defaultPermissionList.Add(permissionViewModel);
                    }
                }

                response = SetResultStatus<List<DefaultPagePermissionViewModel>>(defaultPermissionList, MessageStatus.Success, true);
                return response;
            }
            catch (Exception ex)
            {
                response = SetResultStatus<List<DefaultPagePermissionViewModel>>(null, MessageStatus.Error, false);
            }
            return response;
        }

        /// <summary>
        /// Save default page permissions
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns>Method returns string ServiceResponse.</returns>
        public ServiceResponse<string> SaveDefaultPagePermission(List<DefaultPagePermissionViewModel> modelList)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                if (modelList != null && modelList.Count > 0)
                {
                    foreach (var permission in modelList)
                    {
                        var result = _uow.ExeccuteStoreProcedure("spAddUpdateDefaultPagePermission @DefaultPermissionId,@ApplicationCode,@UserType,@PageCode,@AddPermission,@EditPermission,@DeletePermission,@ViewPermission",
                            new SqlParameter("@DefaultPermissionId", SqlDbType.Int) { Value = permission.DefaultPermissionId },
                            new SqlParameter("@ApplicationCode", SqlDbType.NVarChar) { Value = permission.ApplicationCode },
                            new SqlParameter("@UserType", SqlDbType.NVarChar) { Value = permission.UserType },
                            new SqlParameter("@PageCode", SqlDbType.Int) { Value = permission.PageCode },
                            new SqlParameter("@AddPermission", SqlDbType.Bit) { Value = permission.AddPermission },
                            new SqlParameter("@EditPermission", SqlDbType.Bit) { Value = permission.EditPermission },
                            new SqlParameter("@DeletePermission", SqlDbType.Bit) { Value = permission.DeletePermission },
                            new SqlParameter("@ViewPermission", SqlDbType.Bit) { Value = permission.ViewPermission }
                        );
                        _uow.save();
                    }

                    response = SetResultStatus<string>(null, CustomMessageStatus.DefaultPagePermissionUpdated, true);
                }
                else
                {
                    response = SetResultStatus<string>(null, CustomMessageStatus.DefaultPagePermissionUpdateFailed, false);
                }
            }
            catch (Exception ex)
            {
                response = SetResultStatus<string>(null, CustomMessageStatus.DefaultPagePermissionUpdateFailed, false);
            }
            return response;
        }

        #endregion

        #region User Page Permission

        /// <summary>
        /// Get user page permissions by application
        /// </summary>
        /// <param name="applicationCode"></param>
        /// <param name="userId"></param>
        /// <returns>Method returns AppUserPagePermissionViewModel list ServiceResponse.</returns>
        public ServiceResponse<List<AppUserPagePermissionViewModel>> GetUserPagePermissionsByApplication(string applicationCode, int userId)
        {
            ServiceResponse<List<AppUserPagePermissionViewModel>> response = new ServiceResponse<List<AppUserPagePermissionViewModel>>();
            List<AppUserPagePermissionViewModel> userPermissionList = new List<AppUserPagePermissionViewModel>();
            try
            {
                var permissionList = _uow.ExeccuteStoreProcedure<spGetUserPagePermissionsByApplication_Result>("spGetUserPagePermissionsByApplication @Application, @UserId",
                    new SqlParameter("@Application", SqlDbType.NVarChar) { Value = applicationCode },
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
                ).ToList();

                if (permissionList != null && permissionList.Count > 0)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spGetUserPagePermissionsByApplication_Result, AppUserPagePermissionViewModel>();
                    });
                    IMapper mapper = config.CreateMapper();
                    userPermissionList = mapper.Map(permissionList, userPermissionList);
                }

                response = SetResultStatus<List<AppUserPagePermissionViewModel>>(userPermissionList, MessageStatus.Success, true);
                return response;
            }
            catch (Exception ex)
            {
                response = SetResultStatus<List<AppUserPagePermissionViewModel>>(null, MessageStatus.Error, false);
            }
            return response;
        }


        /// <summary>
        /// Get user page permissions by application
        /// </summary>
        /// <param name="applicationCode"></param>
        /// <param name="userId"></param>
        /// <returns>Method returns AppUserPagePermissionViewModel list ServiceResponse.</returns>
        public ServiceResponse<List<DefaultPagePermissionViewModel>> GetUserPagePermissionsByApplicationGetDefault(string applicationCode, int userId)
        {
            ServiceResponse<List<DefaultPagePermissionViewModel>> response = new ServiceResponse<List<DefaultPagePermissionViewModel>>();
            List<DefaultPagePermissionViewModel> userPermissionList = new List<DefaultPagePermissionViewModel>();
            try
            {
                var permissionList = _uow.ExeccuteStoreProcedure<spGetUserPagePermissionsByApplicationGetDefault_Result>("spGetUserPagePermissionsByApplicationGetDefault @Application, @UserId",
                    new SqlParameter("@Application", SqlDbType.NVarChar) { Value = applicationCode },
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
                ).ToList();

                if (permissionList != null && permissionList.Count > 0)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spGetUserPagePermissionsByApplicationGetDefault_Result, DefaultPagePermissionViewModel>();
                    });
                    IMapper mapper = config.CreateMapper();
                    userPermissionList = mapper.Map(permissionList, userPermissionList);

                }

                response = SetResultStatus<List<DefaultPagePermissionViewModel>>(userPermissionList, MessageStatus.Success, true);
                return response;
            }
            catch (Exception ex)
            {
                response = SetResultStatus<List<DefaultPagePermissionViewModel>>(null, MessageStatus.Error, false);
            }
            return response;
        }





        /// <summary>
        /// Save user page permissions
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns>Method returns string ServiceResponse.</returns>
        public ServiceResponse<string> SaveUserPagePermissions(List<AppUserPagePermissionViewModel> modelList)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                if (modelList != null && modelList.Count > 0)
                {
                    foreach (var permission in modelList)
                    {
                        var result = _uow.ExeccuteStoreProcedure("spAddUpdateUserPagePermission @UserPagePermissionId,@ApplicationCode,@UserId,@PageCode,@AddPermission,@EditPermission,@DeletePermission,@ViewPermission",
                            new SqlParameter("@UserPagePermissionId", SqlDbType.Int) { Value = permission.UserPagePermissionId },
                            new SqlParameter("@ApplicationCode", SqlDbType.NVarChar) { Value = permission.ApplicationCode },
                            new SqlParameter("@UserId", SqlDbType.Int) { Value = permission.UserId },
                            new SqlParameter("@PageCode", SqlDbType.Int) { Value = permission.PageCode },
                            new SqlParameter("@AddPermission", SqlDbType.Bit) { Value = permission.AddPermission },
                            new SqlParameter("@EditPermission", SqlDbType.Bit) { Value = permission.EditPermission },
                            new SqlParameter("@DeletePermission", SqlDbType.Bit) { Value = permission.DeletePermission },
                            new SqlParameter("@ViewPermission", SqlDbType.Bit) { Value = permission.ViewPermission }
                        );
                    }

                    response = SetResultStatus<string>(null, CustomMessageStatus.UserPagePermissionUpdated, true);
                }
                else
                {
                    response = SetResultStatus<string>(null, CustomMessageStatus.UserPagePermissionUpdateFailed, false);
                }
            }
            catch (Exception ex)
            {
                response = SetResultStatus<string>(null, CustomMessageStatus.UserPagePermissionUpdateFailed, false);
            }
            return response;
        }

        #endregion

        /// <summary>
        /// Get assigned page permissions of user for all applications
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Method returns AssignedUserPagePermissionViewModel list ServiceResponse.</returns>
        public ServiceResponse<List<AssignedUserPagePermissionViewModel>> GetAssignedUserPagePermissions(int userId)
        {
            ServiceResponse<List<AssignedUserPagePermissionViewModel>> response = new ServiceResponse<List<AssignedUserPagePermissionViewModel>>();
            List<AssignedUserPagePermissionViewModel> userPermissionList = new List<AssignedUserPagePermissionViewModel>();
            try
            {
                List<spGetAssignedUserPagePermissions_Result> permissionList = _uow.ExeccuteStoreProcedure<spGetAssignedUserPagePermissions_Result>("spGetAssignedUserPagePermissions @UserId", new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }).ToList();

                if (permissionList != null && permissionList.Count > 0)
                {
                    var config = new MapperConfiguration(cfg =>
                       { cfg.CreateMap<spGetAssignedUserPagePermissions_Result, AssignedUserPagePermissionViewModel>(); });
                    IMapper mapper = config.CreateMapper();
                    response.Data = mapper.Map(permissionList, response.Data);
                    response = SetResultStatus(response.Data, MessageStatus.Success, true);
                }
                else
                {
                    response = SetResultStatus<List<AssignedUserPagePermissionViewModel>>(null, MessageStatus.NoRecord, true);

                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("UserPermissionService/ GetAssignedUserPagePermissions", ex, Convert.ToString(userId));
                response = SetResultStatus<List<AssignedUserPagePermissionViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
            return response;
        }

    }
}
