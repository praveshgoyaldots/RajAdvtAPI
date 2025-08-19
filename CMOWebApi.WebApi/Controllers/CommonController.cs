using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Controllers
{
    public class CommonController : ApiController
    {
        private readonly CommonService _commonService;


        public CommonController(CommonService commonService)
        {
            _commonService = commonService;
        }

        [HttpGet]
        public ServiceResponse<CommonDocModel> GetHelpDocument(string module,bool
			 isBase64=true)
        {
            ServiceResponse<CommonDocModel> objReturn = new ServiceResponse<CommonDocModel>();
            try
            {
                if (!string.IsNullOrEmpty(module))
                {
                    return _commonService.GetHelpDocument(module, isBase64);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }


        }

        [HttpGet]
        public ServiceResponse<string> GenerateOTP()
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                    return _commonService.GenerateOTP();
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<string> VerifyOTP(string oTP)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (!string.IsNullOrEmpty(oTP))
                {
                    return _commonService.VerifyOTP(oTP);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

		[HttpPost]
		public ServiceResponse<NotificationPreviewModel> GetTemplateType(TypeModel model)
		{
			ServiceResponse<NotificationPreviewModel> objReturn = new ServiceResponse<NotificationPreviewModel>();
			try
			{
				if (model !=null)
				{
					return _commonService.GetTemplateType(model);
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

        [HttpPost]
        public ServiceResponse<string> SendNotification(NotificationFinalSubmissionModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return _commonService.SendNotification(model);
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
        /// Send Notification To Department Officer from Scheme module
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> SendNotificationToDepartmentOfficer(SendNotificationToDeptOfficerModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return _commonService.SendNotificationToDepartmentOfficer(model);
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

        [HttpGet]
        public ServiceResponse<AchievementCategoryModel> GetAchievementCategoryByCode(long code)
        {
            ServiceResponse<AchievementCategoryModel> objReturn = new ServiceResponse<AchievementCategoryModel>();
            try
            {
                return _commonService.GetAchievementCategoryByCode(code);
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<string> ExportToExcel(ExportToExcelModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return _commonService.CommonExportToExcel(model);
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #region Connect With CMIS Service

        /// <summary>
        /// Get CMIS data by module, department and year to connect jankalyan modules with cmis
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ConnectWithCMISListModel>> GetConnectWithCMISData(ConnectWithCMISFilterModel model)
        {
            ServiceResponse<List<ConnectWithCMISListModel>> objReturn = new ServiceResponse<List<ConnectWithCMISListModel>>();
            try
            {
                return _commonService.GetConnectWithCMISData(model);
            }
            catch (Exception e)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion
    }
}
