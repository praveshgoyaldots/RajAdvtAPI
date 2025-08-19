using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class OfficeController : ApiController
    {
        private readonly IOfficeMasterService _officeMasterService;
        IndexModel model = null;
        public OfficeController(IOfficeMasterService officeMasterService, IndexModel indexModel)
        {
            this._officeMasterService = officeMasterService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<OfficeMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<OfficeMasterViewModel>> objReturn = new ServiceResponse<PagedData<OfficeMasterViewModel>>();
            try
            {
                objReturn = _officeMasterService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        // GET: api/office/5
        [HttpGet]
        public async Task<ServiceResponse<OfficeMasterViewModel>> Get(long id)
        {
            ServiceResponse<OfficeMasterViewModel> objReturn = new ServiceResponse<OfficeMasterViewModel>();
            try
            {
                objReturn = await _officeMasterService.GetById(id);
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
        // POST: api/office
        public async Task<ServiceResponse<string>> Post(OfficeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _officeMasterService.Add(model);
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
        // PUT: api/office/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, OfficeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (id > 0)
                {
                    model.OfficeId = id;
                    objReturn = await _officeMasterService.Edit(model);
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

        // DELETE: api/office/5
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _officeMasterService.UpdateDeleteStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _officeMasterService.UpdateActiveStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<dynamic> IsOfficeShortNameExist(string id)    
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                objReturn = _officeMasterService.IsOfficeShortNameExist(id);
            }
            catch
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;
        }
    }
}
