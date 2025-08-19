using CMOWebApi.Core;
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
    public class CamparativeTargetEntryController : ApiController
    {

		#region /// Variable ///

		private readonly IComparativeTargetEntryService _ComparativeTargetEntryService;

		#endregion

		#region /// Constructor ///

		public CamparativeTargetEntryController(IComparativeTargetEntryService ComparativeTargetEntryService)
		{
			_ComparativeTargetEntryService = ComparativeTargetEntryService;
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
			ServiceResponse<PagedData<ComparativeParameterTargetViewModel>> objReturn = new ServiceResponse<PagedData<ComparativeParameterTargetViewModel>>();
			try
			{
				return Ok(_ComparativeTargetEntryService.GetAll(model));
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
			ServiceResponse<ComparativeTargetEntryModel> objReturn = new ServiceResponse<ComparativeTargetEntryModel>();
			try
			{
				if (id >= 0)
				{
					return Ok(_ComparativeTargetEntryService.GetById(id));
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
		public async Task<IHttpActionResult> Post(ComparativeTargetEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					return Ok(await _ComparativeTargetEntryService.Create(model));
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
		public async Task<IHttpActionResult> Put(ComparativeTargetEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (!_ComparativeTargetEntryService.IsDataAvailable(model).IsSuccess)
				{
					if (ModelState.IsValid)
					{
						return Ok(await _ComparativeTargetEntryService.Edit(model));
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
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.DeptWithYearExist;
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
					return Ok(await _ComparativeTargetEntryService.UpdateActiveStatus(id));
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

		[HttpGet]
		public ServiceResponse<List<ComparativeTargetParmeterListModel>> GetAllParameter(int kPICode, int dpt=0)
		{
			ServiceResponse<List<ComparativeTargetParmeterListModel>> objReturn = new ServiceResponse<List<ComparativeTargetParmeterListModel>>();
			try
			{
					return _ComparativeTargetEntryService.GetAllParameter(kPICode,dpt);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}

		}

		/// <summary>
		/// Check dublicate records by department and month
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>      
		[HttpPost]
		public IHttpActionResult IsDuplicateData(ComparativeTargetEntryModel model)
		{
			ServiceResponse<ComparativeTargetEntryModel> objReturn = new ServiceResponse<ComparativeTargetEntryModel>();
			try
			{
				return Ok(_ComparativeTargetEntryService.IsDataAvailable(model));
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
