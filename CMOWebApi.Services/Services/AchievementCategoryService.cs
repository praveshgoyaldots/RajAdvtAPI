using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.Services
{
    public class AchievementCategoryService : BaseService, IAchievementCategoryService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public AchievementCategoryService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        public async Task<ServiceResponse<string>> Create(AdvAchievementCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<AdvAchievementCategoryMasterModel, tblADV_AchievementCategoryMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.Empty))
                     .ForMember(dest => dest.HelpFileURL, opt => opt.MapFrom(src => string.Empty))
                     .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblADV_AchievementCategoryMaster data = Mapper.Map<AdvAchievementCategoryMasterModel, tblADV_AchievementCategoryMaster>(model);

                data = await _uow.GenericRepository<tblADV_AchievementCategoryMaster>().AddAsync(data);
                _uow.save();

                if (!string.IsNullOrEmpty(model.ImagePath))
                {
                    data.ImagePath = CommonUtility.UploadAchievementMaster(model.ImagePath, data.CategoryId, false, true);
                }
                if (!string.IsNullOrEmpty(model.HelpFileURL))
                {
                    data.HelpFileURL = CommonUtility.UploadAchievementHelpFile(model.HelpFileURL, data.CategoryId, model.Title, true, "");
                }

                data.CategoryCode = Convert.ToInt32(data.CategoryId);
                data = await _uow.GenericRepository<tblADV_AchievementCategoryMaster>().UpdateAsync(data);
				///save record of department, district from lookup table.
				if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
				{
					foreach (var item in model.GeneralDepartmentDistrictMappingList)
					{
						if (!string.IsNullOrEmpty(item))
						{
							tblADV_AchievementCategoryDistrictDepartmentMappingLookUp obj = new tblADV_AchievementCategoryDistrictDepartmentMappingLookUp();
							obj.CategoryId = data.CategoryId;
							obj.DepartmentCode = Convert.ToInt32(item);
							await _uow.GenericRepository<tblADV_AchievementCategoryDistrictDepartmentMappingLookUp>().AddAsync(obj);
						}
					}

				}
				_uow.save();

                objReturn = SetResultStatus(data.CategoryId.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public async Task<ServiceResponse<string>> Edit(AdvAchievementCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.CategoryId > 0)
                {
                    tblADV_AchievementCategoryMaster objResult = await _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetByIdAsync(model.CategoryId);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<AdvAchievementCategoryMasterModel, tblADV_AchievementCategoryMaster>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedBy.ToString()) ? model.CreatedBy : objResult.CreatedBy))
                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedDate.ToString()) ? DateTime.Now : objResult.CreatedDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objResult.IsActive))
                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objResult.IsDeleted))
                            .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.ImagePath) ? CommonUtility.RemoveExistingFile(objResult.ImagePath, true) ? "" : "" : CommonUtility.UploadAchievementMaster(model.ImagePath, model.CategoryId, false, true, objResult.ImagePath)))
                            .ForMember(dest => dest.HelpFileURL, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.HelpFileURL) ? CommonUtility.RemoveExistingFile(objResult.HelpFileURL, true) ? "" : "" : CommonUtility.UploadAchievementHelpFile(model.HelpFileURL, model.CategoryId, model.Title, true, objResult.HelpFileURL)));

                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblADV_AchievementCategoryMaster>().UpdateAsync(objResult);
                        _uow.save();
						///First record delete from child table.
						if (objResult.tblADV_AchievementCategoryDistrictDepartmentMappingLookUp.Count() > 0)
						{
							_uow.GenericRepository<tblADV_AchievementCategoryDistrictDepartmentMappingLookUp>().DeleteAllById(objResult.tblADV_AchievementCategoryDistrictDepartmentMappingLookUp.ToList());
						}
						///save record of department, district from lookup table.
						if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
						{
							foreach (var item in model.GeneralDepartmentDistrictMappingList)
							{
								if (!string.IsNullOrEmpty(item))
								{
									tblADV_AchievementCategoryDistrictDepartmentMappingLookUp obj = new tblADV_AchievementCategoryDistrictDepartmentMappingLookUp();
									obj.CategoryId = objResult.CategoryId;
									obj.DepartmentCode = Convert.ToInt32(item);
									await _uow.GenericRepository<tblADV_AchievementCategoryDistrictDepartmentMappingLookUp>().AddAsync(obj);
								}
							}

						}
						_uow.save();

						objReturn = SetResultStatus(objResult.CategoryId.ToString(), MessageStatus.Update, true);
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


        public ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>> objReturn = new ServiceResponse<PagedData<AdvAchievementCategoryMasterModel>>();
            try
            {
                model.PageSize = 101;
                PagedData<AdvAchievementCategoryMasterModel> resulData = new PagedData<AdvAchievementCategoryMasterModel>();
                PagedData<vw_AchievementCategoryMasterList> data = GenericGridCall<vw_AchievementCategoryMasterList>.ListView(model.PageSize, x => x.Title, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_AchievementCategoryMasterList, AdvAchievementCategoryMasterModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<AdvAchievementCategoryMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<AdvAchievementCategoryMasterModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<AdvAchievementCategoryMasterModel> GetById(long id)
        {
            ServiceResponse<AdvAchievementCategoryMasterModel> objReturn = new ServiceResponse<AdvAchievementCategoryMasterModel>();
            try
            {
                tblADV_AchievementCategoryMaster resultData = _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: x => x.CategoryId == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblADV_AchievementCategoryMaster, AdvAchievementCategoryMasterModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty))
                         .ForMember(des => des.HelpFileURL, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.HelpFileURL) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.HelpFileURL))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblADV_AchievementCategoryMaster, AdvAchievementCategoryMasterModel>(resultData);

					objReturn.Data.GeneralDepartmentDistrictMappingList =resultData.tblADV_AchievementCategoryDistrictDepartmentMappingLookUp.Select(x =>Convert.ToString(x.DepartmentCode) ).ToList();

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

        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblADV_AchievementCategoryMaster objResult = await _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblADV_AchievementCategoryMaster>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.CategoryId.ToString(), MessageStatus.StatusUpdate, true);
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
