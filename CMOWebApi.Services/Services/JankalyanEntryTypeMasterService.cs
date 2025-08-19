using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
	public class JankalyanEntryTypeMasterService : BaseService , IJankalyanEntryTypeMasterService
	{
		#region /// Variable ///
		IUnitofWork _uow;

		#endregion

		#region /// constructor  ///
		public JankalyanEntryTypeMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}
		#endregion

		#region /// Methods ///

		/// <summary>
		/// Get all jankalyan Entry Master Entry.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<JankalyanEntryMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
                model.PageSize = 101;
				PagedData<JankalyanEntryMasterViewModel> resulData = new PagedData<JankalyanEntryMasterViewModel>();
				PagedData<vw_JankalyanEntryType> data = GenericGridCall<vw_JankalyanEntryType>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vw_JankalyanEntryType, JankalyanEntryMasterViewModel>()
						 .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"));
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);

				PagedData<JankalyanEntryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<JankalyanEntryMasterViewModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add Jankalyan Entry Type Master .
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(JankalyanEntryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				tblJAN_EntryTypeMaster result = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: x => x.Name == model.Name && x.JankalyanCategoryCode == model.JankalyanCategoryCode).FirstOrDefault();

				if (result == null)
				{

					Mapper.Initialize(x =>
					{
						x.CreateMap<JankalyanEntryMasterModel, tblJAN_EntryTypeMaster>()
						.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
						.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
						.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                        .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                    });
					tblJAN_EntryTypeMaster data = Mapper.Map<JankalyanEntryMasterModel, tblJAN_EntryTypeMaster>(model);

					data = await _uow.GenericRepository<tblJAN_EntryTypeMaster>().AddAsync(data);
					_uow.save();
                    //save record of department, district in lookup table.
                    if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
                    {
                        foreach (var item in model.GeneralDepartmentDistrictMappingList)
                        {
                            if (!string.IsNullOrEmpty(item))
                            {
                                tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp obj = new tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp();
                                obj.EntryTypeId = data.Id;
                                obj.DepartmentCode = Convert.ToInt32(item);
                                await _uow.GenericRepository<tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp>().AddAsync(obj);
                            }
                        }
                    }

                    data.Code = Convert.ToInt32(data.Id);
					data = await _uow.GenericRepository<tblJAN_EntryTypeMaster>().UpdateAsync(data);
					_uow.save();

					return SetResultStatus(string.Empty, MessageStatus.Save, true);
				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.NameExist, true);
				}

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Update Jankalyan Entry Type Master
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(JankalyanEntryMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				tblJAN_EntryTypeMaster result = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetAll(filter: x => x.Name == model.Name && x.JankalyanCategoryCode == model.JankalyanCategoryCode && x.Id != model.Id).FirstOrDefault();

				if (result == null)
				{
					tblJAN_EntryTypeMaster objResult = await _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<JankalyanEntryMasterModel, tblJAN_EntryTypeMaster>()
							.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblJAN_EntryTypeMaster>().UpdateAsync(objResult);

                        //First record delete from child table.
						if (objResult.tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp.Count() > 0)
                        {
                            _uow.GenericRepository<tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp>().DeleteAllById(objResult.tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp.ToList());
                        }
                        //save record of department, district from lookup table.
                        if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
                        {
                            foreach (var item in model.GeneralDepartmentDistrictMappingList)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp obj = new tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp();
                                    obj.EntryTypeId = objResult.Id;
                                    obj.DepartmentCode = Convert.ToInt32(item);
                                    await _uow.GenericRepository<tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp>().AddAsync(obj);
                                }
                            }
                        }
                        _uow.save();
						return SetResultStatus(string.Empty, MessageStatus.Update, true);
					}
					else
					{
						return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.NameExist, true);
				}

			}
			catch (Exception ex)
			{
				return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// get Jankalyan Entry Master by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<JankalyanEntryMasterViewModel> GetById(long id)
		{
			ServiceResponse<JankalyanEntryMasterViewModel> objReturn = new ServiceResponse<JankalyanEntryMasterViewModel>();
			try
			{
				tblJAN_EntryTypeMaster resultData = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblJAN_EntryTypeMaster, JankalyanEntryMasterViewModel>();
					});
					objReturn.Data = Mapper.Map<tblJAN_EntryTypeMaster, JankalyanEntryMasterViewModel>(resultData);

                    objReturn.Data.GeneralDepartmentDistrictMappingList = resultData.tblJAN_EntryTypeMasterDistrictDepartmentMappingLookUp.Select(x => Convert.ToString(x.DepartmentCode)).ToList();

                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
				}
				else
				{
					objReturn.Data = null;
					objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
				}
			}
			catch (Exception ex)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> UpdateStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblJAN_EntryTypeMaster objResult = _uow.GenericRepository<tblJAN_EntryTypeMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblJAN_EntryTypeMaster>().UpdateAsync(objResult);
						_uow.save();
						return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
					}
					else
					{
						return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
				}
			}
			catch (Exception)
			{
				return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
			}
		}


		#endregion
	}
}
