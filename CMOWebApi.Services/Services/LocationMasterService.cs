using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class LocationMasterService :BaseService, ILocationMasterService
        {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion


        #region ///constructor ///
        public LocationMasterService(IUnitofWork uow)
            {
            _uow = uow;
            }
        #endregion


        #region Method

        /// <summary>
        /// Get all department name
        /// </summary>
        /// <param name = "model" ></ param >
        /// < returns ></ returns >

        public ServiceResponse<PagedData<LocationMasterViewModel>> GetAll(VCLocationSearchModel model)
            {
            try
                {
                PagedData<LocationMasterViewModel> resultData = new PagedData<LocationMasterViewModel>();
                PagedData<vwVC_Location> data = GenericGridCall<vwVC_Location>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && model.DistrictCode > 0 ? x.DistrictCode == model.DistrictCode : true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_Location, LocationMasterViewModel>()
                         .ForMember(des => des.Location, src => src.MapFrom(x => !string.IsNullOrEmpty(x.LocationName) ? x.LocationName : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<LocationMasterViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
                }
            catch (Exception ex)
                {
                return SetResultStatus<PagedData<LocationMasterViewModel>>(null, MessageStatus.Error, false);
                }
            }

		/// <summary>
		/// Add new Department
		/// </summary>
		/// <param name = "model" ></ param >
		/// < returns ></ returns >
		public async Task<ServiceResponse<string>> Create(LocationMasterViewModel model)
		{

			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				tblVCLocationMaster result = _uow.GenericRepository<tblVCLocationMaster>().GetAll(filter: x => x.Location.ToLower().Trim() == model.Location.ToLower().Trim() && x.DistrictCode == model.DistrictCode).FirstOrDefault();

				if (result == null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<LocationMasterViewModel, tblVCLocationMaster>()
						.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
					});
					model.CreatedDate = DateTime.Now;
					model.ModifiedDate = DateTime.Now;
					tblVCLocationMaster data = Mapper.Map<LocationMasterViewModel, tblVCLocationMaster>(model);

					data = await _uow.GenericRepository<tblVCLocationMaster>().AddAsync(data);
					_uow.save();

					data.Code = data.Id;
					data = await _uow.GenericRepository<tblVCLocationMaster>().UpdateAsync(data);
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
		/// Update existing Department
		/// </summary>
		/// <param name = "model" ></ param >
		/// < returns ></ returns >
		public async Task<ServiceResponse<string>> Edit(LocationMasterViewModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				tblVCLocationMaster result = _uow.GenericRepository<tblVCLocationMaster>().GetAll(filter: x => x.Location.ToLower().Trim() == model.Location.ToLower().Trim() && x.DistrictCode == model.DistrictCode && x.Id != model.Id).FirstOrDefault();

				if (result == null)
				{
					if (model.Id > 0)
					{

						tblVCLocationMaster objResult = await _uow.GenericRepository<tblVCLocationMaster>().GetByIdAsync(model.Id);
						if (objResult != null)
						{
							var config = new MapperConfiguration(cfg =>
							{
								cfg.CreateMap<LocationMasterViewModel, tblVCLocationMaster>()
								.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
								.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
							});
							IMapper mapper = config.CreateMapper();
							objResult = mapper.Map(model, objResult);
							objResult = await _uow.GenericRepository<tblVCLocationMaster>().UpdateAsync(objResult);
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
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.Exist, true);
				}

			}
			catch (Exception ex)
			{
				return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// get VC by Id
		/// </summary>
		/// <param name = "id" ></ param >
		/// < returns ></ returns >
		public ServiceResponse<LocationMasterViewModel> GetById(long id)
            {
            ServiceResponse<LocationMasterViewModel> objReturn = new ServiceResponse<LocationMasterViewModel>();
            try
                {
                tblVCLocationMaster resultData = _uow.GenericRepository<tblVCLocationMaster>().GetByID(id);
                if (resultData != null)
                    {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblVCLocationMaster, LocationMasterViewModel>();
                    });
                    objReturn.Data = Mapper.Map<tblVCLocationMaster, LocationMasterViewModel>(resultData);
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
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        public async Task<ServiceResponse<string>> UpdateStatus(long id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
                {
                if (id > 0)
                    {
                    tblVCLocationMaster objResult = _uow.GenericRepository<tblVCLocationMaster>().GetByID(id);
                    if (objResult != null)
                        {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblVCLocationMaster>().UpdateAsync(objResult);
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

        /// Delete location incase no participant added for this location
        /// </summary>
        /// <param name="locationId"></param>
        /// <returns></returns>
        public ServiceResponse<string> Delete(long locationId)
        {
            try
            {
                SP_VC_DeleteLocation_Result result = _uow.ExeccuteStoreProcedure<SP_VC_DeleteLocation_Result>("SP_VC_DeleteLocation @LocationId"
                    , new SqlParameter("LocationId", SqlDbType.BigInt) { Value = locationId }
                    ).FirstOrDefault();

                if (Convert.ToInt32(result.Result) > 0)
                {
                    return SetResultStatus(string.Empty, MessageStatus.Delete, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.ParticipantExistForLocation, false);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }


        #endregion



    }
    }
