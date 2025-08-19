//using CMOWebApi.Core;
//using CMOWebApi.Models.GeneralModel;
//using CMOWebApi.Models.LMSModel;
//using CMOWebApi.Services.IServices;
//using CMOWebApi.Services.ServiceHelper;
//using System.Web.Http;

//namespace CMOWebApi.WebAPI.Areas.LMS.Controllers
//{
//    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
//    public class ReportController : ApiController
//    {
//        // GET: api/LMS/Report
//        private readonly ILMS_ReportService _lmsReportService;
//        public ReportController(ILMS_ReportService lmsReportService)
//        {
//            this._lmsReportService = lmsReportService;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<StatisticalReportViewModel>> GetStatisticalReport(ReportIndexModel<ReportSearchViewModel> indexModel, string userId, string groupBy1, string groupBy2)
//        {
//            ServiceResponse<PagedData<StatisticalReportViewModel>> response = new ServiceResponse<PagedData<StatisticalReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetStatisticalReportData(indexModel, userId, groupBy1, groupBy2);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<DetailReportViewModel>> GetDetailReport(ReportIndexModel<ReportSearchViewModel> indexModel, string userId)
//        {
//            ServiceResponse<PagedData<DetailReportViewModel>> response = new ServiceResponse<PagedData<DetailReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetDetailReportData(indexModel, userId);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<AgeWiseCountReportViewModel>> GetAdminDepartmentAgeWiseCountReport(IndexModel indexModel, string userId)
//        {
//            ServiceResponse<PagedData<AgeWiseCountReportViewModel>> response = new ServiceResponse<PagedData<AgeWiseCountReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetAdminDepartmentAgeWiseCountReportData(indexModel, userId);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<AgeWiseCountReportViewModel>> GetDepartmentAgeWiseCountReport(IndexModel indexModel, string userId, int? adminDepartmentCode)
//        {
//            ServiceResponse<PagedData<AgeWiseCountReportViewModel>> response = new ServiceResponse<PagedData<AgeWiseCountReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetDepartmentAgeWiseCountReportData(indexModel, userId, adminDepartmentCode);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<DetailReportViewModel>> GetActionHistoryReport(ReportIndexModel<ReportSearchViewModel> indexModel, string userId)
//        {
//            ServiceResponse<PagedData<DetailReportViewModel>> response = new ServiceResponse<PagedData<DetailReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetActionHistoryReportData(indexModel, userId);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<Last6MonthCountReportViewModel>> GetAdminDepartmentLast6MonthCountReport(IndexModel indexModel, string userId)
//        {
//            ServiceResponse<PagedData<Last6MonthCountReportViewModel>> response = new ServiceResponse<PagedData<Last6MonthCountReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetAdminDepartmentLast6MonthCountReportData(indexModel, userId);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }

//        [HttpPost]
//        public ServiceResponse<PagedData<Last6MonthCountReportViewModel>> GetDepartmentLast6MonthCountReport(IndexModel indexModel, string userId, int? adminDepartmentCode)
//        {
//            ServiceResponse<PagedData<Last6MonthCountReportViewModel>> response = new ServiceResponse<PagedData<Last6MonthCountReportViewModel>>();
//            try
//            {
//                response = _lmsReportService.GetDepartmentLast6MonthCountReportData(indexModel, userId, adminDepartmentCode);
//                response.StatusCode = ResponseStatusCode.ok;
//            }
//            catch
//            {
//                response.Data = null;
//                response.IsSuccess = false;
//                response.Message = MessageStatus.Error;
//                response.StatusCode = ResponseStatusCode.error;
//            }
//            return response;
//        }


//    }
//}