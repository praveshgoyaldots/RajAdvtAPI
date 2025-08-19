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
    public class LookuptypeService : BaseService, ILookupTypeService
	{
		IUnitofWork _uow;
		public LookuptypeService(IUnitofWork uow)
		{
			_uow = uow;

		}

		public ServiceResponse<List<LookUpTypeViewModel>> GetAll()
		{
			try
			{
				List<LookUpTypeViewModel> responseList = new List<LookUpTypeViewModel>();
				List<tbllookuptype> objList = _uow.GenericRepository<tbllookuptype>().GetAll(filter: x => x.isActive == true).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tbllookuptype, LookUpTypeViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<LookUpTypeViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<LookUpTypeViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<LookUpTypeViewModel>> GetById(long id)
		{
			try
			{
				tbllookuptype lookupType = await _uow.GenericRepository<tbllookuptype>().GetByIdAsync(id);

				LookUpTypeViewModel obj = new LookUpTypeViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tbllookuptype, LookUpTypeViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(lookupType, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<LookUpTypeViewModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(LookUpTypeViewModel model)
		{
			ServiceResponse<tbllookuptype> objReturn = new ServiceResponse<tbllookuptype>();
			try
			{

				model.IsActive = true;
				Mapper.Initialize(x =>
				{
					x.CreateMap<LookUpTypeViewModel, tbllookuptype>();
				});

				var lookup = Mapper.Map<LookUpTypeViewModel, tbllookuptype>(model);
				await _uow.GenericRepository<tbllookuptype>().AddAsync(lookup);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(LookUpTypeViewModel model)
		{
			ServiceResponse<tbllookuptype> objReturn = new ServiceResponse<tbllookuptype>();
			try
			{
				tbllookuptype obj = new tbllookuptype();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<LookUpTypeViewModel, tbllookuptype>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tbllookuptype>().UpdateAsync(obj);
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
				tbllookuptype cObj = await _uow.GenericRepository<tbllookuptype>().GetByIdAsync(id);
				cObj.isActive = false;
				await _uow.GenericRepository<tbllookuptype>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

		public ServiceResponse<List<LookUpListViewModel>> GetLookUpByTypeId(long id)
		{
			try
			{
				List<LookUpListViewModel> responseList = new List<LookUpListViewModel>();
				List<vw_tbllookupdetail> objList = _uow.GenericRepository<vw_tbllookupdetail>().GetAll(filter: x => x.isActive == true && x.lookupTypeId == id).ToList();

				var config = new MapperConfiguration(cfg =>
				{
                    cfg.CreateMap<vw_tbllookupdetail, LookUpListViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<LookUpListViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<LookUpListViewModel>>(null, MessageStatus.Error, false);
			}

		}
	}
}
