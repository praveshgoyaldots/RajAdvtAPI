using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.ComparetiveModel;
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
using System.Web.Http.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.ComparetiveModule.Controllers
{
	[Authorize]
	public class KPICategoryMasterController : ApiController
    {
		#region /// Variable ///

		private readonly IKPICategoryMasterService _KPICategoryMasterService;

		#endregion

		#region /// Constructor ///

		public KPICategoryMasterController(IKPICategoryMasterService KPICategoryMasterService)
		{
			_KPICategoryMasterService = KPICategoryMasterService;
		}

		#endregion

		#region /// Method ///

		/// <summary>
		/// Get all KPI category Master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>     
		[HttpPost]
		public IHttpActionResult Get(IndexModel model)
		{
			ServiceResponse<PagedData<KPICategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<KPICategoryMasterViewModel>>();
			try
			{
				return Ok(_KPICategoryMasterService.GetAll(model));
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				objReturn.Data = null;
				return InternalServerError(ex);
			}
		}

		/// <summary>
		/// Project category by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>       
		[HttpGet]
		public IHttpActionResult Get(long id)
		{
			ServiceResponse<KPICategoryMasterModel> objReturn = new ServiceResponse<KPICategoryMasterModel>();
			try
			{
				if (id >= 0)
				{
					return Ok(_KPICategoryMasterService.GetById(id));
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.InvalidData;
					return Ok(objReturn);
				}
			}
			catch (Exception ex)
			{
				return InternalServerError(ex);
			}
		}

		/// <summary>
		/// Craete new KPI category Master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>      
		[HttpPost]
		public async Task<IHttpActionResult> Post(KPICategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					return Ok(await _KPICategoryMasterService.Create(model));
				}
				else
				{
					IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
					objReturn.Data = JsonConvert.SerializeObject(allErrors);
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.InvalidData;
					return Ok(objReturn);
				}
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return InternalServerError(ex);
			}
		}

		/// <summary>
		/// Update existing KPI category Master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public async Task<IHttpActionResult> Put(KPICategoryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					return Ok(await _KPICategoryMasterService.Edit(model));
				}
				else
				{
					IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
					objReturn.Data = JsonConvert.SerializeObject(allErrors);
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.InvalidData;
					return Ok(objReturn);
				}
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return InternalServerError(ex);
			}
		}

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>       
		[HttpGet]
		public async Task<IHttpActionResult> UpdateActiveStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id >= 0)
				{
					return Ok(await _KPICategoryMasterService.UpdateActiveStatus(id));
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.InvalidData;
					return Ok(objReturn);
				}
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return InternalServerError(ex);
			}
		}

		#endregion
	}
}
