using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class ProjectMasterPortalController : ApiController
    {
        #region /// variable  ///

        IndexModel model = null;
        private readonly IProjectMasterService _projectMasterService;
        #endregion

        #region /// constructor  //
        public ProjectMasterPortalController(IndexModel Model, IProjectMasterService projectMasterService)
        {
            model = Model;
            _projectMasterService = projectMasterService;
        }

        [HttpPost]
        public ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>> GetListBySearchFilter(ProjectSearchModel model)
        {
            ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>> objReturn = new ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>>();
            try
                {
                objReturn = _projectMasterService.GetAllListByFilter(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                objReturn.Exception = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<ProjectMasterFrontViewModel> GetById(long id, bool IsBase64File=false)
        {
            ServiceResponse<ProjectMasterFrontViewModel> objReturn = new ServiceResponse<ProjectMasterFrontViewModel>();
            try
            {
                if (id > 0)
                {
                    objReturn = _projectMasterService.GetFrontDetailById(id, IsBase64File);
                }
                else
                { objReturn.IsSuccess = false;
                objReturn.Data = null;
                objReturn.Message = MessageStatus.InvalidData;

                }
               


            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Exception = ex.InnerException == null ? ex.Message : ex.InnerException.ToString();
                return objReturn;
            }
            return objReturn;
        }
        #endregion
    }
}
