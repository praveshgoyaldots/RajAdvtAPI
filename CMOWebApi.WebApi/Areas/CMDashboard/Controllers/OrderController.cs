using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using static CMOWebApi.Core.Enums.FixedValues;
using static System.Net.Mime.MediaTypeNames;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class OrderController : ApiController
    {
        #region /// Variable ///
        private readonly IOrderService _orderService;
        private readonly string _path = FilePath.OrderLocation.GetStringValue(); 

        #endregion

        #region /// cunstructor  ///
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        #endregion

        #region /// Method  ///
        [HttpPost]
        public async Task<ServiceResponse<string>> AddUpdateOrder(OrderEntryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    if (model.IsOldOrder==true && model.Id==0)
                    {
                        var customModelState = _orderService.VerifyAttachmentModel(model);
                        if (customModelState.IsValid)
                        {
                            return await _orderService.AddUpdateOrder(model);
                        }
                        else
                        {
                            var errors = customModelState.Select(x => x.Value.Errors)
                                          .Where(y => y.Count > 0)
                                          .ToList();
                            List<string> err = new List<string>();

                            objReturn.IsSuccess = false;
                            objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => y.ErrorMessage).FirstOrDefault()).ToList());
                            return objReturn;
                           
                        }
                    }
                    else
                    {
                        return await _orderService.AddUpdateOrder(model);
                    }
                   
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
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _orderService.Delete(id);
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
        public ServiceResponse<PagedData<OrderEntryListModel>> GetAll(CustomSearchDateModel model)
        {
            ServiceResponse<PagedData<OrderEntryListModel>> objReturn = new ServiceResponse<PagedData<OrderEntryListModel>>();
            try
            {
                return _orderService.GetAll(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _orderService.LockToggle(id);
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
        public async Task<ServiceResponse<OrderWithRelatedToViewModel>> GetById(long id)
        {
            ServiceResponse<OrderWithRelatedToViewModel> objReturn = new ServiceResponse<OrderWithRelatedToViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _orderService.GetById(id);
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

        [HttpPost]
        public ServiceResponse<List<RelatedToResultOfParameter>> GetOrderRelatedToResult(dynamic model)
        {
            ServiceResponse<List<RelatedToResultOfParameter>> objReturn = new ServiceResponse<List<RelatedToResultOfParameter>>();
            try
            {
                List<RelatedToResultOfParameter> response = _orderService.RelatedToAPICall(model, true);
                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                objReturn.Data = response;
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
        public async Task<ServiceResponse<string>> SetStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _orderService.SetStatus(id);
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
        public async Task<ServiceResponse<string>> UploadOrderAttachment(UploadAttachmentModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                      
                        return await _orderService.UploadOrderAttachment(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                           .Where(y => y.Count > 0)
                                           .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => y.ErrorMessage).FirstOrDefault()).ToList());
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

        #endregion

        [HttpPost]
        public ServiceResponse<List<GetOrderCountReportViewModel>> GetOrderReport(DepartmentCategoryReportFilterModel model)
        {
            ServiceResponse<List<GetOrderCountReportViewModel>> objreturn = new ServiceResponse<List<GetOrderCountReportViewModel>>();
            try
            {
                return _orderService.GetAllOrderReport(model);
            }
            catch (Exception ex)
            {

                objreturn.IsSuccess = false;
                objreturn.Message = MessageStatus.Error;
                return objreturn;
            }
        }

        //public ServiceResponse<ReportResponseModel> GetOrderReport()
        //{
        //    ServiceResponse<ReportResponseModel> objReturn = new ServiceResponse<ReportResponseModel>();
        //    try
        //    {
        //        return _orderService.GetAllOrderReport();
        //    }
        //    catch (Exception ex)
        //    {

        //        objReturn.IsSuccess = false;
        //        objReturn.Message = MessageStatus.Error;
        //        return objReturn;
        //    }
        //}


        #region Log
        public void CreateLogFile(string strMsg)
        {
            try
            {
                StreamWriter log;
                var path = System.Web.HttpContext.Current.Server.MapPath("~/Content/UploadFolder/OrderEntry/") + DateTime.Now.ToString("MM-dd-yyyy") + ".txt";

                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }

                log = System.IO.File.AppendText(path);
                log.WriteLine(strMsg);
                log.Close();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        #endregion

        #region Order Detail Report
        [HttpPost]
        public ServiceResponse<List<OrderGenerateOrderReportSearchResultModel>> GetOrderDetailReport(OrderReportSearchModel model)

        {
            ServiceResponse<List<OrderGenerateOrderReportSearchResultModel>> objReturn = new ServiceResponse<List<OrderGenerateOrderReportSearchResultModel>>();
            try
            {
                return _orderService.GetOrderDetailReport(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Order report of department with Type and Sub Type 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<OrderSummaryReportModel>> GetOrderSummaryReport(OrderSummaryReportFilterModel model)
        {
            ServiceResponse<List<OrderSummaryReportModel>> objReturn = new ServiceResponse<List<OrderSummaryReportModel>>();
            try
            {
                return _orderService.GetOrderSummaryReport(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Order report of department with Type and Sub Type and Last transaction date
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<OrderSummaryReportWithLastTransactionModel>> GetOrderSummaryReportWithLastTransaction(OrderSummaryReportFilterModel model)
        {
            ServiceResponse<List<OrderSummaryReportWithLastTransactionModel>> objReturn = new ServiceResponse<List<OrderSummaryReportWithLastTransactionModel>>();
            try
            {
                return _orderService.GetOrderSummaryReportWithLastTransaction(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Order report of department with Type and Sub Type and Last transaction date
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<OrderSummaryTypeReportWithLastTransactionModel>> GetOrderTypeSummaryReportWithLastTransaction(OrderSummaryReportFilterModel model)
        {
            ServiceResponse<List<OrderSummaryTypeReportWithLastTransactionModel>> objReturn = new ServiceResponse<List<OrderSummaryTypeReportWithLastTransactionModel>>();
            try
            {
                return _orderService.GetOrderTypeSummaryReportWithLastTransaction(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get Order department count report on fromdate and todate wise 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
		public ServiceResponse<List<OrderDepartmentCountReportModel>> GetOrderDepartmentSummaryReport(OrderDepartmentCountReportFilterModel model)
		{
			ServiceResponse<List<OrderDepartmentCountReportModel>> objReturn = new ServiceResponse<List<OrderDepartmentCountReportModel>>();
			try
			{
				return _orderService.GetOrderDepartmentSummaryReport(model);
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

        #endregion

        #region Export To Excel

        /// <summary>
        /// Get excel sheet of Government Document in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<string> ExportGovernmentDocumentData(CustomSearchDateModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return _orderService.ExportGovernmentDocumentData(model);
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
