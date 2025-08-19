using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class ImportantDecisionPortalController : ApiController
    {
        #region Variable

        private readonly IImportantDecisionService _impService;

        #endregion

        #region Constructor 
        public ImportantDecisionPortalController(IImportantDecisionService impService)
        {
            _impService = impService;

        }
        #endregion

        #region Methods

        /// <summary>
        /// Get Important decission List for Jankalyan front-end with filter and search
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<ImportantDecisionListModel>> GetImportantDecisionList(ImportantDecisionSearchModel model)
        {
            ServiceResponse<PagedData<ImportantDecisionListModel>> objReturn = new ServiceResponse<PagedData<ImportantDecisionListModel>>();
            try
            {
                    return _impService.GetImportantDecisionList(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get Important decission detail for Jankalyan front-end
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<ImportantDecisionDetailModel> GetImportantDecisionDetail(int id)
        {
            ServiceResponse<ImportantDecisionDetailModel> objReturn = new ServiceResponse<ImportantDecisionDetailModel>();
            try
            {
                return _impService.GetImportantDecisionDetail(id);
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
