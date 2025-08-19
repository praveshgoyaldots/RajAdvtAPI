using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IVCParticipantCategoryMasterService
    {
        /// <summary>
        /// Get all Participant category with display order
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		ServiceResponse<PagedData<ParticipantCategoryMasterModel>> GetAll(IndexModel model);

        /// <summary>
        /// Craete new Participant category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Create(ParticipantCategoryMasterModel model);

        /// <summary>
        /// Participant category by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
	    ServiceResponse<ParticipantCategoryMasterModel> GetById(long id);

        /// <summary>
        /// Update existing Participant category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Edit(ParticipantCategoryMasterModel model);

        /// <summary>
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
