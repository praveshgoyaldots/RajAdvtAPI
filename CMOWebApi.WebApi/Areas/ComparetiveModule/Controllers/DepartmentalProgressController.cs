using CMOWebApi.Core;
using CMOWebApi.Models.ComparetiveModel;
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

namespace CMOWebApi.WebAPI.Areas.ComparetiveModule.Controllers
{
    public class DepartmentalProgressController : ApiController
    {
        #region /// Variable ///

        private readonly IDepartmentalProgressService _departmentalProgressService;

        #endregion

        #region /// Constructor ///

        public DepartmentalProgressController(IDepartmentalProgressService departmentalProgressService)
        {
            _departmentalProgressService = departmentalProgressService;
        }

        #endregion

        #region /// Method ///

        /// <summary>
        /// Get all departmental progress Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>     
        [HttpPost]
        public IHttpActionResult Get(IndexModel model,long catCode=0)
        {
            ServiceResponse<PagedData<DepartmentalProgressListViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentalProgressListViewModel>>();
            try
            {
                return Ok(_departmentalProgressService.GetAll(model, catCode));
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
        /// departmental progress by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>       
        [HttpGet]
        public IHttpActionResult Get(long id)
        {
            ServiceResponse<DepartmentalProgressModel> objReturn = new ServiceResponse<DepartmentalProgressModel>();
            try
            {
                if (id >= 0)
                {
                    return Ok(_departmentalProgressService.GetById(id));
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
        /// Craete new departmental progress Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>      
        [HttpPost]
        public async Task<IHttpActionResult> Post(DepartmentalProgressModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _departmentalProgressService.Create(model));
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
        /// Update existing departmental progress Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> Put(DepartmentalProgressModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _departmentalProgressService.Edit(model));
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
                    return Ok(await _departmentalProgressService.UpdateActiveStatus(id));
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
        /// Check dublicate records by year and month
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>      
        [HttpPost]
        public IHttpActionResult IsDuplicateData(DepartmentalProgressModel model)
        {
            ServiceResponse<DepartmentalProgressModel> objReturn = new ServiceResponse<DepartmentalProgressModel>();
            try
            {
                return Ok(_departmentalProgressService.IsDataAvailable(model));
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Get default Parameter With Cumulative And Target Value by month, year and department
        /// </summary>
        /// <param name="monthCode"></param>
        /// <param name="dpt"></param>
        /// <param name="yearCode"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllParameterWithCumulativeAndTargetValue(long monthCode = 0, int dpt = 0, int yearCode = 0)
        {
            try
            {
                return Ok(_departmentalProgressService.GetAllParameterWithCumulativeAndTargetValue(monthCode, dpt, yearCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        #endregion
    }
}
