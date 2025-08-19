using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
    public interface IJankalyanDepartmentDistrictWebsiteService
    {
        ServiceResponse<List<WebsiteDipartmentDistrictListModel>> GetDipartmentDistrict(WebsiteDipartmentDistrictFilterModel model);
    }
}
