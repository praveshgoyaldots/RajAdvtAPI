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
    public class JANCategoryMasterController : ApiController
    {
        #region /// Variable ///

        private readonly IJANCategoryMasterService _jANCategoryMasterService;
        IndexModel model = null;

        #endregion

        #region /// constructor  ///

        public JANCategoryMasterController(IJANCategoryMasterService jANCategoryMasterService, IndexModel indexModel)
        {
            _jANCategoryMasterService = jANCategoryMasterService;
            model = indexModel;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Jankalyan Category List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<JANCategoryMasterModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<JANCategoryMasterModel>> objReturn = new ServiceResponse<PagedData<JANCategoryMasterModel>>();
            try
            {
                objReturn = _jANCategoryMasterService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// Get Jankalyan Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<JANCategoryMasterModel> Get(long id)
        {
            ServiceResponse<JANCategoryMasterModel> objReturn = new ServiceResponse<JANCategoryMasterModel>();
            try
            {
                objReturn = _jANCategoryMasterService.GetById(id);
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
        /// Add Jankalyan Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(JANCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _jANCategoryMasterService.Create(model);
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
        /// Update Jankalyan Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(JANCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    objReturn = await _jANCategoryMasterService.Edit(model);
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
                objReturn = await _jANCategoryMasterService.UpdateStatus(id);
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
