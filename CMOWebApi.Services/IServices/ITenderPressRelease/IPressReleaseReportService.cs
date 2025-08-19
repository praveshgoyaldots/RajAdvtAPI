using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.TenderPressRelease;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices.ITenderPressRelease
{
    public interface IPressReleaseReportService
    {
        ServiceResponse<PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>> PressReleasesCreatedByUsers(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummaryReportCategorySubCategory>> CategorySubCategory(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummaryReportDeptCatSubcat>> DeptCatSubcat(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummaryReportLookupCategory>> LookupCategory(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummaryReportDeptLookupCat>> DeptLookupCat(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDepartment>> VIPDepartment(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummmaryReportDistCatSubcat>> DistCatSubcat(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummmaryReportDistLookupCategory>> DistLookupCategory(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummmaryReportDepartmentDistrict>> DepartmentDistrict(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDistrict>> VIPDistrict(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDeptDist>> VIPDeptDist(PressReleaseReportFilterModel model);
        ServiceResponse<PagedData<PressReleaseSummaryReportUserDate>> UserDate(PressReleaseReportFilterModel model);
    }
}
