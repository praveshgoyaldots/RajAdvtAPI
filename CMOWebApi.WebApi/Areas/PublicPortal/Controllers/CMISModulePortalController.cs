using CMOWebApi.Core;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
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
    public class CMISModulePortalController : ApiController
    {
        #region /// variable  ///
        ICMISMuduleService _cmisMuduleService;
        #endregion

        #region /// constructor  //
        public CMISModulePortalController( ICMISMuduleService cmisMuduleService)
        {
          
            _cmisMuduleService = cmisMuduleService;
        }
        #endregion

        #region //Method  //
        [HttpPost]
        public IHttpActionResult GetAllCMISModuleData(IndexModel model)

        {
            ServiceResponse<PagedData<CMISModuleDataViewModel>> objReturn = new ServiceResponse<PagedData<CMISModuleDataViewModel>>();
            try
            {
                return Ok(_cmisMuduleService.GetAll(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllCMISModuleMasterData(IndexModel model)

        {
            ServiceResponse<PagedData<CMISModuleMasterViewModel>> objReturn = new ServiceResponse<PagedData<CMISModuleMasterViewModel>>();
            try
            {
                return Ok(_cmisMuduleService.GetAllModuleMasterData(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllCMISModuleSearchData(CMISFilterModel model)

        {
            ServiceResponse<PagedData<CMISModuleMasterViewModel>> objReturn = new ServiceResponse<PagedData<CMISModuleMasterViewModel>>();
            try
            {
                return Ok(_cmisMuduleService.GetAllBySearch(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllCMISModuleDataGroupByDepartment(CMISFilterModel model)

        {
            ServiceResponse<PagedData<DepartmentGroupCMISListViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentGroupCMISListViewModel>>();
            try
            {
                return Ok(_cmisMuduleService.GetCMISListGroupByDepartment(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllCMISAchievement(IndexModel model)

        {
            ServiceResponse<PagedData<CMISAchievementViewModel>> objReturn = new ServiceResponse<PagedData<CMISAchievementViewModel>>();
            try
            {
                return Ok(_cmisMuduleService.GetAllCMISAchievement(model));
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllCMISAchievementGroupByDepartment(IndexModel model)

        {
            ServiceResponse<PagedData<DepartmentGroupCMISAchievementViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentGroupCMISAchievementViewModel>>();
            try
            {
                return Ok(_cmisMuduleService.GetCMISAchievementListGroupByDepartment(model));
            }
            catch (Exception ex)
            {
                objReturn.Exception = ex.Message;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return InternalServerError(ex);
            }
        }

        #endregion
    }
}
