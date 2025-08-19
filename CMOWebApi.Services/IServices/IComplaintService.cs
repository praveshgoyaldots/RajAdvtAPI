using CMOWebApi.Models.ComplaintModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IComplaintService
    {
        #region Complaint Module 

        /// <summary>
        ///Create Compliant for user, developer and administrator 
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(CompliantEntryModel model);

        /// <summary>
        /// take action by user and developer, administrator for compliant.
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> CreateAction(CompliantActionModel model);

        /// <summary>
        /// Get All Record of complaint entry's 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //ServiceResponse<PagedData<ComplaintEntryListModel>> GetAll(IndexModel model);
        ServiceResponse<PagedData<ComplaintEntryListModel>> GetAll(CompliantSearchModel model);
        ServiceResponse<ComplaintEntryListModel> GetById(int id);
        #endregion
    }
}
