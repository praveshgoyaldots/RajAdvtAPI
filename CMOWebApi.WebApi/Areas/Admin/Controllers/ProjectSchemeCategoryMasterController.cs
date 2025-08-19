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
    public class ProjectSchemeCategoryMasterController : ApiController
    {
        #region /// Variable ///

        private readonly IProjectSchemeCategoryMasterService _projectSchemeCategoryMasterService;

        #endregion

        #region /// Constructor ///

        public ProjectSchemeCategoryMasterController(IProjectSchemeCategoryMasterService projectSchemeCategoryMasterService)
        {
            _projectSchemeCategoryMasterService = projectSchemeCategoryMasterService;
        }

        #endregion

        #region /// Method ///

        /// <summary>
        /// Get all project scheme category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>     
        [HttpPost]
        public IHttpActionResult Get(IndexModel model)
        {
            ServiceResponse<PagedData<ProjectSchemeCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<ProjectSchemeCategoryMasterViewModel>>();
            try
            {
                return Ok(_projectSchemeCategoryMasterService.GetAll(model));
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
        /// Project scheme category by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>       
        [HttpGet]
        public IHttpActionResult Get(long id)
        {
            ServiceResponse<ProjectSchemeCategoryMasterModel> objReturn = new ServiceResponse<ProjectSchemeCategoryMasterModel>();
            try
            {
                if (id >= 0)
                {
                    return Ok(_projectSchemeCategoryMasterService.GetById(id));
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
        /// Craete new project scheme category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>      
        [HttpPost]
        public async Task<IHttpActionResult> Post(ProjectSchemeCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!_projectSchemeCategoryMasterService.IsProjectSchemeExist(model.ProgramSchemeName,model.NodalDepartmentCode, model.Id))
                    {
                        return Ok(await _projectSchemeCategoryMasterService.Create(model));
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.NameWihDepExist;
                        return Ok(objReturn);
                    }
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
        /// Update existing project scheme category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> Put(ProjectSchemeCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!_projectSchemeCategoryMasterService.IsProjectSchemeExist(model.ProgramSchemeName,model.NodalDepartmentCode, model.Id))
                    {
                        return Ok(await _projectSchemeCategoryMasterService.Edit(model));
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.NameWihDepExist;
                        return Ok(objReturn);
                    }
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
                    return Ok(await _projectSchemeCategoryMasterService.UpdateActiveStatus(id));
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
