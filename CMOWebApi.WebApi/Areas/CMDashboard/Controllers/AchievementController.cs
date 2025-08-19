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

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    public class AchievementController : ApiController
    {
        private readonly IAdvAchievementService _achievementService;
        IndexModel model = null;
        public AchievementController(IAdvAchievementService achievementService, IndexModel indexModel)
        {
            this._achievementService = achievementService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _achievementService.GetAll(model);
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
        public ServiceResponse<Adv_AchievementViewModel> Get(long id)
        {
            ServiceResponse<Adv_AchievementViewModel> objReturn = new ServiceResponse<Adv_AchievementViewModel>();
            try
            {
                objReturn = _achievementService.GetById(id);
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
        public async Task<ServiceResponse<string>> Post(Adv_AchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _achievementService.Create(model);
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
        public async Task<ServiceResponse<string>> Put(int id, Adv_AchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && id > 0)
                {
                    model.Id = id;
                    objReturn = await _achievementService.Edit(model);
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Exception = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch (Exception ex)
            {
                objReturn.Exception = ex.Message;
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
                objReturn = await _achievementService.Delete(id);
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
                objReturn = await _achievementService.UpdateActiveStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementFilter(SearchModel searchModel, int UserId)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                if (searchModel != null)
                {
                    objReturn = _achievementService.GetBySearch(searchModel, UserId);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
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
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementReport()
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _achievementService.GetAchievementReport();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }


        /// <summary>
        /// Get excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> ExportAchievementData(SearchModel model, int loginUserId)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = _achievementService.ExportAchievementData(model, loginUserId);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;

        }


        #region Achievement Reports

        /// <summary>
        /// Get achievement summary report of all category.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<AchievementsCategoryCountReportModel>> GetAchievementsCategoryWiseSummaryReport(DepartmentCategoryReportFilterModel model)
        {
            ServiceResponse<List<AchievementsCategoryCountReportModel>> objReturn = new ServiceResponse<List<AchievementsCategoryCountReportModel>>();
            try
            {
                return _achievementService.GetAchievementsCategoryWiseSummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                return objReturn;
            }
        }

        #endregion

    }
}
