using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class MPConstituencyMasterService : BaseService, IMPConstituencyMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public MPConstituencyMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get MP Constituency List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<MPConstituencyMasterModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<MPConstituencyMasterModel> resulData = new PagedData<MPConstituencyMasterModel>();
                PagedData<tblJAN_PROJ_MPConstituencyMaster> data = GenericGridCall<tblJAN_PROJ_MPConstituencyMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblJAN_PROJ_MPConstituencyMaster, MPConstituencyMasterModel>()
                         .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                          .ForMember(des => des.MAPImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MAPImagePath) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MAPImagePath.Trim())) : string.Empty))
                              .ForMember(des => des.MPPhoto, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MPPhoto) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MPPhoto.Trim())) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<MPConstituencyMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

               return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("MPConstituency GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<MPConstituencyMasterModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add MP Constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(MPConstituencyMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<MPConstituencyMasterModel, tblJAN_PROJ_MPConstituencyMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.MAPImagePath, opt => opt.MapFrom(src => string.Empty))
                     .ForMember(dest => dest.MPPhoto, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PROJ_MPConstituencyMaster data = Mapper.Map<MPConstituencyMasterModel, tblJAN_PROJ_MPConstituencyMaster>(model);
                if (!string.IsNullOrEmpty(model.MAPImagePath))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.MAPImagePath, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.MAPImagePath = CommonUtility.GenerateConstituencyFileName(model.MAPImagePath, model.Name);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.MPPhoto))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.MPPhoto, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.MPPhoto = CommonUtility.GenerateConstituencyFileName(model.MPPhoto, model.Name, false, "", true);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                data = await _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("MPConstituency Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing MP Constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(MPConstituencyMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PROJ_MPConstituencyMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<MPConstituencyMasterModel, tblJAN_PROJ_MPConstituencyMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.MAPImagePath, opt => opt.MapFrom(src => string.Empty))
                             .ForMember(dest => dest.MPPhoto, opt => opt.MapFrom(src => string.Empty))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); 
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        if (!string.IsNullOrEmpty(model.MAPImagePath))
                        {
                            var isValidPdf = CommonUtility.IsAllowedMimeType(model.MAPImagePath, false, _loginUserDetail.FileSize);
                            if (isValidPdf.IsSuccess)
                            {
                                objResult.MAPImagePath = CommonUtility.GenerateConstituencyFileName(model.MAPImagePath, model.Name,false, objResult.MAPImagePath);
                            }
                            else
                            {
                                return isValidPdf;
                            }
                        }
                        if (!string.IsNullOrEmpty(model.MPPhoto))
                        {
                            var isValidPdf = CommonUtility.IsAllowedMimeType(model.MPPhoto, false, _loginUserDetail.FileSize);
                            if (isValidPdf.IsSuccess)
                            {
                                objResult.MPPhoto = CommonUtility.GenerateConstituencyFileName(model.MPPhoto, model.Name, false, objResult.MPPhoto, true);
                            }
                            else
                            {
                                return isValidPdf;
                            }
                        }
                        objResult = await _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().UpdateAsync(objResult);
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
                CreateLogHelper.CreateLogFile("MPConstituency Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get MP Constituency by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<MPConstituencyMasterModel> GetById(long id)
        {
            ServiceResponse<MPConstituencyMasterModel> objReturn = new ServiceResponse<MPConstituencyMasterModel>();
            try
            {
                tblJAN_PROJ_MPConstituencyMaster resultData = _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_MPConstituencyMaster, MPConstituencyMasterModel>()
                         .ForMember(des => des.MAPImagePath, src => src.MapFrom(y => !string.IsNullOrEmpty(y.MAPImagePath) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.MAPImagePath.Trim())) : string.Empty))
                            .ForMember(des => des.MPPhoto, src => src.MapFrom(y => !string.IsNullOrEmpty(y.MPPhoto) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.MPPhoto.Trim())) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_MPConstituencyMaster, MPConstituencyMasterModel>(resultData);
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
                CreateLogHelper.CreateLogFile("MPConstituency GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MPConstituency GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                    tblJAN_PROJ_MPConstituencyMaster objResult =  _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_MPConstituencyMaster>().UpdateAsync(objResult);
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
