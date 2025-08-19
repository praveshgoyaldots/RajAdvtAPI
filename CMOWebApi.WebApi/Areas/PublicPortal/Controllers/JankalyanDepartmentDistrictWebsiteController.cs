using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using System;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.PublicPortal.Controllers
{
    public class JankalyanDepartmentDistrictWebsiteController : ApiController
    {
        #region /// variable  ///

        IndexModel model = null;
        private readonly IJankalyanDepartmentDistrictWebsiteService _jankalyanDepartmentDistrictWebsiteService;
        #endregion

        #region /// constructor  //
        public JankalyanDepartmentDistrictWebsiteController(IJankalyanDepartmentDistrictWebsiteService jankalyanDepartmentDistrictWebsiteService)
        {
            _jankalyanDepartmentDistrictWebsiteService = jankalyanDepartmentDistrictWebsiteService;
        }

        #endregion

        #region /// Methods  //
        [HttpPost]
        public IHttpActionResult GetDipartmentDistrict(WebsiteDipartmentDistrictFilterModel model)
        {
            try
            {
                return Ok(_jankalyanDepartmentDistrictWebsiteService.GetDipartmentDistrict(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        #endregion
    }
}
