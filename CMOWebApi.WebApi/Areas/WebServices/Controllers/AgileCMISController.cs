using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.WebServices.Controllers
{
    public class AgileCMISController : ApiController
    {
        private readonly IAgileCMISService _agileCMISService;
        #region /// constructor  //
        public AgileCMISController(IAgileCMISService agileCMISService)
        {
            _agileCMISService = agileCMISService;
        }
        #endregion
        [HttpPost]
        public async Task<ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel>> GetComplianceExpactedNoOfEntries(AgileCMISModel model)
        {
            ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel> objReturn = new ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel>();
            try
            {                
                return await _agileCMISService.GetComplianceExpactedNoOfEntries(model);                 
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
    }
}
