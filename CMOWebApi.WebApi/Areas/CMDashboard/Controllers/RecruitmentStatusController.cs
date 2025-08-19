using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize] 
    public class RecruitmentStatusController : ApiController
    {

        private readonly IRecruitmentStatusService _irecruitmentstatusservice;


        public RecruitmentStatusController(IRecruitmentStatusService irecruitmentstatusservice)
        {
            _irecruitmentstatusservice = irecruitmentstatusservice;
        }

        [HttpGet]
        // GET api/<controller>/5
        public ServiceResponse<List<RecruitmentStatusViewModel>> Get(string Id, DateTime? startDate, DateTime? endDate)
        {
            ServiceResponse<List<RecruitmentStatusViewModel>> objReturn = new ServiceResponse<List<RecruitmentStatusViewModel>>();
            try
            {
                objReturn = _irecruitmentstatusservice.GetAllRecruitmentStatus(Id, startDate, endDate);
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
