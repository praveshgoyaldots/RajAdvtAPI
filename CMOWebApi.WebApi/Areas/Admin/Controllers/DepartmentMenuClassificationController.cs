using CMOWebApi.Core;
using CMOWebApi.Models.DepartmentWebsite;
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
using System.Web.Http.ModelBinding;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class DepartmentMenuClassificationController : ApiController
    {
        #region /// Variable ///

        private readonly IDepartmentMenuClassificationService _departmentMenuClassificationService;

        #endregion

        #region /// Constructor ///

        public DepartmentMenuClassificationController(IDepartmentMenuClassificationService departmentMenuClassificationService)
        {
            _departmentMenuClassificationService = departmentMenuClassificationService;
        }

        #endregion

        #region /// Method ///

        /// <summary>
        /// Get all Department Menu Classification
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>  
        [HttpPost]
        public IHttpActionResult GetAll(DepartmentMainMenuFilterModel model)
        {
            try
            {
                
                return Ok(_departmentMenuClassificationService.GetAll(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    

    /// <summary>
    /// Get record by id of Department Menu Classification
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>      
    [HttpGet]
        public async Task<IHttpActionResult> GetById(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id >= 0)
                {
                    return Ok(_departmentMenuClassificationService.GetById(id));
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
        /// This for create new record in Department Menu Classification.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>    
        [HttpPost]
        public async Task<IHttpActionResult> Post(DepartmentMenuClassificationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _departmentMenuClassificationService.Create(model));

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
        /// this is for edit the Department Menu Classification.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> Put(DepartmentMenuClassificationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _departmentMenuClassificationService.Edit(model));
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
                    return Ok(await _departmentMenuClassificationService.UpdateActiveStatus(id));
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
