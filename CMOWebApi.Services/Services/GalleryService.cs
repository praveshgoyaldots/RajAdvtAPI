using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
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
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.Services
{
    public class GalleryService : BaseService, IGalleryService
    {
        #region ///   variable  //
        IUnitofWork _uow;

        #endregion

        #region ///   constructor   ///
        public GalleryService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region ///   Method   ///

        /// <summary>
        /// Get All Gallery data in list Format
        /// </summary>
        /// <param name="model">IndexModel: default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public ServiceResponse<PagedData<GalleryViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<GalleryViewModel>> objReturn = new ServiceResponse<PagedData<GalleryViewModel>>();
            try
            {
                PagedData<GalleryViewModel> resulData = new PagedData<GalleryViewModel>();
                PagedData<vwPhotoVedioGallery> data = GenericGridCall<vwPhotoVedioGallery>.ListView(model.PageSize, x => x.CreatedOn, x => !x.IsDelete, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwPhotoVedioGallery, GalleryViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<GalleryViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<GalleryViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Get Gallery Detail
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public ServiceResponse<GalleryViewModel> GetById(int id)
        {
            ServiceResponse<GalleryViewModel> objReturn = new ServiceResponse<GalleryViewModel>();
            try
            {
                vwPhotoVedioGallery objMaster = _uow.GenericRepository<vwPhotoVedioGallery>().GetAll(filter: x => x.GalleryCode == id).FirstOrDefault();
                if (objMaster != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwPhotoVedioGallery, GalleryViewModel>()
                        .ForMember(dest => dest.Thumbnail, src => src.MapFrom(result => result.Thumbnail.ToAbsolutePath()));
                        x.CreateMap<tblPhotoVedioGalleryFile, GalleryFileViewModel>()
                        .ForMember(dest => dest.FilePath, src => src.MapFrom(result => result.FilePath.ToAbsolutePath()));
                    });
                    objReturn.Data = Mapper.Map<vwPhotoVedioGallery, GalleryViewModel>(objMaster);

                    #region Get Documents
                    List<tblPhotoVedioGalleryFile> objDocList = _uow.GenericRepository<tblPhotoVedioGalleryFile>().GetAll(filter: x => x.GalleryCode == id).ToList();
                    if (objDocList != null && objDocList.Count > 0)
                    {
                        objReturn.Data.GalleryFileList = Mapper.Map<List<tblPhotoVedioGalleryFile>, List<GalleryFileViewModel>>(objDocList);
                    }
                    #endregion

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
        /// Add/Update Gallery Detail
        /// </summary>
        /// <param name="model">GalleryViewModel</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public ServiceResponse<string> AddUpdate(GalleryViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                #region Upload Thumbnail
                if (!string.IsNullOrEmpty(model.Thumbnail))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Thumbnail);
                    if (isValid.IsSuccess)
                    {
                        string thumbnailPath = FilePath.GalleryThumbnailPath.GetStringValue();
                        string path = HttpContext.Current.Server.MapPath(thumbnailPath);
                        model.Thumbnail = CommonUtility.SaveFileFromBase64str(model.Thumbnail, path);
                    }
                }
                #endregion

                string paramStr = string.Empty;
                List<SqlParameter> param = SetSPAddUpdateGalleryParam(model, out paramStr);
                spAddUpdateGallery_Result Result = _uow.ExeccuteStoreProcedure<spAddUpdateGallery_Result>("spAddUpdateGallery " + paramStr, param.ToArray()).FirstOrDefault();
                _uow.save();

                model.GalleryCode = Convert.ToInt32(Result.GalleryCode);

                #region Upload Files
                if (model.GalleryFileList != null && model.GalleryFileList.Count > 0)
                {
                    string galleryFilePath = FilePath.GalleryFilePath.GetStringValue();
                    for (int i = 0; i < model.GalleryFileList.Count; i++)
                    {
                        if (!string.IsNullOrEmpty(model.GalleryFileList[i].FilePath))
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(model.GalleryFileList[i].FilePath, false);
                            if (isValid.IsSuccess)
                            {
                                string fileName = DateTime.Now.ToString("ddMMyyyyHHmmss") + "_" + model.GalleryFileList[i].FileName.Replace(" ", "");
                                model.GalleryFileList[i].FilePath = CommonUtility.UploadDocument(model.GalleryFileList[i].FilePath, fileName, galleryFilePath);
                                if (model.GalleryFileList[i].FilePath != null)
                                {
                                    model.GalleryFileList[i].FilePath = model.GalleryFileList[i].FilePath.Replace("~", "");
                                }

                                tblPhotoVedioGalleryFile file = new tblPhotoVedioGalleryFile();
                                file.GalleryCode = model.GalleryCode;
                                file.FileName = model.GalleryFileList[i].FileName.Replace(" ", "");
                                file.FilePath = model.GalleryFileList[i].FilePath;
                                file.Extension = model.GalleryFileList[i].Extension;
                                _uow.GenericRepository<tblPhotoVedioGalleryFile>().Add(file);
                            }
                            else
                            {
                                return isValid;
                            }
                        }
                        _uow.save();
                    }
                }
                #endregion

                //if add
                if (Result.GalleryCode > 0 && model.GalleryCode == 0)
                {
                    objReturn = SetResultStatus(Result.GalleryCode.ToString(), MessageStatus.Save, true);
                }
                //if Update
                else if (Result.GalleryCode > 0 && model.GalleryCode > 0)
                {
                    objReturn = SetResultStatus(Result.ToString(), MessageStatus.Update, true);
                }
                else
                {
                    objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
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
        /// Get All Details
        /// </summary>
        /// <param name="model">IndexModel: default value: Page=1; PageSize = 10;OrderByAsc = 1; AdvanceSearchModel { "UploadType" : Value ,"TypeCode":value}</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllDetails(IndexModel model, string excludeUploadType = "")
        {
            ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> objReturn = new ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>>();
            try
            {
                string UploadType = string.Empty; int TypeCode = 0; string type = string.Empty;
                if (model != null && model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0)
                {
                    UploadType = model.AdvanceSearchModel.ContainsKey("UploadType") ? model.AdvanceSearchModel["UploadType"].ToString() : string.Empty;
                    type = model.AdvanceSearchModel.ContainsKey("Type") ? model.AdvanceSearchModel["Type"].ToString() : string.Empty;
                    TypeCode = model.AdvanceSearchModel.ContainsKey("TypeCode") ? Convert.ToInt32(model.AdvanceSearchModel["TypeCode"].ToString()) : 0;

                }
                PagedData<PhotoVideoGalleryFileViewModel> resulData = new PagedData<PhotoVideoGalleryFileViewModel>();
                object[] sqlParameters = new object[4];


                sqlParameters[0] = UploadType;
                sqlParameters[1] = !string.IsNullOrEmpty(excludeUploadType) ? excludeUploadType : string.Empty;
                sqlParameters[2] = type;
                sqlParameters[3] = TypeCode;


                PagedData<spPhotoVedioGalleryFiles_Result> data = GenericGridCall<spPhotoVedioGalleryFiles_Result>.ListView(sqlParameters, model.PageSize, x => x.CreatedOn, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spPhotoVedioGalleryFiles_Result, PhotoVideoGalleryFileViewModel>()
                    .ForMember(des => des.FilePath, src => src.MapFrom(x => !string.IsNullOrEmpty(x.FilePath) ? x.FilePath.ToAbsolutePath() : null))
                    .ForMember(des => des.Thumbnail, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Thumbnail) ? x.Thumbnail.ToAbsolutePath() : null));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<PhotoVideoGalleryFileViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {

                objReturn = SetResultStatus<PagedData<PhotoVideoGalleryFileViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Update Delete Status of Gallery
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblPhotoVedioGallery objMaster = await _uow.GenericRepository<tblPhotoVedioGallery>().GetByIdAsync(id);
                    if (objMaster != null)
                    {
                        objMaster.IsDelete = !objMaster.IsDelete;
                        await _uow.GenericRepository<tblPhotoVedioGallery>().UpdateAsync(objMaster);
                        _uow.save();
                        objReturn = SetResultStatus(objMaster.GalleryCode.ToString(), MessageStatus.StatusUpdate, true);
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
        /// Update Active Status of Gallery
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblPhotoVedioGallery objMaster = await _uow.GenericRepository<tblPhotoVedioGallery>().GetByIdAsync(id);
                    if (objMaster != null)
                    {
                        objMaster.IsActive = !objMaster.IsActive;
                        await _uow.GenericRepository<tblPhotoVedioGallery>().UpdateAsync(objMaster);
                        _uow.save();
                        objReturn = SetResultStatus(objMaster.GalleryCode.ToString(), MessageStatus.StatusUpdate, true);
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

        #region ///   Private Method   ///

        /// <summary>
        /// Set spAddUpdateGallery Parameters
        /// </summary>
        /// <param name="model">GalleryViewModel</param>
        /// <param name="paramStr">Mapping stirng related to parameter</param>
        /// <returns>List<SqlParameter></returns>
        private List<SqlParameter> SetSPAddUpdateGalleryParam(GalleryViewModel model, out string paramStr)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            string mapStr = string.Empty;
            try
            {
                mapStr += "@GalleryCode";
                sqlParam.Add(new SqlParameter("GalleryCode", SqlDbType.Int) { Value = model.GalleryCode });

                mapStr += ",@Type";
                sqlParam.Add(new SqlParameter("Type", SqlDbType.NVarChar) { Value = model.Type ?? (object)DBNull.Value });

                mapStr += ",@TypeCode";
                sqlParam.Add(new SqlParameter("TypeCode", SqlDbType.Int) { Value = model.TypeCode });

                mapStr += ",@Caption";
                sqlParam.Add(new SqlParameter("Caption", SqlDbType.NVarChar) { Value = model.Caption ?? (object)DBNull.Value });

                mapStr += ",@Url";
                sqlParam.Add(new SqlParameter("Url", SqlDbType.NVarChar) { Value = model.Url ?? (object)DBNull.Value });

                mapStr += ",@UploadType";
                sqlParam.Add(new SqlParameter("UploadType", SqlDbType.NVarChar) { Value = model.UploadType ?? (object)DBNull.Value });

                mapStr += ",@Thumbnail";
                sqlParam.Add(new SqlParameter("Thumbnail", SqlDbType.NVarChar) { Value = model.Thumbnail ?? (object)DBNull.Value });

                mapStr += ",@DeletedFileCodes";
                sqlParam.Add(new SqlParameter("DeletedFileCodes", SqlDbType.NVarChar) { Value = model.DeletedFileCodes ?? (object)DBNull.Value });

                mapStr += ",@IsActive";
                sqlParam.Add(new SqlParameter("IsActive", SqlDbType.Bit) { Value = model.IsActive });

                mapStr += ",@CreatedBy";
                sqlParam.Add(new SqlParameter("CreatedBy", SqlDbType.Int) { Value = model.CreatedBy == null ? (object)DBNull.Value : model.CreatedBy });

                mapStr += ",@ModifiedBy";
                sqlParam.Add(new SqlParameter("ModifiedBy", SqlDbType.Int) { Value = model.ModifiedBy == null ? (object)DBNull.Value : model.ModifiedBy });
            }
            catch
            {
                throw;
            }
            paramStr = mapStr;
            return sqlParam;
        }

        #endregion

    }
}
