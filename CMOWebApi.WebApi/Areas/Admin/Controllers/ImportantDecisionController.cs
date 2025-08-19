using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
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
    public class ImportantDecisionController : ApiController
    {
        private readonly IImportantDecisionService _importantDecisionService;
        IndexModel model = null;
        public ImportantDecisionController(IImportantDecisionService importantDecisionService, IndexModel indexModel)
            {
            this._importantDecisionService = importantDecisionService;
            this.model = indexModel;
            }

        [HttpPost]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> Get(IndexModel model)
            {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
                {
                objReturn = _importantDecisionService.GetAll(model);
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
                objReturn = _importantDecisionService.GetById(id);
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
                    objReturn = await _importantDecisionService.Create(model);
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
                   objReturn = await _importantDecisionService.Edit(model);
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
                objReturn = await _importantDecisionService.Delete(id);
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
                objReturn = await _importantDecisionService.UpdateActiveStatus(id);
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
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetImportantDecisionFilter(SearchModel searchModel, int UserId)
            {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
                {
                objReturn = _importantDecisionService.GetBySearch(searchModel, UserId);
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
                objReturn = _importantDecisionService.GetAchievementReport();
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

                }
            return objReturn;
            }

        #region Reports

        /// <summary>
        /// Important Decision report of department with Type and Sub Type 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ImportantDecisionSummaryReportModel>> GetImportantDecisionSummaryReport(ImpDescSummaryReportFilterModel model)
        {
            ServiceResponse<List<ImportantDecisionSummaryReportModel>> objReturn = new ServiceResponse<List<ImportantDecisionSummaryReportModel>>();
            try
            {
                return _importantDecisionService.GetImportantDecisionSummaryReport(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

		/// <summary>
		/// Get Important decision department count report on fromdate and todate wise 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<List<ImportantDecisionCountReportModel>> GetImportantDecisionDepartmentSummaryReport(ImportantDecisionCountReportFilterModel model)
		{
			ServiceResponse<List<ImportantDecisionCountReportModel>> objReturn = new ServiceResponse<List<ImportantDecisionCountReportModel>>();
			try
			{
				return _importantDecisionService.GetImportantDecisionDepartmentSummaryReport(model);
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		/// <summary>
		/// Order report of department with Type and Sub Type 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<List<ImportantDecisionDetailReportModel>> GetImportantDecisionDetailReport(OrderSummaryReportFilterModel model)
		{
			ServiceResponse<List<ImportantDecisionDetailReportModel>> objReturn = new ServiceResponse<List<ImportantDecisionDetailReportModel>>();
			try
			{
				return _importantDecisionService.GetImportantDecisionDetailReport(model);
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}


		#endregion

	}
}

