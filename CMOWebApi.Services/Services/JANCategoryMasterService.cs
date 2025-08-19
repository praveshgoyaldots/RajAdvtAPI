using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class JANCategoryMasterService : BaseService, IJANCategoryMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public JANCategoryMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }
       
        #endregion

        #region Method

        /// <summary>
        /// Get Jankalyan Category List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<JANCategoryMasterModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<JANCategoryMasterModel> resulData = new PagedData<JANCategoryMasterModel>();
                PagedData<vw_JAN_CategoryMaster> data = GenericGridCall<vw_JAN_CategoryMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_JAN_CategoryMaster, JANCategoryMasterModel>()
                         .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--")); 
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<JANCategoryMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

               return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
             return SetResultStatus<PagedData<JANCategoryMasterModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add Jankalyan Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(JANCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<JANCategoryMasterModel, tblJAN_CategoryMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_CategoryMaster data = Mapper.Map<JANCategoryMasterModel, tblJAN_CategoryMaster>(model);

                data = await _uow.GenericRepository<tblJAN_CategoryMaster>().AddAsync(data);
                _uow.save();

				data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_CategoryMaster>().UpdateAsync(data);
                _uow.save();

				///save record of department, district from lookup table.
				if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
				{
					foreach (var item in model.GeneralDepartmentDistrictMappingList)
					{
						if (!string.IsNullOrEmpty(item))
						{
							tblJAN_CategoryMasterDistrictDepartmentMappingLookUp obj = new tblJAN_CategoryMasterDistrictDepartmentMappingLookUp();
							obj.CategoryId = data.Id;
							obj.DepartmentCode = Convert.ToInt32(item);
							await _uow.GenericRepository<tblJAN_CategoryMasterDistrictDepartmentMappingLookUp>().AddAsync(obj);
						}
					}

				}

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
               return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Jankalyan Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(JANCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_CategoryMaster objResult = await _uow.GenericRepository<tblJAN_CategoryMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<JANCategoryMasterModel, tblJAN_CategoryMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); 
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_CategoryMaster>().UpdateAsync(objResult);
                        _uow.save();
						///First record delete from child table.
						if (objResult.tblJAN_CategoryMasterDistrictDepartmentMappingLookUp.Count() > 0)
						{
							_uow.GenericRepository<tblJAN_CategoryMasterDistrictDepartmentMappingLookUp>().DeleteAllById(objResult.tblJAN_CategoryMasterDistrictDepartmentMappingLookUp.ToList());
						}
						///save record of department, district from lookup table.
						if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
						{
							foreach (var item in model.GeneralDepartmentDistrictMappingList)
							{
								if (!string.IsNullOrEmpty(item))
								{
									tblJAN_CategoryMasterDistrictDepartmentMappingLookUp obj = new tblJAN_CategoryMasterDistrictDepartmentMappingLookUp();
									obj.CategoryId = objResult.Id;
									obj.DepartmentCode = Convert.ToInt32(item);
									await _uow.GenericRepository<tblJAN_CategoryMasterDistrictDepartmentMappingLookUp>().AddAsync(obj);
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
                 return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
               return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Jankalyan Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<JANCategoryMasterModel> GetById(long id)
        {
            ServiceResponse<JANCategoryMasterModel> objReturn = new ServiceResponse<JANCategoryMasterModel>();
            try
            {
                tblJAN_CategoryMaster resultData = _uow.GenericRepository<tblJAN_CategoryMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_CategoryMaster, JANCategoryMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_CategoryMaster, JANCategoryMasterModel>(resultData);

					objReturn.Data.GeneralDepartmentDistrictMappingList = resultData.tblJAN_CategoryMasterDistrictDepartmentMappingLookUp.Select(x => Convert.ToString(x.DepartmentCode)).ToList();

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
                    tblJAN_CategoryMaster objResult =  _uow.GenericRepository<tblJAN_CategoryMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_CategoryMaster>().UpdateAsync(objResult);
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
