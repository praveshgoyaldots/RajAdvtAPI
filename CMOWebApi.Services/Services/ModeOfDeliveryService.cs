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
    public class ModeOfDeliveryService : BaseService,IModeOfDeliveryService
	{
		IUnitofWork _uow;
		public ModeOfDeliveryService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<List<ModeOfDeliveryViewModel>> GetAll()
		{
			try
			{
				List<ModeOfDeliveryViewModel> responseList = new List<ModeOfDeliveryViewModel>();
				List<tblModeOfDeliveryMaster> objList = _uow.GenericRepository<tblModeOfDeliveryMaster>().GetAll(filter: x => x.IsActive == true && x.IsDelete == false).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblModeOfDeliveryMaster, ModeOfDeliveryViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<ModeOfDeliveryViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<ModeOfDeliveryViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<ModeOfDeliveryViewModel>> GetById(long id)
		{
			try
			{
				tblModeOfDeliveryMaster modeofdelivery = await _uow.GenericRepository<tblModeOfDeliveryMaster>().GetByIdAsync(id);

				ModeOfDeliveryViewModel obj = new ModeOfDeliveryViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblModeOfDeliveryMaster, ModeOfDeliveryViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(modeofdelivery, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<ModeOfDeliveryViewModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(ModeOfDeliveryViewModel model)
		{
			ServiceResponse<tblModeOfDeliveryMaster> objReturn = new ServiceResponse<tblModeOfDeliveryMaster>();
			try
			{

				model.IsActive = true;
				Mapper.Initialize(x =>
				{
					x.CreateMap<ModeOfDeliveryViewModel, tblModeOfDeliveryMaster>();
				});

				var modeOfDelivery = Mapper.Map<ModeOfDeliveryViewModel, tblModeOfDeliveryMaster>(model);
				await _uow.GenericRepository<tblModeOfDeliveryMaster>().AddAsync(modeOfDelivery);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Create, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(ModeOfDeliveryViewModel model)
		{
			ServiceResponse<tblModeOfDeliveryMaster> objReturn = new ServiceResponse<tblModeOfDeliveryMaster>();
			try
			{
				tblModeOfDeliveryMaster obj = new tblModeOfDeliveryMaster
();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<ModeOfDeliveryViewModel, tblModeOfDeliveryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblModeOfDeliveryMaster>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Update, true);
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
				tblModeOfDeliveryMaster cObj = await _uow.GenericRepository<tblModeOfDeliveryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblModeOfDeliveryMaster>().UpdateAsync(cObj);
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
