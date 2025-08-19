using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.WebServices.Controllers
{
    public class ProjectServiceController : ApiController
    {
        #region /// variable  ///
        private readonly IProjectMasterService _projectMasterService;
        #endregion

        #region /// constructor  //
        public ProjectServiceController(IProjectMasterService projectMasterService)
        {
            _projectMasterService = projectMasterService;
        }
        #endregion

        #region Push Services

        /// <summary>
        /// This service use for create/Update record in project master through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> ProjectPushService(WorksEntryServiceModel model)
        {
             ServiceResponse<string> objReturn = new  ServiceResponse<string>();
            try
            {
                if (model!=null)
                {
                  
                if (ModelState.IsValid)
                {
                    objReturn = await _projectMasterService.AddUpdateProjectService(model, Request.Headers);
                }
                 else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                           .Where(y => y.Count > 0)
                                           .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ?(string.IsNullOrEmpty(y.Exception.ToString())? y.Exception.ToString(): y.Exception.Message) : y.ErrorMessage)).LastOrDefault()).ToList());
                        objReturn.StatusCode = ResponseStatusCode.error;
                        return objReturn;
                    }
                }
                else
                {
                    objReturn.Data = null;
                    objReturn.IsSuccess = false;
                    objReturn.StatusCode = ResponseStatusCode.error;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.StatusCode = ResponseStatusCode.error;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        #endregion

    }
}
