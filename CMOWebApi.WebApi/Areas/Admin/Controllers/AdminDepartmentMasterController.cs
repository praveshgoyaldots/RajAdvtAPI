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
    public class AdminDepartmentMasterController : ApiController
    {
		private readonly IAdminDepartmentMasterService _AdminDepartmentMasterService;
		IndexModel model = null;
		public AdminDepartmentMasterController(IAdminDepartmentMasterService iAdminDepartmentMasterService, IndexModel indexModel)
		{
			this._AdminDepartmentMasterService = iAdminDepartmentMasterService;
			this.model = indexModel;
		}

		[HttpPost]
		public ServiceResponse<PagedData<AdminDepartmentMasterViewModel>> Get(IndexModel model)
		{
			ServiceResponse<PagedData<AdminDepartmentMasterViewModel>> objReturn = new ServiceResponse<PagedData<AdminDepartmentMasterViewModel>>();
			try
			{
				objReturn = _AdminDepartmentMasterService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		[HttpGet]
		public ServiceResponse<AdminDepartmentMasterModel> Get(long id)
		{
			ServiceResponse<AdminDepartmentMasterModel> objReturn = new ServiceResponse<AdminDepartmentMasterModel>();
			try
			{
				objReturn = _AdminDepartmentMasterService.GetById(id);
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
		public async Task<ServiceResponse<string>> Post(AdminDepartmentMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					objReturn = await _AdminDepartmentMasterService.Create(model);
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
		public async Task<ServiceResponse<string>> Put(AdminDepartmentMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.AdmDepartmentId > 0)
				{
					objReturn = await _AdminDepartmentMasterService.Edit(model);
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
				objReturn = await _AdminDepartmentMasterService.UpdateStatus(id);
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
