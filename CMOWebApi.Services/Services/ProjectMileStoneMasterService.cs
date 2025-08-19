using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class ProjectMileStoneMasterService : BaseService, IProjectMileStoneMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public ProjectMileStoneMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Project Mile Stone List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<ProjectMileStoneMasterModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<ProjectMileStoneMasterModel> resulData = new PagedData<ProjectMileStoneMasterModel>();
                PagedData<tblJAN_PROJ_MileStoneMaster> data = GenericGridCall<tblJAN_PROJ_MileStoneMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblJAN_PROJ_MileStoneMaster, ProjectMileStoneMasterModel>()
                         .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--")); 
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<ProjectMileStoneMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

               return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
             return SetResultStatus<PagedData<ProjectMileStoneMasterModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add Project Mile Stone
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ProjectMileStoneMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ProjectMileStoneMasterModel, tblJAN_PROJ_MileStoneMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PROJ_MileStoneMaster data = Mapper.Map<ProjectMileStoneMasterModel, tblJAN_PROJ_MileStoneMaster>(model);

                data = await _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
               return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Project Mile Stone
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ProjectMileStoneMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PROJ_MileStoneMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ProjectMileStoneMasterModel, tblJAN_PROJ_MileStoneMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); 
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().UpdateAsync(objResult);
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
        /// Get Project Mile Stone by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectMileStoneMasterModel> GetById(long id)
        {
            ServiceResponse<ProjectMileStoneMasterModel> objReturn = new ServiceResponse<ProjectMileStoneMasterModel>();
            try
            {
                tblJAN_PROJ_MileStoneMaster resultData = _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_MileStoneMaster, ProjectMileStoneMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_MileStoneMaster, ProjectMileStoneMasterModel>(resultData);
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
        public async Task<ServiceResponse<string>> UpdateStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblJAN_PROJ_MileStoneMaster objResult =  _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().UpdateAsync(objResult);
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
        /// Get Project Mile Stone by Mile Stone code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectMileStoneMasterModel> GetMilestoneByMilestoneCode(int code)
        {
            ServiceResponse<ProjectMileStoneMasterModel> objReturn = new ServiceResponse<ProjectMileStoneMasterModel>();
            try
            {
                tblJAN_PROJ_MileStoneMaster resultData = _uow.GenericRepository<tblJAN_PROJ_MileStoneMaster>().GetAll(filter: x=>x.Code== code).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_MileStoneMaster, ProjectMileStoneMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_MileStoneMaster, ProjectMileStoneMasterModel>(resultData);
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

        #endregion


    }
}
