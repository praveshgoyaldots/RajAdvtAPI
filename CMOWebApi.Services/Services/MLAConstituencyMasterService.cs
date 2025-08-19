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
    public class MLAConstituencyMasterService : BaseService, IMLAConstituencyMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public MLAConstituencyMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get MLA Constituency List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<MLAConstituencyViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<MLAConstituencyViewModel> resulData = new PagedData<MLAConstituencyViewModel>();
                PagedData<vwJAN_PROJ_MLAConstituencyMaster> data = GenericGridCall<vwJAN_PROJ_MLAConstituencyMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_PROJ_MLAConstituencyMaster, MLAConstituencyViewModel>()
                         .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                          .ForMember(des => des.MAPImagePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MAPImagePath) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MAPImagePath.Trim())) : string.Empty))
                            .ForMember(des => des.MLAPhoto, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MLAPhoto) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MLAPhoto.Trim())) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<MLAConstituencyViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

               return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("MLAConstituency GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<MLAConstituencyViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add MLA Constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(MLAConstituencyMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<MLAConstituencyMasterModel, tblJAN_PROJ_MLAConstituencyMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.MAPImagePath, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.MLAPhoto, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PROJ_MLAConstituencyMaster data = Mapper.Map<MLAConstituencyMasterModel, tblJAN_PROJ_MLAConstituencyMaster>(model);
                if (!string.IsNullOrEmpty(model.MAPImagePath))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.MAPImagePath, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.MAPImagePath = CommonUtility.GenerateConstituencyFileName(model.MAPImagePath, model.Name,true);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.MLAPhoto))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.MLAPhoto, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.MLAPhoto = CommonUtility.GenerateConstituencyFileName(model.MLAPhoto, model.Name, true,"",true);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                data = await _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("MLAConstituency Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }
        
        /// <summary>
        /// Update existing MLA Constituency
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(MLAConstituencyMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PROJ_MLAConstituencyMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<MLAConstituencyMasterModel, tblJAN_PROJ_MLAConstituencyMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.MAPImagePath, opt => opt.MapFrom(src => string.Empty))
                            .ForMember(dest => dest.MLAPhoto, opt => opt.MapFrom(src => string.Empty))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); 
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        if (!string.IsNullOrEmpty(model.MAPImagePath))
                        {
                            var isValidPdf = CommonUtility.IsAllowedMimeType(model.MAPImagePath, false, _loginUserDetail.FileSize);
                            if (isValidPdf.IsSuccess)
                            {
                                objResult.MAPImagePath = CommonUtility.GenerateConstituencyFileName(model.MAPImagePath, model.Name, true, objResult.MAPImagePath);
                            }
                            else
                            {
                                return isValidPdf;
                            }
                        }
                        if (!string.IsNullOrEmpty(model.MLAPhoto))
                        {
                            var isValidPdf = CommonUtility.IsAllowedMimeType(model.MLAPhoto, false, _loginUserDetail.FileSize);
                            if (isValidPdf.IsSuccess)
                            {
                                objResult.MLAPhoto = CommonUtility.GenerateConstituencyFileName(model.MLAPhoto, model.Name, true, objResult.MLAPhoto, true);
                            }
                            else
                            {
                                return isValidPdf;
                            }
                        }
                        objResult = await _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().UpdateAsync(objResult);
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
                CreateLogHelper.CreateLogFile("MLAConstituency Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get MLA Constituency by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<MLAConstituencyMasterModel> GetById(long id)
        {
            ServiceResponse<MLAConstituencyMasterModel> objReturn = new ServiceResponse<MLAConstituencyMasterModel>();
            try
            {
                tblJAN_PROJ_MLAConstituencyMaster resultData = _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_MLAConstituencyMaster, MLAConstituencyMasterModel>()
                         .ForMember(des => des.MAPImagePath, src => src.MapFrom(y => !string.IsNullOrEmpty(y.MAPImagePath) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.MAPImagePath.Trim())) : string.Empty))
                           .ForMember(des => des.MLAPhoto, src => src.MapFrom(y => !string.IsNullOrEmpty(y.MLAPhoto) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.MLAPhoto.Trim())) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_MLAConstituencyMaster, MLAConstituencyMasterModel>(resultData);
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
                CreateLogHelper.CreateLogFile("MLAConstituency GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("MLAConstituency GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                    tblJAN_PROJ_MLAConstituencyMaster objResult =  _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_MLAConstituencyMaster>().UpdateAsync(objResult);
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
