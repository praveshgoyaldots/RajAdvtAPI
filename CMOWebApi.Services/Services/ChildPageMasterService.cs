using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.DdlKeysEnum;

namespace CMOWebApi.Services.Services
{
    public class ChildPageMasterService : BaseService, IChildPageMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public ChildPageMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Child Page Master List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<ChildPageMasterViewModel>> GetAll(ChildPageFilterModel model)
        {
            try
            {
                PagedData<ChildPageMasterViewModel> resulData = new PagedData<ChildPageMasterViewModel>();
                PagedData<vwJAN_ChildPageMasterDetail> data = GenericGridCall<vwJAN_ChildPageMasterDetail>.ListView(model.PageSize, x => x.CreatedDate, x => !x.IsDeleted
                && (model.PageCode > 0 ? x.PageCode == model.PageCode : true) && (model.PageTypeCode > 0 ? x.PageTypeCode == model.PageTypeCode : true) && (!string.IsNullOrEmpty(model.ApplicationCode) ? x.ApplicationCode == model.ApplicationCode : true) && (model.ManualTypeCode == 0 || model.ManualTypeCode == x.ManualTypeCode)
                , model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_ChildPageMasterDetail, ChildPageMasterViewModel>()
                    .ForMember(d => d.ManualType, opt => opt.MapFrom(src => Enum.GetName(typeof(ManualTypeEnum), src.ManualTypeCode)));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<ChildPageMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Child Page Master GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<ChildPageMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add Child Page Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ChildPageMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ChildPageMasterModel, tblJAN_ChildPageMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.PDFURL, opt => opt.MapFrom(src => string.Empty))
                     .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_ChildPageMaster data = Mapper.Map<ChildPageMasterModel, tblJAN_ChildPageMaster>(model);

                vwJAN_PageMasterDetail pagedata = _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(filter: x => x.PageCode == model.PageCode).FirstOrDefault();

                if (!string.IsNullOrEmpty(model.PDFURL))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDFURL, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.PDFURL = CommonUtility.GenerateChildPageMasterFileName(model.PDFURL, pagedata.PageTitle);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.ImageURL))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.ImageURL, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.ImageURL = CommonUtility.GenerateChildPageMasterFileName(model.ImageURL, pagedata.PageTitle, false);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                data = await _uow.GenericRepository<tblJAN_ChildPageMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_ChildPageMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Child Page Master Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Child Page Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ChildPageMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_ChildPageMaster objResult = await _uow.GenericRepository<tblJAN_ChildPageMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ChildPageMasterModel, tblJAN_ChildPageMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.PDFURL, opt => opt.MapFrom(src => string.Empty))
                             .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(src => string.Empty))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);

                        vwJAN_PageMasterDetail pagedata = _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(filter: x => x.PageCode == model.PageCode).FirstOrDefault();

                        if (!string.IsNullOrEmpty(model.PDFURL))
                        {
                            var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDFURL, true, _loginUserDetail.FileSize);
                            if (isValidPdf.IsSuccess)
                            {
                                objResult.PDFURL = CommonUtility.GenerateChildPageMasterFileName(model.PDFURL, pagedata.PageTitle, true, objResult.PDFURL);
                            }
                            else
                            {
                                return isValidPdf;
                            }
                        }
                        if (!string.IsNullOrEmpty(model.ImageURL))
                        {
                            var isValidPdf = CommonUtility.IsAllowedMimeType(model.ImageURL, false, _loginUserDetail.FileSize);
                            if (isValidPdf.IsSuccess)
                            {
                                objResult.ImageURL = CommonUtility.GenerateChildPageMasterFileName(model.ImageURL, pagedata.PageTitle, false, objResult.ImageURL);
                            }
                            else
                            {
                                return isValidPdf;
                            }
                        }
                        objResult = await _uow.GenericRepository<tblJAN_ChildPageMaster>().UpdateAsync(objResult);
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
                CreateLogHelper.CreateLogFile("Child Page Master Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Child Page Master by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ChildPageMasterModel> GetById(long id)
        {
            ServiceResponse<ChildPageMasterModel> objReturn = new ServiceResponse<ChildPageMasterModel>();
            try
            {
                tblJAN_ChildPageMaster resultData = _uow.GenericRepository<tblJAN_ChildPageMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_ChildPageMaster, ChildPageMasterModel>()
                         .ForMember(des => des.PDFURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFURL.Trim())) : string.Empty))
                            .ForMember(des => des.ImageURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.ImageURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.ImageURL.Trim())) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_ChildPageMaster, ChildPageMasterModel>(resultData);
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
                CreateLogHelper.CreateLogFile("Child Page Master GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                    tblJAN_ChildPageMaster objResult = _uow.GenericRepository<tblJAN_ChildPageMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_ChildPageMaster>().UpdateAsync(objResult);
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
        /// Get Page Detail By Page Code
        /// </summary>
        /// <param name="pageCode"></param>
        /// <returns></returns>
        public ServiceResponse<PageMasterDetailModel> GetPageDetailByPageCode(long pageCode)
        {
            ServiceResponse<PageMasterDetailModel> objReturn = new ServiceResponse<PageMasterDetailModel>();
            try
            {
                vwJAN_PageMasterDetail resultData = _uow.GenericRepository<vwJAN_PageMasterDetail>().GetAll(filter: x => x.PageCode == pageCode).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwJAN_PageMasterDetail, PageMasterDetailModel>();
                    });
                    objReturn.Data = Mapper.Map<vwJAN_PageMasterDetail, PageMasterDetailModel>(resultData);
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
                CreateLogHelper.CreateLogFile("GetPageDetailByPageCode ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetPageDetailByPageCode ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetPageDetailByPageCode ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Get Page detail list by menu name
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ChildPageMasterViewModel>> GetPageListByMenuName(PageManualModel model)
        {
            try
            {
                List<vwJAN_ChildPageMasterDetail> dataList = new List<vwJAN_ChildPageMasterDetail>();
                List<ChildPageMasterViewModel> resulData = new List<ChildPageMasterViewModel>();
                if (model.LookupTypeId > 0)
                {
                    dataList = _uow.GenericRepository<vwJAN_ChildPageMasterDetail>().GetAll(filter: x => x.LookupTypeId == model.LookupTypeId).ToList();
                }
                else if (model.SchemeTypeCode > 0)
                {
                    dataList = _uow.GenericRepository<vwJAN_ChildPageMasterDetail>().GetAll(filter: x => x.SchemeTypeCode == model.SchemeTypeCode).ToList();
                }
                else
                {
                    dataList = _uow.GenericRepository<vwJAN_ChildPageMasterDetail>().GetAll(filter: x => x.MenuTitle.Trim().ToLower().Replace(" ", "") == model.menuName.Trim().ToLower().Replace(" ", "")).ToList();
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_ChildPageMasterDetail, ChildPageMasterViewModel>()
                     .ForMember(des => des.PDFURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFURL.Trim())) : string.Empty))
                            .ForMember(des => des.ImageURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.ImageURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.ImageURL.Trim())) : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData = mapper.Map(dataList, resulData);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Child Page Master GetPageListByMenuName ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master GetPageListByMenuName ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Child Page Master GetPageListByMenuName ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<ChildPageMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion


    }
}
