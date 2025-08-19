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
    public class CitizenAttachmentController : ApiController
    {

        private readonly ICitizenAttachmentService _CitizenAttachmentService;
        IndexModel model = null;
        public CitizenAttachmentController(ICitizenAttachmentService CitizenAttachmentService, IndexModel indexModel)
        {
            this._CitizenAttachmentService = CitizenAttachmentService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<CitizenAttachmentViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<CitizenAttachmentViewModel>> objReturn = new ServiceResponse<PagedData<CitizenAttachmentViewModel>>();
            try
            {
                objReturn = _CitizenAttachmentService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // GET: api/citizen-attachment/5
        [HttpGet]
        public async Task<ServiceResponse<CitizenAttachmentViewModel>> Get(long id)
        {
            ServiceResponse<CitizenAttachmentViewModel> objReturn = new ServiceResponse<CitizenAttachmentViewModel>();
            try
            {
                objReturn = await _CitizenAttachmentService.GetById(id);
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
        // POST: api/citizen-attachment
        public async Task<ServiceResponse<string>> Post(CitizenAttachmentViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _CitizenAttachmentService.Add(model);
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

        // PUT: api/citizen-attachment/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, CitizenAttachmentViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && id > 0)
                {
                    model.AttachmentCode = id;
                    objReturn = await _CitizenAttachmentService.Edit(model);
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

        // DELETE: api/citizen-attachment/5
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _CitizenAttachmentService.UpdateDeleteStatus(id);
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
                objReturn = await _CitizenAttachmentService.UpdateActiveStatus(id);
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
        public ServiceResponse<dynamic> IsAttachmentNameExist(string id)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                objReturn = _CitizenAttachmentService.IsAttachmentNameExist(id);
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
