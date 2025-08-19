//using AutoMapper;
//using CMOWebApi.Core;
//using CMOWebApi.Core.Enums;
//using CMOWebApi.Data;
//using CMOWebApi.Data.UnitOfWork;
//using CMOWebApi.Models.CommonModel;
//using CMOWebApi.Models.GeneralModel;
//using CMOWebApi.Models.LMSModel;
//using CMOWebApi.Services.IServices;
//using CMOWebApi.Services.ServiceHelper;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.Entity.Core.Objects;
//using System.Data.SqlClient;
//using System.Linq;
//using static CMOWebApi.Core.Enums.FixedValues;

//namespace CMOWebApi.Services.Services
//{
//    public class LMS_ReportService : BaseService, ILMS_ReportService
//    {
//        IUnitofWork _uow;
//        public LMS_ReportService(IUnitofWork uow)
//        {
//            _uow = uow;
//        }

//        /// <summary>
//        /// Generate model to advance search query.
//        /// </summary>
//        /// <param name="searchModel"></param>
//        /// <returns>Method return string value</returns>
//        /// <developer>Harry</developer>
//        public string GetReportSearchQuery(ReportSearchViewModel searchModel)
//        {
//            string AdvSearchText = string.Empty;
//            List<AdvanceSearchParameter> searchParamList = new List<AdvanceSearchParameter>();

//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterId", Value = searchModel.RefNoFrom, Type = DBFilterType.Number_From.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterId", Value = searchModel.RefNoTo, Type = DBFilterType.Number_To.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterSubject", Value = searchModel.Subject, Type = DBFilterType.nVarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterSenderName", Value = searchModel.SenderName, Type = DBFilterType.nVarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterSenderAddress", Value = searchModel.Address, Type = DBFilterType.nVarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterSender_Mobile", Value = searchModel.Mobile, Type = DBFilterType.VarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "DepartmentActions", Value = searchModel.ActionTakenByDepartment, Type = DBFilterType.nVarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "CMOActions", Value = searchModel.ActionTakenByCMO, Type = DBFilterType.nVarChar.GetStringValue() });

//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "Letter_CommentGroupCode", Value = searchModel.CommentingOfficerCode, Type = DBFilterType.Int.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "Letter_ReferenceeCode", Value = searchModel.ReferenceeCode, Type = DBFilterType.Int.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "Letter_DepartmentCode", Value = searchModel.DepartmentCode, Type = DBFilterType.Int.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "Last_DepartmentActionStatus", Value = searchModel.DepartmentStatusCode, Type = DBFilterType.VarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "Last_CMOActionStatus", Value = searchModel.CMOStatusCode, Type = DBFilterType.VarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "Letter_GroupCode", Value = searchModel.OfficerGroupCode, Type = DBFilterType.Int.GetStringValue() });

//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterEntryDate", Value = searchModel.EntryDateFrom, Type = DBFilterType.Date_From.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterEntryDate", Value = searchModel.EntryDateTo, Type = DBFilterType.Date_To.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "DepartmentActionDates", Value = searchModel.DepartmentActionDateFrom, Type = DBFilterType.DateFrom_MultiDateString.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "DepartmentActionDates", Value = searchModel.DepartmentActionDateTo, Type = DBFilterType.DateTo_MultiDateString.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "CMOActionDates", Value = searchModel.CMOActionDateFrom, Type = DBFilterType.DateFrom_MultiDateString.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "CMOActionDates", Value = searchModel.CMOActionDateTo, Type = DBFilterType.DateTo_MultiDateString.GetStringValue() });

//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "LetterType", Value = searchModel.LetterType, Type = DBFilterType.VarChar.GetStringValue() });
//            searchParamList.Add(new AdvanceSearchParameter { FieldName = "HaveAttachment", Value = searchModel.haveAttachment, Type = DBFilterType.Bit.GetStringValue() });

//            AdvSearchText = CommonUtility.BuildAdvanceSearchText(searchParamList);
//            return AdvSearchText;
//        }

//        /// <summary>
//        /// Get Statistical Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <param name="groupBy1"></param>
//        /// <param name="groupBy2"></param>
//        /// <returns>Method returns StatisticalReportViewModel list</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<StatisticalReportViewModel>> GetStatisticalReportData(ReportIndexModel<ReportSearchViewModel> indexModel, string userId, string groupBy1, string groupBy2)
//        {
//            ServiceResponse<PagedData<StatisticalReportViewModel>> response = new ServiceResponse<PagedData<StatisticalReportViewModel>>();
//            PagedData<StatisticalReportViewModel> modelList = new PagedData<StatisticalReportViewModel>();
//            try
//            {
//                string advanceSearchQry = GetReportSearchQuery(indexModel.AdvanceSearchModel);
//                object[] spParam = new object[4];
//                spParam[0] = Convert.ToInt32(userId);
//                spParam[1] = advanceSearchQry;
//                spParam[2] = groupBy1;
//                spParam[3] = groupBy2;

//                PagedData<spLMS_GetStatisticalReport_Result> reportDataListView = GenericGridCall<spLMS_GetStatisticalReport_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.ReportName1, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetStatisticalReport_Result, StatisticalReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;
                
//                response = SetResultStatus<PagedData<StatisticalReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<StatisticalReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Detail Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DetailReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<DetailReportViewModel>> GetDetailReportData(ReportIndexModel<ReportSearchViewModel> indexModel, string userId)
//        {
//            ServiceResponse<PagedData<DetailReportViewModel>> response = new ServiceResponse<PagedData<DetailReportViewModel>>();
//            PagedData<DetailReportViewModel> modelList = new PagedData<DetailReportViewModel>();
//            try
//            {
//                string advanceSearchQry = GetReportSearchQuery(indexModel.AdvanceSearchModel);
//                object[] spParam = new object[2];
//                spParam[0] = Convert.ToInt32(userId);
//                spParam[1] = advanceSearchQry;

//                PagedData<spLMS_GetDetailReport_Result> reportDataListView = GenericGridCall<spLMS_GetDetailReport_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.LetterEntryDate, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetDetailReport_Result, DetailReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;

//                response = SetResultStatus<PagedData<DetailReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<DetailReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Admin Department Age Wise Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns AgeWiseCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<AgeWiseCountReportViewModel>> GetAdminDepartmentAgeWiseCountReportData(IndexModel indexModel, string userId)
//        {
//            ServiceResponse<PagedData<AgeWiseCountReportViewModel>> response = new ServiceResponse<PagedData<AgeWiseCountReportViewModel>>();
//            PagedData<AgeWiseCountReportViewModel> modelList = new PagedData<AgeWiseCountReportViewModel>();
//            try
//            {
//                object[] spParam = new object[1];
//                spParam[0] = Convert.ToInt32(userId);

//                PagedData<spLMS_GetAdminDepartmentAgeWiseCountReport_Result> reportDataListView = GenericGridCall<spLMS_GetAdminDepartmentAgeWiseCountReport_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.Title, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetAdminDepartmentAgeWiseCountReport_Result, AgeWiseCountReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;

//                response = SetResultStatus<PagedData<AgeWiseCountReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<AgeWiseCountReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Department Age Wise Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <param name="adminDepartmentCode"></param>
//        /// <returns>Method returns AgeWiseCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<AgeWiseCountReportViewModel>> GetDepartmentAgeWiseCountReportData(IndexModel indexModel, string userId, int? adminDepartmentCode)
//        {
//            ServiceResponse<PagedData<AgeWiseCountReportViewModel>> response = new ServiceResponse<PagedData<AgeWiseCountReportViewModel>>();
//            PagedData<AgeWiseCountReportViewModel> modelList = new PagedData<AgeWiseCountReportViewModel>();
//            try
//            {
//                object[] spParam = new object[2];
//                spParam[0] = Convert.ToInt32(userId);
//                spParam[1] = adminDepartmentCode;

//                PagedData<spLMS_GetDepartmentAgeWiseCountReport_Result> reportDataListView = GenericGridCall<spLMS_GetDepartmentAgeWiseCountReport_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.Title, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetDepartmentAgeWiseCountReport_Result, AgeWiseCountReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;

//                response = SetResultStatus<PagedData<AgeWiseCountReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<AgeWiseCountReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Action History Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DetailReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<DetailReportViewModel>> GetActionHistoryReportData(ReportIndexModel<ReportSearchViewModel> indexModel, string userId)
//        {
//            ServiceResponse<PagedData<DetailReportViewModel>> response = new ServiceResponse<PagedData<DetailReportViewModel>>();
//            PagedData<DetailReportViewModel> modelList = new PagedData<DetailReportViewModel>();
//            try
//            {
//                string advanceSearchQry = GetReportSearchQuery(indexModel.AdvanceSearchModel);
//                object[] spParam = new object[2];
//                spParam[0] = Convert.ToInt32(userId);
//                spParam[1] = advanceSearchQry;

//                PagedData<spLMS_GetLettersForActionHistoryReport_Result> reportDataListView = GenericGridCall<spLMS_GetLettersForActionHistoryReport_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.LetterEntryDate, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetLettersForActionHistoryReport_Result, DetailReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);

//                    #region Get Letter Actions
//                    foreach (var letter in modelList.Data)
//                    {
//                        List<spLMS_GetLetterActionHistory_Result> actionList = _uow.ExeccuteStoreProcedure<spLMS_GetLetterActionHistory_Result>("spLMS_GetLetterActionHistory @UserId,@SearchText,@LetterId",
//                            new SqlParameter("@UserId", SqlDbType.Int) { Value = userId },
//                            new SqlParameter("@SearchText", SqlDbType.NVarChar) { Value = advanceSearchQry },
//                            new SqlParameter("@LetterId", SqlDbType.Int) { Value = letter.LetterId }
//                            ).ToList();

//                        if (actionList != null && actionList.Count > 0)
//                        {
//                            Mapper.Initialize(x =>
//                            {
//                                x.CreateMap<spLMS_GetLetterActionHistory_Result, ActionHistoryViewModel>();
//                            });
//                            letter.ActionHistoryModelList = Mapper.Map<List<spLMS_GetLetterActionHistory_Result>, List<ActionHistoryViewModel>>(actionList);
//                        }
//                    }
//                    #endregion
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;

//                response = SetResultStatus<PagedData<DetailReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<DetailReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Admin Department Last 6 Month Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns Last6MonthCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<Last6MonthCountReportViewModel>> GetAdminDepartmentLast6MonthCountReportData(IndexModel indexModel, string userId)
//        {
//            ServiceResponse<PagedData<Last6MonthCountReportViewModel>> response = new ServiceResponse<PagedData<Last6MonthCountReportViewModel>>();
//            PagedData<Last6MonthCountReportViewModel> modelList = new PagedData<Last6MonthCountReportViewModel>();
//            try
//            {
//                object[] spParam = new object[1];
//                spParam[0] = Convert.ToInt32(userId);

//                PagedData<spLMS_GetAdminDepartmentLast6MonthCount_Result> reportDataListView = GenericGridCall<spLMS_GetAdminDepartmentLast6MonthCount_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.Title, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetAdminDepartmentLast6MonthCount_Result, Last6MonthCountReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;

//                response = SetResultStatus<PagedData<Last6MonthCountReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<Last6MonthCountReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }

//        /// <summary>
//        /// Get Department Last 6 Month Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <param name="adminDepartmentCode"></param>
//        /// <returns>Method returns Last6MonthCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        public ServiceResponse<PagedData<Last6MonthCountReportViewModel>> GetDepartmentLast6MonthCountReportData(IndexModel indexModel, string userId, int? adminDepartmentCode)
//        {
//            ServiceResponse<PagedData<Last6MonthCountReportViewModel>> response = new ServiceResponse<PagedData<Last6MonthCountReportViewModel>>();
//            PagedData<Last6MonthCountReportViewModel> modelList = new PagedData<Last6MonthCountReportViewModel>();
//            try
//            {
//                object[] spParam = new object[2];
//                spParam[0] = Convert.ToInt32(userId);
//                spParam[1] = adminDepartmentCode;

//                PagedData<spLMS_GetDepartmentLast6MonthCount_Result> reportDataListView = GenericGridCall<spLMS_GetDepartmentLast6MonthCount_Result>.ListView(parametersArrayForStoreProcedure: spParam, PageSize: indexModel.PageSize, orderByColumn: x => x.Title, filter: indexModel.Search, orderBy: indexModel.OrderBy, orderByAsc: indexModel.OrderByAsc, page: indexModel.Page);

//                if (reportDataListView != null && reportDataListView.Data.Count() > 0)
//                {
//                    var config = new MapperConfiguration(cfg =>
//                    {
//                        cfg.CreateMap<spLMS_GetDepartmentLast6MonthCount_Result, Last6MonthCountReportViewModel>();
//                    });
//                    IMapper mapper = config.CreateMapper();
//                    modelList.Data = mapper.Map(reportDataListView.Data, modelList.Data);
//                }
//                modelList.TotalRecords = reportDataListView.TotalRecords;
//                modelList.NumberOfPages = reportDataListView.NumberOfPages;
//                modelList.PageSize = indexModel.PageSize;

//                response = SetResultStatus<PagedData<Last6MonthCountReportViewModel>>(modelList, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                response = SetResultStatus<PagedData<Last6MonthCountReportViewModel>>(null, MessageStatus.Error, false);
//            }
//            return response;
//        }


//    }
//}
