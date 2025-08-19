using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class ConfigurationController : ApiController
    {
        private readonly IConfigurationService _configurationService;

        public ConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        // GET: api/Configuration
        [HttpGet]
        public ServiceResponse<ConfigViewModel> GetAll(string userType, string configType, long department = 0, int userId = 0)
        {
            ServiceResponse<ConfigViewModel> objReturn = new ServiceResponse<ConfigViewModel>();
            try
            {
                objReturn = _configurationService.GetAll(userType,configType,department,userId );
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }



        // POST: api/Configuration
        public ServiceResponse<string> Post(ConfigViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = _configurationService.Create(model);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;


        }

        // PUT: api/Configuration/5
        public void Put(int id, [FromBody]string value)
        {



        }

        // DELETE: api/Configuration/5
        public void Delete(int id)
        {


        }
      
    }
}
