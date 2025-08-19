using CMOWebApi.Core;
using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.ComparetiveModule.Controllers
{
    public class EBookletController : ApiController
    {

		#region /// Variable ///

		private readonly IEbookletService _EbookletService;

		#endregion

		#region /// Constructor ///

		public EBookletController(IEbookletService EbookletService)
		{
			_EbookletService = EbookletService;
		}

		#endregion


		#region /// Methods ///

		/// <summary>
		/// Get E-booklet by Beneficiary Category and Department
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<EBookletResponseModel> GeEbooklet(EBookletFilterModel model)
		{
			ServiceResponse<EBookletResponseModel> objReturn = new ServiceResponse<EBookletResponseModel>();
			try
			{
				return _EbookletService.GeEbooklet(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
		#endregion

	}
}
