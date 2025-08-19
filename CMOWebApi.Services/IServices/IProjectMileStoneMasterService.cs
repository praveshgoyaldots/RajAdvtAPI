using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IProjectMileStoneMasterService
    {
        /// <summary>
        /// Get Project Mile Stone List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<ProjectMileStoneMasterModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add Project Mile Stone
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(ProjectMileStoneMasterModel model);

        /// <summary>
        /// Update Project Mile Stone
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(ProjectMileStoneMasterModel model);

        /// <summary>
        /// Get Project Mile Stone by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<ProjectMileStoneMasterModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);

        /// <summary>
        /// Get Project Mile Stone by Mile Stone code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        ServiceResponse<ProjectMileStoneMasterModel> GetMilestoneByMilestoneCode(int code);


    }
}
