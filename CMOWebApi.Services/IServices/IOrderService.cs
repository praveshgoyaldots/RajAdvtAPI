using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.ModelBinding;

namespace CMOWebApi.Services.IServices
{
    public interface IOrderService
    {
		
        Task<ServiceResponse<string>> AddUpdateOrder(OrderEntryModel model, bool isService = false);
        Task<ServiceResponse<string>> Delete(long id);

        ServiceResponse<PagedData<OrderEntryListModel>> GetAll(CustomSearchDateModel model);
        Task<ServiceResponse<string>> LockToggle(long id);

        dynamic RelatedToAPICall(dynamic model, Boolean IsResult = false);

        Task<ServiceResponse<OrderWithRelatedToViewModel>> GetById(long idModel, bool isBase64File = true);

        Task<ServiceResponse<string>> SetStatus(long id);

        ModelStateDictionary VerifyAttachmentModel(OrderEntryModel model);

        Task<ServiceResponse<string>> UploadOrderAttachment(UploadAttachmentModel model);

        ServiceResponse<PagedData<OrderEntryListFrontEndModel>> GetAllOrderPublicPortal(OrderFrontEndModel model, bool usePaging = true, bool isRequiredBase64File = true);

       Task<ServiceResponse<OrderResponseServiceModel>> GetService(ApiGetDataModel model, HttpRequestHeaders header = null);

        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllAchievement();

        ServiceResponse<PagedData<OrderEntryListFrontEndModel>> GetAllOrderList();

        ServiceResponse<PagedData<TypeGroupOrderListViewModel>> GetGroupTypeOrderList(OrderFrontEndModel model);

       
        ServiceResponse<List<GetOrderCountReportViewModel>> GetAllOrderReport(DepartmentCategoryReportFilterModel model);

        ServiceResponse<List<OrderGenerateOrderReportSearchResultModel>> GetOrderDetailReport(OrderReportSearchModel model);
        //ServiceResponse<ReportResponseModel> GetAllOrderReport();

        ServiceResponse<PagedData<OrderDetailMasterViewModel>> GetOrderParentRecordById(OrderChildParentFilterModel model);

        ServiceResponse<PagedData<OrderDetailMasterViewModel>> GetOrderChildRecordById(OrderChildParentFilterModel model);

        #region order report

        /// <summary>
        /// Order report of department with Type and Sub Type 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<OrderSummaryReportModel>> GetOrderSummaryReport(OrderSummaryReportFilterModel model);

        /// <summary>
        /// Order report of department with Type and Sub Type and Last transaction date
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<OrderSummaryReportWithLastTransactionModel>> GetOrderSummaryReportWithLastTransaction(OrderSummaryReportFilterModel model);

        /// <summary>
        /// Order report of department with Type and Last transaction date
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<OrderSummaryTypeReportWithLastTransactionModel>> GetOrderTypeSummaryReportWithLastTransaction(OrderSummaryReportFilterModel model);

        /// <summary>
        /// Get Order department count report on fromdate and todate wise 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<OrderDepartmentCountReportModel>> GetOrderDepartmentSummaryReport(OrderDepartmentCountReportFilterModel model);

        #endregion

        #region Services

        /// <summary>
        /// This service provides the list of Government Document according to department
        /// </summary>
        /// <param name="model"> DepartmentCode is mandatory</param> 
        /// <returns></returns>
        ServiceResponse<List<OrderServiceResultModel>> GetGovernmentDocumentServiceForDepartment(OrderServiceParameterModel model);

        /// <summary>
        /// This service use for create/Update record in Government Document through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> AddUpdateGovDocumentService(GovDocumentServiceModel model, HttpRequestHeaders header = null);

        #endregion

        #region Export To Excel

        /// <summary>
        /// Get excel sheet of Government Document in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<string> ExportGovernmentDocumentData(CustomSearchDateModel model);
        
        #endregion
    }
}
