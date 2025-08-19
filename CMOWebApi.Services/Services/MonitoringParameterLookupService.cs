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

namespace CMOWebApi.Services.Services
{
    public class MonitoringParameterLookupService : BaseService, IMonitoringParameterLookupService
    {
        IUnitofWork _uow;
        public MonitoringParameterLookupService(IUnitofWork uow)
        {
            _uow = uow;
        }

        public async Task<ServiceResponse<string>> Create(MonitoringParameterLookupModel model)
        {
            ServiceResponse<tblMonitoringParameterLookup> objReturn = new ServiceResponse<tblMonitoringParameterLookup>();
            try
            {
                model.CreatedDate = DateTime.Now;
                Mapper.Initialize(x =>
                {
                    x.CreateMap<MonitoringParameterLookupModel, tblMonitoringParameterLookup>();
                });
                var obj = Mapper.Map<MonitoringParameterLookupModel, tblMonitoringParameterLookup>(model);
                await _uow.GenericRepository<tblMonitoringParameterLookup>().AddAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Create, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }


        public async Task<ServiceResponse<string>> Edit(MonitoringParameterLookupModel model)
        {
            try
            {
                tblMonitoringParameterLookup obj = _uow.GenericRepository<tblMonitoringParameterLookup>().GetByID(model.Id);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<MonitoringParameterLookupModel, tblMonitoringParameterLookup>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
                await _uow.GenericRepository<tblMonitoringParameterLookup>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<MonitoringParameterLookupViewModel>> GetById(long id)
        {
            try
            {
                vwMonitoringParameterLookupType lookup = await _uow.GenericRepository<vwMonitoringParameterLookupType>().GetByIdAsync(id);

                MonitoringParameterLookupViewModel obj = new MonitoringParameterLookupViewModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwMonitoringParameterLookupType, MonitoringParameterLookupViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(lookup, obj);

                return SetResultStatus(obj, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<MonitoringParameterLookupViewModel>(null, MessageStatus.Error, false);
            }


        }

        public ServiceResponse<PagedData<MonitoringParameterLookupViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<MonitoringParameterLookupViewModel> responseList = new PagedData<MonitoringParameterLookupViewModel>();
                PagedData<vwMonitoringParameterLookupType> objList = GenericGridCall<vwMonitoringParameterLookupType>.ListView(model.PageSize, x => x.Id, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwMonitoringParameterLookupType, MonitoringParameterLookupViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;

                return SetResultStatus<PagedData<MonitoringParameterLookupViewModel>>(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<MonitoringParameterLookupViewModel>>(null, MessageStatus.Error, false);
            }

        }

        #region MonitoringParameterLookupType

        public ServiceResponse<PagedData<MonitoringParameterLookupTypeModel>> GetAllLookupType(IndexModel model)
        {
            try
            {
                PagedData<MonitoringParameterLookupTypeModel> responseList = new PagedData<MonitoringParameterLookupTypeModel>();
                PagedData<tblMonitoringParameterLookupType> objList = GenericGridCall<tblMonitoringParameterLookupType>.ListView(model.PageSize, x => x.Id,x=>x.IsDelete==false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblMonitoringParameterLookupType, MonitoringParameterLookupTypeModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;

                return SetResultStatus<PagedData<MonitoringParameterLookupTypeModel>>(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<MonitoringParameterLookupTypeModel>>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> CreateLookupType(MonitoringParameterLookupTypeModel model)
        {
            ServiceResponse<tblMonitoringParameterLookupType> objReturn = new ServiceResponse<tblMonitoringParameterLookupType>();
            try
            {
                model.CreatedDate = DateTime.Now;
                Mapper.Initialize(x =>
                {
                    x.CreateMap<MonitoringParameterLookupTypeModel, tblMonitoringParameterLookupType>();
                });
                var obj = Mapper.Map<MonitoringParameterLookupTypeModel, tblMonitoringParameterLookupType>(model);
                await _uow.GenericRepository<tblMonitoringParameterLookupType>().AddAsync(obj);
                _uow.save();
                obj.LookupTypeCode = "tblMonitoringParameterLookup" + obj.Id;
                await _uow.GenericRepository<tblMonitoringParameterLookupType>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Create, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<MonitoringParameterLookupTypeModel>> GetByIdLookupType(long id)
        {
            try
            {
                tblMonitoringParameterLookupType lookup = await _uow.GenericRepository<tblMonitoringParameterLookupType>().GetByIdAsync(id);

                MonitoringParameterLookupTypeModel obj = new MonitoringParameterLookupTypeModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblMonitoringParameterLookupType, MonitoringParameterLookupTypeModel>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(lookup, obj);

                return SetResultStatus(obj, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<MonitoringParameterLookupTypeModel>(null, MessageStatus.Error, false);
            }


        }

        public async Task<ServiceResponse<string>> EditLookupType(MonitoringParameterLookupTypeModel model)
        {
            try
            {
                tblMonitoringParameterLookupType obj = _uow.GenericRepository<tblMonitoringParameterLookupType>().GetByID(model.Id);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<MonitoringParameterLookupTypeModel, tblMonitoringParameterLookupType>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
                await _uow.GenericRepository<tblMonitoringParameterLookupType>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch(Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        #endregion
    }
}
