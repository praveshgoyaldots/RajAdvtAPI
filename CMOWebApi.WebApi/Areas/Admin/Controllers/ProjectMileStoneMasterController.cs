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
    public class ProjectMileStoneMasterController : ApiController
    {
        #region /// Variable ///

        private readonly IProjectMileStoneMasterService _projectMileStoneMasterService;
        IndexModel model = null;

        #endregion

        #region /// constructor  ///

        public ProjectMileStoneMasterController(IProjectMileStoneMasterService projectMileStoneMasterService, IndexModel indexModel)
        {
            _projectMileStoneMasterService = projectMileStoneMasterService;
            model = indexModel;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Project Mile Stone List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<ProjectMileStoneMasterModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<ProjectMileStoneMasterModel>> objReturn = new ServiceResponse<PagedData<ProjectMileStoneMasterModel>>();
            try
            {
                objReturn = _projectMileStoneMasterService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// Get Project Mile Stone by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<ProjectMileStoneMasterModel> Get(long id)
        {
            ServiceResponse<ProjectMileStoneMasterModel> objReturn = new ServiceResponse<ProjectMileStoneMasterModel>();
            try
            {
                objReturn = _projectMileStoneMasterService.GetById(id);
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
        /// Get Project Mile Stone by Mile Stone code
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<ProjectMileStoneMasterModel> GetMilestoneByMilestoneCode(int id)
        {
            ServiceResponse<ProjectMileStoneMasterModel> objReturn = new ServiceResponse<ProjectMileStoneMasterModel>();
            try
            {
                objReturn = _projectMileStoneMasterService.GetMilestoneByMilestoneCode(id);
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
        /// Add Project Mile Stone
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(ProjectMileStoneMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _projectMileStoneMasterService.Create(model);
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
        /// Update Project Mile Stone
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(ProjectMileStoneMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    objReturn = await _projectMileStoneMasterService.Edit(model);
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
                objReturn = await _projectMileStoneMasterService.UpdateStatus(id);
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
