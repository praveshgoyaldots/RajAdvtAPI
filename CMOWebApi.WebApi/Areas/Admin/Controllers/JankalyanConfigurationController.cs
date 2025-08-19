using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class JankalyanConfigurationController : ApiController
    {
        #region /// Variable ///

        private readonly IJankalyanConfigurationService _jankalyanConfigurationService;

        #endregion

        #region /// Constructor ///

        public JankalyanConfigurationController(IJankalyanConfigurationService jankalyanConfigurationService)
        {
            _jankalyanConfigurationService = jankalyanConfigurationService;
        }

        #endregion

        #region /// Method ///

        /// <summary>
        /// Get all Jankalyan Configuration Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>     
        [HttpPost]
        public IHttpActionResult Get(IndexModel model)
        {
            ServiceResponse<PagedData<JankalyanConfigurationMasterModel>> objReturn = new ServiceResponse<PagedData<JankalyanConfigurationMasterModel>>();
            try
            {
                return Ok(_jankalyanConfigurationService.GetAll(model));
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
        /// Jankalyan Configuration by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>       
        [HttpGet]
        public IHttpActionResult Get(long id)
        {
            ServiceResponse<JankalyanConfigurationMasterModel> objReturn = new ServiceResponse<JankalyanConfigurationMasterModel>();
            try
            {
                if (id >= 0)
                {
                    return Ok(_jankalyanConfigurationService.GetById(id));
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
        /// Craete new Jankalyan Configuration Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>      
        [HttpPost]
        public async Task<IHttpActionResult> Post(JankalyanConfigurationMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _jankalyanConfigurationService.Create(model));
                }
                else
                {
                    IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
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
        /// Update existing Jankalyan Configuration Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> Put(JankalyanConfigurationMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _jankalyanConfigurationService.Edit(model));
                }
                else
                {
                    IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
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
        /// Update Status(Active/De-Active)
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
                    return Ok(await _jankalyanConfigurationService.UpdateActiveStatus(id));
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
        /// Get top record for module Configuration 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetTopRecordForConfiguration()
        {
            try
            {
                return Ok(_jankalyanConfigurationService.GetTopRecordForConfiguration());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        #endregion
    }
}
