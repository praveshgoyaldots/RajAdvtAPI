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
    public class TehsilService : BaseService,ITehsilService
	{
		IUnitofWork _uow;
		public TehsilService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<List<TehsilViewModel>> GetAll()
		{
			try
			{
				List<TehsilViewModel> responseList = new List<TehsilViewModel>();
				List<tblTehsilMaster> objList = _uow.GenericRepository<tblTehsilMaster>().GetAll(filter: x => x.TehsilIsActive == true && x.TehsilIsDeleted == false).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblTehsilMaster, TehsilViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<TehsilViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<TehsilViewModel>>(null, MessageStatus.Error, false);
			}

		}


		public async Task<ServiceResponse<TehsilViewModel>> GetById(long id)
		{
			try
			{
				tblTehsilMaster sector = await _uow.GenericRepository<tblTehsilMaster>().GetByIdAsync(id);

				TehsilViewModel obj = new TehsilViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblTehsilMaster, TehsilViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(sector, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<TehsilViewModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(TehsilViewModel model)
		{
			ServiceResponse<tblTehsilMaster> objReturn = new ServiceResponse<tblTehsilMaster>();
			try
			{

				model.TehsilIsActive = true;
				Mapper.Initialize(x =>
				{
					x.CreateMap<TehsilViewModel, tblTehsilMaster>();
				});

				var Tehsil = Mapper.Map<TehsilViewModel, tblTehsilMaster>(model);
				await _uow.GenericRepository<tblTehsilMaster>().AddAsync(Tehsil);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(TehsilViewModel model)
		{
			ServiceResponse<tblTehsilMaster> objReturn = new ServiceResponse<tblTehsilMaster>();
			try
			{
				tblTehsilMaster obj = new tblTehsilMaster();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<TehsilViewModel, tblTehsilMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblTehsilMaster>().UpdateAsync(obj);
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
				tblTehsilMaster cObj = await _uow.GenericRepository<tblTehsilMaster>().GetByIdAsync(id);
				cObj.TehsilIsActive = false;
				cObj.TehsilIsDeleted = true;
				await _uow.GenericRepository<tblTehsilMaster>().UpdateAsync(cObj);
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
