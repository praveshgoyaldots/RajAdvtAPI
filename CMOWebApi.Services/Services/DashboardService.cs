//using AutoMapper;
//using CMOWebApi.Core;
//using CMOWebApi.Data;
//using CMOWebApi.Data.UnitOfWork;
//using CMOWebApi.Models.LMSModel;
//using CMOWebApi.Services.IServices;
//using CMOWebApi.Services.ServiceHelper;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;

//namespace CMOWebApi.Services.Services
//{
//    public class DashboardService : BaseService, IDashboardService
//    {
//        IUnitofWork _uow;
//        public DashboardService(IUnitofWork uow)
//        {
//            _uow = uow;
//        }

//        /// <summary>
//        /// Get Department Notification Count Report
//        /// </summary>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DepartmentNotificaionCountViewModel list</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<List<DepartmentNotificaionCountViewModel>> GetDepartmentNotificationCountReport(int userId)
//        {
//            ServiceResponse<List<DepartmentNotificaionCountViewModel>> response = new ServiceResponse<List<DepartmentNotificaionCountViewModel>>();
//            List<DepartmentNotificaionCountViewModel> modelList = new List<DepartmentNotificaionCountViewModel>();
//            try
//            {
//                var dataList = _uow.ExeccuteStoreProcedure<spGetDeptDashboardNotificaions_Result>("spGetDeptDashboardNotificaions @UserId",
//                        new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
//                    ).ToList();

//                if (dataList != null && dataList.Count > 0)
//                {
//                    Mapper.Initialize(x =>
//                    {
//                        x.CreateMap<spGetDeptDashboardNotificaions_Result, DepartmentNotificaionCountViewModel>();
//                    });
//                    modelList = Mapper.Map<List<spGetDeptDashboardNotificaions_Result>, List<DepartmentNotificaionCountViewModel>>(dataList);
//                }
//                response = SetResultStatus<List<DepartmentNotificaionCountViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<List<DepartmentNotificaionCountViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Department Action Status Count Report
//        /// </summary>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DepartmentActionStatusCountViewModel list</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<List<DepartmentActionStatusCountViewModel>> GetDepartmentActionStatusCountReport(int userId)
//        {
//            ServiceResponse<List<DepartmentActionStatusCountViewModel>> response = new ServiceResponse<List<DepartmentActionStatusCountViewModel>>();
//            List<DepartmentActionStatusCountViewModel> modelList = new List<DepartmentActionStatusCountViewModel>();
//            try
//            {
//                var dataList = _uow.ExeccuteStoreProcedure<spGetDepartmentActionStatusCount_Result>("spGetDepartmentActionStatusCount @UserId",
//                        new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
//                    ).ToList();

//                if (dataList != null && dataList.Count > 0)
//                {
//                    Mapper.Initialize(x =>
//                    {
//                        x.CreateMap<spGetDepartmentActionStatusCount_Result, DepartmentActionStatusCountViewModel>();
//                    });
//                    modelList = Mapper.Map<List<spGetDepartmentActionStatusCount_Result>, List<DepartmentActionStatusCountViewModel>>(dataList);
//                }
//                response = SetResultStatus<List<DepartmentActionStatusCountViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<List<DepartmentActionStatusCountViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Department Action Age Wise Count Report
//        /// </summary>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DepartmentActionAgeWiseCountViewModel list</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<List<DepartmentActionAgeWiseCountViewModel>> GetDepartmentActionAgeWiseCountReport(int userId)
//        {
//            ServiceResponse<List<DepartmentActionAgeWiseCountViewModel>> response = new ServiceResponse<List<DepartmentActionAgeWiseCountViewModel>>();
//            List<DepartmentActionAgeWiseCountViewModel> modelList = new List<DepartmentActionAgeWiseCountViewModel>();
//            try
//            {
//                var dataList = _uow.ExeccuteStoreProcedure<spGetDeptActionAgeWiseCount_Result>("spGetDeptActionAgeWiseCount @UserId",
//                        new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
//                    ).ToList();

//                if (dataList != null && dataList.Count > 0)
//                {
//                    Mapper.Initialize(x =>
//                    {
//                        x.CreateMap<spGetDeptActionAgeWiseCount_Result, DepartmentActionAgeWiseCountViewModel>();
//                    });
//                    modelList = Mapper.Map<List<spGetDeptActionAgeWiseCount_Result>, List<DepartmentActionAgeWiseCountViewModel>>(dataList);
//                }
//                response = SetResultStatus<List<DepartmentActionAgeWiseCountViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<List<DepartmentActionAgeWiseCountViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Department Last 6 Month Action Count Report
//        /// </summary>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DepartmentLast6MonthActionCountViewModel list</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<List<DepartmentLast6MonthActionCountViewModel>> GetDepartmentLast6MonthActionCountReport(int userId)
//        {
//            ServiceResponse<List<DepartmentLast6MonthActionCountViewModel>> response = new ServiceResponse<List<DepartmentLast6MonthActionCountViewModel>>();
//            List<DepartmentLast6MonthActionCountViewModel> modelList = new List<DepartmentLast6MonthActionCountViewModel>();
//            try
//            {
//                var dataList = _uow.ExeccuteStoreProcedure<spGetDeptActionLast6MonthCount_Result>("spGetDeptActionLast6MonthCount @UserId",
//                        new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
//                    ).ToList();

//                if (dataList != null && dataList.Count > 0)
//                {
//                    Mapper.Initialize(x =>
//                    {
//                        x.CreateMap<spGetDeptActionLast6MonthCount_Result, DepartmentLast6MonthActionCountViewModel>();
//                    });
//                    modelList = Mapper.Map<List<spGetDeptActionLast6MonthCount_Result>, List<DepartmentLast6MonthActionCountViewModel>>(dataList);
//                }
//                response = SetResultStatus<List<DepartmentLast6MonthActionCountViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<List<DepartmentLast6MonthActionCountViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Department Dashboard Report
//        /// </summary>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DepartmentDashboardViewModel</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<DepartmentDashboardViewModel> GetDepartmentDashboardReportData(int userId)
//        {
//            ServiceResponse<DepartmentDashboardViewModel> response = new ServiceResponse<DepartmentDashboardViewModel>();
//            try
//            {
//                DepartmentDashboardViewModel model = new DepartmentDashboardViewModel();

//                model.NotificaionCountList = GetDepartmentNotificationCountReport(userId).Data;
//                model.ActionStatusCountList = GetDepartmentActionStatusCountReport(userId).Data;
//                model.ActionAgeWiseCountList = GetDepartmentActionAgeWiseCountReport(userId).Data;
//                model.Last6MonthActionCountList = GetDepartmentLast6MonthActionCountReport(userId).Data;

//                response = SetResultStatus<DepartmentDashboardViewModel>(model, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<DepartmentDashboardViewModel>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//    }
//}
