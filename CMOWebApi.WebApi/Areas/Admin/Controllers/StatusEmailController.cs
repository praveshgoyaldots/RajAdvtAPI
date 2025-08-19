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
    public class StatusEmailController : ApiController
    {
        #region /// Variable ///

        private readonly IStatusEmailService _statusEmailService;
		IndexModel model = null;

        #endregion

        #region /// Cunstroctor  ///

        public StatusEmailController(IStatusEmailService statusEmailService, IndexModel indexModel)
		{
			_statusEmailService = statusEmailService;
			model = indexModel;
		}

        #endregion

        #region Method

        /// <summary>
        /// Send Jankalyan Status email to all selected departments users
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> SendEmailToDepartment(StatusEmailModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model!=null)
                {
                    return _statusEmailService.SendEmailToDepartment(model);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

		/// <summary>
		///  Get List of department contact detail list with filter.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> GetAllDepartmentContactDetailList(ImportantDepartmentContactFilterModel model)
		{
			ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentContactDetailsViewModel>>();
			try
			{
				objReturn = _statusEmailService.GetAllDepartmentContactDetailList(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}
		#endregion

	}
}
