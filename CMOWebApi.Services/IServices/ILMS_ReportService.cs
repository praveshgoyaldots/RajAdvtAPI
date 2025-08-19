//using CMOWebApi.Models.AdminModel.MasterModel;
//using CMOWebApi.Models.GeneralModel;
//using CMOWebApi.Models.LMSModel;
//using CMOWebApi.Services.ServiceHelper;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace CMOWebApi.Services.IServices
//{
//	public interface ILMS_ReportService
//    {
//        /// <summary>
//        /// Generate model to advance search query.
//        /// </summary>
//        /// <param name="searchModel"></param>
//        /// <returns>Method return string value</returns>
//        /// <developer>Harry</developer>
//        string GetReportSearchQuery(ReportSearchViewModel searchModel);

//        /// <summary>
//        /// Get Statistical Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <param name="groupBy1"></param>
//        /// <param name="groupBy2"></param>
//        /// <returns>Method returns StatisticalReportViewModel list</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<StatisticalReportViewModel>> GetStatisticalReportData(ReportIndexModel<ReportSearchViewModel> indexModel, string userId, string groupBy1, string groupBy2);

//        /// <summary>
//        /// Get Detail Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DetailReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<DetailReportViewModel>> GetDetailReportData(ReportIndexModel<ReportSearchViewModel> indexModel, string userId);

//        /// <summary>
//        /// Get Admin Department Age Wise Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns AgeWiseCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<AgeWiseCountReportViewModel>> GetAdminDepartmentAgeWiseCountReportData(IndexModel indexModel, string userId);

//        /// <summary>
//        /// Get Department Age Wise Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <param name="adminDepartmentCode"></param>
//        /// <returns>Method returns AgeWiseCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<AgeWiseCountReportViewModel>> GetDepartmentAgeWiseCountReportData(IndexModel indexModel, string userId, int? adminDepartmentCode);

//        /// <summary>
//        /// Get Action History Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns DetailReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<DetailReportViewModel>> GetActionHistoryReportData(ReportIndexModel<ReportSearchViewModel> indexModel, string userId);

//        /// <summary>
//        /// Get Admin Department Last 6 Month Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <returns>Method returns Last6MonthCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<Last6MonthCountReportViewModel>> GetAdminDepartmentLast6MonthCountReportData(IndexModel indexModel, string userId);

//        /// <summary>
//        /// Get Department Last 6 Month Count Report Data 
//        /// </summary>
//        /// <param name="indexModel"></param>
//        /// <param name="userId"></param>
//        /// <param name="adminDepartmentCode"></param>
//        /// <returns>Method returns Last6MonthCountReportViewModel paged data</returns>
//        /// <developer>Harry</developer>
//        ServiceResponse<PagedData<Last6MonthCountReportViewModel>> GetDepartmentLast6MonthCountReportData(IndexModel indexModel, string userId, int? adminDepartmentCode);

//    }
//}
