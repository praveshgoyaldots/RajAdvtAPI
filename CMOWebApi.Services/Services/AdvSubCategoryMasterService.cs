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
    public class AdvSubCategoryMasterService :BaseService, IAdvSubCategoryMasterService
	{
		IUnitofWork _uow;
		public AdvSubCategoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<List<AdvSubCategoryViewModel>> GetAll()
		{
			try
			{
				List<AdvSubCategoryViewModel> responseList = new List<AdvSubCategoryViewModel>();
				List<tblADV_SubCategoryMaster> objList =_uow.GenericRepository<tblADV_SubCategoryMaster>().GetAll(filter: x =>  x.IsDelete == false).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_SubCategoryMaster, AdvSubCategoryViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<AdvSubCategoryViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<AdvSubCategoryViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<AdvSubCategoryMasterModel>> GetById(long id)
		{
			try
			{
				tblADV_SubCategoryMaster advSubCategory = await _uow.GenericRepository<tblADV_SubCategoryMaster>().GetByIdAsync(id);

				AdvSubCategoryMasterModel obj = new AdvSubCategoryMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_SubCategoryMaster, AdvSubCategoryMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(advSubCategory, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<AdvSubCategoryMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(AdvSubCategoryMasterModel model)
		{
			ServiceResponse<tblADV_SubCategoryMaster> objReturn = new ServiceResponse<tblADV_SubCategoryMaster>();
			try
			{

				
				Mapper.Initialize(x =>
				{
					x.CreateMap<AdvSubCategoryMasterModel, tblADV_SubCategoryMaster>();
				});

				var advSubCategory = Mapper.Map<AdvSubCategoryMasterModel, tblADV_SubCategoryMaster>(model);
				await _uow.GenericRepository<tblADV_SubCategoryMaster>().AddAsync(advSubCategory);
				_uow.save();

				advSubCategory.Code = advSubCategory.Id;
				await _uow.GenericRepository<tblADV_SubCategoryMaster>().UpdateAsync(advSubCategory);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(AdvSubCategoryMasterModel model)
		{
			ServiceResponse<tblADV_SubCategoryMaster> objReturn = new ServiceResponse<tblADV_SubCategoryMaster>();
			try
			{
				tblADV_SubCategoryMaster obj = await _uow.GenericRepository<tblADV_SubCategoryMaster>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<AdvSubCategoryMasterModel, tblADV_SubCategoryMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblADV_SubCategoryMaster>().UpdateAsync(obj);
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
				tblADV_SubCategoryMaster cObj = await _uow.GenericRepository<tblADV_SubCategoryMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblADV_SubCategoryMaster>().UpdateAsync(cObj);
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
					tblADV_SubCategoryMaster objResult = await _uow.GenericRepository<tblADV_SubCategoryMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblADV_SubCategoryMaster>().UpdateAsync(objResult);
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
