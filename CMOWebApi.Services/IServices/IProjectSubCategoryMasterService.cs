using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IProjectSubCategoryMasterService
    {
        /// <summary>
        /// Get all project sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		ServiceResponse<PagedData<ProjectSubCategoryMasterViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Craete new project sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Create(ProjectSubCategoryMasterModel model);

        /// <summary>
        /// Project sub category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
	    ServiceResponse<ProjectSubCategoryMasterModel> GetById(long id);

        /// <summary>
        /// Update existing project sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Edit(ProjectSubCategoryMasterModel model);

        /// <summary>
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Project sub category  by Category Code
        /// </summary>
        /// <param name="catCode"></param>
        /// <returns></returns>
        ServiceResponse<ProjectSubCategoryMasterModel> GetProjectSubCategoryByCategoryCode(long catCode);

        /// <summary>
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> ProjectSubCategoryDelete(long id);
    }
}
