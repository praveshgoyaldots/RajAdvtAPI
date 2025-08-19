using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class JankalyanEntryTypeMasterController : ApiController
    {
		#region Variable's

		private readonly IJankalyanEntryTypeMasterService _JankalyanEntryTypeMasterService;
		IndexModel model = null;

		#endregion
		
		#region Constructor

		public JankalyanEntryTypeMasterController(IJankalyanEntryTypeMasterService iJankalyanEntryTypeMasterService, IndexModel indexModel)
		{
			this._JankalyanEntryTypeMasterService = iJankalyanEntryTypeMasterService;
			this.model = indexModel;
		}

		#endregion

		#region Methods

		/// <summary>
		/// Get all jankalyan Entry Master Entry.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<PagedData<JankalyanEntryMasterViewModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<JankalyanEntryMasterViewModel>> objReturn = new ServiceResponse<PagedData<JankalyanEntryMasterViewModel>>();
			try
			{
				objReturn = _JankalyanEntryTypeMasterService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		/// <summary>
		/// get Jankalyan Entry Master by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<JankalyanEntryMasterViewModel> Get(long id)
		{
			ServiceResponse<JankalyanEntryMasterViewModel> objReturn = new ServiceResponse<JankalyanEntryMasterViewModel>();
			try
			{
				objReturn = _JankalyanEntryTypeMasterService.GetById(id);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				objReturn.Data = null;
			}
			return objReturn;
		}

		/// <summary>
		/// Add Jankalyan Entry Type Master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(JankalyanEntryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _JankalyanEntryTypeMasterService.Create(model);
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

		/// <summary>
		/// Update Jankalyan Entry Type Master
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(JankalyanEntryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.Id > 0)
				{
					objReturn = await _JankalyanEntryTypeMasterService.Edit(model);
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

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _JankalyanEntryTypeMasterService.UpdateStatus(id);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

		#endregion



	}
}
