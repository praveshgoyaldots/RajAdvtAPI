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
   public interface IAchievementSubCategoryService
    {
        /// <summary>
        /// get Achievement SubCategory by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<AdvAchievementSubCategoryMasterViewModel> GetById(long id);
        /// <summary>
        /// Update Achivement SubCategory
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(AdvAchievementSubCategoryMasterModel model);
        /// <summary>
        /// Create Achievement SubCategory
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(AdvAchievementSubCategoryMasterModel model);
        /// <summary>
        /// Get All Record according Index Model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>> GetAll(IndexModel model);
        /// <summary>
        /// Update Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);
        /// <summary>
        /// Delete Achivement Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Delete(long id);

       
        }
}
