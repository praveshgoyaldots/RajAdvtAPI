using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class ProjectSubSubCategoryMasterController : ApiController
    {
        private readonly IProjectSubSubCategoryMasterService _pojectSubSubCategoryMasterService;
        public ProjectSubSubCategoryMasterController(IProjectSubSubCategoryMasterService pojectSubSubCategoryMasterService)
        {
            this._pojectSubSubCategoryMasterService = pojectSubSubCategoryMasterService;
        }

        /// <summary>
        /// Get all project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<SubSubCategoryMasterViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<SubSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<SubSubCategoryMasterViewModel>>();
            try
            {
                objReturn = _pojectSubSubCategoryMasterService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// Project sub sub category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<SubSubCategoryMasterModel> Get(long id)
        {
            ServiceResponse<SubSubCategoryMasterModel> objReturn = new ServiceResponse<SubSubCategoryMasterModel>();
            try
            {
                objReturn = _pojectSubSubCategoryMasterService.GetById(id);
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
        /// Craete new project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(SubSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    if (!_pojectSubSubCategoryMasterService.IsDuplicate(model.Name,model.Id))
                    {
                        objReturn = await _pojectSubSubCategoryMasterService.Create(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.NameExist;
                        return objReturn;
                    }
                   
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
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
        /// Update existing project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(SubSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    if (!_pojectSubSubCategoryMasterService.IsDuplicate(model.Name, model.Id))
                    {
                        objReturn = await _pojectSubSubCategoryMasterService.Edit(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.NameExist;
                        return objReturn;
                    }
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
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
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _pojectSubSubCategoryMasterService.UpdateActiveStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get all project sub sub category for department user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<SubSubCategoryMasterViewModel>> GetAllSubSubCategoryForDepartment()
        {
            ServiceResponse<List<SubSubCategoryMasterViewModel>> objReturn = new ServiceResponse<List<SubSubCategoryMasterViewModel>>();
            try
            {
                objReturn = _pojectSubSubCategoryMasterService.GetAllSubSubCategoryForDepartment();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> ProjectSubSubCategoryDelete(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _pojectSubSubCategoryMasterService.ProjectSubSubCategoryDelete(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

    }
}
