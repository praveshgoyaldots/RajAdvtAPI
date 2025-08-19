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
    public class DesignationMasterController : ApiController
    {
		#region Variable's

		private readonly IDesignationMasterService _designationMasterService;
		IndexModel model = null;

		#endregion

		#region Constructor

		public DesignationMasterController(IDesignationMasterService iDesignationMasterService, IndexModel indexModel)
		{
			this._designationMasterService = iDesignationMasterService;
			this.model = indexModel;
		}

		#endregion

		#region Methods

		/// <summary>
		/// Get all Designation Entry.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<PagedData<DesignationMasterViewModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<DesignationMasterViewModel>> objReturn = new ServiceResponse<PagedData<DesignationMasterViewModel>>();
			try
			{
				objReturn = _designationMasterService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		/// <summary>
		/// get Designation by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<DesignationMasterViewModel> Get(long id)
		{
			ServiceResponse<DesignationMasterViewModel> objReturn = new ServiceResponse<DesignationMasterViewModel>();
			try
			{
				objReturn = _designationMasterService.GetById(id);
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
		/// Add Designation Master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(DesignationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _designationMasterService.Create(model);
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
		/// Update Designation Master
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(DesignationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.DesignationId > 0)
				{
					objReturn = await _designationMasterService.Edit(model);
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
				objReturn = await _designationMasterService.UpdateStatus(id);
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
