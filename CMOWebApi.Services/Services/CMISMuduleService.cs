using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class CMISMuduleService : BaseService, ICMISMuduleService
    {
        /// <summary>
        /// Get All CMIS Data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<CMISModuleDataViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<CMISModuleDataViewModel>> objReturn = new ServiceResponse<PagedData<CMISModuleDataViewModel>>();
            try
            {
                decimal moduleCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ModuleCode") ? Convert.ToDecimal(model.AdvanceSearchModel["ModuleCode"].ToString()) : 0) : 0;

                decimal dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToDecimal(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;





                PagedData<CMISModuleDataViewModel> resulData = new PagedData<CMISModuleDataViewModel>();
                PagedData<vw_CMISModuleData> data = GenericGridCall<vw_CMISModuleData>.ListView(model.PageSize, x => x.App_Date, x => x.isActive && !x.isDelete && (moduleCode > 0 ? x.ModuleID == moduleCode : true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                //  (dptCode > 0 ? Convert.ToInt32(x.Nodal_Department) == dptCode : true) &&
                var mapper = new MapperConfiguration(cfg =>
                               cfg.CreateMap<vw_CMISModuleData, CMISModuleDataViewModel>()

                                   ).CreateMapper();


                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<CMISModuleDataViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<CMISModuleDataViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
            return objReturn;
        }
        /// <summary>
        /// Get CMIS module Master Data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<CMISModuleMasterViewModel>> GetAllModuleMasterData(IndexModel model)

        {
            ServiceResponse<PagedData<CMISModuleMasterViewModel>> objReturn = new ServiceResponse<PagedData<CMISModuleMasterViewModel>>();
            try
            {


                PagedData<CMISModuleMasterViewModel> resulData = new PagedData<CMISModuleMasterViewModel>();
                PagedData<vw_CMISModule> data = GenericGridCall<vw_CMISModule>.ListView(model.PageSize, x => x.modulename, x => x.IsActive && !x.IsDelete && x.IsVisibleOnFrontHome, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var mapper = new MapperConfiguration(cfg =>
                               cfg.CreateMap<vw_CMISModule, CMISModuleMasterViewModel>().ForMember(dest => dest.ImagePath, src => src.MapFrom(x => string.IsNullOrEmpty(x.ImagePath) ? string.Empty : x.ImagePath.ToAbsolutePath()))
                               ).CreateMapper();


                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<CMISModuleMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<CMISModuleMasterViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Get All CMIS Data By Search Param 
        /// </summary>
        /// <param name="model">advancesearch inside of index Model "{ModuleCode: xx,DepartmentCode:xx,FromDate:xx, ToDate:xx,SearchTxt:xx }" </param>
        /// <param name="isAllRecords">boolen </param>
        /// <returns></returns>
        public ServiceResponse<PagedData<CMISModuleDataViewModel>> GetAllBySearch(CMISFilterModel model, bool isAllRecords = false)
        {
            ServiceResponse<PagedData<CMISModuleDataViewModel>> objReturn = new ServiceResponse<PagedData<CMISModuleDataViewModel>>();
            try
            {

                PagedData<CMISModuleDataViewModel> resulData = new PagedData<CMISModuleDataViewModel>();
                object[] @sp_params = new object[9];
                @sp_params[0] = model.ModuleId.HasValue ? model.ModuleId : 0;
                @sp_params[1] = model.DepartmentCode.HasValue ? model.DepartmentCode : 0;
                @sp_params[2] = model.JanDepartmentCode.HasValue ? model.JanDepartmentCode : 0;
                @sp_params[3] = model.FromDate.HasValue ? model.FromDate.Value.ToString("MM-dd-yyyy") : string.Empty;
                @sp_params[4] = model.ToDate.HasValue ? model.ToDate.Value.ToString("MM-dd-yyyy") : string.Empty;
                @sp_params[5] = !string.IsNullOrEmpty(model.SearchKeyword) ? model.SearchKeyword : string.Empty;
                @sp_params[6] = !string.IsNullOrEmpty(model.FileNumber) ? model.FileNumber : string.Empty;
                @sp_params[7] = !string.IsNullOrEmpty(model.FinancialYear) ? model.FinancialYear : string.Empty;
                @sp_params[8] = model.AdmDepartmentCode > 0?model.AdmDepartmentCode : 0;


                PagedData<sp_CMISModuleData_Result> objresult = GenericGridCall<sp_CMISModuleData_Result>.ListView(@sp_params, isAllRecords ? 101 : model.IndexModel.PageSize, x => x.App_Date == x.App_Date, model.IndexModel.Search, model.IndexModel.OrderBy, model.IndexModel.OrderByAsc, model.IndexModel.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_CMISModuleData_Result, CMISModuleDataViewModel>()
                    .ForMember(dest => dest.App_DateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.App_Date)) ? Convert.ToDateTime(src.App_Date.Value).ToHindiDate("dd-MMM-yyyy") : null))
                     .ForMember(dest => dest.AnnouncementDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.AnnouncementDate)) ? Convert.ToDateTime(src.AnnouncementDate.Value).ToHindiDate("dd-MMM-yyyy") : null))
                      .ForMember(dest => dest.CabinateDecision_DateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.CabinateDecision_Date)) ? Convert.ToDateTime(src.CabinateDecision_Date.Value).ToHindiDate("dd-MMM-yyyy") : null))
                      .ForMember(dest => dest.MeetingDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.MeetingDate)) ? Convert.ToDateTime(src.MeetingDate.Value).ToHindiDate("dd-MMM-yyyy") : null));


                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(objresult.Data, resulData.Data);
                PagedData<CMISModuleDataViewModel>.ReturnCustomizeData(resulData, model.IndexModel.PageSize, objresult.TotalRecords, page: model.IndexModel.Page);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<CMISModuleDataViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Get Grouped data of CMIS Module data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentGroupCMISListViewModel>> GetCMISListGroupByDepartment(CMISFilterModel model)
        {
            try
            {
                PagedData<DepartmentGroupCMISListViewModel> objResponseData = new PagedData<DepartmentGroupCMISListViewModel>();
                ServiceResponse<PagedData<CMISModuleDataViewModel>> objResultData = GetAllBySearch(model, true);
                if (objResultData.IsSuccess && objResultData.Data != null && objResultData.Data.Data.Count() > 0)
                {
                    List<CMISModuleDataViewModel> data = objResultData.Data.Data.Where(y => y.isActive == true && y.isDelete == false).ToList();
                    List<DepartmentGroupCMISListViewModel> objTypeGroupList = data.GroupBy(x => x.JanDepartmentCode).Select(
                    item => new DepartmentGroupCMISListViewModel
                    {
                        DepartmentTitle = item.FirstOrDefault().DepartmentTitle,
                        DepartmentTitleHindi = item.FirstOrDefault().DepartmentTitleHindi,
                        DepartmentCode = item.FirstOrDefault().DepartmentCode,
                        Items = item.OrderByDescending(x => x.App_Date).ToList(),
                        FinancialYearItems = item.GroupBy(x => x.Financial_Year).Select(z => new FinancialGroupCMISListViewModel
                        {
                            FinancialYear = z.FirstOrDefault().Financial_Year,
                            Items = z.OrderByDescending(x => x.App_Date).ToList(),
                        }).OrderByDescending(y => y.FinancialYear).ToList()

                    }).OrderBy(x => x.DepartmentTitleHindi).ToList();

                    if (objTypeGroupList != null && objTypeGroupList.Count > 0)
                    {
                        objResponseData.Data = objTypeGroupList.Skip(model.IndexModel.PageSize * (model.IndexModel.Page - 1)).Take(model.IndexModel.PageSize).ToList();
                        objResponseData.TotalRecords = objTypeGroupList.Count;
                        objResponseData.PageSize = model.IndexModel.PageSize;
                        objResponseData.NumberOfPages = (objResponseData.TotalRecords / model.IndexModel.PageSize) > 0 ? Convert.ToInt32(Math.Round(Convert.ToDecimal(objResponseData.TotalRecords / model.IndexModel.PageSize), MidpointRounding.AwayFromZero)) : 1;
                        objResponseData.CurrentPage = model.IndexModel.Page;
                        return SetResultStatus(objResponseData, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<PagedData<DepartmentGroupCMISListViewModel>>(null, MessageStatus.NoRecord, false);
                    }


                }
                else if (objResultData.IsSuccess)
                {
                    return SetResultStatus<PagedData<DepartmentGroupCMISListViewModel>>(null, MessageStatus.NoRecord, true);

                }
                else

                {
                    return SetResultStatus<PagedData<DepartmentGroupCMISListViewModel>>(null, MessageStatus.InvalidData, false);
                }


            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentGroupCMISListViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
        }

        /// <summary>
        /// Get All CMIS Achievement Data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<CMISAchievementViewModel>> GetAllCMISAchievement(IndexModel model, bool isAllRecords = false)
        {
            ServiceResponse<PagedData<CMISAchievementViewModel>> objReturn = new ServiceResponse<PagedData<CMISAchievementViewModel>>();
            try
            {


                int dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;

                int admDptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("AdmDepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["AdmDepartmentCode"].ToString()) : 0) : 0;

                string searchtxt = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("SearchTxt") ? model.AdvanceSearchModel["SearchTxt"].ToString() : string.Empty) : string.Empty;

               
                    string fromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("FromDate") ? model.AdvanceSearchModel["FromDate"].ToString() : string.Empty) : string.Empty;
                

                PagedData<CMISAchievementViewModel> resulData = new PagedData<CMISAchievementViewModel>();
                PagedData<vw_CMISAchievement> data = GenericGridCall<vw_CMISAchievement>.ListView(isAllRecords ? 101 : model.PageSize, x => x.DepartmentTitle, x => x.IsActive.Value && (dptCode > 0 ? (x.DepartmentCode.HasValue && x.DepartmentCode == dptCode) : true) && (admDptCode > 0 ? (x.AdminDepartmentCode>0 && x.AdminDepartmentCode == admDptCode) : true) && (!string.IsNullOrEmpty(searchtxt.Trim()) ? x.AllSearch.Contains(searchtxt) : true) && (!string.IsNullOrEmpty(fromDate) ? Convert.ToDateTime(x.Modifiedon).Date >= Convert.ToDateTime(fromDate).Date : true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var mapper = new MapperConfiguration(cfg =>
                               cfg.CreateMap<vw_CMISAchievement, CMISAchievementViewModel>()
                                 .ForMember(dest => dest.docdateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.docdate)) ? Convert.ToDateTime(src.docdate.Value).ToHindiDate("dd-MMM-yyyy") : null))).CreateMapper();

                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<CMISAchievementViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);
                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<CMISAchievementViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
            return objReturn;
        }


        public ServiceResponse<PagedData<DepartmentGroupCMISAchievementViewModel>> GetCMISAchievementListGroupByDepartment(IndexModel model)
        {
            try
            {
                PagedData<DepartmentGroupCMISAchievementViewModel> objResponseData = new PagedData<DepartmentGroupCMISAchievementViewModel>();
                ServiceResponse<PagedData<CMISAchievementViewModel>> objResultData = GetAllCMISAchievement(model, true);
                if (objResultData.IsSuccess && objResultData.Data != null && objResultData.Data.Data.Count() > 0)
                {
                    List<CMISAchievementViewModel> data = objResultData.Data.Data.Where(y => y.IsActive.Value == true).ToList();
                    List<DepartmentGroupCMISAchievementViewModel> objTypeGroupList = data.GroupBy(x => x.DepartmentCode).Select(
                    item => new DepartmentGroupCMISAchievementViewModel
                    {
                        DepartmentTitle = item.FirstOrDefault().DepartmentTitle,
                        DepartmentTitleHindi = item.FirstOrDefault().DepartmentTitleHindi,
                        DepartmentCode = item.FirstOrDefault().DepartmentCode,
                        departmentid = item.FirstOrDefault().departmentid,
                        Items = item.OrderByDescending(x => x.docdate).ToList()
                    }).OrderBy(x => x.DepartmentTitle).ToList();

                    if (objTypeGroupList != null && objTypeGroupList.Count > 0)
                    {



                        objResponseData.Data = objTypeGroupList.Skip(model.PageSize * (model.Page - 1)).Take(model.PageSize).ToList();
                        objResponseData.TotalRecords = objTypeGroupList.Count;
                        objResponseData.PageSize = model.PageSize;
                        objResponseData.NumberOfPages = (objResponseData.TotalRecords / model.PageSize) > 0 ? Convert.ToInt32(Math.Round(Convert.ToDecimal(objResponseData.TotalRecords / model.PageSize), MidpointRounding.AwayFromZero)) : 1;
                        objResponseData.CurrentPage = model.Page;
                        return SetResultStatus(objResponseData, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<PagedData<DepartmentGroupCMISAchievementViewModel>>(null, MessageStatus.NoRecord, false);
                    }


                }
                else if (objResultData.IsSuccess)
                {
                    return SetResultStatus<PagedData<DepartmentGroupCMISAchievementViewModel>>(null, MessageStatus.NoRecord, true);

                }
                else

                {
                    return SetResultStatus<PagedData<DepartmentGroupCMISAchievementViewModel>>(null, MessageStatus.InvalidData, false);
                }


            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentGroupCMISAchievementViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
        }
    }
}
