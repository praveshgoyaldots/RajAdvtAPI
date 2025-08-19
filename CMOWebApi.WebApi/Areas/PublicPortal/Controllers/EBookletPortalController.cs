using CMOWebApi.Core;
using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class EBookletPortalController : ApiController
    {
        #region /// Variable ///

        private readonly IEbookletService _EbookletService;

        #endregion

        #region /// Constructor ///

        public EBookletPortalController(IEbookletService EbookletService)
        {
            _EbookletService = EbookletService;
        }

        #endregion


        #region /// Methods ///

        /// <summary>
        /// Get E-booklet by Beneficiary Category and Department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<EBookletCategoryModel>> GeEbookletCategory(EBookletCategoryFilterModel model)
        {
            ServiceResponse<List<EBookletCategoryModel>> objReturn = new ServiceResponse<List<EBookletCategoryModel>>();
            try
            {
                return _EbookletService.GeEbookletCategory(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get E-booklet list by KPI Category, Beneficiary Category and Department with category details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<FrontBookletDetailModel> GetEBookletandCategoryDetail(EBookletFronFilterModel model)
        {
            ServiceResponse<FrontBookletDetailModel> objReturn = new ServiceResponse<FrontBookletDetailModel>();
            try
            {
                return _EbookletService.GetEBookletandCategoryDetail(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion
    }

}
