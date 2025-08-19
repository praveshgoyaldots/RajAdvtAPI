using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class GovtOrderDashboardController : ApiController
    {

        private readonly IGovtOrderService _govtorderservice;

        // GET: api/GovtOrder
        public GovtOrderDashboardController(GovtOrderService govtorderservice)
            {
            _govtorderservice = govtorderservice;
            }

        [HttpGet]
        // GET api/<controller>/5
        public ServiceResponse<List<GovtOrderViewModel>> Get(string departmentCode, DateTime? startDate, DateTime? endDate)

            {
            ServiceResponse<List<GovtOrderViewModel>> objReturn = new ServiceResponse<List<GovtOrderViewModel>>();
            try
                {
                objReturn = _govtorderservice.GetAllGovtOrder(departmentCode, startDate, endDate);
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
