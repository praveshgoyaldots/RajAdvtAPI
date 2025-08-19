using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class OrderPortalController : ApiController
    {
        #region /// variable  ///
        private readonly IOrderService _orderService;
        private readonly IOrderTypeService _orderTypeService;
        #endregion

        #region /// constructor  //
        public OrderPortalController(IOrderService orderService, IOrderTypeService orderTypeService)
        {
            _orderService = orderService;
            _orderTypeService = orderTypeService;

        }
        #endregion

        #region /// Method  ///

        [HttpPost]
        public ServiceResponse<PagedData<OrderEntryListFrontEndModel>> GetAll(OrderFrontEndModel model)


        {
            ServiceResponse<PagedData<OrderEntryListFrontEndModel>> objReturn = new ServiceResponse<PagedData<OrderEntryListFrontEndModel>>();
            try
            {
                //return _orderService.GetAllOrderPublicPortal(model);
                return _orderService.GetAllOrderPublicPortal(model, isRequiredBase64File: false);
            }
            catch (Exception ex)
            {
                objReturn.Exception = ex.Message;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<OrderWithRelatedToViewModel>> GetById(long id,bool isBase64File=false)
        {
            ServiceResponse<OrderWithRelatedToViewModel> objReturn = new ServiceResponse<OrderWithRelatedToViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _orderService.GetById(id, isBase64File);
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

        //[HttpGet]
        //public async Task<ServiceResponse<OrderResponseServiceModel>> GetService()

        //{
        //    ServiceResponse<OrderResponseServiceModel> objReturn = new ServiceResponse<OrderResponseServiceModel>();
        //    try
        //    {
        //        objReturn = await _orderService.GetService();
        //    }
        //    catch (Exception ex)
        //    {
        //        objReturn.Data = null;
        //        objReturn.IsSuccess = false;
        //        objReturn.Message = MessageStatus.Error;

        //    }
        //    return objReturn;
        //}

        [HttpGet]
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> Get()
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                objReturn = _orderService.GetAllAchievement();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<PagedData<OrderEntryListFrontEndModel>> GetAllOrderList()

        {
            ServiceResponse<PagedData<OrderEntryListFrontEndModel>> objReturn = new ServiceResponse<PagedData<OrderEntryListFrontEndModel>>();
            try
            {
                return _orderService.GetAllOrderList();
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<PagedData<TypeGroupOrderListViewModel>> GetGroupTypeOrderList(OrderFrontEndModel model)

        {
            ServiceResponse<PagedData<TypeGroupOrderListViewModel>> objReturn = new ServiceResponse<PagedData<TypeGroupOrderListViewModel>>();
            try
            {
                return _orderService.GetGroupTypeOrderList(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public string GetBase64UrlByURL(string url)
        {
            var base64Url = "";
            try
            {
                if (!string.IsNullOrEmpty(url))
                {
                    base64Url = CommonUtility.GetBase64strFromFilePath((url.ToPhysicalPath()));
                }

            }
            catch (Exception ex)
            {

            }
            return base64Url;
        }

        [HttpPost]
        public IHttpActionResult GetOrderParentRecordById(OrderChildParentFilterModel model)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(_orderService.GetOrderParentRecordById(model));

                }
                else
                {
                    ServiceResponse<string> objReturn = new ServiceResponse<string>();
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
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

        [HttpPost]
        public IHttpActionResult GetOrderChildRecordById(OrderChildParentFilterModel model)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(_orderService.GetOrderChildRecordById(model));
                }
                else
                {
                    ServiceResponse<string> objReturn = new ServiceResponse<string>();
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
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

        [HttpPost]
        public IHttpActionResult GetAllOrderType(IndexModel model)
        {
            ServiceResponse<PagedData<OrderTypeViewModel>> objReturn = new ServiceResponse<PagedData<OrderTypeViewModel>>();
            try
            {

                return Ok(_orderTypeService.GetAll(model));
            }
            catch (Exception ex)
            {
               
                return InternalServerError(ex);

              
            }
        }
        #endregion

    }
}
