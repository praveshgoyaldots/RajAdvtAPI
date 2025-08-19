using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class SectorService : BaseService, ISectorService
	{
		IUnitofWork _uow;
		public SectorService(IUnitofWork uow)
		{
			_uow = uow;
		}
		public ServiceResponse<List<SectorViewModel>> GetAll()
		{
			try
			{
				List<SectorViewModel> responseList = new List<SectorViewModel>();
				List<tblSectorMaster> objList = _uow.GenericRepository<tblSectorMaster>().GetAll(filter: x => x.IsActive == true && x.IsDelete==false).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSectorMaster, SectorViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<SectorViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<SectorViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SectorViewModel>> GetById(long id)
		{
			try
			{
				tblSectorMaster sector = await _uow.GenericRepository<tblSectorMaster>().GetByIdAsync(id);

				SectorViewModel obj = new SectorViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSectorMaster, SectorViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(sector, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SectorViewModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SectorViewModel model)
		{
			ServiceResponse<tblSectorMaster> objReturn = new ServiceResponse<tblSectorMaster>();
			try
			{

				model.IsActive = true;
				Mapper.Initialize(x =>
				{
					x.CreateMap<SectorViewModel, tblSectorMaster>();
				});

				var sector = Mapper.Map<SectorViewModel, tblSectorMaster>(model);
				await _uow.GenericRepository<tblSectorMaster>().AddAsync(sector);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SectorViewModel model)
		{
			ServiceResponse<tblSectorMaster> objReturn = new ServiceResponse<tblSectorMaster>();
			try
			{
				tblSectorMaster obj = new tblSectorMaster
();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SectorViewModel, tblSectorMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSectorMaster>().UpdateAsync(obj);
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
				tblSectorMaster cObj = await _uow.GenericRepository<tblSectorMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblSectorMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

	}
}
