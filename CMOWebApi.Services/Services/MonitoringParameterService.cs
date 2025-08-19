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
    public class MonitoringParameterMasterService : BaseService, IMonitoringParameterMasterService
    {
		IUnitofWork _uow;
		public MonitoringParameterMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<MonitoringParameterMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
                PagedData<MonitoringParameterMasterViewModel> responseList = new PagedData<MonitoringParameterMasterViewModel>();
                PagedData<vwSCM_MonitoringParameterMaster> objList = GenericGridCall<vwSCM_MonitoringParameterMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwSCM_MonitoringParameterMaster, MonitoringParameterMasterViewModel>()
                      .ForMember(des => des.MappingTableName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MappingTableName) ? x.MappingTableName : "--"))
                        .ForMember(des => des.DepartmentTitle, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DepartmentTitle) ? x.DepartmentTitle : "--"));
                });
				IMapper mapper = config.CreateMapper();
				responseList.Data = mapper.Map(objList.Data, responseList.Data);



                return SetResultStatus<PagedData<MonitoringParameterMasterViewModel>>(responseList, MessageStatus.Success, true);
                
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<MonitoringParameterMasterViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<MonitoringParameterMasterModel>> GetById(long id)
		{
			try
			{
                tblSCM_MonitoringParameterMaster objById = await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().GetByIdAsync(id);

                MonitoringParameterMasterModel obj = new MonitoringParameterMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSCM_MonitoringParameterMaster, MonitoringParameterMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(objById, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<MonitoringParameterMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(MonitoringParameterMasterModel model)
		{
			ServiceResponse<tblSCM_MonitoringParameterMaster> objReturn = new ServiceResponse<tblSCM_MonitoringParameterMaster>();
			try
			{

				
				Mapper.Initialize(x =>
				{
					x.CreateMap<MonitoringParameterMasterModel, tblSCM_MonitoringParameterMaster>();
				});

				var obj = Mapper.Map<MonitoringParameterMasterModel, tblSCM_MonitoringParameterMaster>(model);
				await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().AddAsync(obj);
				_uow.save();

                obj.Code = obj.Id;
				await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(MonitoringParameterMasterModel model)
		{
			ServiceResponse<tblSCM_MonitoringParameterMaster> objReturn = new ServiceResponse<tblSCM_MonitoringParameterMaster>();
			try
			{
                tblSCM_MonitoringParameterMaster obj = await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<MonitoringParameterMasterModel, tblSCM_MonitoringParameterMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Delete(long id)
		{
			try
			{
                tblSCM_MonitoringParameterMaster cObj = await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().GetByIdAsync(id);
				cObj.IsDeleted = true;
				await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblSCM_MonitoringParameterMaster objResult = await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblSCM_MonitoringParameterMaster>().UpdateAsync(objResult);
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
	}
}
