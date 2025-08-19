using CMOWebApi.Models.DepartmentWebsite;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentSectionMappingMasterService
    {
        /// <summary>
		/// Get section mapping master
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		//ServiceResponse<PagedData<DepartmentSectionMappingModel>> GetAll(IndexModel model);
        ServiceResponse<PagedData<DepartmentSectionMappingModel>> GetAll(DepartmentSectionMappingFilterModel model);

        /// <summary>
        /// Add section mapping master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(DepartmentSectionMappingModel model);

        /// <summary>
        /// Update section mapping master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(DepartmentSectionMappingModel model);

        /// <summary>
        /// Get section mapping master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<DepartmentSectionMappingModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);
    }
}
