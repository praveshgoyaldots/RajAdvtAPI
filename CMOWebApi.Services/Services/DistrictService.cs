using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
	public class DistrictService :BaseService,IDistrictService
	{
		IUnitofWork _uow;
		public DistrictService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<List<DistrictViewModel>> GetAll()
		{
			try
			{
				List<DistrictViewModel> responseList = new List<DistrictViewModel>();
				List<tblDistrictMaster> objList = _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: x => x.DistrictIsActive == true && x.DistrictIsDeleted == false).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblDistrictMaster, DistrictViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<DistrictViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<DistrictViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<DistrictViewModel>> GetById(long id)
		{
			try
			{
				tblDistrictMaster sector = await _uow.GenericRepository<tblDistrictMaster>().GetByIdAsync(id);

				DistrictViewModel obj = new DistrictViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblDistrictMaster, DistrictViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(sector, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<DistrictViewModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(DistrictViewModel model)
		{
			ServiceResponse<tblDistrictMaster> objReturn = new ServiceResponse<tblDistrictMaster>();
			try
			{

				model.DistrictIsActive = true;
				Mapper.Initialize(x =>
				{
					x.CreateMap<DistrictViewModel, tblDistrictMaster>();
				});

				var district = Mapper.Map<DistrictViewModel, tblDistrictMaster>(model);
				await _uow.GenericRepository<tblDistrictMaster>().AddAsync(district);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(DistrictViewModel model)
		{
			ServiceResponse<tblDistrictMaster> objReturn = new ServiceResponse<tblDistrictMaster>();
			try
			{
				tblDistrictMaster obj = new tblDistrictMaster();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<DistrictViewModel,tblDistrictMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblDistrictMaster>().UpdateAsync(obj);
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
				tblDistrictMaster cObj = await _uow.GenericRepository<tblDistrictMaster>().GetByIdAsync(id);
				cObj.DistrictIsActive = false;
				cObj.DistrictIsDeleted = true;
				await _uow.GenericRepository<tblDistrictMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

        /// <summary>
        /// Get District by divsion ids
        /// </summary>
        /// <param name="ids">ids</param>
        /// <returns>District List</returns>
        public ServiceResponse<List<DistrictViewModel>> GetDistrictByDivisionIds(string ids)
            {
            ServiceResponse<List<DistrictViewModel>> objReturn = new ServiceResponse<List<DistrictViewModel>>();
            try
                {
                if (!string.IsNullOrEmpty(ids))
                    {
                    List<int?> strids = JsonConvert.DeserializeObject<List<int?>>(ids);
                    List<tblDistrictMaster> objResult = _uow.GenericRepository<tblDistrictMaster>().GetAll(filter: x => strids.Contains(x.District_DivisionCode)).ToList();
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblDistrictMaster, DistrictViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(objResult, objReturn.Data);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                    }
                else
                    {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                    }
                }
            catch
                {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
                }
            return objReturn;
            }
        }
}
