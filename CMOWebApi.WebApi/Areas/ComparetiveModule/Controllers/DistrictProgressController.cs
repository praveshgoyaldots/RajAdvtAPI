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
	public class DistrictProgressController : ApiController
	{
		#region /// Variable ///

		private readonly IDistrictProgressService _DistrictProgressService;

		#endregion

		#region /// Constructor ///

		public DistrictProgressController(IDistrictProgressService DistrictProgressService)
		{
			_DistrictProgressService = DistrictProgressService;
		}

		#endregion

		#region /// Method ///

		/// <summary>
		/// Get all KPI category Master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>     
		[HttpPost]
		public IHttpActionResult Get(IndexModel model, long catCode = 0)
		{
			ServiceResponse<PagedData<DistrictProgressListViewModel>> objReturn = new ServiceResponse<PagedData<DistrictProgressListViewModel>>();
			try
			{
				return Ok(_DistrictProgressService.GetAll(model, catCode));
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
			ServiceResponse<DistrictProgressModel> objReturn = new ServiceResponse<DistrictProgressModel>();
			try
			{
				if (id >= 0)
				{
					return Ok(_DistrictProgressService.GetById(id));
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
		public async Task<IHttpActionResult> Post(DistrictProgressModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					//if (!_DistrictProgressService.IsDataAvailable(model.YearCode, model.MonthCode, model.Id))
					//{
					return Ok(await _DistrictProgressService.Create(model));
					//}
					//else
					//{
					//    objReturn.IsSuccess = false;
					//    objReturn.Message = MessageStatus.YearMonthExist;
					//    return Ok(objReturn);
					//}
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
		public async Task<IHttpActionResult> Put(DistrictProgressModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
					//if (!_DistrictProgressService.IsDataAvailable(model.YearCode, model.MonthCode, model.Id))
					//{
					return Ok(await _DistrictProgressService.Edit(model));
					//}
					//else
					//{
					//    objReturn.IsSuccess = false;
					//    objReturn.Message = MessageStatus.YearMonthExist;
					//    return Ok(objReturn);
					//}
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
					return Ok(await _DistrictProgressService.UpdateActiveStatus(id));
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

		/// <summary>
		/// Check dublicate records by year and month
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>      
		[HttpPost]
		public IHttpActionResult IsDuplicateData(DistrictProgressModel model)
		{
			ServiceResponse<DistrictProgressModel> objReturn = new ServiceResponse<DistrictProgressModel>();
			try
			{
				return Ok(_DistrictProgressService.IsDataAvailable(model));
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return InternalServerError(ex);
			}
		}

		[HttpGet]
		public ServiceResponse<List<ComparativeTargetParmeterListModel>> GetAllParameterList(int kPICode, int dpt = 0, long catCode = 0)
		{
			ServiceResponse<List<ComparativeTargetParmeterListModel>> objReturn = new ServiceResponse<List<ComparativeTargetParmeterListModel>>();
			try
			{
				return _DistrictProgressService.GetAllParameterList(kPICode, dpt, catCode);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}

		}

		#endregion
	}
}
