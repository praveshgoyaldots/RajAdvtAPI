using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;


namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class AchievementSubCategoryMasterController : ApiController
    {
        private readonly IAchievementSubCategoryService _achievementSubCategoryService;
        IndexModel model = null;
        public AchievementSubCategoryMasterController(IAchievementSubCategoryService achievementSubCategoryService, IndexModel indexModel)
        {
            this._achievementSubCategoryService = achievementSubCategoryService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>>();
            try
            {
                objReturn = _achievementSubCategoryService.GetAll(model);
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
        public ServiceResponse<AdvAchievementSubCategoryMasterViewModel> Get(long id)
        {
            ServiceResponse<AdvAchievementSubCategoryMasterViewModel> objReturn = new ServiceResponse<AdvAchievementSubCategoryMasterViewModel>();
            try
            {
                objReturn = _achievementSubCategoryService.GetById(id);
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
        public async Task<ServiceResponse<string>> Post(AdvAchievementSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _achievementSubCategoryService.Create(model);
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
        public async Task<ServiceResponse<string>> Put(int id, AdvAchievementSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && id > 0)
                {
                    model.SubCategoryId = id;
                    objReturn = await _achievementSubCategoryService.Edit(model);
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

        // DELETE: api/Achievement/5
        [HttpGet]
        public async Task<ServiceResponse<string>> Delete(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _achievementSubCategoryService.Delete(id);
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
                objReturn = await _achievementSubCategoryService.UpdateActiveStatus(id);
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
