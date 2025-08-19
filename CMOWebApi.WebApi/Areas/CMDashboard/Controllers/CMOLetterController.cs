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
    public class CMOLetterController : ApiController
    {
        private readonly ICMOLetterService _icmoletterservice;

        public CMOLetterController(ICMOLetterService cmoletterservice)
        {
            _icmoletterservice = cmoletterservice;
        }


        [HttpGet]
        // GET api/<controller>/5
        public ServiceResponse<List<CMOLetterViewModel>> Get(string id)
        {
            ServiceResponse<List<CMOLetterViewModel>> objReturn = new ServiceResponse<List<CMOLetterViewModel>>();
            try
            {
                objReturn = _icmoletterservice.GetAllCMOLetter(id);
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
