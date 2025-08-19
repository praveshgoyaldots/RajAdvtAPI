using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class LookupService : BaseService, ILookupService
    {
        IUnitofWork _uow;
        public LookupService(IUnitofWork uow)
        {
            _uow = uow;
        }
		public ServiceResponse<List<LookUpListViewModel>> GetAll(LookUpFilterModel model)
		{
			try
			{
				List<LookUpListViewModel> responseList = new List<LookUpListViewModel>();
				List<vw_tbllookupdetail> objList = _uow.GenericRepository<vw_tbllookupdetail>().GetAll(filter:x=> model.lookupTypeId>0? x.lookupTypeId==model.lookupTypeId:true).OrderBy(x =>x.lookupTypeName).ToList();

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

		public async Task<ServiceResponse<LookUpViewModel>> GetById(long id)
		{
			try
			{
				//Jankalyan_DBEntities _context = new Jankalyan_DBEntities();
				//tbllookup lookup   = await (from x in _context.tbllookups where x.Id == id select x).FirstOrDefaultAsync();

				tbllookup lookup =  _uow.GenericRepository<tbllookup>().GetAll(filter: x => x.Id == id).FirstOrDefault();

				LookUpViewModel obj = new LookUpViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tbllookup, LookUpViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(lookup, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<LookUpViewModel>(null, MessageStatus.Error, false);
			}


		}

		public async Task<ServiceResponse<string>> Create(LookUpViewModel model)
		{
			ServiceResponse<tbllookup> objReturn = new ServiceResponse<tbllookup>();
			try
			{

				model.IsActive = true;
				Mapper.Initialize(x =>
				{
                    x.CreateMap<LookUpViewModel, tbllookup>()
                     .ForMember(dest => dest.CreatedModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});

				var lookup = Mapper.Map<LookUpViewModel, tbllookup>(model);
				await _uow.GenericRepository<tbllookup>().AddAsync(lookup);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(LookUpViewModel model)
		{
			ServiceResponse<tbllookup> objReturn = new ServiceResponse<tbllookup>();
			try
			{
				tbllookup obj = new tbllookup();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<LookUpViewModel, tbllookup>()
                      .ForMember(dest => dest.CreatedModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tbllookup>().UpdateAsync(obj);
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
				tbllookup cObj = await _uow.GenericRepository<tbllookup>().GetByIdAsync(id);
				cObj.isActive = false;
				await _uow.GenericRepository<tbllookup>().UpdateAsync(cObj);
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
					tbllookup objResult = await _uow.GenericRepository<tbllookup>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.isActive = !objResult.isActive;
						await _uow.GenericRepository<tbllookup>().UpdateAsync(objResult);
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
