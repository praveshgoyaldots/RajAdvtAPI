using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
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
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class ProjectSubSubCategoryMasterService : BaseService, IProjectSubSubCategoryMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///

        public ProjectSubSubCategoryMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region /// Methods ///

        /// <summary>
        /// Craete new project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(SubSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<SubSubCategoryMasterModel, tblJAN_PROJ_ProjectSub_SubCategoryMaster>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                     .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                      .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PROJ_ProjectSub_SubCategoryMaster data = Mapper.Map<SubSubCategoryMasterModel, tblJAN_PROJ_ProjectSub_SubCategoryMaster>(model);

                data = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().UpdateAsync(data);
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
        /// Update existing project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(SubSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PROJ_ProjectSub_SubCategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<SubSubCategoryMasterModel, tblJAN_PROJ_ProjectSub_SubCategoryMaster>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().UpdateAsync(objResult);
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
        /// Get all project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<SubSubCategoryMasterViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<SubSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<SubSubCategoryMasterViewModel>>();
            try
            {
                PagedData<SubSubCategoryMasterViewModel> resulData = new PagedData<SubSubCategoryMasterViewModel>();

                var userADM = UserTypeEnum.ADM.GetStringValue();
                var userSADM = UserTypeEnum.SADM.GetStringValue();

                PagedData<vwJAN_PROJ_ProjectSub_SubCategoryMaster> data = GenericGridCall<vwJAN_PROJ_ProjectSub_SubCategoryMaster>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false
                && (_loginUserDetail.UserType == userADM || _loginUserDetail.UserType == userSADM ? true: x.CreatedBy==_loginUserDetail.UserId), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_PROJ_ProjectSub_SubCategoryMaster, SubSubCategoryMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<SubSubCategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<SubSubCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Project sub sub category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<SubSubCategoryMasterModel> GetById(long id)
        {
            ServiceResponse<SubSubCategoryMasterModel> objReturn = new ServiceResponse<SubSubCategoryMasterModel>();
            try
            {
                vwJAN_PROJ_ProjectSub_SubCategoryMaster resultData = _uow.GenericRepository<vwJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwJAN_PROJ_ProjectSub_SubCategoryMaster, SubSubCategoryMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<vwJAN_PROJ_ProjectSub_SubCategoryMaster, SubSubCategoryMasterModel>(resultData);
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
        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblJAN_PROJ_ProjectSub_SubCategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().UpdateAsync(objResult);
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

        /// <summary>
        /// Get all project sub sub category for department user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<SubSubCategoryMasterViewModel>> GetAllSubSubCategoryForDepartment()
        {
            ServiceResponse<List<SubSubCategoryMasterViewModel>> objReturn = new ServiceResponse<List<SubSubCategoryMasterViewModel>>();
            try
            {
                List<SubSubCategoryMasterViewModel> resulData = new List<SubSubCategoryMasterViewModel>();

                List<vwJAN_PROJ_ProjectSub_SubCategoryMaster> data = _uow.GenericRepository<vwJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: x=>x.IsActive==true && x.IsDeleted==false).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_PROJ_ProjectSub_SubCategoryMaster, SubSubCategoryMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData = mapper.Map(data, resulData);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<List<SubSubCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Check sub SubCategory name which is exist or not
        /// </summary>
        /// <param name="name"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public Boolean IsDuplicate(string name, long id = 0)
        {
            try
            {
                List<tblJAN_PROJ_ProjectSub_SubCategoryMaster> obj = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetAll(filter: x => x.Name.Trim().ToLower().Replace(" ", string.Empty) == name.Trim().ToLower().Replace(" ", string.Empty) && x.IsDeleted == false && (id > 0 ? x.Id != id : true)).ToList();
                return obj.Count > 0 ? true : false;
            }
            catch
            {
                return true;
            }
        }

        /// <summary>
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> ProjectSubSubCategoryDelete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            var userSADM = UserTypeEnum.SADM.GetStringValue();
            try
            {
                if (_loginUserDetail.UserType == userSADM)
                {
                    if (id > 0)
                    {
                        tblJAN_PROJ_ProjectSub_SubCategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetByIdAsync(id);
                        if (objResult != null)
                        {
                            objResult.IsDeleted = true;
                            await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().UpdateAsync(objResult);
                            _uow.save();
                            objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Delete, true);
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
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.UnthothorizedForActivity, false);
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
