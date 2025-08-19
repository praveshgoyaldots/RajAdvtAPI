using CMOWebApi.Core;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.NewsModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class NewsPaperPortalController : ApiController
    {
        #region /// variable  ///

        IndexModel model = null;
        private readonly INewspaperService _newspaperService;
        #endregion

        #region /// constructor  //
        public NewsPaperPortalController(IndexModel Model, INewspaperService newspaperService)
        {
            model = Model;
            _newspaperService = newspaperService;
        }

        [HttpPost]
        public ServiceResponse<PagedData<NewsProgressListViewModel>> GetListBySearchFilter(NewsProgressSearchModel model)
        {
            ServiceResponse<PagedData<NewsProgressListViewModel>> objReturn = new ServiceResponse<PagedData<NewsProgressListViewModel>>();
            try
            {
                objReturn = _newspaperService.GetAllNewsProgressListByFilter(model, isBase64File: false);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                objReturn.Exception = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;

            }
            return objReturn;
        }


        /// <summary>
        /// Get newspaper by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<NewspaperTransactionDetailViewModel> GetById(int id, bool isBase64File = false)
        {
            ServiceResponse<NewspaperTransactionDetailViewModel> objReturn = new ServiceResponse<NewspaperTransactionDetailViewModel>();
            try
            {
                objReturn = _newspaperService.GetNewspaperTransactionDetailWithProgressList(id, isBase64File);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        #endregion
    }
}
