using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class SchemePortalController : ApiController
    {
        #region /// variable  ///
        private readonly ISchemeService _schemeService;
        //private readonly IAdvertisementService _advertisementService;
        //private readonly string _path = FilePath.AdvLocation.GetStringValue();
        IndexModel model = null;
        #endregion

        #region /// constructor  //
        public SchemePortalController(ISchemeService schemeService, IndexModel Model)
        {
            model = Model;
            _schemeService = schemeService;
            //_advertisementService = advertisementService;
        }
        #endregion

        // GET: api/SchemePortal
        [HttpPost]
        public ServiceResponse<PagedData<SchemePortalViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<SchemePortalViewModel>> objReturn = new ServiceResponse<PagedData<SchemePortalViewModel>>();
            try
            {
                objReturn = _schemeService.GetAllSchemeForPublicPortal(model, false);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<List<schemedepartmentlistmodel>> GetlistScheme()
        {
            ServiceResponse<List<schemedepartmentlistmodel>> objReturn = new ServiceResponse<List<schemedepartmentlistmodel>>();
            try
            {
                objReturn = _schemeService.GetAllSchemeListPublicPortal();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        // GET api/<controller>/5
        public async Task<ServiceResponse<PublicPortalSchemeViewModel>> GetById(long id)
        {
            ServiceResponse<PublicPortalSchemeViewModel> objReturn = new ServiceResponse<PublicPortalSchemeViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _schemeService.GetByIdForFrontEnd(id, false);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;

            }
            return objReturn;
        }

        [HttpGet]
        // GET api/SchemePortal/GetSchemeGroupDetail/5
        public ServiceResponse<SchemeGroupDetailViewModel> GetSchemeGroupDetail(long id)
        {
            ServiceResponse<SchemeGroupDetailViewModel> objReturn = new ServiceResponse<SchemeGroupDetailViewModel>();
            try
            {
                if (id > 0)
                {
                    return _schemeService.GetSchemeGroupDetail(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
       // api/SchemePortal/GetAllSchemeByFilter
        [HttpPost]
        public ServiceResponse<PagedData<SchemePortalViewModel>> GetAllSchemeByFilter(SchemeFrontEndFilterModel model)
         {
            ServiceResponse<PagedData<SchemePortalViewModel>> objReturn = new ServiceResponse<PagedData<SchemePortalViewModel>>();
            try
            {
                objReturn = _schemeService.GetAllFilterSchemeForPublicPortal(model, false);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        [HttpGet]
        public ServiceResponse<SchemeFAQModel> GetSchemeFaq(long id)
        {
            ServiceResponse<SchemeFAQModel> objReturn = new ServiceResponse<SchemeFAQModel>();
            try
            {
                if (id > 0)
                {
                    objReturn = _schemeService.GetFaqBySchemeId(id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                }

            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }


        [HttpPost]
        public IHttpActionResult GetTopSchemeByDepartment(IndexModel model)
        {
            ServiceResponse<PagedData<SchemePortalViewModel>> objReturn = new ServiceResponse<PagedData<SchemePortalViewModel>>();
            try
            {
                objReturn = _schemeService.GetTopSchemeByDepartment(model, false);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = Core.MessageStatus.Error;
                return InternalServerError(ex);
            }
            return Ok(objReturn);
        }

    }
    //[HttpPost]
    //public ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement(IndexModel model)
    //{
    //    ServiceResponse<PagedData<GovermentAchievementModel>> objReturn = new ServiceResponse<PagedData<GovermentAchievementModel>>();
    //    try
    //    {
    //        return _advertisementService.GetAllGovermentAchivement(model);
    //    }
    //    catch (Exception ex)
    //    {

    //        objReturn.IsSuccess = false;
    //        objReturn.Message = MessageStatus.Error;
    //        return objReturn;
    //    }
    //}


}
