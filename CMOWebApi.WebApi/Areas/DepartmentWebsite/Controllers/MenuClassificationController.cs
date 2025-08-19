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

namespace CMOWebApi.WebAPI.Areas.DepartmentWebsite.Controllers
{
    public class MenuClassificationController : ApiController
    {

		#region /// Variable ///

		private readonly IMenuClassificationService _menuClassificationService;
		IndexModel model = null;

		#endregion

		#region /// constructor  ///

		public MenuClassificationController(IMenuClassificationService menuClassificationService, IndexModel indexModel)
		{
			_menuClassificationService = menuClassificationService;
			model = indexModel;
		}

		#endregion

		#region Method

		/// <summary>
		/// Get Jankalyan Category List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<PagedData<MenuClassificationModel>> Get(IndexModel model)
		{
			ServiceResponse<PagedData<MenuClassificationModel>> objReturn = new ServiceResponse<PagedData<MenuClassificationModel>>();
			try
			{
				objReturn = _menuClassificationService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		/// <summary>
		/// Get Jankalyan Category by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<MenuClassificationModel> Get(long id)
		{
			ServiceResponse<MenuClassificationModel> objReturn = new ServiceResponse<MenuClassificationModel>();
			try
			{
				objReturn = _menuClassificationService.GetById(id);
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
		/// Add Jankalyan Category
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(MenuClassificationModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _menuClassificationService.Create(model);
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
		/// Update Jankalyan Category
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(MenuClassificationModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.Id > 0)
				{
					objReturn = await _menuClassificationService.Edit(model);
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
				objReturn = await _menuClassificationService.UpdateStatus(id);
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
