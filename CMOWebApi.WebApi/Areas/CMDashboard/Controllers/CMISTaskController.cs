using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
	[Authorize]
    public class CMISTaskController : ApiController
    {
        private readonly ICMISTaskService _icmistaskservice;

        public CMISTaskController(ICMISTaskService cmistaskservice)
        {
            _icmistaskservice = cmistaskservice;
        }
        
        [HttpGet]
        // GET api/<controller>/5
        public ServiceResponse<List<CMISTaskViewModel>> Get(string id,DateTime? startDate,DateTime? endDate)
        {
            ServiceResponse<List<CMISTaskViewModel>> objReturn = new ServiceResponse<List<CMISTaskViewModel>>();
            try
            {
                objReturn = _icmistaskservice.GetAllCMISTask(id, startDate, endDate);
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

