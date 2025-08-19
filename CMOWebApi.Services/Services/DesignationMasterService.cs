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
	public class DesignationMasterService : BaseService , IDesignationMasterService
	{
		#region /// Variable ///
		IUnitofWork _uow;

		#endregion

		#region /// constructor  ///
		public DesignationMasterService(IUnitofWork uow)
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
		public ServiceResponse<PagedData<DesignationMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
                model.PageSize = 101;
				PagedData<DesignationMasterViewModel> resulData = new PagedData<DesignationMasterViewModel>();
				PagedData<tblDesignationMaster> data = GenericGridCall<tblDesignationMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblDesignationMaster, DesignationMasterViewModel>()
						 .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"));
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);

				PagedData<DesignationMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<DesignationMasterViewModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add Jankalyan Entry Type Master .
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(DesignationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<DesignationMasterModel, tblDesignationMaster>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblDesignationMaster data = Mapper.Map<DesignationMasterModel, tblDesignationMaster>(model);

				data = await _uow.GenericRepository<tblDesignationMaster>().AddAsync(data);
				_uow.save();

				data.DesignationCode = Convert.ToInt32(data.DesignationId);
				data = await _uow.GenericRepository<tblDesignationMaster>().UpdateAsync(data);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
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
		public async Task<ServiceResponse<string>> Edit(DesignationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.DesignationId > 0)
				{
					tblDesignationMaster objResult = await _uow.GenericRepository<tblDesignationMaster>().GetByIdAsync(model.DesignationId);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<DesignationMasterModel, tblDesignationMaster>()
							.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblDesignationMaster>().UpdateAsync(objResult);
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
					return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
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
		public ServiceResponse<DesignationMasterViewModel> GetById(long id)
		{
			ServiceResponse<DesignationMasterViewModel> objReturn = new ServiceResponse<DesignationMasterViewModel>();
			try
			{
				tblDesignationMaster resultData = _uow.GenericRepository<tblDesignationMaster>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblDesignationMaster, DesignationMasterViewModel>();
					});
					objReturn.Data = Mapper.Map<tblDesignationMaster, DesignationMasterViewModel>(resultData);
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

		///// <summary>
		///// Set Actvive De-Actvive status by Id
		///// </summary>
		///// <param name="id"></param>
		///// <returns></returns>
		public async Task<ServiceResponse<string>> UpdateStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblDesignationMaster objResult = _uow.GenericRepository<tblDesignationMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblDesignationMaster>().UpdateAsync(objResult);
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
