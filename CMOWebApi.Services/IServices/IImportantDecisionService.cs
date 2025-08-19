using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
    {
  public  interface IImportantDecisionService
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


        ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementReport();

        #region Jankalyan Front-end

        /// <summary>
        /// Get Important decission List for Jankalyan front-end with filter and search
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<ImportantDecisionListModel>> GetImportantDecisionList(ImportantDecisionSearchModel model);

        /// <summary>
        /// Get Important decission detail for Jankalyan front-end
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<ImportantDecisionDetailModel> GetImportantDecisionDetail(int id);

        #endregion

        #region Reports

        /// <summary>
        /// Order report of department with Type and Sub Type 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<ImportantDecisionSummaryReportModel>> GetImportantDecisionSummaryReport(ImpDescSummaryReportFilterModel model);


		/// <summary>
		/// Get Important decision department count report on fromdate and todate wise 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<List<ImportantDecisionCountReportModel>> GetImportantDecisionDepartmentSummaryReport(ImportantDecisionCountReportFilterModel model);

		/// <summary>
		/// Important decision report and apply filter on department, fromdate and todate 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<List<ImportantDecisionDetailReportModel>> GetImportantDecisionDetailReport(OrderSummaryReportFilterModel model);

		#endregion

	}
}
