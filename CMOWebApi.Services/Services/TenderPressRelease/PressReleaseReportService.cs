using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.TenderPressRelease;
using CMOWebApi.Services.IServices.ITenderPressRelease;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services.TenderPressRelease
{
    public class PressReleaseReportService : BaseService, IPressReleaseReportService
    {
        public ServiceResponse<PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>> PressReleasesCreatedByUsers(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers> responseList = new PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "ModifiedDate" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_PressReleasesCreatedByUsers_Result> objList = GenericGridCall<spPressReleaseSummaryReport_PressReleasesCreatedByUsers_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.Date, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_PressReleasesCreatedByUsers_Result, PressReleaseSummaryReportPressReleasesCreatedByUsers>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("Press Release Created By User responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Press Releases Created By Users Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Press Releases Created By Users Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Press Releases Created By Users Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummaryReportPressReleasesCreatedByUsers>>(null, MessageStatus.Error, false);
            }
        }


        public ServiceResponse<PagedData<PressReleaseSummaryReportCategorySubCategory>> CategorySubCategory(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummaryReportCategorySubCategory> responseList = new PagedData<PressReleaseSummaryReportCategorySubCategory>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_CategorySubCategory_Result> objList = GenericGridCall<spPressReleaseSummaryReport_CategorySubCategory_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.Category_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_CategorySubCategory_Result, PressReleaseSummaryReportCategorySubCategory>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("Category SubCategory responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummaryReportCategorySubCategory>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Category SubCategory  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummaryReportCategorySubCategory>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummaryReportDeptCatSubcat>> DeptCatSubcat(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummaryReportDeptCatSubcat> responseList = new PagedData<PressReleaseSummaryReportDeptCatSubcat>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_DeptCatSubcat_Result> objList = GenericGridCall<spPressReleaseSummaryReport_DeptCatSubcat_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.Department_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_DeptCatSubcat_Result, PressReleaseSummaryReportDeptCatSubcat>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("Category SubCategory responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummaryReportDeptCatSubcat>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Category SubCategory  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummaryReportDeptCatSubcat>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummaryReportLookupCategory>> LookupCategory(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummaryReportLookupCategory> responseList = new PagedData<PressReleaseSummaryReportLookupCategory>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_LookupCategory_Result> objList = GenericGridCall<spPressReleaseSummaryReport_LookupCategory_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.Lookup_Category, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_LookupCategory_Result, PressReleaseSummaryReportLookupCategory>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("Category SubCategory responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummaryReportLookupCategory>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Category SubCategory  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummaryReportLookupCategory>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummaryReportDeptLookupCat>> DeptLookupCat(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummaryReportDeptLookupCat> responseList = new PagedData<PressReleaseSummaryReportDeptLookupCat>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_DeptLookupCat_Result> objList = GenericGridCall<spPressReleaseSummaryReport_DeptLookupCat_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.Department_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_DeptLookupCat_Result, PressReleaseSummaryReportDeptLookupCat>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("Category SubCategory responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummaryReportDeptLookupCat>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Category SubCategory  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Category SubCategory  By Users Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummaryReportDeptLookupCat>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDepartment>> VIPDepartment(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummmaryReportVIPDepartment> responseList = new PagedData<PressReleaseSummmaryReportVIPDepartment>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_VIPDepartment_Result> objList = GenericGridCall<spPressReleaseSummaryReport_VIPDepartment_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.VIP_Person, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_VIPDepartment_Result, PressReleaseSummmaryReportVIPDepartment>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("VIPDepartment responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummmaryReportVIPDepartment>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("VIPDepartment  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("VIPDepartment Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("VIPDepartment Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummmaryReportVIPDepartment>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummmaryReportDistCatSubcat>> DistCatSubcat(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummmaryReportDistCatSubcat> responseList = new PagedData<PressReleaseSummmaryReportDistCatSubcat>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_DistCatSubcat_Result> objList = GenericGridCall<spPressReleaseSummaryReport_DistCatSubcat_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.District_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_DistCatSubcat_Result, PressReleaseSummmaryReportDistCatSubcat>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("DistCatSubcat responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummmaryReportDistCatSubcat>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DistCatSubcat  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DistCatSubcat Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DistCatSubcat Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummmaryReportDistCatSubcat>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummmaryReportDistLookupCategory>> DistLookupCategory(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummmaryReportDistLookupCategory> responseList = new PagedData<PressReleaseSummmaryReportDistLookupCategory>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_DistLookupCategory_Result> objList = GenericGridCall<spPressReleaseSummaryReport_DistLookupCategory_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.District_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_DistLookupCategory_Result, PressReleaseSummmaryReportDistLookupCategory>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("DistLookupCategory responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummmaryReportDistLookupCategory>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DistLookupCategory  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DistLookupCategory Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DistLookupCategory Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummmaryReportDistLookupCategory>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummmaryReportDepartmentDistrict>> DepartmentDistrict(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummmaryReportDepartmentDistrict> responseList = new PagedData<PressReleaseSummmaryReportDepartmentDistrict>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_DepartmentDistrict_Result> objList = GenericGridCall<spPressReleaseSummaryReport_DepartmentDistrict_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.District_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_DepartmentDistrict_Result, PressReleaseSummmaryReportDepartmentDistrict>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("DepartmentDistrict responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummmaryReportDepartmentDistrict>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DepartmentDistrict  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentDistrict Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentDistrict Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummmaryReportDepartmentDistrict>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDistrict>> VIPDistrict(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummmaryReportVIPDistrict> responseList = new PagedData<PressReleaseSummmaryReportVIPDistrict>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_VIPDistrict_Result> objList = GenericGridCall<spPressReleaseSummaryReport_VIPDistrict_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.District_Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_VIPDistrict_Result, PressReleaseSummmaryReportVIPDistrict>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("VIPDistrict responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummmaryReportVIPDistrict>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("VIPDistrict  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("VIPDistrict Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("VIPDistrict Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummmaryReportVIPDistrict>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummmaryReportVIPDeptDist>> VIPDeptDist(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummmaryReportVIPDeptDist> responseList = new PagedData<PressReleaseSummmaryReportVIPDeptDist>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "CategoryName" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_VIPDeptDist_Result> objList = GenericGridCall<spPressReleaseSummaryReport_VIPDeptDist_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.VIP_Person, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_VIPDeptDist_Result, PressReleaseSummmaryReportVIPDeptDist>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("VIPDeptDist responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummmaryReportVIPDeptDist>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("VIPDeptDist  Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("VIPDeptDist Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("VIPDeptDist Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummmaryReportVIPDeptDist>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<PressReleaseSummaryReportUserDate>> UserDate(PressReleaseReportFilterModel model)
        {
            try
            {
                PagedData<PressReleaseSummaryReportUserDate> responseList = new PagedData<PressReleaseSummaryReportUserDate>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "All" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;

                PagedData<spPressReleaseSummaryReport_UserDate_Result> objList = GenericGridCall<spPressReleaseSummaryReport_UserDate_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPressReleaseSummaryReport_UserDate_Result, PressReleaseSummaryReportUserDate>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("User Date responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseSummaryReportUserDate>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().Total_Records : 0), page: model.Page);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("User Date Report ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("User Date By Users Report ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("User Date By Users Report ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseSummaryReportUserDate>>(null, MessageStatus.Error, false);
            }
        }

    }
}
