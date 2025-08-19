using AutoMapper;
using CMOWebApi.Core;
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
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class DepartmentSubMenuService : BaseService, IDepartmentSubMenuService
    {

        #region /// Variable ///

        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;

        #endregion

        #region /// Constructor  ///

        public DepartmentSubMenuService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        #endregion

        #region /// Methods ///

        /// <summary>
        /// Craete new Department Sub Menu master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(DepartmentSubMenuModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (!string.IsNullOrEmpty(model.IconImage))
                {
                    var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                    var isValid = CommonUtility.IsAllowedMimeType(model.IconImage, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.IconImage = CommonUtility.UploadDepartmentMenuFile(model.IconImage, model.Id, dept.DepartmentShortTitle, false);
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.PDFAttachment))
                {
                    var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                    var isValid = CommonUtility.IsAllowedMimeType(model.PDFAttachment, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.PDFAttachment = CommonUtility.UploadDepartmentMenuFile(model.PDFAttachment, model.Id, dept.DepartmentShortTitle, false);
                    }
                    else
                    {
                        return isValid;
                    }
                }
                Mapper.Initialize(x =>
                {
                    x.CreateMap<DepartmentSubMenuModel, tblDept_DepartmentSubMenu>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblDept_DepartmentSubMenu data = Mapper.Map<DepartmentSubMenuModel, tblDept_DepartmentSubMenu>(model);

                data = await _uow.GenericRepository<tblDept_DepartmentSubMenu>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblDept_DepartmentSubMenu>().UpdateAsync(data);
                _uow.save();

                objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                CreateLogHelper.CreateLogFile("DepartmentSubMenu Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Update existing Department Sub Menu master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(DepartmentSubMenuModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblDept_DepartmentSubMenu objResult = await _uow.GenericRepository<tblDept_DepartmentSubMenu>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        if (!string.IsNullOrEmpty(model.IconImage))
                        {
                            var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                            var isValid = CommonUtility.IsAllowedMimeType(model.IconImage, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                model.IconImage = CommonUtility.UploadDepartmentMenuFile(model.IconImage, model.Id, dept.DepartmentTitle, false, objResult.IconImage);
                            }
                            else
                            {
                                return isValid;
                            }
                        }
                        if (!string.IsNullOrEmpty(model.PDFAttachment))
                        {
                            var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                            var isValid = CommonUtility.IsAllowedMimeType(model.PDFAttachment, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                model.PDFAttachment = CommonUtility.UploadDepartmentMenuFile(model.PDFAttachment, model.Id, dept.DepartmentTitle, false, objResult.IconImage);
                            }
                            else
                            {
                                return isValid;
                            }
                        }

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<DepartmentSubMenuModel, tblDept_DepartmentSubMenu>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblDept_DepartmentSubMenu>().UpdateAsync(objResult);
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
                CreateLogHelper.CreateLogFile("DepartmentSubMenu Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Get all Department Sub Menu master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentSubMenuListModel>> GetAll(DepartmentSubMenuFilterModel model)
        {
            ServiceResponse<PagedData<DepartmentSubMenuListModel>> objReturn = new ServiceResponse<PagedData<DepartmentSubMenuListModel>>();
            try
            {
                PagedData<DepartmentSubMenuListModel> resulData = new PagedData<DepartmentSubMenuListModel>();

                //string departmentCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? string.Join(",", Convert.ToString(model.AdvanceSearchModel["DepartmentCode"].ToString())) : string.Empty) : string.Empty;

                //List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                //var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                //PagedData<vwDept_DepartmentSubMenu> data = GenericGridCall<vwDept_DepartmentSubMenu>.ListView(model.PageSize, x => x.DisplayNameHindi, x => x.IsDelete == false && (!string.IsNullOrEmpty(departmentCode) ? x.DepartmentCode == Convert.ToInt32(departmentCode) : true) && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                object[] @sp_params = new object[17];
                @sp_params[0] = model.ModuleName;
                @sp_params[1] = model.ModuleCategoryCode;
                @sp_params[2] = model.ModuleSubCategoryCode;
                @sp_params[3] = model.DepartmentSubMenuCode;
                @sp_params[4] = model.MainMenuCode;
                @sp_params[5] = model.ModifiedToDate;
                @sp_params[6] = model.ModifiedFromDate;
                @sp_params[7] = model.Status;
                @sp_params[8] = model.DepartmentCode;
                @sp_params[9] = model.ModifiedBy;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "DisplayOrder" : model.OrderBy.Trim();
                @sp_params[13] = true;//model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = _loginUserDetail.UserId;
                @sp_params[15] = string.IsNullOrEmpty(model.SubMenuShowAsSeparateCode) ? 0 : Convert.ToInt32(model.SubMenuShowAsSeparateCode);
                @sp_params[16] = string.IsNullOrEmpty(model.RedirectionManagementRadio) ? 0 : Convert.ToInt32(model.RedirectionManagementRadio);

                PagedData<SP_Dept_DepartmentSubMenuList_Result> data = GenericGridCall<SP_Dept_DepartmentSubMenuList_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.DisplayOrder, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_Dept_DepartmentSubMenuList_Result, DepartmentSubMenuListModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<DepartmentSubMenuListModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<DepartmentSubMenuListModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Department Sub Menu master  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentSubMenuModel> GetById(long id)
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

        /// <summary>
        /// Update Status(Active/De-Active)
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
                    tblDept_DepartmentSubMenu objResult = await _uow.GenericRepository<tblDept_DepartmentSubMenu>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblDept_DepartmentSubMenu>().UpdateAsync(objResult);
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
                CreateLogHelper.CreateLogFile("DepartmentSubMenu UpdateActiveStatus ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu UpdateActiveStatus ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu UpdateActiveStatus ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }


        #endregion

        #region ImportSectionMenuAndSubMenu
        public ServiceResponse<string> ImportSectionMenuAndSubMenu(ImportSectionMenuAndSubMenuFilterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                Sp_JAN_Dept_ImportSectionMenuAndSubMenu_Result data = _uow.ExeccuteStoreProcedure<Sp_JAN_Dept_ImportSectionMenuAndSubMenu_Result>("Sp_JAN_Dept_ImportSectionMenuAndSubMenu @FromDepartmentCode, @ToDepartmentCodes,@IsSectionImport,@IsMenuImport,@IsSubMenuImport",
                new SqlParameter("FromDepartmentCode", SqlDbType.Int) { Value = model.FromDepartmentCode > 0 ? model.FromDepartmentCode : 0 },
                new SqlParameter("ToDepartmentCodes", SqlDbType.NVarChar) { Value = !string.IsNullOrEmpty(model.ToDepartmentCodes) ? model.ToDepartmentCodes : string.Empty },
                new SqlParameter("IsSectionImport", SqlDbType.Bit) { Value = model.IsSectionImport == true ? true : false },
                new SqlParameter("IsMenuImport", SqlDbType.Bit) { Value = model.IsMenuImport == true ? true : false },
                new SqlParameter("IsSubMenuImport", SqlDbType.Bit) { Value = model.IsSubMenuImport == true ? true : false }
                ).FirstOrDefault();
                if (data.Result == "Success")
                {
                    return SetResultStatus(string.Empty, MessageStatus.ImportData, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, data.Result, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("TransferDptMenuToDepartmentSubMenu ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("TransferDptMenuToDepartmentSubMenu ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("TransferDptMenuToDepartmentSubMenu ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }
        #endregion
    }
}
