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
	public class AdminDepartmentMasterService : BaseService, IAdminDepartmentMasterService
	{
		#region /// Variable ///
		IUnitofWork _uow;
		#endregion

		#region ///constructor ///
		public AdminDepartmentMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}
		#endregion

		#region Method

		/// <summary>
		/// Get all Admin department name
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>

		public ServiceResponse<PagedData<AdminDepartmentMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<AdminDepartmentMasterViewModel> resultData = new PagedData<AdminDepartmentMasterViewModel>();
				PagedData<tblAdmDepartmentMaster> data = GenericGridCall<tblAdmDepartmentMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.AdmDepartmentIsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblAdmDepartmentMaster, AdminDepartmentMasterViewModel>()
						 .ForMember(des => des.AdmDepartmentTitleHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AdmDepartmentTitleHindi) ? x.AdmDepartmentTitleHindi : "--"));
				});
				IMapper mapper = config.CreateMapper();
				resultData.Data = mapper.Map(data.Data, resultData.Data);

				PagedData<AdminDepartmentMasterViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resultData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<AdminDepartmentMasterViewModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add new admin Department
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(AdminDepartmentMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<AdminDepartmentMasterModel, tblAdmDepartmentMaster>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblAdmDepartmentMaster data = Mapper.Map<AdminDepartmentMasterModel, tblAdmDepartmentMaster>(model);

				data = await _uow.GenericRepository<tblAdmDepartmentMaster>().AddAsync(data);
				_uow.save();

				data.AdmDepartmentCode = Convert.ToInt32(data.AdmDepartmentId);
				data = await _uow.GenericRepository<tblAdmDepartmentMaster>().UpdateAsync(data);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Update existing admin Department 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(AdminDepartmentMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.AdmDepartmentId > 0)
				{
					tblAdmDepartmentMaster objResult = await _uow.GenericRepository<tblAdmDepartmentMaster>().GetByIdAsync(model.AdmDepartmentId);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<AdminDepartmentMasterModel, tblAdmDepartmentMaster>()
							.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblAdmDepartmentMaster>().UpdateAsync(objResult);
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
		/// get admin Department by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<AdminDepartmentMasterModel> GetById(long id)
		{
			ServiceResponse<AdminDepartmentMasterModel> objReturn = new ServiceResponse<AdminDepartmentMasterModel>();
			try
			{
				tblAdmDepartmentMaster resultData = _uow.GenericRepository<tblAdmDepartmentMaster>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblAdmDepartmentMaster, AdminDepartmentMasterModel>();
					});
					objReturn.Data = Mapper.Map<tblAdmDepartmentMaster, AdminDepartmentMasterModel>(resultData);
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
		/// Set Actvive De-Active status by Id
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
					tblAdmDepartmentMaster objResult = _uow.GenericRepository<tblAdmDepartmentMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.AdmDepartmentIsActive = !objResult.AdmDepartmentIsActive;
						await _uow.GenericRepository<tblAdmDepartmentMaster>().UpdateAsync(objResult);
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
