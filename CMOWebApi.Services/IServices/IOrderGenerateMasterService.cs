using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IOrderGenerateMasterService
    {
		ServiceResponse<PagedData<OrderGenerateMasterListModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(OrderGenerateMasterModel model);
		Task<ServiceResponse<OrderGenerateMasterViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(OrderGenerateMasterModel model);
        Task<ServiceResponse<string>> LockToggle(long id);
        Task<ServiceResponse<string>> SetStatus(long id, string dispatchNo);
        ServiceResponse<List<OrderGenerateHindiEnglishModel>> OrderGenerateHindiEnglish(long id);
        ServiceResponse<List<AttachmentsLookupModel>> GetAttachments(long id);
        ServiceResponse<string> GenerateUINumber(long id);
        ServiceResponse<PagedData<OrderGenerateAuthorityListModel>> GetAuthorityList(IndexModel model);
        ServiceResponse<string> UpdateEsignDocument(string url);
        ServiceResponse<string> SendNotificationToReferency(ReferencyNotificationResponseModel model,bool IsCancellation = false);
        ServiceResponse<string> SaveCancellationOrder(CancellationLookupModel model);
        Task<ServiceResponse<string>> SetFinalAProval(long id);
        ServiceResponse<PagedData<OrderFinalAProvalListModel>> GetFinalApprovalList(IndexModel model);
    }
}
