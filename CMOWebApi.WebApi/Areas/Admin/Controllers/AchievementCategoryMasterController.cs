using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class AchievementCategoryMasterController : ApiController
    {
        private readonly IAchievementCategoryService _achievementCategoryService;
        IndexModel model = null;
        public AchievementCategoryMasterController(IAchievementCategoryService achievementCategoryService, IndexModel indexModel)
        {
            this._achievementCategoryService = achievementCategoryService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>> objReturn = new ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>>();
            try
            {
                objReturn = _achievementCategoryService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        // GET: api/Achievement/5
        [HttpGet]
        public ServiceResponse<AdvAchievementCategoryMasterModel> Get(long id)
        {
            ServiceResponse<AdvAchievementCategoryMasterModel> objReturn = new ServiceResponse<AdvAchievementCategoryMasterModel>();
            try
            {
                objReturn = _achievementCategoryService.GetById(id);
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
        // POST: api/Achievement
        public async Task<ServiceResponse<string>> Post(AdvAchievementCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _achievementCategoryService.Create(model);
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
        // PUT: api/Achievement/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, AdvAchievementCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && id > 0)
                {
                    model.CategoryId = id;
                    objReturn = await _achievementCategoryService.Edit(model);
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

        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _achievementCategoryService.UpdateActiveStatus(id);
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
