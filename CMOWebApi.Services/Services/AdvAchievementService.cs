using AutoMapper;

using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.Services
{
    public class AdvAchievementService : BaseService, IAdvAchievementService
    {
        #region /// Variable ///
        IUnitofWork _uow;
        private readonly IAdvtConfigurationService _advtConfigurationService;
        #endregion

        #region /// Cunstroctor  ///
        public AdvAchievementService(IUnitofWork uow, IAdvtConfigurationService advtConfigurationService)
        {
            _uow = uow;
            _advtConfigurationService = advtConfigurationService;
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
                model.ModifiedBy = 0;

                if (model.AchievementDate != null && model.AchievementDate.HasValue)
                {
                    model.AchievementDate = Convert.ToDateTime(model.AchievementDate.Value).ToLocalTime();
                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<Adv_AchievementModel, tblADV_Achievements>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.PdfFIleName, opt => opt.MapFrom(src => string.Empty));
                });
                tblADV_Achievements data = Mapper.Map<Adv_AchievementModel, tblADV_Achievements>(model);

                data = await _uow.GenericRepository<tblADV_Achievements>().AddAsync(data);
                _uow.save();

                if (!string.IsNullOrEmpty(model.PdfFIleName))
                {
                    data.PdfFIleName = CommonUtility.UploadAchievement(model.PdfFIleName, data.Id, true);
                    data = await _uow.GenericRepository<tblADV_Achievements>().UpdateAsync(data);
                }

                if (model.ImageFiles != null && model.ImageFiles.Count > 0)
                {
                    foreach (var item in model.ImageFiles)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblADV_AchievementAttachments objchild = new tblADV_AchievementAttachments();
                            objchild.AchievementId = data.Id;
                            objchild.Path = CommonUtility.UploadAchievement(item, data.Id, false, catId: model.AchievementCategoryCode.HasValue ? model.AchievementCategoryCode.Value : 0);
                            await _uow.GenericRepository<tblADV_AchievementAttachments>().AddAsync(objchild);
                        }
                    }
                }

                // Connect With CMIS
                if (model.ConnectWithCMIS != null && model.ConnectWithCMIS.Count > 0)
                {
                    foreach (var item in model.ConnectWithCMIS)
                    {
                        {
                            //related To result model Acc. to parameters
                            if (item.ConnectWithCMISResult != null && (!string.IsNullOrEmpty(item.ConnectWithCMISResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.parano) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_dept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_description) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_ndept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_year)))
                            {
                                tblAchievement_ConnectWithCMIS_Parameter objParameter = new tblAchievement_ConnectWithCMIS_Parameter();
                                objParameter.ModuleId = item.ModuleId;
                                objParameter.ModuleName = item.ModuleName;
                                objParameter.AchievementId = data.Id;
                                objParameter.YearValue = item.YearValue;
                                objParameter.YearText = item.YearText;
                                objParameter.DepartmentId = item.DepartmentId;
                                objParameter.DepartmentName = item.DepartmentName;
                                await _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Parameter>().AddAsync(objParameter);
                                _uow.save();

                                tblAchievement_ConnectWithCMIS_Result objchild = new tblAchievement_ConnectWithCMIS_Result();
                                objchild.ModuleName = item.ConnectWithCMISResult.modulename;
                                objchild.ParaNo = item.ConnectWithCMISResult.parano;
                                objchild.Projecthdrid = item.ConnectWithCMISResult.pm_projecthdrid;
                                objchild.ParameterID = objParameter.Id;
                                objchild.DepartmentId = item.ConnectWithCMISResult.prj_dept;
                                objchild.DepartmentName = item.ConnectWithCMISResult.prj_ndept;
                                objchild.FileNumber = item.ConnectWithCMISResult.filenumber;
                                objchild.Description = item.ConnectWithCMISResult.prj_description;
                                objchild.Year = item.ConnectWithCMISResult.prj_year;
                                objchild.CMISNewTransCoreId = item.ConnectWithCMISResult.CMISNewTransCoreId;
                                await _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Result>().AddAsync(objchild);
                            }
                        }
                    }
                }

                //Add Benificiary records
                if ((model.BenificiaryList != null && model.BenificiaryList.Count > 0))
                {
                    foreach (var item in model.BenificiaryList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblADV_AchievementBenificiaryMapping objChild = new tblADV_AchievementBenificiaryMapping();
                            objChild.AchievementsId = data.Id;
                            objChild.BenificiaryId = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblADV_AchievementBenificiaryMapping>().AddAsync(objChild);
                        }
                    }
                }
                _uow.save();

                objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvAchievementService/ Create", ex);

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
                    tblADV_Achievements objResult = await _uow.GenericRepository<tblADV_Achievements>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {

                        if (model.AchievementDate != null && model.AchievementDate.HasValue)
                        {
                            model.AchievementDate = Convert.ToDateTime(model.AchievementDate.Value).ToLocalTime();
                        }

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<Adv_AchievementModel, tblADV_Achievements>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedBy.ToString()) ? model.CreatedBy : objResult.CreatedBy))
                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedDate.ToString()) ? DateTime.Now : objResult.CreatedDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objResult.IsActive))
                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objResult.IsDeleted))
                            .ForMember(dest => dest.PdfFIleName, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.PdfFIleName) ? CommonUtility.RemoveExistingFile(objResult.PdfFIleName, false) ? "" : "" : CommonUtility.UploadAchievement(model.PdfFIleName, model.Id, true, objResult.PdfFIleName, model.AchievementCategoryCode.HasValue ? model.AchievementCategoryCode.Value : 0)));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblADV_Achievements>().UpdateAsync(objResult);

                        ////REMOVE OLD FILES FROM FOLDER AND DB  AND UPDATE NEW IN FOLDER AND DB
                        if (model.ImageFiles != null && model.ImageFiles.Count > 0)
                        {
                            List<tblADV_AchievementAttachments> oldImageFiles = objResult.tblADV_AchievementAttachments.ToList();
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
                                _uow.GenericRepository<tblADV_AchievementAttachments>().DeleteAllById(oldImageFiles);
                            }

                            //// UPDATE NEW FILE IN FOLDER AND DB
                            foreach (var item in model.ImageFiles)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblADV_AchievementAttachments objchild = new tblADV_AchievementAttachments();
                                    objchild.AchievementId = objResult.Id;
                                    objchild.Path = CommonUtility.UploadAchievement(item, objResult.Id, false, catId: model.AchievementCategoryCode.HasValue ? model.AchievementCategoryCode.Value : 0);
                                    await _uow.GenericRepository<tblADV_AchievementAttachments>().AddAsync(objchild);
                                }
                            }
                        }

                        //Delete existing Connect With CMIS
                        if (objResult.tblAchievement_ConnectWithCMIS_Parameter.Count > 0)
                        {
                            foreach (var item in objResult.tblAchievement_ConnectWithCMIS_Parameter)
                            {
                                if (item.tblAchievement_ConnectWithCMIS_Result.Count > 0)
                                {
                                    _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Result>().DeleteAllById(item.tblAchievement_ConnectWithCMIS_Result.ToList());
                                }
                            }
                            _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Parameter>().DeleteAllById(objResult.tblAchievement_ConnectWithCMIS_Parameter.ToList());
                        }

                        //delete Benificiary records
                        if (objResult.tblADV_AchievementBenificiaryMapping.Count > 0)
                        {
                            _uow.GenericRepository<tblADV_AchievementBenificiaryMapping>().DeleteAllById(objResult.tblADV_AchievementBenificiaryMapping.ToList());
                        }

                        //Add Benificiary records
                        if ((model.BenificiaryList != null && model.BenificiaryList.Count > 0))
                        {
                            foreach (var item in model.BenificiaryList)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblADV_AchievementBenificiaryMapping objChild = new tblADV_AchievementBenificiaryMapping();
                                    objChild.AchievementsId = objResult.Id;
                                    objChild.BenificiaryId = Convert.ToInt32(item);
                                    await _uow.GenericRepository<tblADV_AchievementBenificiaryMapping>().AddAsync(objChild);
                                }
                            }
                        }

                        // Connect With CMIS
                        if (model.ConnectWithCMIS != null && model.ConnectWithCMIS.Count > 0)
                        {
                            foreach (var item in model.ConnectWithCMIS)
                            {
                                {
                                    //related To result model Acc. to parameters
                                    if (item.ConnectWithCMISResult != null && (!string.IsNullOrEmpty(item.ConnectWithCMISResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.parano) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_dept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_description) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_ndept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_year)))
                                    {
                                        tblAchievement_ConnectWithCMIS_Parameter objParameter = new tblAchievement_ConnectWithCMIS_Parameter();
                                        objParameter.ModuleId = item.ModuleId;
                                        objParameter.ModuleName = item.ModuleName;
                                        objParameter.AchievementId = objResult.Id;
                                        objParameter.YearValue = item.YearValue;
                                        objParameter.YearText = item.YearText;
                                        objParameter.DepartmentId = item.DepartmentId;
                                        objParameter.DepartmentName = item.DepartmentName;
                                        await _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Parameter>().AddAsync(objParameter);
                                        _uow.save();

                                        tblAchievement_ConnectWithCMIS_Result objchild = new tblAchievement_ConnectWithCMIS_Result();
                                        objchild.ModuleName = item.ConnectWithCMISResult.modulename;
                                        objchild.ParaNo = item.ConnectWithCMISResult.parano;
                                        objchild.Projecthdrid = item.ConnectWithCMISResult.pm_projecthdrid;
                                        objchild.ParameterID = objParameter.Id;
                                        objchild.DepartmentId = item.ConnectWithCMISResult.prj_dept;
                                        objchild.DepartmentName = item.ConnectWithCMISResult.prj_ndept;
                                        objchild.FileNumber = item.ConnectWithCMISResult.filenumber;
                                        objchild.Description = item.ConnectWithCMISResult.prj_description;
                                        objchild.Year = item.ConnectWithCMISResult.prj_year;
                                        objchild.CMISNewTransCoreId = item.ConnectWithCMISResult.CMISNewTransCoreId;
                                        await _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Result>().AddAsync(objchild);
                                    }
                                }
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
                CreateLogHelper.CreateErrorLogFile("AdvAchievementService/ Edit", ex);

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
                PagedData<vwADV_Achievements> data = GenericGridCall<vwADV_Achievements>.ListView(model.PageSize, x => x.Achievement, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_Achievements, Adv_AchievementViewModel>()
                    .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? x.PdfFIleName.ToAbsolutePath() : string.Empty))
                     .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? mdlSrc.ImagePath.ToAbsolutePath() : string.Empty));
                    //.ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : string.Empty))
                    //.ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));
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
                vwADV_Achievements resultData = _uow.GenericRepository<vwADV_Achievements>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vwADV_Achievements, Adv_AchievementViewModel>()
                         .ForMember(des => des.AchievementCategoryImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.AchievementCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.AchievementCategoryImagePath))) : mdlSrc.AchievementCategoryImagePath.ToAbsolutePath() : string.Empty))

                         .ForMember(des => des.AchievementSubCategoryImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.AchievementSubCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.AchievementSubCategoryImagePath))) : mdlSrc.AchievementSubCategoryImagePath.ToAbsolutePath() : string.Empty))

                        .ForMember(des => des.PdfFIleName, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PdfFIleName) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PdfFIleName))) : mdlSrc.PdfFIleName.ToAbsolutePath() : string.Empty))


                        .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : mdlSrc.ImagePath.ToAbsolutePath() : string.Empty))

                        .ForMember(des => des.AchievementCategoryImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AchievementCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.AchievementCategoryImagePath))) : x.AchievementCategoryImagePath.ToAbsolutePath() : string.Empty))

                        .ForMember(des => des.AchievementSubCategoryImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AchievementSubCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.AchievementSubCategoryImagePath))) : x.AchievementSubCategoryImagePath.ToAbsolutePath() : string.Empty))

                        .ForMember(dest => dest.AchievementDateHindi, opt => opt.MapFrom(src => !string.IsNullOrEmpty(Convert.ToString(src.AchievementDate)) ? Convert.ToDateTime(src.AchievementDate.Value).ToHindiDate("dd-MMM-yyyy") : null))

                        .ForMember(des => des.BenificiaryList, src => src.MapFrom(y => !string.IsNullOrEmpty(y.BenificiaryIds) ? y.BenificiaryIds.Split(',').Select(x => Convert.ToString(x)).ToList() : null));
                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(resultData, objReturn.Data);


                    List<tblADV_AchievementAttachments> resultImages = _uow.GenericRepository<tblADV_AchievementAttachments>().GetAll(filter: x => x.AchievementId == resultData.Id).ToList();
                    if (resultImages != null && resultImages.Count > 0 && objReturn.Data != null)
                    {
                        objReturn.Data.ImageFiles = resultImages.Select(item => isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item.Path)) : item.Path.ToAbsolutePath()).ToList();
                    }

                    // Connect With CMIS
                    List<tblAchievement_ConnectWithCMIS_Parameter> connectWithCMIS = _uow.GenericRepository<tblAchievement_ConnectWithCMIS_Parameter>().GetAll(filter: x => x.AchievementId == id).ToList();

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblAchievement_ConnectWithCMIS_Parameter, AchievementConnectWithCMISParameterModel>()
                         .ForMember(des => des.ConnectWithCMISResult, src => src.MapFrom(x => new AchievementConnectWithCMISParameterResultModel()))
                          .AfterMap((s, des) =>
                          {
                              des.ConnectWithCMISResult.prj_year = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().Year) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().Year : string.Empty;

                              des.ConnectWithCMISResult.pm_projecthdrid = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().Projecthdrid) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().Projecthdrid : string.Empty;

                              des.ConnectWithCMISResult.filenumber = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().FileNumber) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().FileNumber : string.Empty;

                              des.ConnectWithCMISResult.modulename = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().ModuleName) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().ModuleName : string.Empty;

                              des.ConnectWithCMISResult.prj_description = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().Description) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().Description : string.Empty;

                              des.ConnectWithCMISResult.prj_ndept = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().DepartmentName) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().DepartmentName : string.Empty;

                              des.ConnectWithCMISResult.prj_dept = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().DepartmentId) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().DepartmentId : string.Empty;

                              des.ConnectWithCMISResult.parano = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().ParaNo) ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().ParaNo : string.Empty;

                              des.ConnectWithCMISResult.CMISNewTransCoreId = s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault() != null && s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().CMISNewTransCoreId > 0 ? s.tblAchievement_ConnectWithCMIS_Result.FirstOrDefault().CMISNewTransCoreId : 0;
                          });
                    });
                    mapper = config.CreateMapper();
                    objReturn.Data.ConnectWithCMIS = mapper.Map(connectWithCMIS, objReturn.Data.ConnectWithCMIS);

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
                CreateLogHelper.CreateLogFile("Achievement GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                    tblADV_Achievements objResult = await _uow.GenericRepository<tblADV_Achievements>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblADV_Achievements>().UpdateAsync(objResult);
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
            catch (Exception ex)
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
                    tblADV_Achievements objResult = await _uow.GenericRepository<tblADV_Achievements>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsDeleted = !objResult.IsDeleted;
                        await _uow.GenericRepository<tblADV_Achievements>().UpdateAsync(objResult);
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
                PagedData<vwADV_Achievements> data = GenericGridCall<vwADV_Achievements>.ListView(model.PageSize, x => x.Priority, (x => x.IsDeleted == false && x.IsActive == true && x.AchievementCategoryIsVisible == true && (catgoryCode > 0 ? catgoryCode == Convert.ToInt32(x.AchievementCategoryCode) : false) && !string.IsNullOrEmpty(x.ImagePath) ? true : false), model.Search, model.OrderBy, model.OrderByAsc, model.Page);


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_Achievements, Adv_AchievementViewModel>()
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
                CreateLogHelper.CreateLogFile("Achievement GetAchievementImageList ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementImageList ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementImageList ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                int admDptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("AdmDepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["AdmDepartmentCode"].ToString()) : 0) : 0;

                int dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;

                int subCatCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("SubCategoryCode") ? Convert.ToInt32(model.AdvanceSearchModel["SubCategoryCode"].ToString()) : 0) : 0;


                catgoryCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("CategoryCode") ? Convert.ToInt32(model.AdvanceSearchModel["CategoryCode"].ToString()) : catgoryCode) : catgoryCode;

                DateTime FromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("FromDate") ? Convert.ToDateTime(model.AdvanceSearchModel["FromDate"].ToString()) : DateTime.MinValue) : DateTime.MinValue;


                DateTime ToDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ToDate") ? Convert.ToDateTime(model.AdvanceSearchModel["ToDate"].ToString()) : DateTime.MaxValue) : DateTime.MaxValue;

                string Search = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Search") ? model.AdvanceSearchModel["Search"].ToString().Trim() : string.Empty) : string.Empty;



                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();
                PagedData<vwADV_Achievements> data = GenericGridCall<vwADV_Achievements>.ListView((isAllRecords ? 101 : model.PageSize), x => x.Priority, x => (!x.IsDeleted && x.IsActive && (isImageRequired ? !string.IsNullOrEmpty(x.ImagePath) : true) && (catgoryCode > 0 ? Convert.ToInt32(x.AchievementCategoryCode) == catgoryCode : true) && (subCatCode > 0 ? x.AchievementSubCategoryCode == subCatCode : true) && (dptCode > 0 ? x.DepartmentCode == dptCode : true) && (admDptCode > 0 ? x.AdmDepartmentCode == admDptCode : true) && (!string.IsNullOrEmpty(FromDate.ToString()) ? Convert.ToDateTime(x.AchievementDate).Date >= FromDate.Date : true) && (!string.IsNullOrEmpty(ToDate.ToString()) ? Convert.ToDateTime(x.AchievementDate).Date <= ToDate.Date : true)

                 && (!string.IsNullOrEmpty(Search) ? (
                 (string.IsNullOrEmpty(x.AllSearch) ? string.Empty : x.AllSearch).ToLower().Contains(Search.ToLower())

                 ) : true)

                ), model.Search, model.OrderBy, model.OrderByAsc, model.Page);



                var mapper = new MapperConfiguration(cfg => cfg.CreateMap<vwADV_Achievements, Adv_AchievementViewModel>()
                        .AfterMap((s, d) =>
                        {
                            d.PdfFIleName = (!string.IsNullOrEmpty(s.PdfFIleName) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.PdfFIleName))) : s.PdfFIleName.ToAbsolutePath() : string.Empty);

                            d.ImagePath = (!string.IsNullOrEmpty(s.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.ImagePath))) : s.ImagePath.ToAbsolutePath() : string.Empty);
                            d.ThumbnailPath = (!string.IsNullOrEmpty(s.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.ImagePath))) : s.ImagePath.ToThumbnailPath("Thumbnail", "Th_").ToAbsolutePath() : string.Empty);
                            d.AchievementCategoryImagePath = (!string.IsNullOrEmpty(s.AchievementCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.AchievementCategoryImagePath))) : s.AchievementCategoryImagePath.ToAbsolutePath() : string.Empty);
                            d.AchievementSubCategoryImagePath = (!string.IsNullOrEmpty(s.AchievementSubCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.AchievementSubCategoryImagePath))) : s.AchievementSubCategoryImagePath.ToAbsolutePath() : string.Empty);
                            d.AchievementDateHindi = (!string.IsNullOrEmpty(Convert.ToString(s.AchievementDate)) ? Convert.ToDateTime(s.AchievementDate.Value).ToHindiDate("dd-MMM-yyyy") : null);

                        })
                    )
                    .CreateMapper();


                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Achievement GetAllByCategory ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAllByCategory ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAllByCategory ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false, ex.Message);
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
                        Items = item.OrderBy(x => x.Priority).ToList()
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
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupBySubCategory ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupBySubCategory ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupBySubCategory ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<SubCategoryGroupAchievementListViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetBySearch(SearchModel searchModel, int UserId, bool isAllRecords = false)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                //string fromDate = searchModel.CreatedFrom != null ? searchModel.CreatedFrom : string.Empty;

                //string toDate = searchModel.CreatedTo != null ? searchModel.CreatedTo : string.Empty;

                //string isExportToExcel = searchModel.IsExportToExcel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("IsExportToExcel") ? (model.AdvanceSearchModel["IsExportToExcel"].ToString()) : string.Empty) : string.Empty;

                if (Convert.ToBoolean(searchModel.IsExportToExcel))
                {
                    searchModel.indexModel.PageSize = 101;
                }

                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();
                object[] @sp_params = new object[11];
                @sp_params[0] = searchModel.DepartmentCode;
                @sp_params[1] = searchModel.CategortyCode;
                @sp_params[2] = searchModel.SubCategortyCode;
                @sp_params[3] = searchModel.SearchKeyword;
                @sp_params[4] = UserId;
                @sp_params[5] = searchModel.CMOComments;
                @sp_params[6] = searchModel.KeyWord;
                @sp_params[7] = searchModel.AutoKeyWord;
                @sp_params[8] = searchModel.Activeview ?? -1;
                @sp_params[9] = searchModel.CreatedFrom;//Convert.ToDateTime(fromDate).ToString("MM-dd-yyyy");
                @sp_params[10] = searchModel.CreatedTo; //Convert.ToDateTime(toDate).ToString("MM-dd-yyyy");

                PagedData<sp_GetAcheivementList_Result> objOrderRelatedTo = GenericGridCall<sp_GetAcheivementList_Result>.ListView(@sp_params, searchModel.indexModel.PageSize, x => x.Id == x.Id, searchModel.indexModel.Search, searchModel.indexModel.OrderBy, searchModel.indexModel.OrderByAsc, searchModel.indexModel.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_GetAcheivementList_Result, Adv_AchievementViewModel>()
                    .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfFIleName) ? x.PdfFIleName.ToAbsolutePath() : string.Empty))
                    .ForMember(des => des.AchievementAttachments, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AchievementAttachments) ? x.AchievementAttachments.Split(',').Select(p => !Convert.ToString(p).CheckFileExist() ? string.Empty : p.Trim().ToAbsolutePath()).ToList() : null));
                    //.ForMember(des => des.AchievementAttachments, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AchievementAttachments) ? x.AchievementAttachments.Split(',').Select(p => !Convert.ToString(p).CheckFileExist() ? string.Empty : CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(p.Trim()))).ToList() : null));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(objOrderRelatedTo.Data, resulData.Data);
                //PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, searchModel.indexModel.PageSize, objOrderRelatedTo.TotalRecords);

                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, searchModel.indexModel.PageSize, resulData.Data.Count() > 0 && resulData.Data != null ? resulData.Data.FirstOrDefault().TotalCount : 0, headersName: new string[] { "S.NO.", "Date", "Department", "Category", "Sub-Category", "Software Entry No.", "Achievement", "Description", "Created By", "Created Date", "AchievementIsActive" });

                //PagedData<UserViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords,
                //   headersName: new string[] { "S.NO.", "User Name", "SSOID", "User Type", "Office Name", "District", "Department", "User Email", "Mobile", "UserIsActive" });

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Achievement GetAll GetBySearch ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAll GetBySearch ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAll GetBySearch ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<PagedData<CategoryGroupAchievementListViewModel>> GetAchievementListGroupByCategory(IndexModel model, int catgoryCode = 0, bool isImageRequired = false)
        {
            try
            {
                PagedData<CategoryGroupAchievementListViewModel> objResponseData = new PagedData<CategoryGroupAchievementListViewModel>();

                ServiceResponse<PagedData<Adv_AchievementViewModel>> objResultData = GetAllByCategory(model, catgoryCode, isImageRequired, true, false);
                if (objResultData.IsSuccess && objResultData.Data != null && objResultData.Data.Data.Count() > 0)
                {
                    List<Adv_AchievementViewModel> data = objResultData.Data.Data.Where(y => y.AchievementCategoryIsVisible == true && y.CategorydepVisible == true && y.IsActive == true && y.IsDeleted == false).ToList();
                    List<CategoryGroupAchievementListViewModel> objTypeGroupList = data.GroupBy(x => x.AchievementCategoryCode).Select(
                    item => new CategoryGroupAchievementListViewModel
                    {
                        AchievementCategory = item.FirstOrDefault().AchievementCategory,
                        AchievementCategoryCode = item.FirstOrDefault().AchievementCategoryCode,
                        AchievementCategoryHindi = item.FirstOrDefault().AchievementCategoryHindi,
                        AchievementCategoryImagePath = item.FirstOrDefault().AchievementCategoryImagePath,
                        Items = item.OrderByDescending(x => x.AchievementDate).ToList()
                    }).ToList();

                    if (objTypeGroupList != null && objTypeGroupList.Count > 0)
                    {
                        objResponseData.Data = objTypeGroupList.Skip(model.PageSize * (model.Page - 1)).Take(model.PageSize).ToList();
                        objResponseData.TotalRecords = data.GroupBy(x => x.AchievementCategoryCode).Count();
                        objResponseData.PageSize = model.PageSize;
                        objResponseData.NumberOfPages = (objResponseData.TotalRecords / model.PageSize) > 0 ? Convert.ToInt32(Math.Round(Convert.ToDecimal(objResponseData.TotalRecords / model.PageSize), MidpointRounding.AwayFromZero)) : 1;
                        objResponseData.CurrentPage = model.Page;
                        return SetResultStatus(objResponseData, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<PagedData<CategoryGroupAchievementListViewModel>>(null, MessageStatus.NoRecord, false);
                    }


                }
                else if (objResultData.IsSuccess)
                {
                    return SetResultStatus<PagedData<CategoryGroupAchievementListViewModel>>(null, MessageStatus.NoRecord, true);

                }
                else

                {
                    return SetResultStatus<PagedData<CategoryGroupAchievementListViewModel>>(null, MessageStatus.InvalidData, false);
                }


            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupByCategory ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupByCategory ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupByCategory ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<CategoryGroupAchievementListViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<DepartmentGroupAchievementListViewModel>> GetAchievementListGroupByDepartment(IndexModel model, int catgoryCode = 0, bool isImageRequired = false)
        {
            try
            {
                //  StringBuilder processTxt = new StringBuilder();
                PagedData<DepartmentGroupAchievementListViewModel> objResponseData = new PagedData<DepartmentGroupAchievementListViewModel>();
                int admDptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("AdmDepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["AdmDepartmentCode"].ToString()) : 0) : 0;

                int dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;

                int subCatCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("SubCategoryCode") ? Convert.ToInt32(model.AdvanceSearchModel["SubCategoryCode"].ToString()) : 0) : 0;

                string fromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("FromDate") ? Convert.ToDateTime(model.AdvanceSearchModel["FromDate"]).ToString("MM-dd-yyyy") : string.Empty) : string.Empty;


                string toDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ToDate") ? Convert.ToDateTime(model.AdvanceSearchModel["ToDate"]).ToString("MM-dd-yyyy") : string.Empty) : string.Empty;

                string Search = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Search") ? model.AdvanceSearchModel["Search"].ToString().Trim() : string.Empty) : string.Empty;

                ServiceResponse<PagedData<Adv_AchievementViewModel>> objResultData = GetAllBySearch(new AchievementSearchModel()
                {
                    IndexModel = new IndexModel() { PageSize = 101, Page = 1, OrderBy = model.OrderBy, OrderByAsc = model.OrderByAsc },
                    AdmDepartmentCode = admDptCode,
                    DepartmentCode = dptCode,
                    SubCategoryCode = subCatCode,
                    FromDate = fromDate.ToString(),
                    ToDate = toDate.ToString(),
                    SearchKeyword = Search,
                    CategoryCode = catgoryCode,
                    IsActive = true
                }, false);

                if (objResultData.IsSuccess && objResultData.Data != null && objResultData.Data.Data.Count() > 0)
                {

                    int childRecordLimit = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ChildRecordLimit") ? Convert.ToInt32(model.AdvanceSearchModel["ChildRecordLimit"].ToString()) : 101) : 101;

                    List<Adv_AchievementViewModel> data = objResultData.Data.Data.Where(y => y.IsActive == true && y.IsDeleted == false).ToList();

                    List<DepartmentGroupAchievementListViewModel> objTypeGroupList = data.GroupBy(x => x.DepartmentCode.Value).Select(
                    //item => new DepartmentGroupAchievementListViewModel
                    //{
                    //    Department = item.FirstOrDefault().Department,
                    //    DepartmentHindi = item.FirstOrDefault().DepartmentHindi,
                    //    DepartmentCode = item.FirstOrDefault().DepartmentCode,
                    //    TotalItems = item.Count(),
                    //    Items = childRecordLimit != 101 ? item.OrderByDescending(x => x.AchievementDate).ThenBy(p => p.Priority).Take(childRecordLimit).ToList() : item.OrderByDescending(x => x.AchievementDate).ThenBy(p => p.Priority).ToList()


                    //}).OrderBy(x => x.DepartmentHindi).ToList();
                    item => new DepartmentGroupAchievementListViewModel
                    {
                        Department = item.FirstOrDefault().Department,
                        DepartmentHindi = item.FirstOrDefault().DepartmentHindi,
                        DepartmentCode = item.FirstOrDefault().DepartmentCode,
                        TotalItems = item.Count(),
                        Items = childRecordLimit != 101 ? item.OrderByDescending(x => x.AchievementDate).ThenBy(p => p.Priority).Take(childRecordLimit).ToList() : item.OrderByDescending(x => x.AchievementDate).ThenBy(p => p.Priority).ToList()


                    }).OrderBy(x => x.Items.OrderBy(z => z.Priority).FirstOrDefault().Priority).ToList();



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


                        return SetResultStatus<PagedData<DepartmentGroupAchievementListViewModel>>(null, MessageStatus.NoRecord, false);
                    }


                }
                else if (objResultData.IsSuccess)
                {
                    return SetResultStatus<PagedData<DepartmentGroupAchievementListViewModel>>(null, MessageStatus.NoRecord, true);

                }
                else

                {
                    return SetResultStatus<PagedData<DepartmentGroupAchievementListViewModel>>(null, MessageStatus.InvalidData, false);
                }


            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupByDepartment ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupByDepartment ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementListGroupByDepartment ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<DepartmentGroupAchievementListViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
        }

        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllBySearch(AchievementSearchModel model, bool isBase64File = true)
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                PagedData<Adv_AchievementViewModel> responsedata = new PagedData<Adv_AchievementViewModel>();
                object[] @sp_params = new object[18];
                @sp_params[0] = model.AdmDepartmentCode;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.CategoryCode;
                @sp_params[3] = model.SubCategoryCode;
                @sp_params[4] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToString("MM-dd-yyyy");
                @sp_params[5] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToString("MM-dd-yyyy");
                @sp_params[6] = string.IsNullOrEmpty(model.SearchKeyword) ? string.Empty : model.SearchKeyword;
                @sp_params[7] = model.IsUrlRequired;
                @sp_params[8] = model.IsImageRequired;
                @sp_params[9] = model.IsPdfRequired;
                @sp_params[10] = model.IsActive.HasValue ? model.IsActive : (object)null;
                @sp_params[11] = model.IsVisibleInHome.HasValue ? model.IsVisibleInHome : (object)null;
                @sp_params[12] = model.IsVisibleInFront.HasValue ? model.IsVisibleInFront : (object)null;
                @sp_params[13] = model != null && model.IndexModel != null && model.IndexModel.Page > 0 ? model.IndexModel.Page : 1;
                @sp_params[14] = model != null && model.IndexModel != null && model.IndexModel.PageSize > 0 ? model.IndexModel.PageSize : 101;
                @sp_params[15] = string.IsNullOrEmpty(model.IndexModel.OrderBy) ? string.Empty : model.IndexModel.OrderBy.Trim();
                @sp_params[16] = model.IndexModel.OrderByAsc > 0 ? true : false;
                @sp_params[17] = model.CommonCategoryCode;

                PagedData<sp_AchievementListbySearchFilter_Result> objresult = GenericGridCall<sp_AchievementListbySearchFilter_Result>.SPListView(@sp_params, model.IndexModel.PageSize, x => x.Priority, null, model.IndexModel.Search, model.IndexModel.OrderBy, model.IndexModel.OrderByAsc, model.IndexModel.Page, true, true);

                List<string> ids = objresult.Data.Select(item => item.Id.ToString()).ToList();
                List<tblADV_AchievementAttachments> attachfiles = _uow.GenericRepository<tblADV_AchievementAttachments>().GetAll(filter: x => ids.Contains(x.AchievementId.ToString())).ToList();

                var mapper = new MapperConfiguration(cfg => cfg.CreateMap<sp_AchievementListbySearchFilter_Result, Adv_AchievementViewModel>()
                         .AfterMap((s, d) =>
                         {
                             d.PdfFIleName = (!string.IsNullOrEmpty(s.PdfFIleName) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.PdfFIleName))) : s.PdfFIleName.ToAbsolutePath() : string.Empty);
                             d.ImagePath = (!string.IsNullOrEmpty(s.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.ImagePath))) : s.ImagePath.ToAbsolutePath() : string.Empty);
                             d.ThumbnailPath = (!string.IsNullOrEmpty(s.ImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.ImagePath))) : s.ImagePath.ToThumbnailPath("Thumbnail", "Th_").ToAbsolutePath() : string.Empty);
                             d.AchievementCategoryImagePath = (!string.IsNullOrEmpty(s.AchievementCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.AchievementCategoryImagePath))) : s.AchievementCategoryImagePath.ToAbsolutePath() : string.Empty);
                             d.AchievementSubCategoryImagePath = (!string.IsNullOrEmpty(s.AchievementSubCategoryImagePath) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.AchievementSubCategoryImagePath))) : s.AchievementSubCategoryImagePath.ToAbsolutePath() : string.Empty);
                             d.AchievementDateHindi = (!string.IsNullOrEmpty(Convert.ToString(s.AchievementDate)) ? Convert.ToDateTime(s.AchievementDate.Value).ToHindiDate("dd-MMM-yyyy") : null);
                             d.ImageFiles = attachfiles.Where(x => x.AchievementId == s.Id).Select(x => isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Path)) : x.Path.ToAbsolutePath()).ToList();
                         })
                     )
                     .CreateMapper();
                responsedata.Data = mapper.Map(objresult.Data, responsedata.Data);

                PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(responsedata, model.IndexModel.PageSize, (objresult != null && objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : 0), page: model.IndexModel.Page);

                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Achievement GetAllBySearch ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAllBySearch ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAllBySearch ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
            return objReturn;
        }

        public ServiceResponse<List<RajAdvtSideBarModel>> GetRajAdvtSideBarData(int deptCode, int pageSize)
        {
            ServiceResponse<List<RajAdvtSideBarModel>> objReturn = new ServiceResponse<List<RajAdvtSideBarModel>>();
            try
            {
                List<RajAdvtSideBarModel> responsedata = new List<RajAdvtSideBarModel>();
                List<GetRajAdvtSideBarData_Result> data = _uow.ExeccuteStoreProcedure<GetRajAdvtSideBarData_Result>("GetRajAdvtSideBarData @DeptCode,@PageSize",
                      new SqlParameter("DeptCode", SqlDbType.Int) { Value = deptCode },
                      new SqlParameter("PageSize", SqlDbType.Int) { Value = pageSize }
                    ).ToList();
                var config = new MapperConfiguration(cfg => cfg.CreateMap<GetRajAdvtSideBarData_Result, RajAdvtSideBarModel>()
                  .AfterMap((s, d) =>
                  {
                      d.PdfFIleName = (!string.IsNullOrEmpty(s.PdfFIleName) ? s.PdfFIleName.ToAbsolutePath() : string.Empty);
                      d.ImagePath = (!string.IsNullOrEmpty(s.ImagePath) ? s.ImagePath.ToAbsolutePath() : string.Empty);
                      d.ThumbnailImagePath = (!string.IsNullOrEmpty(s.ImagePath) ? s.ImagePath.ToThumbnailPath().ToAbsolutePath() : string.Empty);
                      d.AchievementDateHindi = (s.AchievementDate.HasValue ? Convert.ToDateTime(s.AchievementDate.Value).ToHindiDate("dd-MMM-yyyy") : null);
                  }));
                IMapper mapper = config.CreateMapper();
                objReturn.Data = mapper.Map(data, responsedata);
                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("AdvAchievementService GetRajAdvtSideBarData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("AdvAchievementService GetRajAdvtSideBarData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("AdvAchievementService GetRajAdvtSideBarData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<List<RajAdvtSideBarModel>>(null, MessageStatus.Error, false, ex.Message);
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

        /// <summary>
        /// Get excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ServiceResponse<string> ExportAchievementData(SearchModel model, int userId = 0)
        {
            try
            {
                ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
                objReturn = GetBySearch(model, userId);
                string data = ExportToExcel(objReturn.Data);
                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportUserData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportUserData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportUserData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Generate excel sheet of users in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        private string ExportToExcel(PagedData<Adv_AchievementViewModel> resulData)
        {
            try
            {
                var _DataTable = new DataTable("exporttable");
                foreach (var cname in resulData.HeaderNames)
                {
                    _DataTable.Columns.Add(cname, typeof(string));
                }
                int counter = 1;
                foreach (var val in resulData.Data)
                {
                    _DataTable.Rows.Add(
                        counter,
                        Convert.ToDateTime(val.AchievementDate).ToString("dd/MM/yyyy"),
                        val.DepartmentHindi,
                        val.AchievementCategoryHindi,
                        val.AchievementSubCategoryHindi,
                        val.Id,
                        val.Achievement,
                        val.DescriptionHindi,
                        val.UserName,
                        Convert.ToDateTime(val.ModifiedDate).ToString("dd/MM/yyyy,hh:mm:ss"),
                        val.IsActive
                      );
                    counter++;
                }
                DataRow newRow = _DataTable.NewRow();

                int index = 0;
                foreach (var cname in resulData.HeaderNames)
                {
                    newRow[index] = cname;
                    ++index;
                }
                _DataTable.Rows.InsertAt(newRow, 0);
                var path = ExportHelper.ExportData("Achievement Report", _DataTable, "Achievement Report", FilePath.GenerateachievementxlsxLocation.GetStringValue());
                var base64 = CommonUtility.GetBase64strFromFilePath(path);
                return base64;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportToExcel ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportToExcel ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportToExcel ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }


        #region Achievement Reports

        /// <summary>
        /// Get achievement summary report of all category.
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<AchievementsCategoryCountReportModel>> GetAchievementsCategoryWiseSummaryReport(DepartmentCategoryReportFilterModel model)
        {
            try
            {
                List<AchievementsCategoryCountReportModel> objReport = new List<AchievementsCategoryCountReportModel>();
                List<sp_JAN_AchievementsCategoryCountReport_Result> spResult = _uow.ExeccuteStoreProcedure<sp_JAN_AchievementsCategoryCountReport_Result>("sp_JAN_AchievementsCategoryCountReport @DepartmentCategoryCode, @EntryToDate, @EntryFromDate,@UserId"
                    , new SqlParameter("DepartmentCategoryCode", SqlDbType.Int) { Value = model.DepartmentCategoryCode > 0 ? model.DepartmentCategoryCode : 0 }
                    , new SqlParameter("EntryToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryToDate) ? string.Empty : model.EntryToDate }
                   , new SqlParameter("EntryFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryFromDate) ? string.Empty : model.EntryFromDate }
                   , new SqlParameter("UserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }
                ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_AchievementsCategoryCountReport_Result, AchievementsCategoryCountReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(spResult, objReport);

                return SetResultStatus(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<AchievementsCategoryCountReportModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Front Portal

        /// <summary>
        /// get achievement attachments by department code and category code
        /// </summary>
        /// <param name="dptCode"></param>
        /// <param name="categoryCode"></param>
        /// <created by>Tanmaya</created>
        /// <returns></returns>
        public ServiceResponse<AchievementAttachmentModel> GetAchievementAttachmentsByDepartmentCode(int dptCode, int categoryCode, long subCatCode = 0)
        {
            AchievementAttachmentModel objResult = new AchievementAttachmentModel();
            try
            {
                List<vwADV_AchievementAttachments> objAchv = _uow.GenericRepository<vwADV_AchievementAttachments>().GetAll(filter: x => x.DepartmentCode == dptCode && x.CategoryCode == categoryCode && (subCatCode > 0 ? x.AchievementSubCategoryCode == subCatCode : true)).ToList();

                if (objAchv != null)
                {
                    objResult.ImageFiles = objAchv.Select(x => !string.IsNullOrEmpty(x.Path) ? x.Path.ToAbsolutePath() : string.Empty).ToList();
                    return SetResultStatus(objResult, MessageStatus.Success, true);
                }
                else
                {
                    return SetResultStatus<AchievementAttachmentModel>(null, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Achievement GetAchievementAttachmentsByDepartmentCode ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementAttachmentsByDepartmentCode ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Achievement GetAchievementAttachmentsByDepartmentCode ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<AchievementAttachmentModel>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
        }


        #endregion

    }
}
