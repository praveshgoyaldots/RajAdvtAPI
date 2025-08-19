using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class ComplainEntryTypeMasterController : ApiController
    {
        // GET: Admin/ComplainEntryType
        private readonly IComplainEntryTypeService _complainEntryTypeService;
        IndexModel model = null;

        public ComplainEntryTypeMasterController(IComplainEntryTypeService complainEntryTypeService, IndexModel indexModel)
        {
            this._complainEntryTypeService = complainEntryTypeService;
            this.model = indexModel;
        }
        [HttpPost]
        public ServiceResponse<PagedData<ComplainEntryTypeMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<ComplainEntryTypeMasterViewModel>> objReturn = new ServiceResponse<PagedData<ComplainEntryTypeMasterViewModel>>();
            try
            {
                objReturn = _complainEntryTypeService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<ComplainEntryTypeMasterViewModel> Get(long id)
        {
            ServiceResponse<ComplainEntryTypeMasterViewModel> objReturn = new ServiceResponse<ComplainEntryTypeMasterViewModel>();
            try
            {
                objReturn = _complainEntryTypeService.GetById(id);
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
        public async Task<ServiceResponse<string>> Post(ComplainEntryTypeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _complainEntryTypeService.Create(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                             .Where(y => y.Count > 0)
                                             .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Put(ComplainEntryTypeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    objReturn = await _complainEntryTypeService.Edit(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                              .Where(y => y.Count > 0)
                                              .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _complainEntryTypeService.UpdateStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
       
    }
}

