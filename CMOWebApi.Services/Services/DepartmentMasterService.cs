using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.Services
{
    public class DepartmentMasterService : BaseService, IDepartmentMasterService
    {

        #region /// Variable ///
        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        private static string _departmentfileUpload = HttpContext.Current.Server.MapPath(FilePath.DepartmentProfileImagePath.GetStringValue());
        #endregion

        #region ///constructor ///
        public DepartmentMasterService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all department name
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        public ServiceResponse<PagedData<DepartmentMasterViewModel>> GetAll(IndexModel model, int isActive)
        {
            try
            {
                PagedData<DepartmentMasterViewModel> resultData = new PagedData<DepartmentMasterViewModel>();
                PagedData<vwDepartmentMaster> data = GenericGridCall<vwDepartmentMaster>.ListView(model.PageSize, x => x.DepartmentTitle, x => x.DepartmentIsDeleted == false && x.DepartmentIsActive == (isActive >= 0 ? (isActive == 0 ? false : true) : x.DepartmentIsActive), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwDepartmentMaster, DepartmentMasterViewModel>()
                         .ForMember(des => des.AdmDepartmentTitleHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AdmDepartmentTitleHindi) ? x.AdmDepartmentTitleHindi : "--"))
                    .ForMember(des => des.DepartmentCategoryName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DepartmentCategoryName) ? x.DepartmentCategoryName : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<DepartmentMasterViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new Department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(DepartmentMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (!string.IsNullOrEmpty(model.LogoUrl))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.LogoUrl, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.LogoUrl = CommonUtility.DepartmentProfileFolderStructure(model.LogoUrl, model.DepartmentTitle);
                    }
                    else
                    {
                        return isValid;
                    }
                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<DepartmentMasterModel, tblDepartmentMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));

                });
                tblDepartmentMaster data = Mapper.Map<DepartmentMasterModel, tblDepartmentMaster>(model);


                data = await _uow.GenericRepository<tblDepartmentMaster>().AddAsync(data);
                _uow.save();



                data.DepartmentCode = Convert.ToInt32(data.DepartmentId);
                data = await _uow.GenericRepository<tblDepartmentMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Department Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Department Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Department Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(DepartmentMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.DepartmentId > 0)
                {
                    tblDepartmentMaster objResult = await _uow.GenericRepository<tblDepartmentMaster>().GetByIdAsync(model.DepartmentId);
                    if (objResult != null)
                    {
                        if (!string.IsNullOrEmpty(model.LogoUrl))
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(model.LogoUrl, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                model.LogoUrl = CommonUtility.DepartmentProfileFolderStructure(model.LogoUrl, model.DepartmentTitle, false, objResult.LogoUrl);
                            }
                            else
                            {
                                return isValid;
                            }
                        }

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<DepartmentMasterModel, tblDepartmentMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblDepartmentMaster>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.Update, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Department Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Department Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Department Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }
        
        /// <summary>
        /// get department by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentMasterModel> GetById(long id)
        {
            ServiceResponse<DepartmentMasterModel> objReturn = new ServiceResponse<DepartmentMasterModel>();
            try
            {
                tblDepartmentMaster resultData = _uow.GenericRepository<tblDepartmentMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDepartmentMaster, DepartmentMasterModel>()
                        .ForMember(des => des.LogoUrl, src => src.MapFrom(f => !string.IsNullOrEmpty(f.LogoUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.LogoUrl))) : string.Empty))
                        .ForMember(des => des.WebsiteImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.WebsiteImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.WebsiteImage))) : string.Empty));
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
                CreateLogHelper.CreateLogFile("Department GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Department GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Department GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblDepartmentMaster objResult = _uow.GenericRepository<tblDepartmentMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.DepartmentIsActive = !objResult.DepartmentIsActive;
                        await _uow.GenericRepository<tblDepartmentMaster>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        public ServiceResponse<string> TransferMenuClassificationToDepartmentMenu(int dptCode)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (dptCode > 0)
                {
                    spJAN_Dept_TransferMenuClassificationToDepartmentMenu_Result data = _uow.ExeccuteStoreProcedure<spJAN_Dept_TransferMenuClassificationToDepartmentMenu_Result>("spJAN_Dept_TransferMenuClassificationToDepartmentMenu @DepartmentCode",
                    new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = dptCode }).FirstOrDefault();
                    if (data.Result == "Success")
                    {
                        return SetResultStatus(string.Empty, MessageStatus.TransferData, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, data.Result, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        public ServiceResponse<string> TransferDptMenuToDepartmentSubMenu(int dptCode)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (dptCode > 0)
                {
                    spJAN_Dept_TransferDptMenuToDepartmentSubMenu_Result data = _uow.ExeccuteStoreProcedure<spJAN_Dept_TransferDptMenuToDepartmentSubMenu_Result>("spJAN_Dept_TransferDptMenuToDepartmentSubMenu @DepartmentCode",
                    new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = dptCode }).FirstOrDefault();
                    if (data.Result == "Success")
                    {
                        return SetResultStatus(string.Empty, MessageStatus.TransferData, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, data.Result, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        #endregion

        #region Report Scheme and department

        /// <summary>
        /// Get Department code with department list for the report which is used by the administrator
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<DepartmentReportModel>> GetDepartmentReport()
        {
            ServiceResponse<List<DepartmentReportModel>> objReturn = new ServiceResponse<List<DepartmentReportModel>>();

            try
            {
                List<tblDepartmentMaster> objResult = _uow.GenericRepository<tblDepartmentMaster>().GetAll().Where(x => x.DepartmentIsDeleted == false && x.DepartmentIsActive == true).OrderBy(x => x.DepartmentTitle).ToList();
                Mapper.Initialize(x =>
                {
                    x.CreateMap<tblDepartmentMaster, DepartmentReportModel>();
                });
                objReturn.Data = Mapper.Map<List<tblDepartmentMaster>, List<DepartmentReportModel>>(objResult);

                return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
            }
            catch (Exception)
            {
                return SetResultStatus<List<DepartmentReportModel>>(null, MessageStatus.InvalidData, false);
            }
        }

        /// <summary>
        /// Get scheme with department list for the report which is used by the administrator
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<DepartmentSchemeReportModel>> GetDepartmentSchemeReport()
        {
            ServiceResponse<List<DepartmentSchemeReportModel>> objReturn = new ServiceResponse<List<DepartmentSchemeReportModel>>();

            try
            {
                List<vwSCM_SchemeDetails> objResult = _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll().Where(x => x.IsActive == true && x.IsDeleted == false).OrderBy(x => x.DepartmentTitle).ToList();
                Mapper.Initialize(x =>
                {
                    x.CreateMap<vwSCM_SchemeDetails, DepartmentSchemeReportModel>();
                });
                objReturn.Data = Mapper.Map<List<vwSCM_SchemeDetails>, List<DepartmentSchemeReportModel>>(objResult);

                return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
            }
            catch (Exception)
            {
                return SetResultStatus<List<DepartmentSchemeReportModel>>(null, MessageStatus.InvalidData, false);
            }
        }

        #endregion

        #region Department Website Details

        /// <summary>
        /// Get list of login user department for Website Details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<LoginUserDepartmentListModel>> GetLoginUserDepartmentList()
        {
            try
            {
                List<LoginUserDepartmentListModel> resultData = new List<LoginUserDepartmentListModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                List<tblDepartmentMaster> result = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentIsActive == true && x.DepartmentIsDeleted == false && depIds.Contains(x.DepartmentCode)).OrderBy(x => x.DepartmentTitle).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblDepartmentMaster, LoginUserDepartmentListModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(result, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master GetLoginUserDepartmentList ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetLoginUserDepartmentList ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master GetLoginUserDepartmentList ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<LoginUserDepartmentListModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update Login User Department Website Details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateLoginUserDepartment(LoginUserDepartmentListModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.DepartmentId > 0)
                {

                    tblDepartmentMaster objResult = await _uow.GenericRepository<tblDepartmentMaster>().GetByIdAsync(model.DepartmentId);
                    if (objResult != null)
                    {

                        if (!string.IsNullOrEmpty(model.WebsiteImage))
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(model.WebsiteImage, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                model.WebsiteImage = CommonUtility.DepartmentProfileFolderStructure(model.WebsiteImage, model.DepartmentTitle, false, objResult.LogoUrl);
                            }
                            else
                            {
                                return isValid;
                            }
                        }

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<LoginUserDepartmentListModel, tblDepartmentMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.MobileNo, opt => opt.MapFrom(src => src.MobileNo.TrimEnd(',')))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblDepartmentMaster>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.Update, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("project master UpdateLoginUserDepartment ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("project master UpdateLoginUserDepartment ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("project master UpdateLoginUserDepartment ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Department Profile

        /// <summary>
        /// Get Department Profile List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentProfileListModel>> GetDepartmentProfileList(DptProfileFilterModel model)
        {
            try
            {
                PagedData<DepartmentProfileListModel> resultData = new PagedData<DepartmentProfileListModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwJAN_DepartmentProfile> data = GenericGridCall<vwJAN_DepartmentProfile>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && depIds.Contains(x.DepartmentCode)
                && (model.DepartmentCode > 0 ? x.DepartmentCode == model.DepartmentCode : true)
                && (model.EntryTypeCode > 0 ? x.EntryTypeCode == model.EntryTypeCode : true)
                && (model.JankalyanCategoryCode > 0 ? x.JankalyanCategoryCode == model.JankalyanCategoryCode : true)
                && (!string.IsNullOrEmpty(model.FromDate) ? Convert.ToDateTime(x.ModifiedDate).Date >= Convert.ToDateTime(model.FromDate).Date : true)
                  && (!string.IsNullOrEmpty(model.ToDate) ? Convert.ToDateTime(x.ModifiedDate).Date <= Convert.ToDateTime(model.ToDate).Date : true)
                , model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_DepartmentProfile, DepartmentProfileListModel>()
                    .ForMember(des => des.ImageURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.ImageURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.ImageURL.Trim())) : string.Empty))
                    .ForMember(des => des.PDFURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFURL.Trim())) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<DepartmentProfileListModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentProfileListModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
		/// get department profile by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<DepartmentProfileModel> GetDepartmentProfileById(long id)
        {
            ServiceResponse<DepartmentProfileModel> objReturn = new ServiceResponse<DepartmentProfileModel>();
            try
            {
                tblJAN_DepartmentProfile resultData = _uow.GenericRepository<tblJAN_DepartmentProfile>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_DepartmentProfile, DepartmentProfileModel>()
                         .ForMember(des => des.ImageURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.ImageURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.ImageURL.Trim())) : string.Empty))
                         .ForMember(des => des.PDFURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFURL.Trim())) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_DepartmentProfile, DepartmentProfileModel>(resultData);

                    return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    return SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Department Profile Add and Update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> DepartmentProfileAddUpdate(DepartmentProfileModel model)
        {
            try
            {
                ServiceResponse<string> objReturn = new ServiceResponse<string>();
                tblJAN_DepartmentProfile obj = new tblJAN_DepartmentProfile();

                tblDepartmentMaster dpt = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();
                if (model.Id > 0)
                {
                    obj = _uow.GenericRepository<tblJAN_DepartmentProfile>().GetByID(model.Id);
                }
                if (!string.IsNullOrEmpty(model.ImageURL))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ImageURL, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        if (model.Id > 0)
                        {
                            model.ImageURL = CommonUtility.DepartmentProfileFolderStructure(model.ImageURL, dpt.DepartmentShortTitle, false, obj.ImageURL);
                        }
                        else
                        {
                            model.ImageURL = CommonUtility.DepartmentProfileFolderStructure(model.ImageURL, dpt.DepartmentShortTitle);
                        }
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.PDFURL))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.PDFURL, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        if (model.Id > 0)
                        {
                            model.PDFURL = CommonUtility.DepartmentProfileFolderStructure(model.PDFURL, dpt.DepartmentShortTitle, true, obj.PDFURL);
                        }
                        else
                        {
                            model.PDFURL = CommonUtility.DepartmentProfileFolderStructure(model.PDFURL, dpt.DepartmentShortTitle, true);
                        }
                    }
                    else
                    {
                        return isValid;
                    }
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<DepartmentProfileModel, tblJAN_DepartmentProfile>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                if (model.Id > 0)
                {

                    obj.ModifiedDate = DateTime.Now;
                    obj.ModifiedBy = _loginUserDetail.UserId;
                    await _uow.GenericRepository<tblJAN_DepartmentProfile>().UpdateAsync(obj);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Update, true);
                }
                else
                {
                    obj.CreatedDate = DateTime.Now;
                    obj.CreatedBy = _loginUserDetail.UserId;
                    obj.ModifiedDate = DateTime.Now;
                    obj.ModifiedBy = _loginUserDetail.UserId;
                    await _uow.GenericRepository<tblJAN_DepartmentProfile>().AddAsync(obj);
                    _uow.save();
                    obj.Code = obj.Id;
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update Department Profile Status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateDepartmentProfileStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblJAN_DepartmentProfile objResult = _uow.GenericRepository<tblJAN_DepartmentProfile>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_DepartmentProfile>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        /// <summary>
        /// This method is used to check, that the combination of department and entry type is unique or not.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentProfileModel> IsDepartmentProfileExist(DepartmentProfileExistModel model)
        {
            try
            {
                tblJAN_DepartmentProfile objData = _uow.GenericRepository<tblJAN_DepartmentProfile>().GetAll(x => x.DepartmentCode == model.DepartmentCode && x.EntryTypeCode == model.EntryTypeCode && (model.Id > 0 ? x.Id != model.Id : true)).FirstOrDefault();
                if (objData != null)
                {
                    if (model.Id == 0)
                    {
                        return GetDepartmentProfileById(objData.Id);
                    }
                    else
                    {
                        return SetResultStatus<DepartmentProfileModel>(null, MessageStatus.Success, true);
                    }
                }
                else
                {
                    return SetResultStatus<DepartmentProfileModel>(null, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus<DepartmentProfileModel>(null, MessageStatus.NoRecord, false);
            }
        }

        #endregion

    }
}
