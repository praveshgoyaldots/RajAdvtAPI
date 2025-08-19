using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.WebServices.Controllers
{
    public class OrderServiceController : ApiController
    {
        #region /// variable  ///
        private readonly IOrderService _orderService;
        #endregion

        #region /// constructor  //
        public OrderServiceController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        #endregion

        [HttpGet]
        public async Task<ServiceResponse<OrderResponseServiceModel>> GetService(ApiGetDataModel model)
        {
            ServiceResponse<OrderResponseServiceModel> objReturn = new ServiceResponse<OrderResponseServiceModel>();
            try
            {
                objReturn = await _orderService.GetService(model, Request.Headers);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        #region Services

        /// <summary>
        /// This service provides the list of Government Document according to department
        /// </summary>
        /// <param name="model"> DepartmentCode is mandatory</param> 
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<OrderServiceResultModel>> GetGovernmentDocumentServiceForDepartment(OrderServiceParameterModel model)
        {
            ServiceResponse<List<OrderServiceResultModel>> objReturn = new ServiceResponse<List<OrderServiceResultModel>>();
            try
            {
                if (model!=null)
                {
                  
                if (ModelState.IsValid)
                {
                    objReturn = _orderService.GetGovernmentDocumentServiceForDepartment(model);
                }
                 else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                           .Where(y => y.Count > 0)
                                           .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                        objReturn.StatusCode = ResponseStatusCode.error;
                        return objReturn;
                    }
                }
                else
                {
                    objReturn.Data = null;
                    objReturn.IsSuccess = false;
                    objReturn.StatusCode = ResponseStatusCode.error;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.StatusCode = ResponseStatusCode.error;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// This service use for create/Update record in Government Document through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> AddUpdateGovDocumentService(GovDocumentServiceModel model, HttpRequestHeaders header = null)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {

                    if (ModelState.IsValid)
                    {
                        objReturn = await _orderService.AddUpdateGovDocumentService(model, Request.Headers);
                    }
                    else
                    {
                        var errors = ModelState.Select(x => x.Value.Errors)
                                               .Where(y => y.Count > 0)
                                               .ToList();
                        List<string> err = new List<string>();

                        objReturn.IsSuccess = false;
                        objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? (string.IsNullOrEmpty(y.Exception.ToString()) ? y.Exception.ToString() : y.Exception.Message) : y.ErrorMessage)).LastOrDefault()).ToList());
                        objReturn.StatusCode = ResponseStatusCode.error;
                        return objReturn;
                    }
                }
                else
                {
                    objReturn.Data = null;
                    objReturn.IsSuccess = false;
                    objReturn.StatusCode = ResponseStatusCode.error;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.StatusCode = ResponseStatusCode.error;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        #endregion

    }
}
