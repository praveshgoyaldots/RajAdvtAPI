using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IJankalyanConfigurationService
    {
		/// <summary>
		/// Get all Jankalyan Configuration master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<JankalyanConfigurationMasterModel>> GetAll(IndexModel model);
        
		/// <summary>
		/// Craete new Jankalyan Configuration
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(JankalyanConfigurationMasterModel model);

		/// <summary>
		/// Jankalyan Configuration  by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<JankalyanConfigurationMasterModel> GetById(long id);

		/// <summary>
		/// Update existing Jankalyan Configuration
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(JankalyanConfigurationMasterModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Get top record for module Configuration 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<JankalyanConfigurationMasterModel> GetTopRecordForConfiguration();

    }
}
