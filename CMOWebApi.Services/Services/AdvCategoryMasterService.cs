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
    public class AdvCategoryMasterService : BaseService, IAdvCategoryMasterService
	{
		IUnitofWork _uow;
		public AdvCategoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<AdvCategoryViewModel>> GetAll(IndexModel model)
		{
			try
			{
                PagedData<AdvCategoryViewModel> responseList = new PagedData<AdvCategoryViewModel>();
                PagedData<tblADV_CategoryMaster> objList = GenericGridCall<tblADV_CategoryMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_CategoryMaster, AdvCategoryViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList.Data = mapper.Map(objList.Data, responseList.Data);



                return SetResultStatus<PagedData<AdvCategoryViewModel>>(responseList, MessageStatus.Success, true);
                
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<AdvCategoryViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<AdvCategoryMasterModel>> GetById(long id)
		{
			try
			{
				tblADV_CategoryMaster advCategory = await _uow.GenericRepository<tblADV_CategoryMaster>().GetByIdAsync(id);

				AdvCategoryMasterModel obj = new AdvCategoryMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_CategoryMaster, AdvCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(advCategory, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<AdvCategoryMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(AdvCategoryMasterModel model)
		{
			ServiceResponse<tblADV_CategoryMaster> objReturn = new ServiceResponse<tblADV_CategoryMaster>();
			try
			{

				
				Mapper.Initialize(x =>
				{
					x.CreateMap<AdvCategoryMasterModel, tblADV_CategoryMaster>();
				});

				var AdvCategory = Mapper.Map<AdvCategoryMasterModel, tblADV_CategoryMaster>(model);
				await _uow.GenericRepository<tblADV_CategoryMaster>().AddAsync(AdvCategory);
				_uow.save();

				AdvCategory.Code = AdvCategory.Id;
				await _uow.GenericRepository<tblADV_CategoryMaster>().UpdateAsync(AdvCategory);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(AdvCategoryMasterModel model)
		{
			ServiceResponse<tblADV_CategoryMaster> objReturn = new ServiceResponse<tblADV_CategoryMaster>();
			try
			{
				tblADV_CategoryMaster obj = await _uow.GenericRepository<tblADV_CategoryMaster>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<AdvCategoryMasterModel, tblADV_CategoryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblADV_CategoryMaster>().UpdateAsync(obj);
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
				tblADV_CategoryMaster cObj = await _uow.GenericRepository<tblADV_CategoryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblADV_CategoryMaster>().UpdateAsync(cObj);
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
					tblADV_CategoryMaster objResult = await _uow.GenericRepository<tblADV_CategoryMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblADV_CategoryMaster>().UpdateAsync(objResult);
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
