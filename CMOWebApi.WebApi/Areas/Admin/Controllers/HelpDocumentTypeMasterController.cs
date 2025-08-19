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
    public class HelpDocumentTypeMasterController : ApiController
    {
		#region /// Variable ///

		private readonly IHelpDocumentTypeMasterService _HelpDocumentTypeMasterService;
		IndexModel model = null;

		#endregion

		#region /// constructor  ///

		public HelpDocumentTypeMasterController(IHelpDocumentTypeMasterService HelpDocumentTypeMasterService, IndexModel indexModel)
		{
			_HelpDocumentTypeMasterService = HelpDocumentTypeMasterService;
			model = indexModel;
		}

		#endregion

		#region Method

		/// <summary>
		/// GetHelp Document List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<PagedData<HelpDocumentTypeMasterModel>> Get(IndexModel model)
		{
			ServiceResponse<PagedData<HelpDocumentTypeMasterModel>> objReturn = new ServiceResponse<PagedData<HelpDocumentTypeMasterModel>>();
			try
			{
				objReturn = _HelpDocumentTypeMasterService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		/// <summary>
		/// GetHelp Document by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<HelpDocumentTypeMasterModel> Get(long id)
		{
			ServiceResponse<HelpDocumentTypeMasterModel> objReturn = new ServiceResponse<HelpDocumentTypeMasterModel>();
			try
			{
				objReturn = _HelpDocumentTypeMasterService.GetById(id);
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
		/// AddHelp Document
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(HelpDocumentTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _HelpDocumentTypeMasterService.Create(model);
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
		/// UpdateHelp Document
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(HelpDocumentTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.Id > 0)
				{
					objReturn = await _HelpDocumentTypeMasterService.Edit(model);
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
				objReturn = await _HelpDocumentTypeMasterService.UpdateStatus(id);
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
