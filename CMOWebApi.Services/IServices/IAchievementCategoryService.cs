using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.IServices
{
    public interface IAchievementCategoryService
    {
        /// <summary>
        /// get Achievement Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<AdvAchievementCategoryMasterModel> GetById(long id);
        /// <summary>
        /// Update Achivement Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(AdvAchievementCategoryMasterModel model);
        /// <summary>
        /// Create Achievement Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(AdvAchievementCategoryMasterModel model);
        /// <summary>
        /// Get All Record according Index Model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>> GetAll(IndexModel model);
        /// <summary>
        /// Update Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

    }
}
