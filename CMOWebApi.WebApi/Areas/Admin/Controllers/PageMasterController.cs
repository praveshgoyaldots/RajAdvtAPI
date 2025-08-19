using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class PageMasterController : ApiController
    {
        #region ///  Variable    ///
        private readonly IPageMasterService _pageMasterService;
        IndexModel model = null;
        #endregion

        #region ///   Constructor   ///
      
        public PageMasterController(IPageMasterService pageMasterService, IndexModel indexModel)
        {
            this._pageMasterService = pageMasterService;
            this.model = indexModel;
        }
        #endregion

        #region ///   Method   ///

        // GET: api/PageMaster
        [HttpPost]
        public ServiceResponse<PagedData<PageMasterListViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<PageMasterListViewModel>> objReturn = new ServiceResponse<PagedData<PageMasterListViewModel>>();
            try
            {
                objReturn = _pageMasterService.GetAll(model);
            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // GET: api/PageMaster/5
        [HttpGet]
        public ServiceResponse<PageMasterViewModel> Get(int id)
        {
            ServiceResponse<PageMasterViewModel> objReturn = new ServiceResponse<PageMasterViewModel>();
            try
            {
                objReturn = _pageMasterService.GetById(id);

            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // POST: api/PageMaster
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(PageMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _pageMasterService.AddUpdate(model);
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // PUT: api/PageMaster/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, PageMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && id > 0)
                {
                    model.PageCode = id;
                    objReturn = await _pageMasterService.AddUpdate(model);
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        // DELETE: api/PageMaster/5
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _pageMasterService.UpdateDeleteStatus(id);
            }
            catch
            {

                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _pageMasterService.UpdateActiveStatus(id);
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
