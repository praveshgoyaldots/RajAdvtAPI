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
    public class PlatformMasterService :BaseService, IPlatformMasterService
	{
		IUnitofWork _uow;
		public PlatformMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<PlatformMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<PlatformMasterViewModel> responsedata = new PagedData<PlatformMasterViewModel>();

				PagedData<tblPlatformMaster> resultdata = GenericGridCall<tblPlatformMaster>.ListView(model.PageSize,x => x.CreatedDate,x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblPlatformMaster, PlatformMasterViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<PlatformMasterViewModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<PlatformMasterViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<PlatformMasterModel>> GetById(long id)
		{
			try
			{
				tblPlatformMaster platform = await _uow.GenericRepository<tblPlatformMaster>().GetByIdAsync(id);

				PlatformMasterModel obj = new PlatformMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblPlatformMaster, PlatformMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(platform, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<PlatformMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(PlatformMasterModel model)
		{
			ServiceResponse<tblPlatformMaster> objReturn = new ServiceResponse<tblPlatformMaster>();
			try
			{

				model.CreatedDate = DateTime.Now;
				//model.ModifiedDate = DateTime.Now;
				Mapper.Initialize(x =>
				{
					x.CreateMap<PlatformMasterModel, tblPlatformMaster>();
				});

				var platform = Mapper.Map<PlatformMasterModel, tblPlatformMaster>(model);
				
				await _uow.GenericRepository<tblPlatformMaster>().AddAsync(platform);
				_uow.save();

				platform.Code = platform.PlatformId;
				await _uow.GenericRepository<tblPlatformMaster>().UpdateAsync(platform);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(PlatformMasterModel model)
		{
			ServiceResponse<tblPlatformMaster> objReturn = new ServiceResponse<tblPlatformMaster>();
			try
			{
				tblPlatformMaster obj = await _uow.GenericRepository<tblPlatformMaster>().GetByIdAsync(model.PlatformId);
               

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<PlatformMasterModel, tblPlatformMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblPlatformMaster>().UpdateAsync(obj);
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
				tblPlatformMaster cObj = await _uow.GenericRepository<tblPlatformMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblPlatformMaster>().UpdateAsync(cObj);
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
					tblPlatformMaster objResult = await _uow.GenericRepository<tblPlatformMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblPlatformMaster>().UpdateAsync(objResult);
						_uow.save();
						objReturn = SetResultStatus(objResult.PlatformId.ToString(), MessageStatus.StatusUpdate, true);
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
