using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VendorPressRelease;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class PressReleaseService : BaseService, IPressReleaseService
    {
        #region Variable

        IUnitofWork _uow;

        #endregion

        #region Constructor

        public PressReleaseService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all record of press release
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<PressReleaseListModel>> GetAll(PressReleaseFilterModel model)
        {
            try
            {
                PagedData<PressReleaseListModel> responseList = new PagedData<PressReleaseListModel>();

                object[] @sp_params = new object[19];
                @sp_params[0] = _loginUserDetail.UserId;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.DistrictCode;
                @sp_params[3] = model.VIPCategoryCode;
                @sp_params[4] = model.VIPPersonCode;
                @sp_params[5] = model.SubCategoryCode;
                @sp_params[6] = model.CategoryCode;
                @sp_params[7] = model.ToDate;
                @sp_params[8] = model.FromDate;
                @sp_params[9] = model.Status;
                @sp_params[10] = model.Page;
                @sp_params[11] = model.PageSize;
                @sp_params[12] = string.IsNullOrEmpty(model.OrderBy) ? "ModifiedDate" : model.OrderBy.Trim();
                @sp_params[13] = model.OrderByAsc > 0 ? true : false;
                @sp_params[14] = model.Id;
                @sp_params[15] = model.DIPR_Id;
                @sp_params[16] = model.PressReleaseFromDate;
                @sp_params[17] = model.PressReleaseToDate;
                @sp_params[18] = model.ModifiedBy;



                PagedData<sp_PressReleaseListbySearchFilter_Result> objList = GenericGridCall<sp_PressReleaseListbySearchFilter_Result>.SPListView(@sp_params, model.PageSize, x => !string.IsNullOrEmpty(model.OrderBy) ? null : x.ModifiedDate, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true, true);


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_PressReleaseListbySearchFilter_Result, PressReleaseListModel>()
                      .ForMember(des => des.HomePageImageUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.HomePageImageUrl) ?
                      /*CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.HomePageImageUrl.Trim())) : */
y.HomePageImageUrl.ToAbsolutePath() : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);

                CreateLogHelper.CreateLogFile("Press Release GetAll responseList.Data/DateTime :" + responseList.Data.Count() + "/" + DateTime.Now + " \n");

                PagedData<PressReleaseListModel>.ReturnCustomizeData(responseList, model.PageSize, (objList != null && objList.Data.Count() > 0 ? objList.Data.FirstOrDefault().TotalRecords : 0), page: model.Page);


                //PagedData<ProjectMasterViewModel>.ReturnCustomizeData(responseList, model.PageSize, objList.TotalRecords);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("press release All ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("press release All ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("press release All ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<PressReleaseListModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Get record by id of press release
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<PressReleaseModel>> GetById(long id)
        {
            try
            {
                PressReleaseModel result = new PressReleaseModel();
                tblJAN_PressRelease objData = await _uow.GenericRepository<tblJAN_PressRelease>().GetByIdAsync(id);
                if (objData != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_PressRelease, PressReleaseModel>()
                          .ForMember(des => des.PDFUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFUrl.Trim())) : string.Empty))
                          .ForMember(des => des.ImageUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.ImageUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.ImageUrl.Trim())) : string.Empty))
                          .ForMember(des => des.HomePageImageUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.HomePageImageUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.HomePageImageUrl.Trim())) : string.Empty))
                            .ForMember(dest => dest.VIPCategoryList, opt => opt.MapFrom(src => src.tblJAN_PressReleaseVIPCategoryMapping != null ? src.tblJAN_PressReleaseVIPCategoryMapping.Select(c => c.VIPCategoryCode).ToList() : null))
                         .ForMember(dest => dest.VIPPersionList, opt => opt.MapFrom(src => src.tblJAN_PressReleaseVIPPersionMapping != null ? src.tblJAN_PressReleaseVIPPersionMapping.Select(c => c.VIPPersionCode).ToList() : null))
                         .ForMember(dest => dest.PressReleaseDepartmentMappingList, opt => opt.MapFrom(src => src.tblJAN_PressReleaseDepartmentMappingLookUp != null ? src.tblJAN_PressReleaseDepartmentMappingLookUp.Select(c => c.DepartmentCode).ToList() : null))
                          .ForMember(dest => dest.DistrictList, opt => opt.MapFrom(src => src.tblJAN_PressReleaseDistrictMappingLookUp != null ? src.tblJAN_PressReleaseDistrictMappingLookUp.Select(c => c.DistrictCode).ToList() : null))
                         .ForMember(dest => dest.PDFUrlList, opt => opt.MapFrom(src => src.tblJAN_PressReleaseAttachment != null ? src.tblJAN_PressReleaseAttachment.Select(c => !string.IsNullOrEmpty(c.Path) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(c.Path.Trim())) : string.Empty).ToList() : null))
                          .ForMember(dest => dest.ImageUrlList, opt => opt.MapFrom(src => src.tblJAN_PressReleaseImageAttachment != null ? src.tblJAN_PressReleaseImageAttachment.Select(c => !string.IsNullOrEmpty(c.Path) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(c.Path.Trim())) : string.Empty).ToList() : null));
                    });
                    IMapper mapper = config.CreateMapper();
                    result = mapper.Map(objData, result);
                }
                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("press release GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("press release GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("press release GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PressReleaseModel>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
		/// This for create new record in press release.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> Create(PressReleaseModel model)
        {
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<PressReleaseModel, tblJAN_PressRelease>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.PDFUrl, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.HomePageImageUrl, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                    //.ForMember(dest => dest.PressreleaseDate, opt => opt.MapFrom(src => DateTime.Now));
                });
                tblJAN_PressRelease obj = Mapper.Map<PressReleaseModel, tblJAN_PressRelease>(model);

                if (obj.DIPR_Id == null || obj.DIPR_Id == 0)
                {
                    spJAN_PressReleaseGetDIPR_Id_Result data = _uow.ExeccuteStoreProcedure<spJAN_PressReleaseGetDIPR_Id_Result>("spJAN_PressReleaseGetDIPR_Id").FirstOrDefault();
                    obj.DIPR_Id = data.DIPR_Id;
                }

                await _uow.GenericRepository<tblJAN_PressRelease>().AddAsync(obj);
                _uow.save();

                if (!string.IsNullOrEmpty(model.PDFUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDFUrl, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        obj.PDFUrl = CommonUtility.UploadPressReleaseFile(model.PDFUrl, obj.Id, null);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.ImageUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.ImageUrl, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        obj.ImageUrl = CommonUtility.UploadPressReleaseFile(model.ImageUrl, obj.Id, false);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.HomePageImageUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.HomePageImageUrl, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        obj.HomePageImageUrl = CommonUtility.UploadPressReleaseFile(model.HomePageImageUrl, obj.Id, true);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }

                if (model.VIPCategoryList != null && model.VIPCategoryList.Count > 0)
                {
                    foreach (var category in model.VIPCategoryList)
                    {
                        if (!string.IsNullOrEmpty(category))
                        {
                            tblJAN_PressReleaseVIPCategoryMapping objChild = new tblJAN_PressReleaseVIPCategoryMapping();
                            objChild.PressReleaseId = obj.Id;
                            objChild.VIPCategoryCode = Convert.ToInt32(category);
                            await _uow.GenericRepository<tblJAN_PressReleaseVIPCategoryMapping>().AddAsync(objChild);
                        }
                    }
                }
                if (model.VIPPersionList != null && model.VIPPersionList.Count > 0)
                {
                    foreach (var persion in model.VIPPersionList)
                    {
                        if (!string.IsNullOrEmpty(persion))
                        {
                            tblJAN_PressReleaseVIPPersionMapping objChild = new tblJAN_PressReleaseVIPPersionMapping();
                            objChild.PressReleaseId = obj.Id;
                            objChild.VIPPersionCode = Convert.ToInt32(persion);
                            await _uow.GenericRepository<tblJAN_PressReleaseVIPPersionMapping>().AddAsync(objChild);
                        }
                    }
                }
                obj.Code = obj.Id;
                obj.DisplayOrder = obj.Code;
                await _uow.GenericRepository<tblJAN_PressRelease>().UpdateAsync(obj);

                if (model.PressReleaseDepartmentMappingList != null && model.PressReleaseDepartmentMappingList.Count > 0)
                {
                    foreach (var item in model.PressReleaseDepartmentMappingList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseDepartmentMappingLookUp dmobj = new tblJAN_PressReleaseDepartmentMappingLookUp();
                            dmobj.PressReleaseId = obj.Id;
                            dmobj.DepartmentCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblJAN_PressReleaseDepartmentMappingLookUp>().AddAsync(dmobj);
                        }
                    }

                }
                if (model.DistrictList != null && model.DistrictList.Count > 0)
                {
                    foreach (var item in model.DistrictList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseDistrictMappingLookUp dmobj = new tblJAN_PressReleaseDistrictMappingLookUp();
                            dmobj.PressReleaseId = obj.Id;
                            dmobj.DistrictCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblJAN_PressReleaseDistrictMappingLookUp>().AddAsync(dmobj);
                        }
                    }

                }

                if (model.PDFUrlList != null && model.PDFUrlList.Count > 0)
                {
                    foreach (var item in model.PDFUrlList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseAttachment objchild = new tblJAN_PressReleaseAttachment();
                            objchild.PressReleaseId = obj.Id;
                            objchild.Path = CommonUtility.UploadPressReleaseFile(item, obj.Id, null);
                            await _uow.GenericRepository<tblJAN_PressReleaseAttachment>().AddAsync(objchild);
                        }
                    }
                }

                if (model.ImageUrlList != null && model.ImageUrlList.Count > 0)
                {
                    foreach (var item in model.ImageUrlList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseImageAttachment objchild = new tblJAN_PressReleaseImageAttachment();
                            objchild.PressReleaseId = obj.Id;
                            objchild.Path = CommonUtility.UploadPressReleaseFile(item, obj.Id, false);
                            await _uow.GenericRepository<tblJAN_PressReleaseImageAttachment>().AddAsync(objchild);
                        }
                    }
                }

                _uow.save();

                return SetResultStatus(obj.Id.ToString(), MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("press release Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("press release Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("press release Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// this is for edit the record of press release.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(PressReleaseModel model)
        {
            try
            {
                tblJAN_PressRelease obj = await _uow.GenericRepository<tblJAN_PressRelease>().GetByIdAsync(model.Id);

                if (!string.IsNullOrEmpty(model.PDFUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDFUrl, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        model.PDFUrl = CommonUtility.UploadPressReleaseFile(model.PDFUrl, obj.Id, null, obj.PDFUrl);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.ImageUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.ImageUrl, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        model.ImageUrl = CommonUtility.UploadPressReleaseFile(model.ImageUrl, obj.Id, false, obj.ImageUrl);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                if (!string.IsNullOrEmpty(model.HomePageImageUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.HomePageImageUrl, false, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        model.HomePageImageUrl = CommonUtility.UploadPressReleaseFile(model.HomePageImageUrl, obj.Id, true, obj.HomePageImageUrl);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<PressReleaseModel, tblJAN_PressRelease>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                //Delete existing child record
                if (obj.tblJAN_PressReleaseVIPCategoryMapping.Count > 0)
                {
                    _uow.GenericRepository<tblJAN_PressReleaseVIPCategoryMapping>().DeleteAllById(obj.tblJAN_PressReleaseVIPCategoryMapping);
                }
                if (obj.tblJAN_PressReleaseVIPPersionMapping.Count > 0)
                {
                    _uow.GenericRepository<tblJAN_PressReleaseVIPPersionMapping>().DeleteAllById(obj.tblJAN_PressReleaseVIPPersionMapping);
                }
                ///First record delete from child table.
                if (obj.tblJAN_PressReleaseDepartmentMappingLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblJAN_PressReleaseDepartmentMappingLookUp>().DeleteAllById(obj.tblJAN_PressReleaseDepartmentMappingLookUp.ToList());
                }
                if (obj.tblJAN_PressReleaseDistrictMappingLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblJAN_PressReleaseDistrictMappingLookUp>().DeleteAllById(obj.tblJAN_PressReleaseDistrictMappingLookUp.ToList());
                }

                // add child records
                if (model.VIPCategoryList != null && model.VIPCategoryList.Count > 0)
                {
                    foreach (var category in model.VIPCategoryList)
                    {
                        if (!string.IsNullOrEmpty(category))
                        {
                            tblJAN_PressReleaseVIPCategoryMapping objChild = new tblJAN_PressReleaseVIPCategoryMapping();
                            objChild.PressReleaseId = obj.Id;
                            objChild.VIPCategoryCode = Convert.ToInt32(category);
                            await _uow.GenericRepository<tblJAN_PressReleaseVIPCategoryMapping>().AddAsync(objChild);
                        }
                    }
                }
                if (model.VIPPersionList != null && model.VIPPersionList.Count > 0)
                {
                    foreach (var persion in model.VIPPersionList)
                    {
                        if (!string.IsNullOrEmpty(persion))
                        {
                            tblJAN_PressReleaseVIPPersionMapping objChild = new tblJAN_PressReleaseVIPPersionMapping();
                            objChild.PressReleaseId = obj.Id;
                            objChild.VIPPersionCode = Convert.ToInt32(persion);
                            await _uow.GenericRepository<tblJAN_PressReleaseVIPPersionMapping>().AddAsync(objChild);
                        }
                    }
                }
                ///save record of department from lookup table.
                if (model.PressReleaseDepartmentMappingList != null && model.PressReleaseDepartmentMappingList.Count > 0)
                {
                    foreach (var item in model.PressReleaseDepartmentMappingList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseDepartmentMappingLookUp dmobj = new tblJAN_PressReleaseDepartmentMappingLookUp();
                            dmobj.PressReleaseId = obj.Id;
                            dmobj.DepartmentCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblJAN_PressReleaseDepartmentMappingLookUp>().AddAsync(dmobj);
                        }
                    }

                }

                if (model.DistrictList != null && model.DistrictList.Count > 0)
                {
                    foreach (var item in model.DistrictList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseDistrictMappingLookUp dmobj = new tblJAN_PressReleaseDistrictMappingLookUp();
                            dmobj.PressReleaseId = obj.Id;
                            dmobj.DistrictCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblJAN_PressReleaseDistrictMappingLookUp>().AddAsync(dmobj);
                        }
                    }

                }
                ////REMOVE OLD FILES FROM FOLDER AND DB  AND UPDATE NEW IN FOLDER AND DB
                if (model.PDFUrlList != null && model.PDFUrlList.Count > 0)
                {
                    List<tblJAN_PressReleaseAttachment> oldImageFiles = obj.tblJAN_PressReleaseAttachment.ToList();
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
                        _uow.GenericRepository<tblJAN_PressReleaseAttachment>().DeleteAllById(oldImageFiles);
                    }

                    //// UPDATE NEW FILE IN FOLDER AND DB
                    foreach (var item in model.PDFUrlList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseAttachment objchild = new tblJAN_PressReleaseAttachment();
                            objchild.PressReleaseId = obj.Id;
                            objchild.Path = CommonUtility.UploadPressReleaseFile(item, obj.Id, null);
                            await _uow.GenericRepository<tblJAN_PressReleaseAttachment>().AddAsync(objchild);
                        }
                    }
                }

                ////REMOVE OLD FILES FROM FOLDER AND DB  AND UPDATE NEW IN FOLDER AND DB
                if (model.ImageUrlList != null && model.ImageUrlList.Count > 0)
                {
                    List<tblJAN_PressReleaseImageAttachment> oldImageFiles = obj.tblJAN_PressReleaseImageAttachment.ToList();
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
                        _uow.GenericRepository<tblJAN_PressReleaseImageAttachment>().DeleteAllById(oldImageFiles);
                    }

                    //// UPDATE NEW FILE IN FOLDER AND DB
                    foreach (var item in model.ImageUrlList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_PressReleaseImageAttachment objchild = new tblJAN_PressReleaseImageAttachment();
                            objchild.PressReleaseId = obj.Id;
                            objchild.Path = CommonUtility.UploadPressReleaseFile(item, obj.Id, null);
                            await _uow.GenericRepository<tblJAN_PressReleaseImageAttachment>().AddAsync(objchild);
                        }
                    }
                }

                await _uow.GenericRepository<tblJAN_PressRelease>().UpdateAsync(obj);

                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("press release Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("press release Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("press release Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
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
                    tblJAN_PressRelease objResult = await _uow.GenericRepository<tblJAN_PressRelease>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PressRelease>().UpdateAsync(objResult);
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

        #endregion

        #region /// Press Release User configration Method ///

        /// <summary>
        /// Craete new press release User Configration 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> CreateUserConfigration(PressReleaseUserConfigrationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<PressReleaseUserConfigrationModel, tblJAN_PressReleaseUserConfigration>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PressReleaseUserConfigration data = Mapper.Map<PressReleaseUserConfigrationModel, tblJAN_PressReleaseUserConfigration>(model);

                data = await _uow.GenericRepository<tblJAN_PressReleaseUserConfigration>().AddAsync(data);
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

        /// <summary>
        /// Update existing press release User Configration 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> EditUserConfigration(PressReleaseUserConfigrationModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PressReleaseUserConfigration objResult = await _uow.GenericRepository<tblJAN_PressReleaseUserConfigration>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<PressReleaseUserConfigrationModel, tblJAN_PressReleaseUserConfigration>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_PressReleaseUserConfigration>().UpdateAsync(objResult);
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

        /// <summary>
        /// Get all press release User Configration 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<PressReleaseUserConfigrationModel>> GetAllUserConfigration(IndexModel model)
        {
            ServiceResponse<PagedData<PressReleaseUserConfigrationModel>> objReturn = new ServiceResponse<PagedData<PressReleaseUserConfigrationModel>>();
            try
            {
                PagedData<PressReleaseUserConfigrationModel> resulData = new PagedData<PressReleaseUserConfigrationModel>();

                string fromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("FromDate") ? (model.AdvanceSearchModel["FromDate"].ToString()) : string.Empty) : string.Empty;

                string toDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ToDate") ? (model.AdvanceSearchModel["ToDate"]).ToString() : string.Empty) : string.Empty;

                PagedData<vw_Jan_PressReleaseUserConfigration> data = GenericGridCall<vw_Jan_PressReleaseUserConfigration>.ListView(model.PageSize, x => x.Id, x => x.IsDeleted == false && (!string.IsNullOrEmpty(fromDate) ? Convert.ToDateTime(x.ModifiedDate).Date >= Convert.ToDateTime(fromDate).Date : true) && (!string.IsNullOrEmpty(toDate) ? Convert.ToDateTime(x.ModifiedDate).Date <= Convert.ToDateTime(toDate).Date : true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_Jan_PressReleaseUserConfigration, PressReleaseUserConfigrationModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<PressReleaseUserConfigrationModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<PressReleaseUserConfigrationModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// press release User Configration  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<PressReleaseUserConfigrationModel> GetByIdUserConfigration(long id)
        {
            ServiceResponse<PressReleaseUserConfigrationModel> objReturn = new ServiceResponse<PressReleaseUserConfigrationModel>();
            try
            {
                tblJAN_PressReleaseUserConfigration resultData = _uow.GenericRepository<tblJAN_PressReleaseUserConfigration>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PressReleaseUserConfigration, PressReleaseUserConfigrationModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PressReleaseUserConfigration, PressReleaseUserConfigrationModel>(resultData);
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
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatusUserConfigration(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblJAN_PressReleaseUserConfigration objResult = await _uow.GenericRepository<tblJAN_PressReleaseUserConfigration>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PressReleaseUserConfigration>().UpdateAsync(objResult);
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


        #endregion


    }
}
