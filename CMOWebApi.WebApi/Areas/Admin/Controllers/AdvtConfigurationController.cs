using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class AdvtConfigurationController : ApiController
    {

        private readonly IAdvtConfigurationService  _advtConfigurationService;

        public AdvtConfigurationController(IAdvtConfigurationService advtConfigurationService)
        {
            this._advtConfigurationService = advtConfigurationService;
        }

        [HttpGet]
        public ServiceResponse<AdvtConfigurationModel> Get(int id)
        {
            ServiceResponse<AdvtConfigurationModel> objReturn = new ServiceResponse<AdvtConfigurationModel>();
            try
            {
                objReturn = _advtConfigurationService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }
        [HttpPost]
        public async Task<ServiceResponse<string>> AddUpdate(AdvtConfigurationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _advtConfigurationService.AddUpdate(model);
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
    }
}
