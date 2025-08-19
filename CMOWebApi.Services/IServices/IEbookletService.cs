using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
    public interface IEbookletService
	{
		/// <summary>
		/// Get E-booklet by Beneficiary Category and Department
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<EBookletResponseModel> GeEbooklet(EBookletFilterModel model);

        #region Front

        /// <summary>
        /// Get E-booklet KPI Category, Beneficiary Category and Department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<EBookletCategoryModel>> GeEbookletCategory(EBookletCategoryFilterModel model);

        /// <summary>
        /// Get E-booklet list by KPI Category, Beneficiary Category and Department with category details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<FrontBookletDetailModel> GetEBookletandCategoryDetail(EBookletFronFilterModel model);

        #endregion

    }
}
