using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Services.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class ProjectMonitoringController : ApiController
    {
        private readonly IProjectMonitoringService _projectmonitoringservice;

        public ProjectMonitoringController(ProjectMonitoringService projectmonitoringservice)
        {
            _projectmonitoringservice = projectmonitoringservice;
        }

        [HttpGet]
        // GET api/<controller>/5
        public ServiceResponse<List<ProjectMonitoringViewModel>> Get(string departmentCode, DateTime? startDate, DateTime? endDate)
        {
            ServiceResponse<List<ProjectMonitoringViewModel>> objReturn = new ServiceResponse<List<ProjectMonitoringViewModel>>();
            try
            {
                objReturn = _projectmonitoringservice.GetAllProjectMonitoring(departmentCode, startDate, endDate);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

    }
}
