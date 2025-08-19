using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class ProjectMasterService : BaseService, IProjectMasterService
    {
        #region Variable

        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        private readonly GetAllDropDownList _ddlObj;

        #endregion

        #region Constructor

        public ProjectMasterService(IUnitofWork uow, UserManagementService userManagementService, GetAllDropDownList ddlObj)
        {
            _uow = uow;
            _userManagementService = userManagementService;
            _ddlObj = ddlObj;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all record of project master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<ProjectMasterViewModel>> GetAll(ProjectReportFilterModel model, int subSubCatCode)
         {
            try
            {
                PagedData<ProjectMasterViewModel> responseList = new PagedData<ProjectMasterViewModel>();
                CreateLogHelper.CreateLogFile("project master GetAll DateTime/ssoid  :" + DateTime.Now + " /" + _loginUserDetail.SSOID + " \n");
                //var usertype = UserTypeEnum.DPTS.GetStringValue();
                //string[] mLACodes = null; string[] districtCodes = null; string[] projectSchemeCode = null;

                //List<SelectListItem> dep = _ddlObj.GetLoginUserDepartmentList();
                //List<int> depIds = dep.Select(x => Convert.ToInt32(x.Value)).ToList();

                //if (!string.IsNullOrEmpty(model.MLACode))
                //{
                //    mLACodes = model.MLACode.Split(',');
                //}
                //if (!string.IsNullOrEmpty(model.DistrictCode))
                //{
                //    districtCodes = model.DistrictCode.Split(',');
                //}
                //if (!string.IsNullOrEmpty(model.ProjectSchemeCode))
                //{
                //    projectSchemeCode = model.ProjectSchemeCode.Split(',');
                //}

                //PagedData<vwJAN_PROJ_ProjectMaster> objList = GenericGridCall<vwJAN_PROJ_ProjectMaster>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false && (subSubCatCode == 0 ? x.SubSubCategoryCode == null || x.SubSubCategoryCode < 1 : x.SubSubCategoryCode == x.SubSubCategoryCode) && (_loginUserDetail.UserType == usertype ? x.CreatedBy == _loginUserDetail.UserId : depIds.Contains(x.NodalDepartmentCode))
                //&& (!string.IsNullOrEmpty(model.FromDate) ? Convert.ToDateTime(x.ModifiedDate).Date >= Convert.ToDateTime(model.FromDate).Date : true)
                //&& (!string.IsNullOrEmpty(model.ToDate) ? Convert.ToDateTime(x.ModifiedDate).Date <= Convert.ToDateTime(model.ToDate).Date : true)
                //&& (model.NodalDepartmentCode > 0 ? x.NodalDepartmentCode == model.NodalDepartmentCode : true)
                //&& (model.CategoryCode > 0 ? x.ProjectCategoryCode == model.CategoryCode : true)
                //&& (model.SubCategoryCode > 0 ? x.ProjectSubCategoryCode == model.SubCategoryCode : true)
                //&& (model.SubSubCategoryCode > 0 ? x.SubSubCategoryCode == model.SubSubCategoryCode : true)
                //&& (model.Id > 0 ? x.Id == model.Id : true)
                //&& (model.ProjectStatusCode > 0 ? x.ProjectStatusCode == model.ProjectStatusCode : true)
                //&& (!string.IsNullOrEmpty(model.MLACode) ?(!string.IsNullOrEmpty(x.MLAConstituencyCode)? (model.MLACode.Where(m => x.MLAConstituencyCode.Contains(m)).ToList().Count>0) :false) : true)
                ////&& (!string.IsNullOrEmpty(model.DistrictCode) ? districtCodes.Contains(x.DistrictCodes.ToString()) : true)
                //&& (!string.IsNullOrEmpty(model.DistrictCode) ? (!string.IsNullOrEmpty(x.DistrictCodes) ? (model.DistrictCode.Where(m => x.DistrictCodes.Contains(m)).ToList().Count > 0) : false) : true)

                //&& (!string.IsNullOrEmpty(model.ProjectSchemeCode) ? projectSchemeCode.Contains(x.ProjectSchemeCode.ToString()) : true)
                //&& (model.CreatedBy > 0 ? x.CreatedBy == model.CreatedBy : true)
                //&& (!string.IsNullOrEmpty(Convert.ToString(model.IsShilanyas)) ? x.IsShilanyas == model.IsShilanyas : x.IsShilanyas == false)
                //, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                //CreateLogHelper.CreateLogFile("project master GetAll objList.Count/DateTime :" + objList.Data.Count() + "/" + DateTime.Now + " \n");

                object[] @sp_params = new object[22];
                @sp_params[0] = model.MLACode;
                @sp_params[1] = model.DistrictCode;
                @sp_params[2] = model.NodalDepartmentCode;
                @sp_params[3] = model.SubCategoryCode;
                @sp_params[4] = model.CategoryCode;
                @sp_params[5] = model.SubSubCategoryCode;
                @sp_params[6] = model.ToDate;
                @sp_params[7] = model.FromDate;
                @sp_params[8] = model.Status;
                @sp_params[9] = model.ProjectStatusCode;
                @sp_params[10] = model.ProjectSchemeCode;
                @sp_params[11] = model.IsShilanyas;
                @sp_params[12] = subSubCatCode;

                @sp_params[13] = model.CreatedBy;
                @sp_params[14] = model.Page;
                @sp_params[15] = model.PageSize;
                @sp_params[16] = string.IsNullOrEmpty(model.OrderBy) ? "ModifiedDate" : model.OrderBy.Trim();
                @sp_params[17] = model.OrderByAsc > 0 ? true : false;
                @sp_params[18] = model.Id;
                @sp_params[19] = _loginUserDetail.UserId;
                @sp_params[20] = model.AdmDepartmentCode;
                @sp_params[21] = model.IsShowDataWithProgress;

                PagedData<SP_JAN_PROJ_GetProjectMasterList_Result> objList = GenericGridCall<SP_JAN_PROJ_GetProjectMasterList_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.ModifiedDate, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_GetProjectMasterList_Result, ProjectMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("project master GetAll responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<ProjectMasterViewModel>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().TotalRecords : 0), page: model.Page);


                //PagedData<ProjectMasterViewModel>.ReturnCustomizeData(responseList, model.PageSize, objList.TotalRecords);

                return SetResultStatus(responseList, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master All ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master All ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master All ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<ProjectMasterViewModel>>(null, MessageStatus.Error, false);
            }

        }
        /// <summary>
        /// Get record by id of project master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ProjectMasterModel>> GetById(long id)
        {
            try
            {
                ProjectMasterModel result = new ProjectMasterModel();
                tblJAN_PROJ_ProjectMaster objData = await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().GetByIdAsync(id);
                if (objData != null)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_PROJ_ProjectMaster, ProjectMasterModel>();
                    });
                    IMapper mapper = config.CreateMapper();
                    result = mapper.Map(objData, result);

                    // Budget Data
                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_PROJ_ProjectBudget_Parameter, ProjectBudgetParameterModel>()
                         .ForMember(des => des.BudgetResult, src => src.MapFrom(x => new ProjectBudgetParameterResultModel()))
                          .AfterMap((s, des) =>
                           {
                               des.BudgetResult.prj_year = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().Year) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().Year : string.Empty;

                               des.BudgetResult.pm_projecthdrid = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().Projecthdrid) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().Projecthdrid : string.Empty;

                               des.BudgetResult.filenumber = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().FileNumber) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().FileNumber : string.Empty;

                               des.BudgetResult.modulename = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().ModuleName) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().ModuleName : string.Empty;

                               des.BudgetResult.prj_description = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().Description) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().Description : string.Empty;

                               des.BudgetResult.prj_ndept = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().DepartmentName) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().DepartmentName : string.Empty;

                               des.BudgetResult.prj_dept = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().DepartmentId) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().DepartmentId : string.Empty;

                               des.BudgetResult.parano = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().ParaNo) ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().ParaNo : string.Empty;

                               des.BudgetResult.CMISNewTransCoreId = s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault() != null && s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().CMISNewTransCoreId>0 ? s.tblJAN_PROJ_ProjectBudget_Result.FirstOrDefault().CMISNewTransCoreId : 0;
                           });
                    });
                    mapper = config.CreateMapper();
                    result.ProjectBudgetParameter = mapper.Map(objData.tblJAN_PROJ_ProjectBudget_Parameter, result.ProjectBudgetParameter);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_PROJ_ProjectMasterProjectsMapping, ProjectMasterProjectsMappingModel>()
                         .ForMember(des => des.MLAConstituencyList, src => src.MapFrom(x => x.tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping.Select(z => z.MLAConstituencyCode).ToList()))
                          .ForMember(des => des.DistrictCodes, src => src.MapFrom(x => x.tblJAN_PROJ_ProjectMasterProjectsMappingDistrict.Select(z => z.DistrictCode).ToList()))
                         .ForMember(des => des.BlockPSList, src => src.MapFrom(x => x.tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping.Select(z => z.BlockCode).ToList()))
                         .ForMember(des => des.GramPanchayatList, src => src.MapFrom(x => x.tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping.Select(z => z.GramPanchayatCode).ToList()))
                         .ForMember(des => des.VillageList, src => src.MapFrom(x => x.tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping.Select(z => z.VillageCode).ToList()))
                         .ForMember(des => des.Attachments, src => src.MapFrom(x => x.tblJAN_PROJ_ProjectMasterProjectsMappingAttachments.ToList()
                    .Select(item => new DocumentUrlModel
                    {
                        Extension = item.Attachment.Split('.') != null && item.Attachment.Split('.').Length > 1 ? item.Attachment.Split('.')[1] : string.Empty,
                        Url = !Convert.ToString(item.Attachment).CheckFileExist() ? string.Empty : CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item.Attachment.Trim()))
                    }).ToList()));
                    });
                    mapper = config.CreateMapper();
                    result.ProjectMappingList = mapper.Map(objData.tblJAN_PROJ_ProjectMasterProjectsMapping.ToList(), result.ProjectMappingList);
                }
                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<ProjectMasterModel>(null, MessageStatus.Error, false);
            }

        }

        public ServiceResponse<DepartmentMasterModel> GetDistrictAndAssemblyDepartment(long dptCode)
        {
            ServiceResponse<DepartmentMasterModel> objReturn = new ServiceResponse<DepartmentMasterModel>();
            try
            {
                tblDepartmentMaster resultData = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == dptCode).FirstOrDefault();

                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDepartmentMaster, DepartmentMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblDepartmentMaster, DepartmentMasterModel>(resultData);
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


        /// <summary>
		/// This for create new record in project master.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ProjectMasterModel model, bool isService = false)
        {
            try
            {
                //  List<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments> attachments = new List<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments>();
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ProjectMasterModel, tblJAN_PROJ_ProjectMaster>();
                });
                tblJAN_PROJ_ProjectMaster obj = Mapper.Map<ProjectMasterModel, tblJAN_PROJ_ProjectMaster>(model);
                obj.CreatedDate = DateTime.Now;
                obj.ModifiedDate = DateTime.Now;
                if (!isService)
                {
                    obj.CreatedBy = _loginUserDetail.UserId;
                    obj.ModifiedBy = _loginUserDetail.UserId;
                }

                await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().AddAsync(obj);
                _uow.save();

                obj.Code = obj.Id;
                await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().UpdateAsync(obj);

                // Add child records
                if (model.ProjectMappingList != null && model.ProjectMappingList.Count > 0)
                {
                    foreach (var item in model.ProjectMappingList)
                    {
                        if (!string.IsNullOrEmpty(item.LabelName) || item.Cost > 0)
                        {
                            tblJAN_PROJ_ProjectMasterProjectsMapping objMod = new tblJAN_PROJ_ProjectMasterProjectsMapping();
                            objMod.LabelName = item.LabelName;
                            objMod.Cost = item.Cost;
                            objMod.ProjectMasterId = obj.Id;
                            objMod.AreaCovered = item.AreaCovered;
                            objMod.MPConstituency = item.MPConstituency;
                            objMod.UrbanOrRural = item.UrbanOrRural;
                            objMod.IsPartofMLALAD = item.IsPartofMLALAD;
                            objMod.ProjectWorkCategory = item.ProjectWorkCategory;
                            objMod.Description = item.Description;
                            objMod.BlockText = item.BlockText;
                            objMod.WardNo = item.WardNo;
                            await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMapping>().AddAsync(objMod);
                            _uow.save();
                            foreach (var url in item.Attachments)
                            {
                                tblJAN_PROJ_ProjectMasterProjectsMappingAttachments objAttachment = new tblJAN_PROJ_ProjectMasterProjectsMappingAttachments();
                                if (!string.IsNullOrEmpty(url.Url))
                                {
                                    var isValid = CommonUtility.IsAllowedMimeType(url.Url, true, _loginUserDetail.FileSize);
                                    var isValidImage = CommonUtility.IsAllowedMimeType(url.Url, false, _loginUserDetail.FileSize);
                                    if (isValid.IsSuccess || isValidImage.IsSuccess)
                                    {
                                        objAttachment.ProjectsMappingId = objMod.Id;
                                        objAttachment.Attachment = CommonUtility.GenerateProjectMasterFolderAndName(url.Url, obj.Id);
                                        // attachments.Add(objAttachment);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments>().AddAsync(objAttachment);
                                    }
                                    else
                                    {
                                        return isValid;
                                    }
                                }
                            }
                            if (item.DistrictCodes != null && item.DistrictCodes.Count > 0)
                            {
                                foreach (var district in item.DistrictCodes)
                                {
                                    if (!string.IsNullOrEmpty(district))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingDistrict objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingDistrict();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.DistrictCode = Convert.ToInt32(district);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingDistrict>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.MLAConstituencyList != null && item.MLAConstituencyList.Count > 0)
                            {
                                foreach (var mLA in item.MLAConstituencyList)
                                {
                                    if (!string.IsNullOrEmpty(mLA))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.MLAConstituencyCode = Convert.ToInt32(mLA);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.BlockPSList != null && item.BlockPSList.Count > 0)
                            {
                                foreach (var block in item.BlockPSList)
                                {
                                    if (!string.IsNullOrEmpty(block))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.BlockCode = Convert.ToInt32(block);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.GramPanchayatList != null && item.GramPanchayatList.Count > 0)
                            {
                                foreach (var gramPanchayat in item.GramPanchayatList)
                                {
                                    if (!string.IsNullOrEmpty(gramPanchayat))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.GramPanchayatCode = Convert.ToInt32(gramPanchayat);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.VillageList != null && item.VillageList.Count > 0)
                            {
                                foreach (var village in item.VillageList)
                                {
                                    if (!string.IsNullOrEmpty(village))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.VillageCode = Convert.ToInt32(village);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            //  objMod.tblJAN_PROJ_ProjectMasterProjectsMappingAttachments = attachments;


                        }
                    }
                }

                // Add Budget
                if (model.ProjectBudgetParameter != null && model.ProjectBudgetParameter.Count > 0)
                {
                    foreach (var item in model.ProjectBudgetParameter)
                    {
                        {
                            //related To result model Acc. to related to parameters
                            if (item.BudgetResult != null && (!string.IsNullOrEmpty(item.BudgetResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.BudgetResult.parano) || !string.IsNullOrEmpty(item.BudgetResult.prj_dept) || !string.IsNullOrEmpty(item.BudgetResult.prj_description) || !string.IsNullOrEmpty(item.BudgetResult.prj_ndept) || !string.IsNullOrEmpty(item.BudgetResult.prj_year)))
                            {
                                tblJAN_PROJ_ProjectBudget_Parameter objParameter = new tblJAN_PROJ_ProjectBudget_Parameter();
                                objParameter.ModuleId = item.ModuleId;
                                objParameter.ModuleName = item.ModuleName;
                                objParameter.ProjectMasterId = obj.Id;
                                objParameter.YearValue = item.YearValue;
                                objParameter.YearText = item.YearText;
                                objParameter.DepartmentId = item.DepartmentId;
                                objParameter.DepartmentName = item.DepartmentName;
                                await _uow.GenericRepository<tblJAN_PROJ_ProjectBudget_Parameter>().AddAsync(objParameter);
                                _uow.save();

                                tblJAN_PROJ_ProjectBudget_Result objchild = new tblJAN_PROJ_ProjectBudget_Result();
                                objchild.ModuleName = item.BudgetResult.modulename;
                                objchild.ParaNo = item.BudgetResult.parano;
                                objchild.Projecthdrid = item.BudgetResult.pm_projecthdrid;
                                objchild.BudgetParameterID = objParameter.Id;
                                objchild.DepartmentId = item.BudgetResult.prj_dept;
                                objchild.DepartmentName = item.BudgetResult.prj_ndept;
                                objchild.FileNumber = item.BudgetResult.filenumber;
                                objchild.Description = item.BudgetResult.prj_description;
                                objchild.Year = item.BudgetResult.prj_year;
                                objchild.CMISNewTransCoreId = item.BudgetResult.CMISNewTransCoreId;
                                await _uow.GenericRepository<tblJAN_PROJ_ProjectBudget_Result>().AddAsync(objchild);
                            }
                        }
                    }
                }

                _uow.save();

                return SetResultStatus(obj.Id.ToString(), MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// this is for edit the record of project master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ProjectMasterModel model, bool isService = false)
        {
            try
            {
                tblJAN_PROJ_ProjectMaster obj = await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().GetByIdAsync(model.Id);
                // List<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments> attachments = new List<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments>();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ProjectMasterModel, tblJAN_PROJ_ProjectMaster>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
                if (!isService)
                {
                    obj.ModifiedBy = _loginUserDetail.UserId;
                }
                await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().UpdateAsync(obj);

                //Delete old records
                if (obj.tblJAN_PROJ_ProjectMasterProjectsMapping.Count() > 0)
                {
                    foreach (var item in obj.tblJAN_PROJ_ProjectMasterProjectsMapping)
                    {
                        foreach (var url in item.tblJAN_PROJ_ProjectMasterProjectsMappingAttachments)
                        {
                            CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(url.Attachment));
                        }
                        _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments>().DeleteAllById(item.tblJAN_PROJ_ProjectMasterProjectsMappingAttachments.ToList());
                        _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping>().DeleteAllById(item.tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping.ToList());
                        _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingDistrict>().DeleteAllById(item.tblJAN_PROJ_ProjectMasterProjectsMappingDistrict.ToList());
                        _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping>().DeleteAllById(item.tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping.ToList());
                        _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping>().DeleteAllById(item.tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping.ToList());
                        _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping>().DeleteAllById(item.tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping.ToList());
                    }
                    _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMapping>().DeleteAllById(obj.tblJAN_PROJ_ProjectMasterProjectsMapping.ToList());
                }
                //Delete existing Budget
                if (obj.tblJAN_PROJ_ProjectBudget_Parameter.Count > 0)
                {
                    foreach (var item in obj.tblJAN_PROJ_ProjectBudget_Parameter)
                    {
                        if (item.tblJAN_PROJ_ProjectBudget_Result.Count > 0)
                        {
                            _uow.GenericRepository<tblJAN_PROJ_ProjectBudget_Result>().DeleteAllById(item.tblJAN_PROJ_ProjectBudget_Result.ToList());
                        }

                    }
                    _uow.GenericRepository<tblJAN_PROJ_ProjectBudget_Parameter>().DeleteAllById(obj.tblJAN_PROJ_ProjectBudget_Parameter.ToList());
                }

                // Add child records
                if (model.ProjectMappingList != null && model.ProjectMappingList.Count > 0)
                {
                    foreach (var item in model.ProjectMappingList)
                    {
                        if (!string.IsNullOrEmpty(item.LabelName) || item.Cost > 0)
                        {
                            tblJAN_PROJ_ProjectMasterProjectsMapping objMod = new tblJAN_PROJ_ProjectMasterProjectsMapping();
                            objMod.LabelName = item.LabelName;
                            objMod.Cost = item.Cost;
                            objMod.ProjectMasterId = obj.Id;
                            objMod.AreaCovered = item.AreaCovered;
                            objMod.MPConstituency = item.MPConstituency;
                            objMod.UrbanOrRural = item.UrbanOrRural;
                            objMod.IsPartofMLALAD = item.IsPartofMLALAD;
                            objMod.ProjectWorkCategory = item.ProjectWorkCategory;
                            objMod.Description = item.Description;
                            objMod.WardNo = item.WardNo;
                            objMod.BlockText = item.BlockText;
                            await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMapping>().AddAsync(objMod);
                            _uow.save();
                            foreach (var url in item.Attachments)
                            {
                                tblJAN_PROJ_ProjectMasterProjectsMappingAttachments objAttachment = new tblJAN_PROJ_ProjectMasterProjectsMappingAttachments();
                                if (!string.IsNullOrEmpty(url.Url))
                                {
                                    var isValid = CommonUtility.IsAllowedMimeType(url.Url, true, _loginUserDetail.FileSize);
                                    var isValidImage = CommonUtility.IsAllowedMimeType(url.Url, false, _loginUserDetail.FileSize);
                                    if (isValid.IsSuccess || isValidImage.IsSuccess)
                                    {
                                        objAttachment.ProjectsMappingId = objMod.Id;
                                        objAttachment.Attachment = CommonUtility.GenerateProjectMasterFolderAndName(url.Url, obj.Id);
                                        //attachments.Add(objAttachment);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments>().AddAsync(objAttachment);
                                    }
                                    else
                                    {
                                        return isValid;
                                    }
                                }
                            }
                            if (item.MLAConstituencyList != null && item.MLAConstituencyList.Count > 0)
                            {
                                foreach (var mLA in item.MLAConstituencyList)
                                {
                                    if (!string.IsNullOrEmpty(mLA))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.MLAConstituencyCode = Convert.ToInt32(mLA);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingMLAMapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.DistrictCodes != null && item.DistrictCodes.Count > 0)
                            {
                                foreach (var district in item.DistrictCodes)
                                {
                                    if (!string.IsNullOrEmpty(district))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingDistrict objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingDistrict();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.DistrictCode = Convert.ToInt32(district);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingDistrict>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.BlockPSList != null && item.BlockPSList.Count > 0)
                            {
                                foreach (var block in item.BlockPSList)
                                {
                                    if (!string.IsNullOrEmpty(block))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.BlockCode = Convert.ToInt32(block);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingBlock_PS_Mapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.GramPanchayatList != null && item.GramPanchayatList.Count > 0)
                            {
                                foreach (var gramPanchayat in item.GramPanchayatList)
                                {
                                    if (!string.IsNullOrEmpty(gramPanchayat))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.GramPanchayatCode = Convert.ToInt32(gramPanchayat);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingGramPanchayatMapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            if (item.VillageList != null && item.VillageList.Count > 0)
                            {
                                foreach (var village in item.VillageList)
                                {
                                    if (!string.IsNullOrEmpty(village))
                                    {
                                        tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping objChild = new tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping();
                                        objChild.ProjectsMappingId = objMod.Id;
                                        objChild.VillageCode = Convert.ToInt32(village);
                                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingVillageMapping>().AddAsync(objChild);
                                    }
                                }
                            }
                            //objMod.tblJAN_PROJ_ProjectMasterProjectsMappingAttachments = attachments;

                        }
                    }
                }
                // Add Budget
                if (model.ProjectBudgetParameter != null && model.ProjectBudgetParameter.Count > 0)
                {
                    foreach (var item in model.ProjectBudgetParameter)
                    {
                        {
                            //related To result model Acc. to related to parameters
                            if (item.BudgetResult != null && (!string.IsNullOrEmpty(item.BudgetResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.BudgetResult.parano) || !string.IsNullOrEmpty(item.BudgetResult.prj_dept) || !string.IsNullOrEmpty(item.BudgetResult.prj_description) || !string.IsNullOrEmpty(item.BudgetResult.prj_ndept) || !string.IsNullOrEmpty(item.BudgetResult.prj_year)))
                            {
                                tblJAN_PROJ_ProjectBudget_Parameter objParameter = new tblJAN_PROJ_ProjectBudget_Parameter();
                                objParameter.ModuleId = item.ModuleId;
                                objParameter.ModuleName = item.ModuleName;
                                objParameter.ProjectMasterId = obj.Id;
                                objParameter.YearValue = item.YearValue;
                                objParameter.YearText = item.YearText;
                                objParameter.DepartmentId = item.DepartmentId;
                                objParameter.DepartmentName = item.DepartmentName;
                                await _uow.GenericRepository<tblJAN_PROJ_ProjectBudget_Parameter>().AddAsync(objParameter);
                                _uow.save();

                                tblJAN_PROJ_ProjectBudget_Result objchild = new tblJAN_PROJ_ProjectBudget_Result();
                                objchild.ModuleName = item.BudgetResult.modulename;
                                objchild.ParaNo = item.BudgetResult.parano;
                                objchild.Projecthdrid = item.BudgetResult.pm_projecthdrid;
                                objchild.BudgetParameterID = objParameter.Id;
                                objchild.DepartmentId = item.BudgetResult.prj_dept;
                                objchild.DepartmentName = item.BudgetResult.prj_ndept;
                                objchild.FileNumber = item.BudgetResult.filenumber;
                                objchild.Description = item.BudgetResult.prj_description;
                                objchild.Year = item.BudgetResult.prj_year;
                                objchild.CMISNewTransCoreId = item.BudgetResult.CMISNewTransCoreId;
                                await _uow.GenericRepository<tblJAN_PROJ_ProjectBudget_Result>().AddAsync(objchild);
                            }
                        }
                    }
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
		/// For toggle the status of specific record.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblJAN_PROJ_ProjectMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().UpdateAsync(objResult);
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
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> DeleteProjectBySuperAdmin(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            var userSADM = UserTypeEnum.SADM.GetStringValue();
            try
            {
                if (_loginUserDetail.UserType == userSADM)
                {
                    if (id > 0)
                    {
                        tblJAN_PROJ_ProjectMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().GetByIdAsync(id);
                        if (objResult != null)
                        {
                            objResult.IsDeleted = true;
                            await _uow.GenericRepository<tblJAN_PROJ_ProjectMaster>().UpdateAsync(objResult);
                            _uow.save();
                            objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Delete, true);
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
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.UnthothorizedForActivity, false);
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
        /// Project detail with progress
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectDetailsWithProgressAndChildTableDataModel> GetProjectDetailsWithProgressAndChildData(int id, bool isBase64File=true)
        {
            try
            {
                ProjectDetailsWithProgressAndChildTableDataModel responsedata = new ProjectDetailsWithProgressAndChildTableDataModel();


                SP_JAN_PROJ_ProjectDetailsWithProgressAndChildTableData_Result projData = new SP_JAN_PROJ_ProjectDetailsWithProgressAndChildTableData_Result();
                SP_JAN_PROJ_ProjectMasterProjectsMapping_Result mappingData = new SP_JAN_PROJ_ProjectMasterProjectsMapping_Result();
                List<SP_JAN_PROJ_ProjectBudget_Parameter_Result> budgetData = new List<SP_JAN_PROJ_ProjectBudget_Parameter_Result>();
                List<SP_JAN_PROJ_UpdateProgressMapping_Result> progressData = new List<SP_JAN_PROJ_UpdateProgressMapping_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("ProjectId", id > 0 ? id : 0));

                ObjectResult<SP_JAN_PROJ_ProjectDetailsWithProgressAndChildTableData_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<SP_JAN_PROJ_ProjectDetailsWithProgressAndChildTableData_Result>("SP_JAN_PROJ_ProjectDetailsWithProgressAndChildTableData", spParams.ToArray());

                projData = spResult.FirstOrDefault();

                ObjectResult<SP_JAN_PROJ_ProjectMasterProjectsMapping_Result> mappingDataResult = spResult.GetNextResult<SP_JAN_PROJ_ProjectMasterProjectsMapping_Result>();
                mappingData = mappingDataResult.FirstOrDefault();

                ObjectResult<SP_JAN_PROJ_ProjectBudget_Parameter_Result> budgetDataResult = mappingDataResult.GetNextResult<SP_JAN_PROJ_ProjectBudget_Parameter_Result>();
                budgetData.AddRange(budgetDataResult.ToList());

                ObjectResult<SP_JAN_PROJ_UpdateProgressMapping_Result> progressDataResult = budgetDataResult.GetNextResult<SP_JAN_PROJ_UpdateProgressMapping_Result>();
                progressData.AddRange(progressDataResult.ToList());

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectDetailsWithProgressAndChildTableData_Result, ProjectDetailsWithProgressAndChildTableDataModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata = mapper.Map(projData, responsedata);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectMasterProjectsMapping_Result, ProjectsMappingModel>()
                    .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(img => isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(img))) : img.ToAbsolutePath()).ToList()) : null)); 
                });
                mapper = config.CreateMapper();
                responsedata.ProjectsMappingData = mapper.Map(mappingData, responsedata.ProjectsMappingData);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectBudget_Parameter_Result, BudgetParameterModel>();
                });
                mapper = config.CreateMapper();
                responsedata.BudgetParameterList = mapper.Map(budgetData, responsedata.BudgetParameterList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_UpdateProgressMapping_Result, UpdateProgressMappingModel>()
                     .ForMember(des => des.PDF, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PDF) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PDF))) : mdlSrc.PDF.ToAbsolutePath() : string.Empty))
                    .ForMember(des => des.Attachments, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.Attachments) ? (mdlSrc.Attachments.Split(',').Select(img => isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(img))) : img.ToAbsolutePath()).ToList()) : null)); 
                });
                mapper = config.CreateMapper();
                responsedata.UpdateProgressMappingList = mapper.Map(progressData, responsedata.UpdateProgressMappingList);

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetProjectDetailsWithProgressAndChildData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetProjectDetailsWithProgressAndChildData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetProjectDetailsWithProgressAndChildData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<ProjectDetailsWithProgressAndChildTableDataModel>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
               
            }
        }


        #endregion

        #region Front

        public ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>> GetAllListByFilter(ProjectSearchModel model, bool isAllRecords = false, bool isBase64File = true)

        {
            ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>> objReturn = new ServiceResponse<PagedData<ProjectMasterListByFilterNewModel>>();
            try
            {
                PagedData<ProjectMasterListByFilterNewModel> responsedata = new PagedData<ProjectMasterListByFilterNewModel>();
                object[] @sp_params = new object[20];
                @sp_params[0] = model.AdmDepartmentCode;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.MPConstituencyCode;
                @sp_params[4] = model.MLAConstituencyCode;
                @sp_params[5] = model.StatusCode;
                @sp_params[6] = model.StartYearCode;
                @sp_params[7] = model.SectorCode;
                @sp_params[8] = model.CategoryCode;
                @sp_params[9] = model.SubCategoryCode;
                @sp_params[10] = model.WorkTypeCode;
                //@sp_params[11] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate;
                @sp_params[11] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToString("MM-dd-yyyy");
                @sp_params[12] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToString("MM-dd-yyyy");
               
                @sp_params[13] = model.IsActive.HasValue ? model.IsActive : (object)null;
                @sp_params[14] = string.IsNullOrEmpty(model.KeywordSearch) ? string.Empty : model.KeywordSearch;
                @sp_params[15] = isAllRecords ? 1 : model != null && model.IndexModel != null && model.IndexModel.Page > 0 ? model.IndexModel.Page : 1;
                @sp_params[16] = isAllRecords ? 101 : model != null && model.IndexModel != null && model.IndexModel.PageSize > 0 ? model.IndexModel.PageSize : 101;
                @sp_params[17] = string.IsNullOrEmpty(model.IndexModel.OrderBy) ? string.Empty : model.IndexModel.OrderBy.Trim();
                @sp_params[18] = model.IndexModel.OrderByAsc > 0 ? true : false;
                @sp_params[19] = model.DistrictDepartmentCode;

                PagedData<sp_PROJ_GetProjectMasterListByFilter_Result> objresult = GenericGridCall<sp_PROJ_GetProjectMasterListByFilter_Result>.SPListView(@sp_params, model.IndexModel.PageSize, x => !string.IsNullOrEmpty(model.IndexModel.OrderBy) ? null : x.ProjectSchemeName, null, model.IndexModel.Search, model.IndexModel.OrderBy, model.IndexModel.OrderByAsc, model.IndexModel.Page, true, true);


                var mapper = new MapperConfiguration(cfg => cfg.CreateMap<sp_PROJ_GetProjectMasterListByFilter_Result, ProjectMasterListByFilterNewModel>()

                     ).CreateMapper();
                responsedata.Data = mapper.Map(objresult.Data, responsedata.Data);


                PagedData<ProjectMasterListByFilterNewModel>.ReturnCustomizeData(responsedata, isAllRecords ? 101 : model.IndexModel.PageSize, (objresult != null && objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : 0), page: model.IndexModel.Page);



                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<ProjectMasterListByFilterNewModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        public ServiceResponse<ProjectMasterFrontViewModel> GetFrontDetailById(long id, bool IsBase64File = false)
        {
            try
            {
                ProjectMasterFrontViewModel result = new ProjectMasterFrontViewModel();
                vw_Jan_Front_ProjectMaster masterData = _uow.GenericRepository<vw_Jan_Front_ProjectMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (masterData != null)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vw_Jan_Front_ProjectMaster, ProjectMasterFrontViewModel>();
                    });
                    IMapper mapper = config.CreateMapper();
                    result = mapper.Map(masterData, result);

                    List<vw_Jan_Front_ProjectMasterProjectsMapping> childData = _uow.GenericRepository<vw_Jan_Front_ProjectMasterProjectsMapping>().GetAll(filter: x => x.ProjectMasterId == masterData.Id).ToList();
                    IMapper childMapper = new MapperConfiguration(cfg =>
                     {
                         cfg.CreateMap<vw_Jan_Front_ProjectMasterProjectsMapping, ProjectMasterProjectsMappingViewModel>()
                         //.ForMember(des => des.PDFURL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PDFURL) ? IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PDFURL))) : x.PDFURL.ToAbsolutePath() : string.Empty))
                         .AfterMap((s, d) =>
                         {
                             d.PDFURL = !string.IsNullOrEmpty(s.PDFURL) ? IsBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(s.PDFURL))) : s.PDFURL.ToAbsolutePath() : string.Empty;
                             d.Attachements = _uow.GenericRepository<tblJAN_PROJ_ProjectMasterProjectsMappingAttachments>().GetAll(filter: y => y.ProjectsMappingId.Value == s.Id).Select(item => item.Attachment.ToAbsolutePath()).ToList();
                         });


                     }).CreateMapper();

                    result.ProjectMappingItems = childMapper.Map(childData.ToList(), result.ProjectMappingItems);



                    return SetResultStatus(result, MessageStatus.Success, true);

                }
                else
                {

                    return SetResultStatus<ProjectMasterFrontViewModel>(null, MessageStatus.NotExist, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus<ProjectMasterFrontViewModel>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }

        }
        #endregion

        #region Update Progress

        /// <summary>
        /// Update Progress for particular project at a time.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateProgress(ProjectUpdateProgressMappingModel model)
        {
            try
            {
                List<tblJAN_PROJ_UpdateProgressAttachmentMapping> objAttachment = new List<tblJAN_PROJ_UpdateProgressAttachmentMapping>();
                //Add progress
                if (model.MileStoneCode > 0 || model.StatusCode > 0)
                {
                    tblJAN_PROJ_UpdateProgressMapping objProgress = new tblJAN_PROJ_UpdateProgressMapping();
                    objProgress.MileStoneCode = model.MileStoneCode;
                    objProgress.ProjectId = model.ProjectId;
                    objProgress.StatusCode = model.StatusCode;
                    objProgress.Date = model.Date;
                    objProgress.Description = model.Description;
                    objProgress.MilestoneLabel = model.MilestoneLabel;
                    //Add attachment
                    if (model.Images != null && model.Images.Count > 0)
                    {
                        foreach (var childItem in model.Images)
                        {
                            if (!string.IsNullOrEmpty(childItem))
                            {
                                tblJAN_PROJ_UpdateProgressAttachmentMapping attachItem = new tblJAN_PROJ_UpdateProgressAttachmentMapping();
                                var isValid = CommonUtility.IsAllowedMimeType(childItem, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    attachItem.Path = CommonUtility.GenerateProjectMasterFolderAndName(childItem, model.ProjectId, true);
                                }
                                else
                                {
                                    return isValid;
                                }
                                objAttachment.Add(attachItem);
                            }
                        }
                        objProgress.tblJAN_PROJ_UpdateProgressAttachmentMapping = objAttachment;
                    }
                    if (!string.IsNullOrEmpty(model.PDF))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.PDF, true, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            objProgress.PDF = CommonUtility.GenerateProjectMasterFolderAndName(model.PDF, model.ProjectId, true);
                        }
                        else
                        {
                            return isValid;
                        }
                    }
                    await _uow.GenericRepository<tblJAN_PROJ_UpdateProgressMapping>().AddAsync(objProgress);
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> EditUpdateProgress(ProjectUpdateProgressMappingModel model)
        {
            try
            {
                List<tblJAN_PROJ_UpdateProgressAttachmentMapping> objAttachment = new List<tblJAN_PROJ_UpdateProgressAttachmentMapping>();
                //Add progress
                if ((model.MileStoneCode > 0 || model.StatusCode > 0) && model.Id>0)
                {
                    tblJAN_PROJ_UpdateProgressMapping objProgress = await _uow.GenericRepository<tblJAN_PROJ_UpdateProgressMapping>().GetByIdAsync(model.Id);
                    
                    //Delete attachment records
                    if (objProgress.tblJAN_PROJ_UpdateProgressAttachmentMapping.Count() > 0)
                    {
                        foreach (var url in objProgress.tblJAN_PROJ_UpdateProgressAttachmentMapping)
                        {
                            CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(url.Path));
                        }
                        _uow.GenericRepository<tblJAN_PROJ_UpdateProgressAttachmentMapping>().DeleteAllById(objProgress.tblJAN_PROJ_UpdateProgressAttachmentMapping.ToList());
                    }

                    objProgress.MileStoneCode = model.MileStoneCode;
                    objProgress.ProjectId = model.ProjectId;
                    objProgress.StatusCode = model.StatusCode;
                    objProgress.Date = model.Date;
                    objProgress.Description = model.Description;
                    objProgress.MilestoneLabel = model.MilestoneLabel;
                    
                    //Add attachment
                    if (model.Images != null && model.Images.Count > 0)
                    {
                        foreach (var childItem in model.Images)
                        {
                            if (!string.IsNullOrEmpty(childItem))
                            {
                                tblJAN_PROJ_UpdateProgressAttachmentMapping attachItem = new tblJAN_PROJ_UpdateProgressAttachmentMapping();
                                var isValid = CommonUtility.IsAllowedMimeType(childItem, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    attachItem.Path = CommonUtility.GenerateProjectMasterFolderAndName(childItem, model.ProjectId, true);
                                }
                                else
                                {
                                    return isValid;
                                }
                                objAttachment.Add(attachItem);
                            }
                        }
                        objProgress.tblJAN_PROJ_UpdateProgressAttachmentMapping = objAttachment;
                    }
                    if (!string.IsNullOrEmpty(model.PDF))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.PDF, true, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(objProgress.PDF));
                            objProgress.PDF = CommonUtility.GenerateProjectMasterFolderAndName(model.PDF, model.ProjectId, true);
                        }
                        else
                        {
                            return isValid;
                        }
                    }
                    await _uow.GenericRepository<tblJAN_PROJ_UpdateProgressMapping>().UpdateAsync(objProgress);
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }


        public async Task<ServiceResponse<ProjectUpdateProgressMappingModel>> GetProgressById(long id)
        {
            try
            {
                ServiceResponse<ProjectUpdateProgressMappingModel> objReturn = new ServiceResponse<ProjectUpdateProgressMappingModel>();
                tblJAN_PROJ_UpdateProgressMapping objData = await _uow.GenericRepository<tblJAN_PROJ_UpdateProgressMapping>().GetByIdAsync(id);
                if (objData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_UpdateProgressMapping, ProjectUpdateProgressMappingModel>()
                        .ForMember(des => des.PDF, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PDF) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PDF))) : string.Empty))
                         .ForMember(des => des.Images, src => src.MapFrom(mdlSrc => mdlSrc.tblJAN_PROJ_UpdateProgressAttachmentMapping != null ? (mdlSrc.tblJAN_PROJ_UpdateProgressAttachmentMapping.Select(img => !string.IsNullOrEmpty(img.Path) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(img.Path))) : string.Empty)) : null));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_UpdateProgressMapping, ProjectUpdateProgressMappingModel>(objData);

                    return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                   return SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch(Exception ex)
            {
                return SetResultStatus<ProjectUpdateProgressMappingModel>(null, MessageStatus.NoRecord, false);
            }
        }

        /// <summary>
        /// Get project master shot detail by project Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectMasterShorDetailModel> GetProjectShtDetailById(long id)
        {
            try
            {
                ProjectMasterShorDetailModel result = new ProjectMasterShorDetailModel();
                vw_JAN_PROJ_ProjectMasterShorDetail obj = _uow.GenericRepository<vw_JAN_PROJ_ProjectMasterShorDetail>().GetAll(filter: x => x.ProjectId == id).FirstOrDefault();
                if (obj != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vw_JAN_PROJ_ProjectMasterShorDetail, ProjectMasterShorDetailModel>();
                    });
                    IMapper mapper = config.CreateMapper();
                    result = mapper.Map(obj, result);
                }
                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<ProjectMasterShorDetailModel>(null, MessageStatus.Error, false);
            }

        }

        #endregion

        #region Reports


        /// <summary>
        /// Get project report by district and MLA constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ProjectReportModel>> GetProjectReport(ProjectReportFilterModel model)
        {
            try
            {
                CreateLogHelper.CreateLogFile("project master GetProjectReport DateTime/ssoid  :" + DateTime.Now + " /" + _loginUserDetail.SSOID + " \n");
                List<ProjectReportModel> testResultData = new List<ProjectReportModel>();
                List<ProjectReportModel> resultData = new List<ProjectReportModel>();
                List<SP_JAN_PROJ_ProjectReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_PROJ_ProjectReport_Result>("SP_JAN_PROJ_ProjectReport @MLACode,@DistrictCode,@NodalDepartmentCode,@SubCategoryCode,@CategoryCode,@SubSubCategoryCode,@ToDate,@FromDate,@Status,@ProjectStatusCode,@ProjectSchemeCode,@IsAllAttachment, @IsShilanyas,@CMOOfficerCode,@LoginUserId,@AdmDepartmentCode,@IsShowDataWithProgress"
                    , new SqlParameter("MLACode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.MLACode) ? string.Empty : model.MLACode }
                    , new SqlParameter("DistrictCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.DistrictCode) ? string.Empty : model.DistrictCode }
                    , new SqlParameter("NodalDepartmentCode", SqlDbType.Int) { Value = model.NodalDepartmentCode > 0 ? model.NodalDepartmentCode : 0 }
                    , new SqlParameter("SubCategoryCode", SqlDbType.Int) { Value = model.SubCategoryCode > 0 ? model.SubCategoryCode : 0 }
                    , new SqlParameter("CategoryCode", SqlDbType.Int) { Value = model.CategoryCode > 0 ? model.CategoryCode : 0 }
                    , new SqlParameter("SubSubCategoryCode", SqlDbType.Int) { Value = model.SubSubCategoryCode }
                    , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                    , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                    , new SqlParameter("Status", SqlDbType.Int) { Value = model.Status }
                    , new SqlParameter("ProjectStatusCode", SqlDbType.BigInt) { Value = model.ProjectStatusCode > 0 ? model.ProjectStatusCode : 0 }
                    , new SqlParameter("ProjectSchemeCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ProjectSchemeCode) ? string.Empty : model.ProjectSchemeCode }
                    , new SqlParameter("IsAllAttachment", SqlDbType.Int) { Value = model.IsAllAttachment }
                    , new SqlParameter("IsShilanyas", SqlDbType.Int) { Value = model.IsShilanyas }
                    , new SqlParameter("CMOOfficerCode", SqlDbType.Int) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                    , new SqlParameter("LoginUserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }
                    , new SqlParameter("AdmDepartmentCode", SqlDbType.Int) { Value = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode : 0 }
                     , new SqlParameter("IsShowDataWithProgress", SqlDbType.Bit) { Value = model.IsShowDataWithProgress }
                    ).ToList();

                CreateLogHelper.CreateLogFile("project master GetProjectReport data.Count/DateTime :" + data.Count + "/" + DateTime.Now + " \n");

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectReport_Result, ProjectReportModel>();

                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                CreateLogHelper.CreateLogFile("project master GetProjectReport resultData.Count/DateTime :" + resultData.Count + "/" + DateTime.Now + " \n");

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetProjectReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetProjectReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetProjectReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<ProjectReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Export project report to excel
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> ExportProjectReportToExcel(ProjectReportFilterModel model)
        {
            try
            {
                ServiceResponse<List<ProjectReportModel>> resulData = new ServiceResponse<List<ProjectReportModel>>();
                resulData = GetProjectReport(model);

                //Export Functionality
                var _DataTable = new DataTable("exporttable");

                _DataTable.Columns.Add("SNo.", typeof(string));
                _DataTable.Columns.Add("Entry No.", typeof(string));
                _DataTable.Columns.Add("Project Scheme Name", typeof(string));
                _DataTable.Columns.Add("DepartmentTitle", typeof(string));
                _DataTable.Columns.Add("Project Scheme Description", typeof(string));
                _DataTable.Columns.Add("Project Category", typeof(string));
                _DataTable.Columns.Add("Project Sub Category", typeof(string));
                _DataTable.Columns.Add("Work Type", typeof(string));
                _DataTable.Columns.Add("Status", typeof(string));
                _DataTable.Columns.Add("MLA Constituency", typeof(string));
                _DataTable.Columns.Add("Description", typeof(string));
                _DataTable.Columns.Add("District", typeof(string));
                _DataTable.Columns.Add("Project Details", typeof(string));
                _DataTable.Columns.Add("Is CM Priority", typeof(string));
                _DataTable.Columns.Add("Project Scheme Objective", typeof(string));
                _DataTable.Columns.Add("Dynamic label", typeof(string));
                _DataTable.Columns.Add("created By", typeof(string));
                _DataTable.Columns.Add("Year Of Initiation", typeof(string));
                _DataTable.Columns.Add("Project Scheme Program", typeof(string));
                _DataTable.Columns.Add("Development Head Sector", typeof(string));
                _DataTable.Columns.Add("UrbanOrRural", typeof(string));
                _DataTable.Columns.Add("Ward No", typeof(string));
                _DataTable.Columns.Add("Area Covered", typeof(string));
                _DataTable.Columns.Add("PS Names", typeof(string));
                _DataTable.Columns.Add("Gram Panchayat", typeof(string));
                _DataTable.Columns.Add("Village", typeof(string));
                _DataTable.Columns.Add("Total Cost", typeof(string));


                int counter = 1;
                foreach (var val in resulData.Data)
                {
                    _DataTable.Rows.Add(
                        counter,
                        val.Id,
                        val.ProjectSchemeName,
                        val.DepartmentTitle,
                        val.ProjectSchemeDescription,
                        val.CategoryName,
                        val.SubCategoryName,
                        val.SubSubCategoryName,
                        val.StatusName,
                        val.MLAConstituencyName,
                        val.ChildDescription,
                        val.DistrictNames,
                        val.SubCatLabelName + "-->" + val.ChildLabelName,
                        val.IsCMPriority,
                        val.ProjectSchemeObjective,
                        val.LabelName,
                        val.createdByName,
                        val.YearOfInitiationName,
                        val.ProjectSchemeProgramName,
                        val.DevelopmentSectorName,
                        val.UrbanOrRuralName,
                        val.WardNo,
                        val.AreaCovered,
                        val.Block_PSNames,
                        val.GramPanchayatNames,
                        val.VillageNames,
                        val.Cost
                      );
                    counter++;
                }
                DataRow newRow = _DataTable.NewRow();

                int index = 0;
                foreach (var cname in _DataTable.Columns)
                {
                    newRow[index] = cname.ToString();
                    ++index;
                }
                _DataTable.Rows.InsertAt(newRow, 0);


                var path = ExportHelper.ExportData("Project Report", _DataTable, "SSOID_" + _loginUserDetail.SSOID + "_Project Report", FilePath.ProjectReport.GetStringValue());
                var base64 = CommonUtility.GetBase64strFromFilePath(path);

                return SetResultStatus(base64, MessageStatus.ExportSuccess, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportProjectReportToExcel ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportProjectReportToExcel ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportProjectReportToExcel ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get project summary report of status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ProjectSummaryReportModel>> GetProjectSummaryReport(ProjectReportFilterModel model)
        {
            try
            {
                List<ProjectSummaryReportModel> resultData = new List<ProjectSummaryReportModel>();
                List<SP_JAN_PROJ_ProjectSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_PROJ_ProjectSummaryReport_Result>("SP_JAN_PROJ_ProjectSummaryReport @MLACode,@DistrictCode,@NodalDepartmentCode,@SubCategoryCode,@CategoryCode,@SubSubCategoryCode,@ToDate,@FromDate,@Status,@ProjectStatusCode,@ProjectSchemeCode,@CMOOfficerCode,@LoginUserId,@AdmDepartmentCode"
                    , new SqlParameter("MLACode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.MLACode) ? string.Empty : model.MLACode }
                    , new SqlParameter("DistrictCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.DistrictCode) ? string.Empty : model.DistrictCode }
                    , new SqlParameter("NodalDepartmentCode", SqlDbType.Int) { Value = model.NodalDepartmentCode > 0 ? model.NodalDepartmentCode : 0 }
                    , new SqlParameter("SubCategoryCode", SqlDbType.Int) { Value = model.SubCategoryCode > 0 ? model.SubCategoryCode : 0 }
                    , new SqlParameter("CategoryCode", SqlDbType.Int) { Value = model.CategoryCode > 0 ? model.CategoryCode : 0 }
                    , new SqlParameter("SubSubCategoryCode", SqlDbType.Int) { Value = model.SubSubCategoryCode }
                   , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                   , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                   , new SqlParameter("Status", SqlDbType.Int) { Value = model.Status }
                    , new SqlParameter("ProjectStatusCode", SqlDbType.BigInt) { Value = model.ProjectStatusCode > 0 ? model.ProjectStatusCode : 0 }
                     , new SqlParameter("ProjectSchemeCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ProjectSchemeCode) ? string.Empty : model.ProjectSchemeCode }
                       , new SqlParameter("CMOOfficerCode", SqlDbType.Int) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                        , new SqlParameter("LoginUserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }
                    , new SqlParameter("AdmDepartmentCode", SqlDbType.Int) { Value = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode : 0 }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectSummaryReport_Result, ProjectSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);
                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetProjectSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetProjectSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetProjectSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<ProjectSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get sum of dynamic label of project summary report of status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<SumOfDynamicLabelSummaryReportModel>> GetSumOfDynamicLabelSummaryReport(ProjectReportFilterModel model)
        {
            try
            {
                List<SumOfDynamicLabelSummaryReportModel> resultData = new List<SumOfDynamicLabelSummaryReportModel>();
                List<SP_JAN_PROJ_SumOfDynamicLabelSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_PROJ_SumOfDynamicLabelSummaryReport_Result>("SP_JAN_PROJ_SumOfDynamicLabelSummaryReport @MLACode,@DistrictCode,@NodalDepartmentCode,@SubCategoryCode,@CategoryCode,@SubSubCategoryCode,@ToDate,@FromDate,@Status,@ProjectStatusCode,@ProjectSchemeCode,@CMOOfficerCode,@LoginUserId,@AdmDepartmentCode"
                    , new SqlParameter("MLACode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.MLACode) ? string.Empty : model.MLACode }
                    , new SqlParameter("DistrictCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.DistrictCode) ? string.Empty : model.DistrictCode }
                    , new SqlParameter("NodalDepartmentCode", SqlDbType.Int) { Value = model.NodalDepartmentCode > 0 ? model.NodalDepartmentCode : 0 }
                    , new SqlParameter("SubCategoryCode", SqlDbType.Int) { Value = model.SubCategoryCode > 0 ? model.SubCategoryCode : 0 }
                    , new SqlParameter("CategoryCode", SqlDbType.Int) { Value = model.CategoryCode > 0 ? model.CategoryCode : 0 }
                    , new SqlParameter("SubSubCategoryCode", SqlDbType.Int) { Value = model.SubSubCategoryCode }
                   , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                   , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                   , new SqlParameter("Status", SqlDbType.Int) { Value = model.Status }
                    , new SqlParameter("ProjectStatusCode", SqlDbType.BigInt) { Value = model.ProjectStatusCode > 0 ? model.ProjectStatusCode : 0 }
                     , new SqlParameter("ProjectSchemeCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ProjectSchemeCode) ? string.Empty : model.ProjectSchemeCode }
                      , new SqlParameter("CMOOfficerCode", SqlDbType.Int) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                       , new SqlParameter("LoginUserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }
                    , new SqlParameter("AdmDepartmentCode", SqlDbType.Int) { Value = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode : 0 }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_SumOfDynamicLabelSummaryReport_Result, SumOfDynamicLabelSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetSumOfDynamicLabelSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetSumOfDynamicLabelSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetSumOfDynamicLabelSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<SumOfDynamicLabelSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get department wise category, Sub category, Sub sub category,With MAL constituency and Without MAL constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ProjectDepartmentWiseSummaryReportModel>> GetDepartmentWiseSummaryReport(ProjectReportFilterModel model)
        {
            try
            {
                List<ProjectDepartmentWiseSummaryReportModel> resultData = new List<ProjectDepartmentWiseSummaryReportModel>();
                List<SP_JAN_PROJ_ProjectDepartmentWiseSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_PROJ_ProjectDepartmentWiseSummaryReport_Result>("SP_JAN_PROJ_ProjectDepartmentWiseSummaryReport @MLACode,@DistrictCode,@NodalDepartmentCode,@SubCategoryCode,@CategoryCode,@SubSubCategoryCode,@ToDate,@FromDate,@Status,@ProjectStatusCode,@ProjectSchemeCode,@CMOOfficerCode,@LoginUserId,@AdmDepartmentCode"
                    , new SqlParameter("MLACode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.MLACode) ? string.Empty : model.MLACode }
                    , new SqlParameter("DistrictCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.DistrictCode) ? string.Empty : model.DistrictCode }
                    , new SqlParameter("NodalDepartmentCode", SqlDbType.Int) { Value = model.NodalDepartmentCode > 0 ? model.NodalDepartmentCode : 0 }
                    , new SqlParameter("SubCategoryCode", SqlDbType.Int) { Value = model.SubCategoryCode > 0 ? model.SubCategoryCode : 0 }
                    , new SqlParameter("CategoryCode", SqlDbType.Int) { Value = model.CategoryCode > 0 ? model.CategoryCode : 0 }
                    , new SqlParameter("SubSubCategoryCode", SqlDbType.Int) { Value = model.SubSubCategoryCode }
                   , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                   , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                   , new SqlParameter("Status", SqlDbType.Int) { Value = model.Status }
                    , new SqlParameter("ProjectStatusCode", SqlDbType.BigInt) { Value = model.ProjectStatusCode > 0 ? model.ProjectStatusCode : 0 }
                     , new SqlParameter("ProjectSchemeCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ProjectSchemeCode) ? string.Empty : model.ProjectSchemeCode }
                          , new SqlParameter("CMOOfficerCode", SqlDbType.Int) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                           , new SqlParameter("LoginUserId", SqlDbType.Int) { Value = model.LoginUserId > 0 ? model.LoginUserId : _loginUserDetail.UserId }
                    , new SqlParameter("AdmDepartmentCode", SqlDbType.Int) { Value = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode : 0 }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectDepartmentWiseSummaryReport_Result, ProjectDepartmentWiseSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetDepartmentWiseSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetDepartmentWiseSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetDepartmentWiseSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<ProjectDepartmentWiseSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get project status wise department summary report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ProjectDepartmentStatusSummaryReportModel>> GetProjectDepartmentStatusSummaryReport(ProjectReportFilterModel model)
        {
            try
            {
                List<ProjectDepartmentStatusSummaryReportModel> resultData = new List<ProjectDepartmentStatusSummaryReportModel>();
                List<SP_JAN_PROJ_ProjectDepartmentStatusSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_PROJ_ProjectDepartmentStatusSummaryReport_Result>("SP_JAN_PROJ_ProjectDepartmentStatusSummaryReport @MLACode,@DistrictCode,@NodalDepartmentCode,@SubCategoryCode,@CategoryCode,@SubSubCategoryCode,@ToDate,@FromDate,@Status,@ProjectStatusCode,@ProjectSchemeCode,@CMOOfficerCode,@LoginUserId,@AdmDepartmentCode"
                    , new SqlParameter("MLACode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.MLACode) ? string.Empty : model.MLACode }
                    , new SqlParameter("DistrictCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.DistrictCode) ? string.Empty : model.DistrictCode }
                    , new SqlParameter("NodalDepartmentCode", SqlDbType.Int) { Value = model.NodalDepartmentCode > 0 ? model.NodalDepartmentCode : 0 }
                    , new SqlParameter("SubCategoryCode", SqlDbType.Int) { Value = model.SubCategoryCode > 0 ? model.SubCategoryCode : 0 }
                    , new SqlParameter("CategoryCode", SqlDbType.Int) { Value = model.CategoryCode > 0 ? model.CategoryCode : 0 }
                    , new SqlParameter("SubSubCategoryCode", SqlDbType.Int) { Value = model.SubSubCategoryCode }
                   , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                   , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                   , new SqlParameter("Status", SqlDbType.Int) { Value = model.Status }
                    , new SqlParameter("ProjectStatusCode", SqlDbType.BigInt) { Value = model.ProjectStatusCode > 0 ? model.ProjectStatusCode : 0 }
                     , new SqlParameter("ProjectSchemeCode", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ProjectSchemeCode) ? string.Empty : model.ProjectSchemeCode }
                       , new SqlParameter("CMOOfficerCode", SqlDbType.Int) { Value = model.CMOOfficerCode > 0 ? model.CMOOfficerCode : 0 }
                        , new SqlParameter("LoginUserId", SqlDbType.Int) { Value = model.LoginUserId > 0 ? model.LoginUserId : _loginUserDetail.UserId }
                    , new SqlParameter("AdmDepartmentCode", SqlDbType.Int) { Value = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode : 0 }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_PROJ_ProjectDepartmentStatusSummaryReport_Result, ProjectDepartmentStatusSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);
                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetProjectDepartmentStatusSummaryReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetProjectDepartmentStatusSummaryReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetProjectDepartmentStatusSummaryReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<ProjectDepartmentStatusSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Web Service

        /// <summary>
        /// This service use for create/Update record in project master through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> AddUpdateProjectService(WorksEntryServiceModel model, HttpRequestHeaders header = null)
        {
            try
            {
                if (header != null)
                {
                    IEnumerable<string> username, password, clientid, userId;
                    List<int?> depIds = new List<int?>();

                    header.TryGetValues("username", out username);
                    header.TryGetValues("password", out password);
                    header.TryGetValues("clientid", out clientid);
                    header.TryGetValues("userid", out userId);

                    List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(Convert.ToInt32(userId)).Data;
                    if (dep != null && dep.Count > 0)
                    {
                        depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());
                    }

                    tblClientIdForService objclient = _uow.GenericRepository<tblClientIdForService>().GetAll(
                    filter: x => x.UserId == username.FirstOrDefault() && x.Password == password.FirstOrDefault() && x.ClientId == clientid.FirstOrDefault()
                    && x.tblClientIdModuleMappings.Select(z => z.ModuleCode == model.ModuleId).FirstOrDefault() && depIds.Contains(x.DepartmentCode)
                    ).FirstOrDefault();

                    if (objclient != null)
                    {
                        ProjectMasterModel requestModel = new ProjectMasterModel();
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<WorksEntryServiceModel, ProjectMasterModel>()
                            .ForMember(des => des.ProjectStatusCode, src => src.MapFrom(s => s.StatusCode))
                            .ForMember(des => des.ProjectSchemeDescription, src => src.MapFrom(s => s.Description))
                            .ForMember(des => des.ProjectSchemeObjective, src => src.MapFrom(s => s.Objective))
                            .ForMember(des => des.ProjectCategoryCode, src => src.MapFrom(s => s.CategoryCode))
                            .ForMember(des => des.ProjectSubCategoryCode, src => src.MapFrom(s => s.SubCategoryCode))
                             .ForMember(des => des.ProjectSchemeCode, src => src.MapFrom(s => s.SchemeCode))
                             .ForMember(des => des.CreatedBy, src => src.MapFrom(s => userId))
                             .ForMember(des => des.ModifiedBy, src => src.MapFrom(s => userId))
                            .ForMember(des => des.SubSubCategoryCode, src => src.MapFrom(s => s.WorkTypeCode));
                        });
                         requestModel = Mapper.Map<WorksEntryServiceModel, ProjectMasterModel>(model);
                         Mapper.Initialize(x =>
                        {
                            x.CreateMap<WokrsMappingModel, ProjectMasterProjectsMappingModel>()
                            .ForMember(des => des.ProjectWorkCategory, src => src.MapFrom(s => s.WorkCategory));
                        });
                        requestModel.ProjectMappingList = Mapper.Map<List<WokrsMappingModel>, List<ProjectMasterProjectsMappingModel>>(model.WorksMappingList);

                        if (model.Id > 0)
                        {
                            return await Edit(requestModel, true);
                        }
                        else
                        {
                            return await Create(requestModel, true);
                        }
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.UnthothorizedForActivity, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.UnthothorizedForActivity, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master AddUpdateProjectService ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master AddUpdateProjectService ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master AddUpdateProjectService ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion


    }
}
