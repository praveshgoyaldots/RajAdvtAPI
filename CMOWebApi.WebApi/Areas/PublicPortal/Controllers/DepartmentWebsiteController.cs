using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.DepartmentWebsite;
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

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class DepartmentWebsiteController : ApiController
    {
        #region /// variable  ///
        IDepartmentWebsiteService _departmentWebsiteService;
        private readonly ITenderMasterService _tenderMasterService;
        private readonly IDepartmentContactDetails _departmentContactService;
        private readonly ILookupService _lookupService;

        #endregion

        #region /// constructor  //
        public DepartmentWebsiteController(IDepartmentWebsiteService departmentWebsiteService, ITenderMasterService tenderMasterService, IDepartmentContactDetails departmentContactService, ILookupService lookupService)
        {
            _departmentContactService = departmentContactService;
            _departmentWebsiteService = departmentWebsiteService;
            _tenderMasterService = tenderMasterService;
            _lookupService = lookupService;

        }

 
        #endregion

        #region ///  Methods   ///

        [HttpGet]
        public IHttpActionResult GetOrderPressReleaseTenderData(int dptCode = 0, int distDptCode = 0)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetOrderPressReleaseTenderData(dptCode, distDptCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetMLAConstituency(IndexModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetMLAConstituency(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDepartemntWebsiteQuickLink(int dptCode)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetDepartemntWebsiteQuickLink(dptCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetPressReleaseByFilter(PressReleaseFrontSearchModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetPressReleaseByFilter(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDepartmentDetailByDptCode(int dptCode)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetDepartmentDetailByDptCode(dptCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAndSetVisitorCount(int DepartmentCode)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetAndSetVisitorCount(DepartmentCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetDptWebsiteOtherGeneralLink(DptWebsiteOtherLinkFilterModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetDptWebsiteOtherGeneralLink(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetDptWebsiteOtherTransactionLink(DptWebsiteOtherLinkFilterModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetDptWebsiteOtherTransactionLink(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetWebsiteHomePageSection(int dptCode)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetWebsiteHomePageSection(dptCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        public IHttpActionResult GetAllTendorData(IndexModel model)
        {
            try
            {
                return Ok(_tenderMasterService.GetAllTendorData(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //[HttpPost]
        //public ServiceResponse<PagedData<DiprTenderMasterModel>> GetAllTendorData(IndexModel model)
        //    {
        //    ServiceResponse<PagedData<DiprTenderMasterModel>> objReturn = new ServiceResponse<PagedData<DiprTenderMasterModel>>();
        //    try
        //        {
        //        objReturn = _tenderMasterService.GetAllTendorData(model);
        //        }
        //    catch
        //        {
        //        objReturn.IsSuccess = false;
        //        objReturn.Message = MessageStatus.Error;

        //        }
        //    return objReturn;
        //    }



        [HttpGet]
        public IHttpActionResult GetMenuListForDepartment(int dptCode = 0)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetMenuListForDepartment(dptCode));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetPressReleaseProgramPhotoVideo(PressReleaseProgramPhotoFrontSearchModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetPressReleaseProgramPhotoVideo(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult GetDptWebsiteSubMenus(DptWebsiteOtherLinkFilterModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetDptWebsiteSubMenus(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// This method for show department contact detail 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetDepartmentContactDetail(IndexModel model)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetAllDepartmentontactDetail(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// this method for get pdf and image while passing code of main table.
        /// </summary>
        /// <param name="Code"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetDataByCode(long Code = 0)
        {
            try
            {
                return Ok(_departmentWebsiteService.GetDataByCode(Code));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]   
        public async Task<ServiceResponse<LookUpViewModel>> GetDepartmentContactCategoryDetail(long id)
        {
            ServiceResponse<LookUpViewModel> objReturn = new ServiceResponse<LookUpViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _lookupService.GetById(id);
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

        #endregion

        #region DIPR ContactUs
        /// <summary>
        /// Craete new Department Sub Menu Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>      
        [HttpPost]
        public async Task<IHttpActionResult> Post(DIPRFrontContactUsModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _departmentWebsiteService.CreateContactUs(model));
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
        #endregion


    }
}
