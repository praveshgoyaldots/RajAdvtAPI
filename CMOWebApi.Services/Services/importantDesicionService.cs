using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.IServices
{
    public class importantDesicionService : BaseService, IImportantDecisionService
    {

        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public importantDesicionService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        public async Task<ServiceResponse<string>> Create(Adv_AchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                model.IsActive = true;
                model.IsDeleted = false;
                model.IsAchievement = false;
                model.ModifiedBy = 0;
                model.Description = "";
                model.DescriptionHindi = "";
                Mapper.Initialize(x =>
                {
                    x.CreateMap<Adv_AchievementModel, tblCMO_ImportantDecision>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                     .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                      .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.PdfFIleName, opt => opt.MapFrom(src => string.Empty));

                });
                tblCMO_ImportantDecision data = Mapper.Map<Adv_AchievementModel, tblCMO_ImportantDecision>(model);

                data = await _uow.GenericRepository<tblCMO_ImportantDecision>().AddAsync(data);
                _uow.save();

                if (!string.IsNullOrEmpty(model.PdfFIleName))
                {
                    data.PdfFIleName = CommonUtility.UploadAchievement(model.PdfFIleName, data.Id, true);
                    data = await _uow.GenericRepository<tblCMO_ImportantDecision>().UpdateAsync(data);

                }
                if (model.ImageFiles != null && model.ImageFiles.Count > 0)
                {
                    foreach (var item in model.ImageFiles)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblCMO_ImportantDecisionAttachments objchild = new tblCMO_ImportantDecisionAttachments();
                            objchild.AchievementId = data.Id;
                            objchild.Path = CommonUtility.UploadAchievement(item, data.Id, false);
                            await _uow.GenericRepository<tblCMO_ImportantDecisionAttachments>().AddAsync(objchild);
                        }
                    }

                }
                _uow.save();
                objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public async Task<ServiceResponse<string>> Edit(Adv_AchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblCMO_ImportantDecision objResult = await _uow.GenericRepository<tblCMO_ImportantDecision>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<Adv_AchievementModel, tblCMO_ImportantDecision>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedBy.ToString()) ? model.CreatedBy : objResult.CreatedBy))
                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedDate.ToString()) ? DateTime.Now : objResult.CreatedDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objResult.IsActive))
                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objResult.IsDeleted))
                            .ForMember(dest => dest.PdfFIleName, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.PdfFIleName) ? CommonUtility.RemoveExistingFile(objResult.PdfFIleName, false) ? "" : "" : CommonUtility.UploadAchievement(model.PdfFIleName, model.Id, true, objResult.PdfFIleName,model.AchievementCategoryCode.Value))); ;
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblCMO_ImportantDecision>().UpdateAsync(objResult);
                        ////REMOVE OLD FILES FROM FOLDER AND DB  AND UPDATE NEW IN FOLDER AND DB
                        if (model.ImageFiles != null && model.ImageFiles.Count > 0)
                        {
                            List<tblCMO_ImportantDecisionAttachments> oldImageFiles = objResult.tblCMO_ImportantDecisionAttachments.ToList();
                            //REMOVE OLD FILES FROM FOLDER AND DB
                            if (oldImageFiles != null && oldImageFiles.Count > 0)
                            {
                                foreach (var item in oldImageFiles)
                                {
                                    if (File.Exists(HttpContext.Current.Server.MapPath(item.Path)))
                                    {
                                        CommonUtility.RemoveExistingFile(item.Path, true);
                                    }
                                }
                                _uow.GenericRepository<tblCMO_ImportantDecisionAttachments>().DeleteAllById(oldImageFiles);
                            }
                            //// UPDATE NEW FILE IN FOLDER AND DB
                            foreach (var item in model.ImageFiles)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblCMO_ImportantDecisionAttachments objchild = new tblCMO_ImportantDecisionAttachments();
                                    objchild.AchievementId = objResult.Id;
                                    objchild.Path = CommonUtility.UploadAchievement(item, objResult.Id, false);
                                    await _uow.GenericRepository<tblCMO_ImportantDecisionAttachments>().AddAsync(objchild);
                                }
                            }
                        }
                        //REMOVE FILES FRM DB AND FOLDER
                        else
                        {
                            List<tblCMO_ImportantDecisionAttachments> oldImageFiles = objResult.tblCMO_ImportantDecisionAttachments.ToList();
                            if (oldImageFiles != null && oldImageFiles.Count > 0)
                            {
                                foreach (var item in oldImageFiles)
                                {
                                    if (File.Exists(HttpContext.Current.Server.MapPath(item.Path)))
                                    {

                                        CommonUtility.RemoveExistingFile(item.Path, true);
                                    }
                                }
                                _uow.GenericRepository<tblCMO_ImportantDecisionAttachments>().DeleteAllById(oldImageFiles);
                            }
                        }

                        _uow.save();
                        objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Update, true);
                    }
                    else
                    {
                        objReturn.Data = null;
                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }



        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();
                PagedData<vwCMO_ImportantDecision> data = GenericGridCall<vwCMO_ImportantDecision>.ListView(model.PageSize, x => x.Achievement, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwCMO_ImportantDecision, Adv_AchievementViewModel>()
                     .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : string.Empty))
                      .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<Adv_AchievementViewModel> GetById(long id, bool isBase64File = true)
        {
            ServiceResponse<Adv_AchievementViewModel> objReturn = new ServiceResponse<Adv_AchievementViewModel>();
            try
            {
                vwCMO_ImportantDecision resultData = _uow.GenericRepository<vwCMO_ImportantDecision>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwCMO_ImportantDecision, Adv_AchievementViewModel>()


                         .ForMember(des => des.AchievementSubCategoryImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.AchievementSubCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.AchievementSubCategoryImagePath))) : mdlSrc.AchievementSubCategoryImagePath.ToAbsolutePath() : string.Empty))

                        .ForMember(des => des.PdfFIleName, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PdfFIleName) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PdfFIleName))) : mdlSrc.PdfFIleName.ToAbsolutePath() : string.Empty))

                        .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : mdlSrc.ImagePath.ToAbsolutePath() : string.Empty));

                    });
                    objReturn.Data = Mapper.Map<vwCMO_ImportantDecision, Adv_AchievementViewModel>(resultData);

                    List<tblADV_AchievementAttachments> resultImages = _uow.GenericRepository<tblADV_AchievementAttachments>().GetAll(filter: x => x.AchievementId == resultData.Id).ToList();
                    if (resultImages != null && resultImages.Count > 0 && objReturn.Data != null)
                    {
                        objReturn.Data.ImageFiles = resultImages.Select(item => isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item.Path)) : item.Path.ToAbsolutePath()).ToList();
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
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblCMO_ImportantDecision objResult = await _uow.GenericRepository<tblCMO_ImportantDecision>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblCMO_ImportantDecision>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        objReturn.Data = null;
                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                    }

                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblCMO_ImportantDecision objResult = await _uow.GenericRepository<tblCMO_ImportantDecision>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsDeleted = !objResult.IsDeleted;
                        await _uow.GenericRepository<tblCMO_ImportantDecision>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        objReturn.Data = null;
                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                    }

                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get Achievement Banner Image List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementImageList(IndexModel model, int catgoryCode = 0, bool isBase64File = true)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();
                PagedData<vwCMO_ImportantDecision> data = GenericGridCall<vwCMO_ImportantDecision>.ListView(model.PageSize, x => x.AchievementDate, (x => x.IsDeleted == false && x.IsActive && x.IsVisible && (catgoryCode > 0 ? catgoryCode == Convert.ToInt32(x.AchievementCategoryCode) : false) && !string.IsNullOrEmpty(x.ImagePath)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwCMO_ImportantDecision, Adv_AchievementViewModel>()
                     .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : x.PdfFIleName.ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.ImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ImagePath))) : x.ImagePath.ToAbsolutePath() : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get Achievement By category Code
        /// </summary>
        /// <param name="model"></param>
        /// <param name="catgoryCode"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllByCategory(IndexModel model, int catgoryCode = 0, bool isImageRequired = false, bool isAllRecords = false, bool isBase64File = true)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                int dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;

                int subCatCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("SubCategoryCode") ? Convert.ToInt32(model.AdvanceSearchModel["SubCategoryCode"].ToString()) : 0) : 0;

                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();
                PagedData<vwCMO_ImportantDecision> data = GenericGridCall<vwCMO_ImportantDecision>.ListView((isAllRecords ? 101 : model.PageSize), x => x.Priority, x => (!x.IsDeleted && x.IsActive && (isImageRequired ? !string.IsNullOrEmpty(x.ImagePath) : true) && (catgoryCode > 0 ? Convert.ToInt32(x.AchievementCategoryCode) == catgoryCode : true) && (subCatCode > 0 ? x.AchievementSubCategoryCode == subCatCode : true) && (dptCode > 0 ? x.DepartmentCode == dptCode : true)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwCMO_ImportantDecision, Adv_AchievementViewModel>()
                     .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : x.PdfFIleName.ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.ImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ImagePath))) : x.ImagePath.ToThumbnailPath("Thumbnail", "Th_").ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.AchievementSubCategoryImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AchievementSubCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.AchievementSubCategoryImagePath))) : x.AchievementSubCategoryImagePath.ToAbsolutePath() : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public ServiceResponse<PagedData<SubCategoryGroupAchievementListViewModel>> GetAchievementListGroupBySubCategory(IndexModel model, int catgoryCode = 0, bool isImageRequired = false)
        {
            try
            {
                PagedData<SubCategoryGroupAchievementListViewModel> objResponseData = new PagedData<SubCategoryGroupAchievementListViewModel>();
                ServiceResponse<PagedData<Adv_AchievementViewModel>> objResultData = GetAllByCategory(model, catgoryCode, isImageRequired, true);
                if (objResultData.IsSuccess && objResultData.Data != null && objResultData.Data.Data.Count() > 0)
                {
                    List<IGrouping<long?, Adv_AchievementViewModel>> data = objResultData.Data.Data.GroupBy(x => x.AchievementSubCategoryCode).ToList();
                    List<SubCategoryGroupAchievementListViewModel> objTypeGroupList = objResultData.Data.Data.GroupBy(x => x.AchievementSubCategoryCode).Select(
                    item => new SubCategoryGroupAchievementListViewModel
                    {
                        AchievementSubCategory = item.FirstOrDefault().AchievementSubCategory,
                        AchievementSubCategoryCode = item.FirstOrDefault().AchievementSubCategoryCode,
                        AchievementSubCategoryHindi = item.FirstOrDefault().AchievementSubCategoryHindi,
                        AchievementSubCategoryImagePath = item.FirstOrDefault().AchievementSubCategoryImagePath,
                        Items = item.ToList()
                    }).ToList();

                    if (objTypeGroupList != null && objTypeGroupList.Count > 0)
                    {
                        objResponseData.Data = objTypeGroupList.Skip(model.PageSize * (model.Page - 1)).Take(model.PageSize).ToList();
                        objResponseData.TotalRecords = data.Count;
                        objResponseData.PageSize = model.PageSize;
                        objResponseData.NumberOfPages = (objResponseData.TotalRecords / model.PageSize) > 0 ? Convert.ToInt32(Math.Round(Convert.ToDecimal(objResponseData.TotalRecords / model.PageSize), MidpointRounding.AwayFromZero)) : 1;
                        objResponseData.CurrentPage = model.Page;
                        return SetResultStatus(objResponseData, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<PagedData<SubCategoryGroupAchievementListViewModel>>(null, MessageStatus.NoRecord, false);
                    }


                }
                else if (objResultData.IsSuccess)
                {
                    return SetResultStatus<PagedData<SubCategoryGroupAchievementListViewModel>>(null, MessageStatus.NoRecord, true);

                }
                else

                {
                    return SetResultStatus<PagedData<SubCategoryGroupAchievementListViewModel>>(null, MessageStatus.InvalidData, false);
                }


            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<SubCategoryGroupAchievementListViewModel>>(null, MessageStatus.Error, false);
            }
        }




        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetBySearch(SearchModel searchModel, int UserId,bool isAllRecords = false)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                string fromDate = searchModel.CreatedFrom != null ? searchModel.CreatedFrom : string.Empty;

                string toDate = searchModel.CreatedTo != null ? searchModel.CreatedTo : string.Empty;


                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();
                object[] @sp_params = new object[12];
                @sp_params[0] = searchModel.DepartmentCode;
                @sp_params[1] = searchModel.CategortyCode;
                @sp_params[2] = searchModel.SubCategortyCode;
                @sp_params[3] = searchModel.SearchKeyword;
                @sp_params[4] = UserId;
                @sp_params[5] = searchModel.Userby;
                @sp_params[6] = searchModel.CMOComments;
                @sp_params[7] = searchModel.KeyWord;
                @sp_params[8] = searchModel.AutoKeyWord;
                @sp_params[9] = searchModel.Activeview;
                @sp_params[10] = Convert.ToDateTime(fromDate).ToString("MM-dd-yyyy");
                @sp_params[11] = Convert.ToDateTime(toDate).ToString("MM-dd-yyyy");
                PagedData<sp_GetImportantDecisionList_Result> objOrderRelatedTo = GenericGridCall<sp_GetImportantDecisionList_Result>.ListView(@sp_params, searchModel.indexModel.PageSize, x => x.Id == x.Id, searchModel.indexModel.Search, searchModel.indexModel.OrderBy, searchModel.indexModel.OrderByAsc, searchModel.indexModel.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_GetImportantDecisionList_Result, Adv_AchievementViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(objOrderRelatedTo.Data, resulData.Data);
                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, searchModel.indexModel.PageSize, objOrderRelatedTo.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        #endregion

        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAchievementReport()
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {

                DataTable dt = new DataTable();
                using (var context = new Jankalyan_DBEntities())
                {
                    //var dt = new DataTable();
                    var conn = context.Database.Connection;
                    var connectionState = conn.State;
                    try
                    {
                        if (connectionState != ConnectionState.Open) conn.Open();
                        using (var cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = "SpADV_AchievementReport";
                            cmd.CommandType = CommandType.StoredProcedure;
                            //    cmd.Parameters.Add(new SqlParameter("jobCardId", 100525));
                            using (var reader = cmd.ExecuteReader())
                            {
                                dt.Load(reader);
                            }
                        }
                        DataRow newRow = dt.NewRow();
                        newRow[0] = "Department";
                        newRow[1] = "Category";
                        newRow[2] = "Sub Category";
                        newRow[3] = "Summary";
                        newRow[4] = "Details";
                        dt.Rows.InsertAt(newRow, 0);
                        ServiceHelper.ExportHelper.ExportData("Achievement Report", dt, "test");


                    }
                    catch (Exception ex)
                    {
                        // error handling
                        throw;
                    }
                    finally
                    {
                        if (connectionState != ConnectionState.Closed) conn.Close();
                    }

                }




            }

            catch
            {

            }
            return null;
        }


        #region Jankalyan Front-end

        /// <summary>
        /// Get Important decission List for Jankalyan front-end with filter and search
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<ImportantDecisionListModel>> GetImportantDecisionList(ImportantDecisionSearchModel model)
        {
            try
            {
                PagedData<ImportantDecisionListModel> responsedata = new PagedData<ImportantDecisionListModel>();

                object[] @parameters = new object[9];
                @parameters[0] = model.DepartmentCode > 0 ? model.DepartmentCode : 0;
                @parameters[1] = model.CategoryCode > 0 ? model.CategoryCode : 0;
                @parameters[2] = model.SubcategoryCode > 0 ? model.SubcategoryCode : 0;
                @parameters[3] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate;
                @parameters[4] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate;
                @parameters[5] = string.IsNullOrEmpty(model.SearchKeyword) ? string.Empty : model.SearchKeyword;
                @parameters[6] = string.IsNullOrEmpty(model.Status.ToString()) || model.Status < 0 ? -1 : model.Status;
                @parameters[7] = string.IsNullOrEmpty(model.Id.ToString()) || model.Id < 1 ? 0 : model.Id;
                @parameters[8] = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode : 0;

                PagedData<sp_JAN_ImportantDecisionList_Result> resultdata = GenericGridCall<sp_JAN_ImportantDecisionList_Result>.SPListView(@parameters, model.PageSize, x => x.CreatedDate, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                ///resultdata.Data.Count();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_ImportantDecisionList_Result, ImportantDecisionListModel>()
                    .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => x.PdfFIleName.CheckFileExist() ? x.PdfFIleName.ToAbsolutePath() : string.Empty));
                    // .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                if (resultdata.Data.Count() > 0)
                {
                    responsedata.TotalRecords = resultdata.Data.ToList()[0].TotalCount;
                }


                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<ImportantDecisionListModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Important decission detail for Jankalyan front-end
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ImportantDecisionDetailModel> GetImportantDecisionDetail(int id)
        {
            try
            {
                ImportantDecisionDetailModel resultData = new ImportantDecisionDetailModel();

                sp_JAN_ImportantDecisionDetail_Result data = _uow.ExeccuteStoreProcedure<sp_JAN_ImportantDecisionDetail_Result>("sp_JAN_ImportantDecisionDetail @ImportantDecId"
                    , new SqlParameter("ImportantDecId", SqlDbType.Int) { Value = id }
                                                           ).FirstOrDefault();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_ImportantDecisionDetail_Result, ImportantDecisionDetailModel>()
                       .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => x.PdfFIleName.CheckFileExist() ? x.PdfFIleName.ToAbsolutePath() : string.Empty))
                         .ForMember(dest => dest.AchievementDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.AchievementDate)) ? Convert.ToDateTime(src.AchievementDate.Value).ToHindiDate("dd-MMM-yyyy") : null));
                    //.ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<ImportantDecisionDetailModel>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Reports

        /// <summary>
        /// Order report of department with Type and Sub Type 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ImportantDecisionSummaryReportModel>> GetImportantDecisionSummaryReport(ImpDescSummaryReportFilterModel model)
        {
            try
            {
                List<ImportantDecisionSummaryReportModel> objReport = new List<ImportantDecisionSummaryReportModel>();
                List<sp_JAN_ImportantDecisionSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_ImportantDecisionSummaryReport_Result>("sp_JAN_ImportantDecisionSummaryReport @DepartmentCode, @CreatedFromDate, @CreatedToDate"
                     , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                     , new SqlParameter("CreatedFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedFromDate) ? string.Empty : model.CreatedFromDate }
                      , new SqlParameter("CreatedToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedToDate) ? string.Empty : model.CreatedToDate }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_ImportantDecisionSummaryReport_Result, ImportantDecisionSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(data, objReport);

                return SetResultStatus(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ImportantDecisionSummaryReportModel>>(null, MessageStatus.Error, false);
            }

        }

		/// <summary>
		/// Get Order department count report on fromdate and todate wise 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<List<ImportantDecisionCountReportModel>> GetImportantDecisionDepartmentSummaryReport(ImportantDecisionCountReportFilterModel model)
		{
			try
			{
				List<ImportantDecisionCountReportModel> objReport = new List<ImportantDecisionCountReportModel>();
				List<sp_JAN_ImportantDecisionDepartmentReport_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_ImportantDecisionDepartmentReport_Result>("sp_JAN_ImportantDecisionDepartmentReport  @EntryFromDate, @EntryToDate"
					 , new SqlParameter("EntryFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryFromDate) ? string.Empty : model.EntryFromDate }
					  , new SqlParameter("EntryToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryToDate) ? string.Empty : model.EntryToDate }
				   ).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<sp_JAN_ImportantDecisionDepartmentReport_Result, ImportantDecisionCountReportModel>();
				});
				IMapper mapper = config.CreateMapper();
				objReport = mapper.Map(data, objReport);

				return SetResultStatus(objReport, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<ImportantDecisionCountReportModel>>(null, MessageStatus.Error, false);
			}

		}

		/// <summary>
		/// Important decision report and apply filter on department, fromdate and todate 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<List<ImportantDecisionDetailReportModel>> GetImportantDecisionDetailReport(OrderSummaryReportFilterModel model)
		{
			try
			{
				List<ImportantDecisionDetailReportModel> objReport = new List<ImportantDecisionDetailReportModel>();
				List<sp_JAN_ImportantDecisionDetailReport_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_ImportantDecisionDetailReport_Result>("sp_JAN_ImportantDecisionDetailReport @DepartmentCode, @FromDateOfEntry, @ToDateOfEntry"
					 , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
					 , new SqlParameter("FromDateOfEntry", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedFromDate) ? string.Empty : model.CreatedFromDate }
					  , new SqlParameter("CreatedToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedToDate) ? string.Empty : model.CreatedToDate }
				   ).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<sp_JAN_ImportantDecisionDetailReport_Result, ImportantDecisionDetailReportModel>();
				});
				IMapper mapper = config.CreateMapper();
				objReport = mapper.Map(data, objReport);

				return SetResultStatus(objReport, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<ImportantDecisionDetailReportModel>>(null, MessageStatus.Error, false);
			}

		}

		#endregion
	}
}
