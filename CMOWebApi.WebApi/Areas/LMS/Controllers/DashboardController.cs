//using CMOWebApi.Core;
//using CMOWebApi.Models.LMSModel;
//using CMOWebApi.Services.IServices;
//using CMOWebApi.Services.ServiceHelper;
//using System;
//using System.Web.Http;

//namespace CMOWebApi.WebAPI.Areas.LMS.Controllers
//{
//    [Authorize]
//    public class DashboardController : ApiController
//    {
//        // GET: LMS/Dashboard
//        private readonly IDashboardService _dashboardService;
//        public DashboardController(IDashboardService dashboardService)
//        {
//            this._dashboardService = dashboardService;
//        }

//        [HttpGet]
//        public ServiceResponse<DepartmentDashboardViewModel> GetDepartmentDashboardReport(string id)
//        {
//            ServiceResponse<DepartmentDashboardViewModel> response = new ServiceResponse<DepartmentDashboardViewModel>();
//            try
//            {
//                response = _dashboardService.GetDepartmentDashboardReportData(Convert.ToInt32(id));
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