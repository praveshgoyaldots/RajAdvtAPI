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
    public class CitizenLetterTypeController : ApiController
    {
        private readonly ICitizenLetterTypeMasterService _citizenLetterTypeMasterService;
        IndexModel model = null;
        public CitizenLetterTypeController(ICitizenLetterTypeMasterService citizenLetterTypeMasterService, IndexModel indexModel)
        {
            this._citizenLetterTypeMasterService = citizenLetterTypeMasterService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>> objReturn = new ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>>();
            try
            {
                objReturn = _citizenLetterTypeMasterService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // GET: api/citizen-letter-type/5
        [HttpGet]
        public async Task<ServiceResponse<CitizenLetterTypeMasterViewModel>> Get(long id)
        {
            ServiceResponse<CitizenLetterTypeMasterViewModel> objReturn = new ServiceResponse<CitizenLetterTypeMasterViewModel>();
            try
            {
                objReturn = await _citizenLetterTypeMasterService.GetById(id);
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
        // POST: api/citizen-letter-type
        public async Task<ServiceResponse<string>> Post(CitizenLetterTypeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _citizenLetterTypeMasterService.AddUpdate(model);
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

        // PUT: api/citizen-letter-type/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, CitizenLetterTypeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && id > 0)
                {
                   model.LetterTypeCode = id;
                   objReturn = await _citizenLetterTypeMasterService.AddUpdate(model);
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

        // DELETE: api/citizen-letter-type/5
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _citizenLetterTypeMasterService.UpdateDeleteStatus(id);
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
                objReturn = await _citizenLetterTypeMasterService.UpdateActiveStatus(id);
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
        public ServiceResponse<dynamic> IsLetterTypeExist(string id)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                objReturn = _citizenLetterTypeMasterService.IsLetterTypeExist(id);
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

