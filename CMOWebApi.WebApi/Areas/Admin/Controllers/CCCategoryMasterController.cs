using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class CCCategoryMasterController : ApiController
    {
        private readonly ICCCategoryService _CCCategoryService;
        IndexModel model = null;
        public CCCategoryMasterController(ICCCategoryService iCCCategoryService, IndexModel indexModel)
        {
            this._CCCategoryService = iCCCategoryService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<CCCategoryMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<CCCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<CCCategoryMasterViewModel>>();
            try
            {
                objReturn = _CCCategoryService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<CCCategoryMasterViewModel> Get(long id)
        {
            ServiceResponse<CCCategoryMasterViewModel> objReturn = new ServiceResponse<CCCategoryMasterViewModel>();
            try
            {
                objReturn = _CCCategoryService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Post(CCCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _CCCategoryService.Create(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                             .Where(y => y.Count > 0)
                                             .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Put(CCCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    objReturn = await _CCCategoryService.Edit(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                              .Where(y => y.Count > 0)
                                              .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _CCCategoryService.UpdateStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #region CC Category Mapping

        /// <summary>
        /// Get Department Reference list for assign category to these reference
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<CCCategoryReferenceListResponseModel> GetCCCategoryReferenceList(CCCategoryLookupModel model)
        {
            ServiceResponse<CCCategoryReferenceListResponseModel> objReturn = new ServiceResponse<CCCategoryReferenceListResponseModel>();
            try
            {
                objReturn =  _CCCategoryService.GetCCCategoryReferenceList(model);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Save references to mapping table for single CCCategory
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
         [HttpPost]
        public ServiceResponse<CCCategoryReferenceListResponseModel> SaveCCCategoryMapping(CCCategoryLookupModel model)
        {
            ServiceResponse<CCCategoryReferenceListResponseModel> objReturn = new ServiceResponse<CCCategoryReferenceListResponseModel>();
            try
            {
                objReturn = _CCCategoryService.SaveCCCategoryMapping(model);
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
