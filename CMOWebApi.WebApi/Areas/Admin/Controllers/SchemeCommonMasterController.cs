using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize] 
    public class SchemeCommonMasterController : ApiController
    {
		private readonly ISchemeCommonMasterService _schemeCommonMasterService;

		public SchemeCommonMasterController(ISchemeCommonMasterService schemeCommonMasterService)
		{
			_schemeCommonMasterService = schemeCommonMasterService;
		}

		// GET: api/SchemeCommonMaster
		[System.Web.Http.HttpPost]
		public ServiceResponse<PagedData<SCM_CommonMasterModel>> Get(SearchListModel model)
		{

			ServiceResponse<PagedData<SCM_CommonMasterModel>> objReturn = new ServiceResponse<PagedData<SCM_CommonMasterModel>>();
			try
			{
				return _schemeCommonMasterService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		// GET: api/SchemeCommonMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<SCM_CommonMasterModel>> Get(long id)
		{
			ServiceResponse<SCM_CommonMasterModel> objReturn = new ServiceResponse<SCM_CommonMasterModel>();
			try
			{
				if (id > 0)
				{
					return await _schemeCommonMasterService.GetById(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// POST: api/SchemeCommonMaster
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Post(SCM_CommonMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _schemeCommonMasterService.Create(model);
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// PUT: api/SchemeCommonMaster/5
		[System.Web.Http.HttpPost]
		public async Task<ServiceResponse<string>> Put(SCM_CommonMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
					return await _schemeCommonMasterService.Edit(model);
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// DELETE: api/SchemeCommonMaster/5
		[System.Web.Http.HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _schemeCommonMasterService.Delete(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _schemeCommonMasterService.UpdateStatus(id);
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
