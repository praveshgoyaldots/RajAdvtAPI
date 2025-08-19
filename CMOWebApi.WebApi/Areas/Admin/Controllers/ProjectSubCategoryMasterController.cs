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
    public class ProjectSubCategoryMasterController : ApiController
    {
        #region /// Variable ///

        private readonly IProjectSubCategoryMasterService _projectSubCategoryMasterService;

        #endregion

        #region /// Constructor ///

        public ProjectSubCategoryMasterController(IProjectSubCategoryMasterService projectSubCategoryMasterService)
        {
            _projectSubCategoryMasterService = projectSubCategoryMasterService;
        }

        #endregion

        #region /// Method ///

        /// <summary>
        /// Get all project sub category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>     
        [HttpPost]
        public IHttpActionResult Get(IndexModel model)
        {
            ServiceResponse<PagedData<ProjectSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<ProjectSubCategoryMasterViewModel>>();
            try
            {
                return Ok(_projectSubCategoryMasterService.GetAll(model));
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
        /// Project category by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>       
        [HttpGet]
        public IHttpActionResult Get(long id)
        {
            ServiceResponse<ProjectSubCategoryMasterModel> objReturn = new ServiceResponse<ProjectSubCategoryMasterModel>();
            try
            {
                if (id >= 0)
                {
                    return Ok(_projectSubCategoryMasterService.GetById(id));
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
        /// Craete new project sub category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>      
        [HttpPost]
        public async Task<IHttpActionResult> Post(ProjectSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _projectSubCategoryMasterService.Create(model));
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
        /// Update existing project sub category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> Put(ProjectSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _projectSubCategoryMasterService.Edit(model));
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
                    return Ok(await _projectSubCategoryMasterService.UpdateActiveStatus(id));
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
        /// Project sub category  by Category Code
        /// </summary>
        /// <param name="catCode"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetProjectSubCategoryByCategoryCode(long catCode)
        {
            ServiceResponse<ProjectSubCategoryMasterModel> objReturn = new ServiceResponse<ProjectSubCategoryMasterModel>();
            try
            {
                if (catCode >= 0)
                {
                    return Ok(_projectSubCategoryMasterService.GetById(catCode));
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
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> ProjectSubCategoryDelete(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _projectSubCategoryMasterService.ProjectSubCategoryDelete(id);
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
