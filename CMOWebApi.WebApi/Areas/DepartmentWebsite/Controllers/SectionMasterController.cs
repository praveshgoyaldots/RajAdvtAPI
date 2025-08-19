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

namespace CMOWebApi.WebAPI.Areas.DepartmentWebsite.Controllers
    {
    public class SectionMasterController : ApiController
        {
        #region /// Variable ///

        private readonly ISectionMasterService _SectionMasterService;

        #endregion

        #region /// Constructor ///

        public SectionMasterController(ISectionMasterService SectionMasterService)
            {
            _SectionMasterService = SectionMasterService;
            }

        #endregion

        #region /// Method ///

        /// <summary>
        /// Get all Section Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>  
        [HttpPost]
        public IHttpActionResult GetAll(IndexModel model)
            {
            try
                {

                return Ok(_SectionMasterService.GetAll(model));
                }
            catch (Exception ex)
                {
                return InternalServerError(ex);
                }
            }



        /// <summary>
        /// Get record by id of Section Master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>      
        public IHttpActionResult GetById(long id)
            {
            ServiceResponse<SectionMasterModel> objReturn = new ServiceResponse<SectionMasterModel>();
            try
                {
                if (id >= 0)
                    {
                    return Ok(_SectionMasterService.GetById(id));
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
        /// This for create new record in Section Master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>    
        [HttpPost]
        public async Task<IHttpActionResult> Post(SectionMasterModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (ModelState.IsValid)
                    {
                    return Ok(await _SectionMasterService.Create(model));

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
        /// this is for edit the Section Master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> Put(SectionMasterModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (ModelState.IsValid)
                    {
                    return Ok(await _SectionMasterService.Edit(model));
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
                    return Ok(await _SectionMasterService.UpdateActiveStatus(id));
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
