using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class NewspaperMasterController : ApiController
    {
        #region /// Variable ///

        private readonly INewspaperMasterService _newspaperMasterService;
        IndexModel model = null;

        #endregion

        #region /// constructor  ///

        public NewspaperMasterController(INewspaperMasterService newspaperMasterService, IndexModel indexModel)
        {
            _newspaperMasterService = newspaperMasterService;
            model = indexModel;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Newspaper Master List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<NewspaperMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<NewspaperMasterViewModel>> objReturn = new ServiceResponse<PagedData<NewspaperMasterViewModel>>();
            try
            {
                objReturn = _newspaperMasterService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// Get Newspaper Master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<NewspaperMasterModel> Get(long id)
        {
            ServiceResponse<NewspaperMasterModel> objReturn = new ServiceResponse<NewspaperMasterModel>();
            try
            {
                objReturn = _newspaperMasterService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        /// <summary>
        /// Add Newspaper Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(NewspaperMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _newspaperMasterService.Create(model);
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

        /// <summary>
        /// Update Newspaper Master
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(NewspaperMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    objReturn = await _newspaperMasterService.Edit(model);
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

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _newspaperMasterService.UpdateStatus(id);
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
