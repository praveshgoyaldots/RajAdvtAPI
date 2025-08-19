using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class ComplainStatusService : BaseService, IComplainStatusService
    {
        #region /// Variable ///
        IUnitofWork _uow;
        #endregion
        #region ///constructor ///
        public ComplainStatusService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all Status name
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        public ServiceResponse<PagedData<ComplainStatusMasterViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<ComplainStatusMasterViewModel> resultData = new PagedData<ComplainStatusMasterViewModel>();
                PagedData<tblCOMPS_StatusMaster> data = GenericGridCall<tblCOMPS_StatusMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblCOMPS_StatusMaster, ComplainStatusMasterViewModel>()
                         .ForMember(des => des.Name, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Name) ? x.Name : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<ComplainStatusMasterViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<PagedData<ComplainStatusMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new Status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ComplainStatusMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ComplainStatusMasterViewModel, tblCOMPS_StatusMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                model.CreatedDate = DateTime.Now.Date;
                model.ModifiedDate = DateTime.Now.Date;
                tblCOMPS_StatusMaster data = Mapper.Map<ComplainStatusMasterViewModel, tblCOMPS_StatusMaster>(model);

                data = await _uow.GenericRepository<tblCOMPS_StatusMaster>().AddAsync(data);
                _uow.save();



                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Status 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ComplainStatusMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblCOMPS_StatusMaster objResult = await _uow.GenericRepository<tblCOMPS_StatusMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ComplainStatusMasterViewModel, tblCOMPS_StatusMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblCOMPS_StatusMaster>().UpdateAsync(objResult);
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
            catch
            {
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// get Status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ComplainStatusMasterViewModel> GetById(long id)
        {
            ServiceResponse<ComplainStatusMasterViewModel> objReturn = new ServiceResponse<ComplainStatusMasterViewModel>();
            try
            {
                tblCOMPS_StatusMaster resultData = _uow.GenericRepository<tblCOMPS_StatusMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblCOMPS_StatusMaster, ComplainStatusMasterViewModel>();
                    });
                    objReturn.Data = Mapper.Map<tblCOMPS_StatusMaster, ComplainStatusMasterViewModel>(resultData);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Set Actvive De-Active status by Id
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
                    tblCOMPS_StatusMaster objResult = _uow.GenericRepository<tblCOMPS_StatusMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblCOMPS_StatusMaster>().UpdateAsync(objResult);
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
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }
        public async Task<ServiceResponse<string>> ChangeStatus(ChangeStatus model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (model.Id > 0)
                {
                    tblCOMPS_StatusMaster objResult = _uow.GenericRepository<tblCOMPS_StatusMaster>().GetByID(model.Id);
                    if (objResult != null)
                    {
                        if (model.ActionType == "Action")
                        {
                            switch (model.UserType.ToString())
                            {
                                case "Adm":
                                    objResult.IsAdmAction = !objResult.IsAdmAction;
                                    break;
                                case "Dev":
                                    objResult.IsDevAction = !objResult.IsDevAction;
                                    break;
                                case "User":
                                    objResult.IsUserAction = !objResult.IsUserAction;
                                    break;
                            }
                        }
                        if (model.ActionType == "Filter")
                        {
                            switch (model.UserType.ToString())
                            {
                                case "Adm":
                                    objResult.IsAdmFilter = !objResult.IsAdmFilter;
                                    break;
                                case "Dev":
                                    objResult.IsDevFilter = !objResult.IsDevFilter;
                                    break;
                                case "User":
                                    objResult.IsUserFilter = !objResult.IsUserFilter;
                                    break;
                            }
                        }
                        objResult.ModifiedDate = DateTime.Now.Date;
                        objResult.ModifiedBy = model.UserId;
                        await _uow.GenericRepository<tblCOMPS_StatusMaster>().UpdateAsync(objResult);
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
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }
        #endregion
    }
}
