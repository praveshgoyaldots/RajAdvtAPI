using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.DepartmentWebsite;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentWebsiteService
    {
        ServiceResponse<WebsiteOrderPressReleaseTenderModel> GetOrderPressReleaseTenderData(int dptCode = 0, int distDptCode = 0);

        ServiceResponse<PagedData<MLAConstituencyListModel>> GetMLAConstituency(IndexModel model);

        ServiceResponse<List<DepartmentQuickLinksModel>> GetDepartemntWebsiteQuickLink(int dptCode);

        ServiceResponse<PagedData<PressReleaseFrontModel>> GetPressReleaseByFilter(PressReleaseFrontSearchModel model);

        ServiceResponse<DepartmentDetailModel> GetDepartmentDetailByDptCode(int dptCode);

        ServiceResponse<string> GetAndSetVisitorCount(int DepartmentCode);

        ServiceResponse<List<DptWebsiteOtherGeneralLinkModel>> GetDptWebsiteOtherGeneralLink(DptWebsiteOtherLinkFilterModel model);

        ServiceResponse<List<JANDptWebsiteOtherTransactionLinkModel>> GetDptWebsiteOtherTransactionLink(DptWebsiteOtherLinkFilterModel model);

        ServiceResponse<List<WebsiteHomePageSectionModel>> GetWebsiteHomePageSection(int dptCode);

        ServiceResponse<DepartmentMenuListModel> GetMenuListForDepartment(int dptCode = 0);

        Task<ServiceResponse<string>> CreateContactUs(DIPRFrontContactUsModel model);

        ServiceResponse<PagedData<PressReleaseProgramPhotoVideoModel>> GetPressReleaseProgramPhotoVideo(PressReleaseProgramPhotoFrontSearchModel model);
        ServiceResponse<List<DeptOtherLinkSubMenuModel>> GetDptWebsiteSubMenus(DptWebsiteOtherLinkFilterModel model);

        ServiceResponse<PagedData<DepartmentContactDetailsFrontViewModel>> GetAllDepartmentontactDetail(IndexModel model);

        ServiceResponse<DepartmentSubMenuModel> GetDataByCode(long id);
    }
}
