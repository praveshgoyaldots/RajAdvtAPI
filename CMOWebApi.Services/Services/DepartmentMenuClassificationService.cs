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
    public class DepartmentMenuClassificationService : BaseService, IDepartmentMenuClassificationService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public DepartmentMenuClassificationService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Jankalyan Category List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentMainMenuModel>> GetAll(DepartmentMainMenuFilterModel model)
        {
            try
            {
                PagedData<DepartmentMainMenuModel> resulData = new PagedData<DepartmentMainMenuModel>();

                object[] @sp_params = new object[11];

                @sp_params[0] = model.DepartmentCode;
                @sp_params[1] = model.MenuClassificationCode;
                @sp_params[2] = model.ToDate;
                @sp_params[3] = model.FromDate;
                @sp_params[4] = model.Status;
                @sp_params[5] = model.CreatedBy;
                @sp_params[6] = model.Page;
                @sp_params[7] = model.PageSize;
                @sp_params[8] = string.IsNullOrEmpty(model.OrderBy) ? "DisplayOrder" : model.OrderBy.Trim();
                @sp_params[9] = model.OrderByAsc > 0 ? true : false;
                @sp_params[10] = _loginUserDetail.UserId;


                PagedData<SP_Dept_DepartmentMenuList_Result> DataList = GenericGridCall<SP_Dept_DepartmentMenuList_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.DisplayOrder, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_Dept_DepartmentMenuList_Result, DepartmentMainMenuModel>()
                         .ForMember(des => des.DisplayNameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DisplayNameHindi) ? x.DisplayNameHindi : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(DataList.Data, resulData.Data);

                PagedData<DepartmentMainMenuModel>.ReturnCustomizeData(resulData, model.PageSize, DataList.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentMainMenuModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add Jankalyan Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(DepartmentMenuClassificationModel model)
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
                        model.IconImage = CommonUtility.UploadDepartmentMenuFile(model.IconImage, model.Id, dept.DepartmentShortTitle,true);
                    }
                    else
                    {
                        return isValid;
                    }
                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<DepartmentMenuClassificationModel, tblDept_DepartmentMainMenu>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblDept_DepartmentMainMenu data = Mapper.Map<DepartmentMenuClassificationModel, tblDept_DepartmentMainMenu>(model);

                data = await _uow.GenericRepository<tblDept_DepartmentMainMenu>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblDept_DepartmentMainMenu>().UpdateAsync(data);
                _uow.save();                

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Jankalyan Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(DepartmentMenuClassificationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblDept_DepartmentMainMenu objResult = await _uow.GenericRepository<tblDept_DepartmentMainMenu>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        if (!string.IsNullOrEmpty(model.IconImage))
                        {
                            var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();

                            var isValid = CommonUtility.IsAllowedMimeType(model.IconImage, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                model.IconImage = CommonUtility.UploadDepartmentMenuFile(model.IconImage, model.Id, dept.DepartmentShortTitle, true,objResult.IconImage);
                            }
                            else
                            {
                                return isValid;
                            }
                        }

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<DepartmentMenuClassificationModel, tblDept_DepartmentMainMenu>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblDept_DepartmentMainMenu>().UpdateAsync(objResult);
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
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Jankalyan Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<DepartmentMenuClassificationModel> GetById(long id)
        {
            ServiceResponse<DepartmentMenuClassificationModel> objReturn = new ServiceResponse<DepartmentMenuClassificationModel>();
            try
            {
                tblDept_DepartmentMainMenu resultData = _uow.GenericRepository<tblDept_DepartmentMainMenu>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDept_DepartmentMainMenu, DepartmentMenuClassificationModel>()
                        .ForMember(des => des.IconImage, src => src.MapFrom(f => !string.IsNullOrEmpty(f.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.IconImage))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblDept_DepartmentMainMenu, DepartmentMenuClassificationModel>(resultData);

                    //objReturn.Data.GeneralDepartmentDistrictMappingList = resultData.tblDept_DepartmentMainMenuDistrictDepartmentMappingLookUp.Select(x => Convert.ToString(x.DepartmentCode)).ToList();

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
        /// Set Actvive De-Actvive status by Id
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
                    tblDept_DepartmentMainMenu objResult = _uow.GenericRepository<tblDept_DepartmentMainMenu>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblDept_DepartmentMainMenu>().UpdateAsync(objResult);
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

        #endregion
    }
}
