using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
   public interface ICitizenAttachmentService
    {
        /// <summary>
        /// Get All Attachment data in list Format
        /// </summary>
        /// <param name="model"> default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
        /// <returns>PagedData<CitizenAttachmentViewModel></returns>
        ServiceResponse<PagedData<CitizenAttachmentViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add Attachment
        /// </summary>
        /// <param name="model">CitizenAttachmentViewModel </param>
        /// <returns>Attachment Code</returns>
        Task<ServiceResponse<string>> Add(CitizenAttachmentViewModel model);

        /// <summary>
        /// Get Detail of Attachment
        /// </summary>
        /// <param name="id">Attachment Code</param>
        /// <returns>CitizenAttachmentViewModel</returns>
        Task<ServiceResponse<CitizenAttachmentViewModel>> GetById(long id);

        /// <summary>
        /// Edit Attachment Detail
        /// </summary>
        /// <param name="model">CitizenAttachmentViewModel </param>
        /// <returns>Attachment Code</returns>
        Task<ServiceResponse<string>> Edit(CitizenAttachmentViewModel model);

        /// <summary>
        /// Update Active Status
        /// </summary>
        /// <param name="id">Attachment Code</param>
        /// <returns>Attachment Code</returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Update Delete Status
        /// </summary>
        /// <param name="id">Attachment Code</param>
        /// <returns>Attachment Code</returns>
        Task<ServiceResponse<string>> UpdateDeleteStatus(long id);

        /// <summary>
        /// Check Attachment is Exist or not
        /// </summary>
        /// <param name="attachmentName">Attachment</param>
        /// <returns>Attachment Code </returns>
        ServiceResponse<object> IsAttachmentNameExist(string attachmentName);
    }
}
