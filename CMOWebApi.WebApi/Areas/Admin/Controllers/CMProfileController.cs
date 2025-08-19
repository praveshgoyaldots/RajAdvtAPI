using CMOWebApi.Core;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
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
using System.Web.Http.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class CMProfileController : ApiController
    {
        #region << Variable >>
        private readonly IChiefMinisterProfileService _chiefMinisterProfileService;
        #endregion

        #region << Constructor >>
        public CMProfileController(IChiefMinisterProfileService chiefMinisterProfileService)
        {
            _chiefMinisterProfileService = chiefMinisterProfileService;
        }
        #endregion

        #region << Method >>

        /// <summary>
        /// Get List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
     
        [HttpPost]
        public IHttpActionResult GetAll(IndexModel model)
        {

            ServiceResponse<PagedData<ChiefMinisterProfileViewModel>> objReturn = new ServiceResponse<PagedData<ChiefMinisterProfileViewModel>>();
            try
            {
                return Ok<ServiceResponse<PagedData<ChiefMinisterProfileViewModel>>>(_chiefMinisterProfileService.GetAll(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;

                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Get Detail
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
       
        [HttpGet]
        public IHttpActionResult GetbyId(long id)
        {
            ServiceResponse<ChiefMinisterProfileViewModel> objReturn = new ServiceResponse<ChiefMinisterProfileViewModel>();
            try
            {
                if (id >= 0)
                {
                    return Ok<ServiceResponse<ChiefMinisterProfileViewModel>>(_chiefMinisterProfileService.GetByCode(id));
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    return Ok(objReturn);
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Add Update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
      
        [HttpPost]
        public async Task<IHttpActionResult> AddUpdate(ChiefMinisterProfilePostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                //if (ModelState.IsValid)
                //{
                    return Ok<ServiceResponse<string>>(await _chiefMinisterProfileService.AddUpdate(model));
                //}
                //else
                //{
                //    IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                //    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                //    objReturn.IsSuccess = false;
                //    objReturn.Message = MessageStatus.InvalidData;
                //    return Ok<ServiceResponse<string>>(objReturn);
                //}

            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// DELETE
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        
        [HttpGet]
        public async Task<IHttpActionResult> UpdateDeleteStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id >= 0)
                {
                    return Ok<ServiceResponse<string>>(await _chiefMinisterProfileService.UpdateDeleteStatusAsync(id));
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    return Ok(objReturn);
                }

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Update Active Status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
       
        [HttpGet]
        public async Task<IHttpActionResult> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id >= 0)
                {
                    return Ok<ServiceResponse<string>>(await _chiefMinisterProfileService.UpdateActiveStatus(id));
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    return Ok(objReturn);
                }

            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        #endregion
    }
}
