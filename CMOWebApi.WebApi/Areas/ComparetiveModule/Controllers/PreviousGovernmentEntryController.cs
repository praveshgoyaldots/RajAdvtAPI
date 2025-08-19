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
    public class PreviousGovernmentEntryController : ApiController
    {
		#region /// Variable ///

		private readonly IPreviousGovernmentEntryService _PreviousGovernmentEntryService;

		#endregion

		#region /// Constructor ///

		public PreviousGovernmentEntryController(IPreviousGovernmentEntryService PreviousGovernmentEntryService)
		{
			_PreviousGovernmentEntryService = PreviousGovernmentEntryService;
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
			ServiceResponse<PagedData<PreviousGovernmentEntryListModel>> objReturn = new ServiceResponse<PagedData<PreviousGovernmentEntryListModel>>();
			try
			{
				return Ok(_PreviousGovernmentEntryService.GetAll(model));
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
			ServiceResponse<PreviousGovernmentEntryModel> objReturn = new ServiceResponse<PreviousGovernmentEntryModel>();
			try
			{
				if (id >= 0)
				{
					return Ok(_PreviousGovernmentEntryService.GetById(id));
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
		/// <param name="model"></param>
		/// <returns></returns>      
		[HttpPost]
		public async Task<IHttpActionResult> Post(PreviousGovernmentEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					return Ok(await _PreviousGovernmentEntryService.Create(model));
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
		public async Task<IHttpActionResult> Put(PreviousGovernmentEntryModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					return Ok(await _PreviousGovernmentEntryService.Edit(model));
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
					return Ok(await _PreviousGovernmentEntryService.UpdateActiveStatus(id));
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


		[HttpGet]
		public ServiceResponse<List<PreviousGovernmentEntryParameterMappingModel>> GetAllYearList()
		{
			ServiceResponse<List<PreviousGovernmentEntryParameterMappingModel>> result = new ServiceResponse<List<PreviousGovernmentEntryParameterMappingModel>>();
			try
			{
					return _PreviousGovernmentEntryService.GetAllYearList();				
			}
			catch (Exception ex)
			{
				result.IsSuccess = false;
				result.Message = MessageStatus.Error;
				return result;
			}
		}

		/// <summary>
		/// Get comparative parameter by parameter code
		/// </summary>
		/// <param name="paraCode"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<ComparativeTargetParmeterListModel> GetParameterDetailByParameterCode(long paraCode)
		{
			ServiceResponse<ComparativeTargetParmeterListModel> result = new ServiceResponse<ComparativeTargetParmeterListModel>();
			try
			{
				return _PreviousGovernmentEntryService.GetParameterDetailByParameterCode(paraCode);
			}
			catch (Exception ex)
			{
				result.IsSuccess = false;
				result.Message = MessageStatus.Error;
				return result;
			}
		}
	}
}
