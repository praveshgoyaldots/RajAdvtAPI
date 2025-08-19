using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.DepartmentWebsite;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class DepartmentWebsiteService : BaseService, IDepartmentWebsiteService
    {
        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;


        public DepartmentWebsiteService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        public ServiceResponse<WebsiteOrderPressReleaseTenderModel> GetOrderPressReleaseTenderData(int dptCode = 0, int distDptCode = 0)
        {
            try
            {
                WebsiteOrderPressReleaseTenderModel responsedata = new WebsiteOrderPressReleaseTenderModel();


                List<sp_JAN_Website_OrderTenderPressReleaseList_Result> orderData = new List<sp_JAN_Website_OrderTenderPressReleaseList_Result>();
                List<sp_JAN_Website_PressReleaseList_Result> pressReleaseData = new List<sp_JAN_Website_PressReleaseList_Result>();
                List<sp_JAN_Website_TenderList_Result> tenderData = new List<sp_JAN_Website_TenderList_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("DepartmentCode", dptCode > 0 ? dptCode : 0));
                spParams.Add(new ObjectParameter("DistrictDepartmentCode", distDptCode > 0 ? distDptCode : 0));

                ObjectResult<sp_JAN_Website_OrderTenderPressReleaseList_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<sp_JAN_Website_OrderTenderPressReleaseList_Result>("sp_JAN_Website_OrderTenderPressReleaseList", spParams.ToArray());

                orderData.AddRange(spResult.ToList());

                ObjectResult<sp_JAN_Website_PressReleaseList_Result> objPressReleaseResult = spResult.GetNextResult<sp_JAN_Website_PressReleaseList_Result>();
                pressReleaseData.AddRange(objPressReleaseResult.ToList());

                ObjectResult<sp_JAN_Website_TenderList_Result> objTenderResult = objPressReleaseResult.GetNextResult<sp_JAN_Website_TenderList_Result>();
                tenderData.AddRange(objTenderResult.ToList());

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_Website_OrderTenderPressReleaseList_Result, WebsiteGovDocumentListModel>()
                      .ForMember(dest => dest.DateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.Date)) ? Convert.ToDateTime(src.Date).ToHindiDate("MMMM yyyy") : null));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.GovDocumentList = mapper.Map(orderData, responsedata.GovDocumentList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_Website_PressReleaseList_Result, WebsitePressReleaseListModel>()
                      .ForMember(dest => dest.PressreleaseDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.PressreleaseDate)) ? Convert.ToDateTime(src.PressreleaseDate).ToHindiDate("MMMM yyyy") : null));
                });
                mapper = config.CreateMapper();
                responsedata.PressReleaseList = mapper.Map(pressReleaseData, responsedata.PressReleaseList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_Website_TenderList_Result, WebsiteTenderListModel>()
                    .ForMember(dest => dest.FormIssuingDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.FormIssuingDate)) ? Convert.ToDateTime(src.FormIssuingDate).ToHindiDate("dd-MMM-yyyy") : null))
                     .ForMember(dest => dest.FormSubmissionDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.FormSubmissionDate)) ? Convert.ToDateTime(src.FormSubmissionDate).ToHindiDate("dd-MMM-yyyy") : null))
                       .ForMember(dest => dest.ReleaseDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.ReleaseDate)) ? Convert.ToDateTime(src.ReleaseDate).ToHindiDate("MMMM yyyy") : null))
                        .ForMember(dest => dest.TenderOpeningDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.TenderOpeningDate)) ? Convert.ToDateTime(src.TenderOpeningDate).ToHindiDate("dd-MMM-yyyy") : null));
                });
                mapper = config.CreateMapper();
                responsedata.TenderList = mapper.Map(tenderData, responsedata.TenderList);

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<WebsiteOrderPressReleaseTenderModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        /// <summary>
        /// Get MLA Constituency by district
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<MLAConstituencyListModel>> GetMLAConstituency(IndexModel model)
        {
            ServiceResponse<PagedData<MLAConstituencyListModel>> objReturn = new ServiceResponse<PagedData<MLAConstituencyListModel>>();
            try
            {
                int departmentCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"]) : 0) : 0;
                int mLACode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("MLACode") ? Convert.ToInt32(model.AdvanceSearchModel["MLACode"]) : 0) : 0;

                List<vwMLAConstituencyList> data = new List<vwMLAConstituencyList>();
                var ObjList = _uow.GenericRepository<vwMLAConstituencyList>().GetAll(filter: x => (departmentCode > 0 ? x.Department_DepartmentCode == departmentCode : true) && (mLACode > 0 ? x.MLACode == mLACode : true));
                if (model.PageSize == 101)
                {
                    data = ObjList.ToList();
                }
                else
                {
                    data = ObjList.Skip(model.PageSize * (model.Page - 1)).Take(model.PageSize).ToList();
                }

                PagedData<MLAConstituencyListModel> resulData = new PagedData<MLAConstituencyListModel>();
                //PagedData<vwMLAConstituencyList> data = GenericGridCall<vwMLAConstituencyList>.ListView(model.PageSize, x => x.MLANameEng, x => x.Department_DepartmentCode == 4, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwMLAConstituencyList, MLAConstituencyListModel>()
                    .ForMember(des => des.MLAPhoto, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.MLAPhoto) ? mdlSrc.MLAPhoto.ToAbsolutePath() : string.Empty))
                    .ForMember(des => des.MAPImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.MAPImagePath) ? mdlSrc.MAPImagePath.ToAbsolutePath() : string.Empty));
                    //.ForMember(des => des.MLAPhoto, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.MLAPhoto) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.MLAPhoto))) : string.Empty))
                    //.ForMember(des => des.MAPImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.MAPImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.MAPImagePath))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data, resulData.Data);
                PagedData<MLAConstituencyListModel>.ReturnCustomizeData(resulData, model.PageSize, ObjList.Count());

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<MLAConstituencyListModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Get scheme and services count by department
        /// </summary>
        /// <param name="dptCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<DepartmentQuickLinksModel>> GetDepartemntWebsiteQuickLink(int dptCode)
        {
            try
            {
                List<DepartmentQuickLinksModel> objReturn = new List<DepartmentQuickLinksModel>();
                List<sp_JAN_DepartmentQuickLinks_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_DepartmentQuickLinks_Result>("sp_JAN_DepartmentQuickLinks @DepartmentCode"
                  , new SqlParameter("DepartmentCode", SqlDbType.Int)
                  {
                      Value = dptCode > 0 ? dptCode : 0
                  }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_DepartmentQuickLinks_Result, DepartmentQuickLinksModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDepartemntWebsiteQuickLink ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartemntWebsiteQuickLink ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartemntWebsiteQuickLink ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<DepartmentQuickLinksModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
        }

        public ServiceResponse<PagedData<PressReleaseFrontModel>> GetPressReleaseByFilter(PressReleaseFrontSearchModel model)

        {
            ServiceResponse<PagedData<PressReleaseFrontModel>> objReturn = new ServiceResponse<PagedData<PressReleaseFrontModel>>();
            try
            {
                PagedData<PressReleaseFrontModel> responsedata = new PagedData<PressReleaseFrontModel>();
                model.OrderBy = string.IsNullOrEmpty(model.OrderBy) ? "ModifiedDate" : model.OrderBy.Trim();
                object[] @sp_params = new object[11];
                @sp_params[0] = model.DepartmentCode;
                @sp_params[1] = model.DistrictDepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.CategoryCode;
                @sp_params[4] = model.SubCategoryCode;
                @sp_params[5] = model.Page > 0 ? model.Page : 1;
                @sp_params[6] = model.PageSize > 0 ? model.PageSize : 101;
                @sp_params[7] = model.OrderBy;
                @sp_params[8] = model.OrderByAsc > 0 ? true : false;
                @sp_params[9] = model.VIPPersonCode;
                @sp_params[10] = model.EntryNumber;

                PagedData<sp_JAN_PressRelease_Front_Result> objresult = GenericGridCall<sp_JAN_PressRelease_Front_Result>.SPListView(@sp_params, model.PageSize, null, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);


                var mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_PressRelease_Front_Result, PressReleaseFrontModel>()
                    .ForMember(des => des.ImageUrl, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImageUrl) ? model.IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImageUrl))) : mdlSrc.ImageUrl.ToAbsolutePath() : string.Empty))
                    .ForMember(des => des.HomePageImageUrl, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.HomePageImageUrl) ? model.IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.HomePageImageUrl))) : mdlSrc.HomePageImageUrl.ToAbsolutePath() : string.Empty))
                    .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(doc => model.IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(doc))) : doc.ToAbsolutePath()).ToList()) : null))
                    .ForMember(des => des.ImageAttachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImageAttachments) ? (mdlSrc.ImageAttachments.Split(',').Select(img => model.IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(img))) : img.ToAbsolutePath()).ToList()) : null))
                    .ForMember(dest => dest.PressReleaseDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.PressreleaseDate)) ? Convert.ToDateTime(src.PressreleaseDate.Value).ToHindiDate("d MMM, y") : null));
                }).CreateMapper();
                responsedata.Data = mapper.Map(objresult.Data, responsedata.Data);

                PagedData<PressReleaseFrontModel>.ReturnCustomizeData(responsedata, model.PageSize, (objresult != null && objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : 0), page: model.Page);

                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetPressReleaseByFilter ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetPressReleaseByFilter ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetPressReleaseByFilter ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<PressReleaseFrontModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        public ServiceResponse<DepartmentDetailModel> GetDepartmentDetailByDptCode(int dptCode)
        {
            ServiceResponse<DepartmentDetailModel> objReturn = new ServiceResponse<DepartmentDetailModel>();
            try
            {
                vw_JAN_DptWebsite_DepartmentDetail resultData = _uow.GenericRepository<vw_JAN_DptWebsite_DepartmentDetail>().GetAll(filter: x => x.DepartmentCode == dptCode).FirstOrDefault();

                if (resultData != null)
                {
                    var NoLiftingList = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode != dptCode
                    && x.Department_AdmDepartmentCode == resultData.Department_AdmDepartmentCode).ToList();

                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vw_JAN_DptWebsite_DepartmentDetail, DepartmentDetailModel>()
                        .ForMember(des => des.LogoUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.LogoUrl) ? f.LogoUrl.ToAbsolutePath() : string.Empty))
                        .ForMember(des => des.StateMinisterPhoto, src => src.MapFrom(f => !string.IsNullOrEmpty(f.StateMinisterPhoto) ? f.StateMinisterPhoto.ToAbsolutePath() : string.Empty))
                        .ForMember(des => des.CabinetMinisterPhoto, src => src.MapFrom(f => !string.IsNullOrEmpty(f.CabinetMinisterPhoto) ? f.CabinetMinisterPhoto.ToAbsolutePath() : string.Empty))
                        .ForMember(des => des.WebsiteImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.WebsiteImage) ? f.WebsiteImage.ToAbsolutePath() : string.Empty));

                        //.ForMember(des => des.LogoUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.LogoUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.LogoUrl))) : string.Empty))
                        //.ForMember(des => des.StateMinisterPhoto, src => src.MapFrom(f => !string.IsNullOrEmpty(f.StateMinisterPhoto) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.StateMinisterPhoto))) : string.Empty))
                        //.ForMember(des => des.CabinetMinisterPhoto, src => src.MapFrom(f => !string.IsNullOrEmpty(f.CabinetMinisterPhoto) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.CabinetMinisterPhoto))) : string.Empty))
                        //.ForMember(des => des.WebsiteImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.WebsiteImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.WebsiteImage))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<vw_JAN_DptWebsite_DepartmentDetail, DepartmentDetailModel>(resultData);

                    if (NoLiftingList != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<tblDepartmentMaster, DeparmtentWebsiteUrl>();
                        });
                        IMapper mapper = config.CreateMapper();
                        objReturn.Data.DeparmtentWebsiteUrlModel = mapper.Map(NoLiftingList, objReturn.Data.DeparmtentWebsiteUrlModel);
                    }

                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDepartmentDetailByDptCode ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartmentDetailByDptCode ex.InnerException.Message :" + ex.InnerException != null ? ex.InnerException.Message : ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartmentDetailByDptCode ex.InnerException.InnerException.Message :" + ex.InnerException != null ? ex.InnerException.InnerException.Message : string.Empty + " \n");
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        public ServiceResponse<string> GetAndSetVisitorCount(int DepartmentCode)
        {
            try
            {
                tblDepartmentVisitorCount resultData = _uow.GenericRepository<tblDepartmentVisitorCount>().GetAll(filter: x => x.IsActive == true && x.IsDeleted == false && x.DepartmentCode == DepartmentCode).FirstOrDefault();
                if (resultData != null)
                {
                    resultData.VisitorCount += 1;
                    resultData.VisitorDate = DateTime.Now;
                    _uow.GenericRepository<tblDepartmentVisitorCount>().UpdateAsync(resultData);
                    _uow.save();
                    return SetResultStatus(resultData.VisitorCount.ToString(), MessageStatus.Success, true);
                }
                else
                {
                    tblDepartmentVisitorCount obj = new tblDepartmentVisitorCount();
                    obj.VisitorCount = 1;
                    obj.VisitorDate = DateTime.Now;
                    obj.IsActive = true;
                    obj.IsDeleted = false;
                    obj.DepartmentCode = DepartmentCode;
                    _uow.GenericRepository<tblDepartmentVisitorCount>().AddAsync(obj);
                    _uow.save();
                    return SetResultStatus(obj.VisitorCount.ToString(), MessageStatus.Success, true);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        public ServiceResponse<List<DptWebsiteOtherGeneralLinkModel>> GetDptWebsiteOtherGeneralLink(DptWebsiteOtherLinkFilterModel model)
        {
            try
            {
                List<DptWebsiteOtherGeneralLinkModel> objReturn = new List<DptWebsiteOtherGeneralLinkModel>();
                List<sp_JAN_DptWebsite_OtherGeneralLink_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_DptWebsite_OtherGeneralLink_Result>("sp_JAN_DptWebsite_OtherGeneralLink @TopCount,@CommonCategoryCode,@DepartmentCode"
                  , new SqlParameter("TopCount", SqlDbType.Int) { Value = model.TopCount > 0 ? model.TopCount : 0 }
                  , new SqlParameter("CommonCategoryCode", SqlDbType.BigInt) { Value = model.CommonCategoryCode > 0 ? model.CommonCategoryCode : 0 }
                  , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_DptWebsite_OtherGeneralLink_Result, DptWebsiteOtherGeneralLinkModel>()
                     .ForMember(des => des.IconPath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.IconPath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.IconPath))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherGeneralLink ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherGeneralLink ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherGeneralLink ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<DptWebsiteOtherGeneralLinkModel>>(null, MessageStatus.Error, false);
            }
        }
        public ServiceResponse<List<JANDptWebsiteOtherTransactionLinkModel>> GetDptWebsiteOtherTransactionLink(DptWebsiteOtherLinkFilterModel model)
        {
            try
            {
                List<JANDptWebsiteOtherTransactionLinkModel> objReturn = new List<JANDptWebsiteOtherTransactionLinkModel>();
                List<sp_JAN_DptWebsite_OtherTransactionLink_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_DptWebsite_OtherTransactionLink_Result>("sp_JAN_DptWebsite_OtherTransactionLink @TopCount,@CommonCategoryCode,@DepartmentCode"
                  , new SqlParameter("TopCount", SqlDbType.Int) { Value = model.TopCount > 0 ? model.TopCount : 0 }
                  , new SqlParameter("CommonCategoryCode", SqlDbType.BigInt) { Value = model.CommonCategoryCode > 0 ? model.CommonCategoryCode : 0 }
                   , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_DptWebsite_OtherTransactionLink_Result, JANDptWebsiteOtherTransactionLinkModel>()
                      .ForMember(dest => dest.AchievementDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.AchievementDate)) ? Convert.ToDateTime(src.AchievementDate).ToHindiDate("dd-MMM-yyyy") : null));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherTransactionLink ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherTransactionLink ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherTransactionLink ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<JANDptWebsiteOtherTransactionLinkModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<WebsiteHomePageSectionModel>> GetWebsiteHomePageSection(int dptCode)
        {
            ServiceResponse<List<WebsiteHomePageSectionModel>> objReturn = new ServiceResponse<List<WebsiteHomePageSectionModel>>();
            try
            {
                List<vwDept_WebsiteHomePageSection> data = _uow.GenericRepository<vwDept_WebsiteHomePageSection>().GetAll(filter: x => x.DepartmentCode == dptCode, orderBy: o => o.OrderBy(z => z.DisplayOrder)).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwDept_WebsiteHomePageSection, WebsiteHomePageSectionModel>()
                    .ForMember(des => des.BackGroundImage, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.BackGroundImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.BackGroundImage))) : string.Empty))
                    .ForMember(des => des.IconImage, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.IconImage))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                objReturn.Data = mapper.Map(data, objReturn.Data);

                return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<WebsiteHomePageSectionModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
        }

        public ServiceResponse<DepartmentMenuListModel> GetMenuListForDepartment(int dptCode = 0)
        {
            try
            {
                DepartmentMenuListModel responsedata = new DepartmentMenuListModel();


                List<spJAN_Dept_GenerateMenuListForDepartment_Result> menuData = new List<spJAN_Dept_GenerateMenuListForDepartment_Result>();
                List<spJAN_Dept_GenerateSubMenuListForDepartment_Result> subMenuData = new List<spJAN_Dept_GenerateSubMenuListForDepartment_Result>();
                List<spJAN_Dept_GenerateSubSubMenuListForDepartment_Result> subSubMenuData = new List<spJAN_Dept_GenerateSubSubMenuListForDepartment_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("DepartmentCode", dptCode > 0 ? dptCode : 0));

                ObjectResult<spJAN_Dept_GenerateMenuListForDepartment_Result> spMenuResult = _uow.ExeccuteStoreProcedureMultiResult<spJAN_Dept_GenerateMenuListForDepartment_Result>("spJAN_Dept_GenerateMenuListForDepartment", spParams.ToArray());

                menuData.AddRange(spMenuResult.ToList());

                ObjectResult<spJAN_Dept_GenerateSubMenuListForDepartment_Result> objSubMenuResult = spMenuResult.GetNextResult<spJAN_Dept_GenerateSubMenuListForDepartment_Result>();
                subMenuData.AddRange(objSubMenuResult.ToList());

                ObjectResult<spJAN_Dept_GenerateSubSubMenuListForDepartment_Result> objSubSubMenuResult = objSubMenuResult.GetNextResult<spJAN_Dept_GenerateSubSubMenuListForDepartment_Result>();
                subSubMenuData.AddRange(objSubSubMenuResult.ToList());

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spJAN_Dept_GenerateMenuListForDepartment_Result, GenerateMenuListForDepartmentModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.MenuList = mapper.Map(menuData, responsedata.MenuList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spJAN_Dept_GenerateSubMenuListForDepartment_Result, GenerateSubMenuListForDepartmentModel>()
                     .ForMember(des => des.IconImage, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.IconImage) ? mdlSrc.IconImage.ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? f.PDFAttachment.ToAbsolutePath() : string.Empty));
                });
                mapper = config.CreateMapper();
                responsedata.SubMenuList = mapper.Map(subMenuData, responsedata.SubMenuList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spJAN_Dept_GenerateSubSubMenuListForDepartment_Result, GenerateSubSubMenuListForDepartmentModel>()
                    .ForMember(des => des.IconImage, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.IconImage) ? mdlSrc.IconImage.ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? f.PDFAttachment.ToAbsolutePath() : string.Empty));
                });
                mapper = config.CreateMapper();
                responsedata.SubSubMenuList = mapper.Map(subSubMenuData, responsedata.SubSubMenuList);

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<DepartmentMenuListModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }

        public ServiceResponse<PagedData<PressReleaseProgramPhotoVideoModel>> GetPressReleaseProgramPhotoVideo(PressReleaseProgramPhotoFrontSearchModel model)

        {
            ServiceResponse<PagedData<PressReleaseProgramPhotoVideoModel>> objReturn = new ServiceResponse<PagedData<PressReleaseProgramPhotoVideoModel>>();
            try
            {
                PagedData<PressReleaseProgramPhotoVideoModel> responsedata = new PagedData<PressReleaseProgramPhotoVideoModel>();
                object[] @sp_params = new object[13];
                @sp_params[0] = model.DepartmentCode;
                @sp_params[1] = model.DistrictDepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.CategoryCode;
                @sp_params[4] = model.SubCategoryCode;
                @sp_params[5] = model.Page > 0 ? model.Page : 1;
                @sp_params[6] = model.PageSize > 0 ? model.PageSize : 101;
                @sp_params[7] = string.IsNullOrEmpty(model.OrderBy) ? string.Empty : model.OrderBy.Trim();
                @sp_params[8] = model.OrderByAsc > 0 ? true : false;
                @sp_params[9] = !string.IsNullOrEmpty(model.VIPPersonCode) ? model.VIPPersonCode : string.Empty;
                @sp_params[10] = !string.IsNullOrEmpty(model.VIPCategoryCode) ? model.VIPCategoryCode : string.Empty;
                @sp_params[11] = model.EntryNumber;
                @sp_params[12] = model.IsHomePageImageRequired;

                PagedData<sp_JAN_PressReleaseProgramPhotoVideo_DIPRFront_Result> objresult = GenericGridCall<sp_JAN_PressReleaseProgramPhotoVideo_DIPRFront_Result>.SPListView(@sp_params, model.PageSize, null, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);


                var mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_PressReleaseProgramPhotoVideo_DIPRFront_Result, PressReleaseProgramPhotoVideoModel>()
                    .ForMember(des => des.HomePageImageUrl, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.HomePageImageUrl) ? model.IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.HomePageImageUrl))) : mdlSrc.HomePageImageUrl.ToAbsolutePath() : string.Empty))
                      .ForMember(dest => dest.PressreleaseDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.PressreleaseDate)) ? Convert.ToDateTime(src.PressreleaseDate).ToHindiDate("dd-MMM-yyyy") : null));

                }).CreateMapper();
                responsedata.Data = mapper.Map(objresult.Data, responsedata.Data);


                PagedData<PressReleaseProgramPhotoVideoModel>.ReturnCustomizeData(responsedata, model.PageSize, (objresult != null && objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : 0), page: model.Page);

                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetPressReleaseProgramPhotoVideo ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetPressReleaseProgramPhotoVideo ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetPressReleaseProgramPhotoVideo ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<PressReleaseProgramPhotoVideoModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        public ServiceResponse<List<DeptOtherLinkSubMenuModel>> GetDptWebsiteSubMenus(DptWebsiteOtherLinkFilterModel model)
        {
            try
            {
                List<DeptOtherLinkSubMenuModel> subMenuList = new List<DeptOtherLinkSubMenuModel>();
                List<sp_JAN_DptWebsite_GetFrontSubMenu_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_DptWebsite_GetFrontSubMenu_Result>("sp_JAN_DptWebsite_GetFrontSubMenu  @DepartmentCode,@TypeCode"
                    , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                    , new SqlParameter("TypeCode", SqlDbType.Int) { Value = model.CommonCategoryCode > 0 ? model.CommonCategoryCode : 0 }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_DptWebsite_GetFrontSubMenu_Result, DeptOtherLinkSubMenuModel>()
                     .ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? f.IconImage.ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? f.PDFAttachment.ToAbsolutePath() : string.Empty));
                    //.ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.IconImage))) : string.Empty))
                    //.ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.PDFAttachment))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                subMenuList = mapper.Map(data, subMenuList);

                if (subMenuList != null && subMenuList.Count() > 0)
                {
                    foreach (var subMenu in subMenuList)
                    {
                        var otherLinkList = GetDptWebsiteOtherLinkData(subMenu.Id, model.TopCount);
                        subMenu.HasRecords = otherLinkList.Count() > 0 ? true : false;
                        subMenu.OtherLinkList = otherLinkList;
                    }
                }

                return SetResultStatus(subMenuList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDptWebsiteSubMenus ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteSubMenus ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteSubMenus ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<DeptOtherLinkSubMenuModel>>(null, MessageStatus.Error, false);
            }
        }

        private List<DptWebsiteOtherLinkDataModel> GetDptWebsiteOtherLinkData(long subMenuId, int topCount)
        {
            List<DptWebsiteOtherLinkDataModel> otherLinkList = new List<DptWebsiteOtherLinkDataModel>();
            try
            {
                List<sp_JAN_DptWebsite_GetOtherLinkData_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_DptWebsite_GetOtherLinkData_Result>("sp_JAN_DptWebsite_GetOtherLinkData  @SubMenuId,@TopCount",
                    new SqlParameter("SubMenuId", SqlDbType.Int) { Value = Convert.ToInt32(subMenuId) },
                    new SqlParameter("TopCount", SqlDbType.Int) { Value = topCount }
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_DptWebsite_GetOtherLinkData_Result, DptWebsiteOtherLinkDataModel>()
                    .ForMember(dest => dest.DateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.Date)) ? Convert.ToDateTime(src.Date.Value).ToHindiDate("dd-MMM-yyyy") : null));
                    //.ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? f.IconImage.ToAbsolutePath() : string.Empty))
                    //.ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? f.PDFAttachment.ToAbsolutePath() : string.Empty))

                    //.ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.IconImage))) : string.Empty))
                    //.ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.PDFAttachment))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                otherLinkList = mapper.Map(data, otherLinkList);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherLinkData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherLinkData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDptWebsiteOtherLinkData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
            }
            return otherLinkList;
        }

        /// <summary>
        /// Get department contact details List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentContactDetailsFrontViewModel>> GetAllDepartmentontactDetail(IndexModel model)
        {
            try
            {
                model.PageSize = 101;
                PagedData<DepartmentContactDetailsFrontViewModel> resultData = new PagedData<DepartmentContactDetailsFrontViewModel>();

                int dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;
                int catCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("CategoryCode") ? Convert.ToInt32(model.AdvanceSearchModel["CategoryCode"].ToString()) : 0) : 0;

                PagedData<vwJAN_DepartmentContactDetailsFront> data = GenericGridCall<vwJAN_DepartmentContactDetailsFront>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && (dptCode == 0 || x.DepartmentCode == dptCode) && (catCode == 0 || x.ContactCategory == catCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_DepartmentContactDetailsFront, DepartmentContactDetailsFrontViewModel>()
                     .ForMember(des => des.AttachmentUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.AttachmentUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.AttachmentUrl.Trim())) : string.Empty)); ;
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<DepartmentContactDetailsFrontViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentContactDetailsFrontViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
		/// Department Sub Menu master  by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<DepartmentSubMenuModel> GetDataByCode(long id)
        {
            ServiceResponse<DepartmentSubMenuModel> objReturn = new ServiceResponse<DepartmentSubMenuModel>();
            try
            {
                tblDept_DepartmentSubMenu resultData = _uow.GenericRepository<tblDept_DepartmentSubMenu>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDept_DepartmentSubMenu, DepartmentSubMenuModel>()
                            .ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.IconImage))) : string.Empty))
                            .ForMember(des => des.PDFAttachment, src => src.MapFrom(f => !string.IsNullOrEmpty(f.PDFAttachment) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.PDFAttachment))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblDept_DepartmentSubMenu, DepartmentSubMenuModel>(resultData);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);


            }
            return objReturn;
        }


        #region DIPR ContactUs

        /// <summary>
        /// This for create new record in DIPR Contact Us.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> CreateContactUs(DIPRFrontContactUsModel model)
        {
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<DIPRFrontContactUsModel, tblJAN_DIPR_FrontContactUs>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_DIPR_FrontContactUs obj = Mapper.Map<DIPRFrontContactUsModel, tblJAN_DIPR_FrontContactUs>(model);
                obj.IPAddress = CommonUtility.GetIpAddress();

                await _uow.GenericRepository<tblJAN_DIPR_FrontContactUs>().AddAsync(obj);
                _uow.save();

                return SetResultStatus(obj.Id.ToString(), MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DIPR ContactUs Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DIPR ContactUs Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DIPR ContactUs Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

    }
}
