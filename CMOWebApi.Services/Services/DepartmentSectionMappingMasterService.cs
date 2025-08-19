using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.DepartmentWebsite;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class DepartmentSectionMappingMasterService : BaseService, IDepartmentSectionMappingMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public DepartmentSectionMappingMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Section Mapping Master List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentSectionMappingModel>> GetAll(DepartmentSectionMappingFilterModel model)
        {
            try
            {
                PagedData<DepartmentSectionMappingModel> resulData = new PagedData<DepartmentSectionMappingModel>();
                //PagedData<vw_Dept_SectionMapping> data = GenericGridCall<vw_Dept_SectionMapping>.ListView(model.PageSize, x => x.ModifiedDate, x => x.Isdeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                object[] @sp_params = new object[11];
                @sp_params[0] = model.DepartmentCode;
                @sp_params[1] = model.SectionMasterCode;
                @sp_params[2] = model.ModifiedToDate;
                @sp_params[3] = model.ModifiedFromDate;
                @sp_params[4] = model.Status;
                @sp_params[5] = model.ModifiedBy;
                @sp_params[6] = model.Page;
                @sp_params[7] = model.PageSize;
                @sp_params[8] = string.IsNullOrEmpty(model.OrderBy) ? "DisplayOrder" : model.OrderBy.Trim();
                @sp_params[9] = true;//model.OrderByAsc > 0 ? true : false;
                @sp_params[10] = _loginUserDetail.UserId;


                PagedData<SP_Dept_DepartmentSectionMapping_Result> DataList = GenericGridCall<SP_Dept_DepartmentSectionMapping_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.DisplayOrder, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_Dept_DepartmentSectionMapping_Result, DepartmentSectionMappingModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(DataList.Data, resulData.Data);

                PagedData<DepartmentSectionMappingModel>.ReturnCustomizeData(resulData, model.PageSize, DataList.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<DepartmentSectionMappingModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add Section Mapping Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(DepartmentSectionMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                var objData = _uow.GenericRepository<tblDept_SectionMapping>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode && x.SectionMasterCode == model.SectionMasterCode).FirstOrDefault();

                if (objData == null)
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
                    if (!string.IsNullOrEmpty(model.BackGroundImage))
                    {
                        var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                        var isValid = CommonUtility.IsAllowedMimeType(model.BackGroundImage, false, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            model.BackGroundImage = CommonUtility.UploadDepartmentMenuFile(model.BackGroundImage, model.Id, dept.DepartmentShortTitle, false);
                        }
                        else
                        {
                            return isValid;
                        }
                    }
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<DepartmentSectionMappingModel, tblDept_SectionMapping>()
                        .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                        .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                        .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                        .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                    });
                    tblDept_SectionMapping data = Mapper.Map<DepartmentSectionMappingModel, tblDept_SectionMapping>(model);

                    data = await _uow.GenericRepository<tblDept_SectionMapping>().AddAsync(data);
                    _uow.save();

                    data.Code = Convert.ToInt32(data.Id);
                    data = await _uow.GenericRepository<tblDept_SectionMapping>().UpdateAsync(data);
                    _uow.save();

                    return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }
                else {
                    return SetResultStatus(string.Empty, MessageStatus.DepartmentSectionExist, false);
                }
               
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Update existing Section Mapping Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(DepartmentSectionMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblDept_SectionMapping objData = _uow.GenericRepository<tblDept_SectionMapping>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode && x.SectionMasterCode == model.SectionMasterCode && x.Id != model.Id).FirstOrDefault();

                if (objData == null)
                {
                    if (model.Id > 0)
                    {
                        tblDept_SectionMapping objResult = await _uow.GenericRepository<tblDept_SectionMapping>().GetByIdAsync(model.Id);
                        if (objResult != null)
                        {
                            var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                            if (!string.IsNullOrEmpty(model.IconImage))
                            {

                                var isValid = CommonUtility.IsAllowedMimeType(model.IconImage, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    model.IconImage = CommonUtility.UploadDepartmentMenuFile(model.IconImage, model.Id, dept.DepartmentShortTitle, false, objResult.IconImage);
                                }
                                else
                                {
                                    return isValid;
                                }
                            }
                            if (!string.IsNullOrEmpty(model.BackGroundImage))
                            {
                                var isValid = CommonUtility.IsAllowedMimeType(model.BackGroundImage, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    model.BackGroundImage = CommonUtility.UploadDepartmentMenuFile(model.BackGroundImage, model.Id, dept.DepartmentShortTitle, false, objResult.BackGroundImage);
                                }
                                else
                                {
                                    return isValid;
                                }
                            }

                            var config = new MapperConfiguration(cfg =>
                            {
                                cfg.CreateMap<DepartmentSectionMappingModel, tblDept_SectionMapping>()
                                .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                                .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                            });
                            IMapper mapper = config.CreateMapper();
                            objResult = mapper.Map(model, objResult);
                            objResult = await _uow.GenericRepository<tblDept_SectionMapping>().UpdateAsync(objResult);
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
                else {
                    return SetResultStatus(string.Empty, MessageStatus.DepartmentSectionExist, false);
                }
              
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Section Mapping Master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentSectionMappingModel> GetById(long id)
        {
            ServiceResponse<DepartmentSectionMappingModel> objReturn = new ServiceResponse<DepartmentSectionMappingModel>();
            try
            {
                tblDept_SectionMapping resultData = _uow.GenericRepository<tblDept_SectionMapping>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDept_SectionMapping, DepartmentSectionMappingModel>()
                        .ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.IconImage))) : string.Empty))
                        .ForMember(des => des.BackGroundImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.BackGroundImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.BackGroundImage))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblDept_SectionMapping, DepartmentSectionMappingModel>(resultData);

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
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                    tblDept_SectionMapping objResult = _uow.GenericRepository<tblDept_SectionMapping>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblDept_SectionMapping>().UpdateAsync(objResult);
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
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping UpdateStatus ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping UpdateStatus ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSectionMapping UpdateStatus ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        #endregion
    }
}
