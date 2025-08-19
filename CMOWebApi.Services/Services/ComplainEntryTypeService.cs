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
    public class ComplainEntryTypeService : BaseService, IComplainEntryTypeService
    {

        #region /// Variable ///
		IUnitofWork _uow;
        #endregion
        #region ///constructor ///
        public ComplainEntryTypeService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion
        #region Method

        /// <summary>
        /// Get all EntryTypeMaster name
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        public ServiceResponse<PagedData<ComplainEntryTypeMasterViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<ComplainEntryTypeMasterViewModel> resultData = new PagedData<ComplainEntryTypeMasterViewModel>();
                PagedData<tblCOMPS_EntryTypeMaster> data = GenericGridCall<tblCOMPS_EntryTypeMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblCOMPS_EntryTypeMaster, ComplainEntryTypeMasterViewModel>()
                         .ForMember(des => des.Name, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Name) ? x.Name : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<ComplainEntryTypeMasterViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<PagedData<ComplainEntryTypeMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new Status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ComplainEntryTypeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ComplainEntryTypeMasterViewModel, tblCOMPS_EntryTypeMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                model.CreatedDate = DateTime.Now.Date;
                model.ModifiedDate = DateTime.Now.Date;
                model.IsDelete = false;
                tblCOMPS_EntryTypeMaster data = Mapper.Map<ComplainEntryTypeMasterViewModel, tblCOMPS_EntryTypeMaster>(model);

                data = await _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().AddAsync(data);
                _uow.save();

                //data.Id = Convert.ToInt32(data.Id);
                //data = await _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().UpdateAsync(data);
                //_uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing EntryTypeMaster 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ComplainEntryTypeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblCOMPS_EntryTypeMaster objResult = await _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ComplainEntryTypeMasterViewModel, tblCOMPS_EntryTypeMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        model.ModifiedDate = DateTime.Now.Date;
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().UpdateAsync(objResult);
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
        /// get EntryTypeMaster by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ComplainEntryTypeMasterViewModel> GetById(long id)
        {
            ServiceResponse<ComplainEntryTypeMasterViewModel> objReturn = new ServiceResponse<ComplainEntryTypeMasterViewModel>();
            try
            {
                tblCOMPS_EntryTypeMaster resultData = _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblCOMPS_EntryTypeMaster, ComplainEntryTypeMasterViewModel>();
                    });
                    objReturn.Data = Mapper.Map<tblCOMPS_EntryTypeMaster, ComplainEntryTypeMasterViewModel>(resultData);
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
        /// Set Actvive De-Active EntryTypeMaster by Id
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
                    tblCOMPS_EntryTypeMaster objResult = _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblCOMPS_EntryTypeMaster>().UpdateAsync(objResult);
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
