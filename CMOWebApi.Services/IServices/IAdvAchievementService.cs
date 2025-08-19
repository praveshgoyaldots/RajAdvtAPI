using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.IServices
{
    public interface IAdvAchievementService
    {
        /// <summary>
        /// get Achievement by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<Adv_AchievementViewModel> GetById(long id, bool isBase64File = true);
        /// <summary>
        /// Update Achivement 
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(Adv_AchievementModel model);
        /// <summary>
        /// Create Achievement
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(Adv_AchievementModel model);
        /// <summary>
        /// Get All Record according Index Model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAll(IndexModel model);
        /// <summary>
        /// Update Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);
        /// <summary>
        /// Delete Achivement by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        Task<ServiceResponse<string>> Delete(long id);
        /// <summary>
        /// Get Banner List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementImageList(IndexModel model, int catgoryCode = 0, bool isBase64File = true);

        /// <summary>
        /// Get All Achievement Category    
        /// <param name="model"></param>
        /// <param name="catgoryCode"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllByCategory(IndexModel model, int catgoryCode = 0, bool isImageRequired = false, bool isAllRecords = false, bool isBase64File = true);


        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetBySearch(SearchModel searchModel, int UserId, bool isAllRecords = false);




        /// <summary>
        /// Get Achievement List Group By Sub Category
        /// </summary>
        /// <param name="model"></param>
        /// <param name="catgoryCode"></param>
        /// <param name="isImageRequired"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<SubCategoryGroupAchievementListViewModel>> GetAchievementListGroupBySubCategory(IndexModel model, int catgoryCode = 0, bool isImageRequired = false);

        ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>> GetAchievementListGroupByCategory(IndexModel model, int catgoryCode = 0, bool isImageRequired = false);

        ServiceResponse<PagedData<DepartmentGroupAchievementListViewModel>> GetAchievementListGroupByDepartment(IndexModel model, int catgoryCode = 0, bool isImageRequired = false);
        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementReport();

		/// <summary>
		/// Get excel sheet of Achievement in base64 
		/// </summary>
		/// <param name="model"></param>
		/// <param name="userId"></param>
		/// <returns></returns>
		ServiceResponse<string> ExportAchievementData(SearchModel model, int userId = 0);


        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllBySearch(AchievementSearchModel model, bool isBase64File = true);
        ServiceResponse<List<RajAdvtSideBarModel>> GetRajAdvtSideBarData(int deptCode,int pageSize);
        //ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllAchievement(IndexModel model, int userId = 0);

        #region Achievement Reports

        /// <summary>
        /// Get achievement summary report of all category.
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<AchievementsCategoryCountReportModel>> GetAchievementsCategoryWiseSummaryReport(DepartmentCategoryReportFilterModel model);

        #endregion

        #region Front Portal

        /// <summary>
        /// get achievement attachments by department code and category code
        /// </summary>
        /// <param name="dptCode"></param>
        /// <param name="categoryCode"></param>
        /// <created by>Tanmaya</created>
        /// <returns></returns>
        ServiceResponse<AchievementAttachmentModel> GetAchievementAttachmentsByDepartmentCode(int dptCode, int categoryCode, long subCatCode = 0);

        #endregion
    }
}
