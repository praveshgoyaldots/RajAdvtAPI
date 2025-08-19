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
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class CCCategoryService : BaseService, ICCCategoryService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///
        public CCCategoryService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all CC Category with department name
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<CCCategoryMasterViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<CCCategoryMasterViewModel> resulData = new PagedData<CCCategoryMasterViewModel>();
                PagedData<vwODR_GNRT_CCCategoryMaster> data = GenericGridCall<vwODR_GNRT_CCCategoryMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_GNRT_CCCategoryMaster, CCCategoryMasterViewModel>()
                         .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--")); 
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<CCCategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

               return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
             return SetResultStatus<PagedData<CCCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new CC Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(CCCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<CCCategoryMasterModel, tblODR_GNRT_CCCategoryMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblODR_GNRT_CCCategoryMaster data = Mapper.Map<CCCategoryMasterModel, tblODR_GNRT_CCCategoryMaster>(model);

                data = await _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
               return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing CC Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(CCCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblODR_GNRT_CCCategoryMaster objResult = await _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<CCCategoryMasterModel, tblODR_GNRT_CCCategoryMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); 
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().UpdateAsync(objResult);
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
        /// get CC Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<CCCategoryMasterViewModel> GetById(long id)
        {
            ServiceResponse<CCCategoryMasterViewModel> objReturn = new ServiceResponse<CCCategoryMasterViewModel>();
            try
            {
                tblODR_GNRT_CCCategoryMaster resultData = _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblODR_GNRT_CCCategoryMaster, CCCategoryMasterViewModel>();
                    });
                    objReturn.Data = Mapper.Map<tblODR_GNRT_CCCategoryMaster, CCCategoryMasterViewModel>(resultData);
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
                    tblODR_GNRT_CCCategoryMaster objResult =  _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblODR_GNRT_CCCategoryMaster>().UpdateAsync(objResult);
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

        #region CC Category Mapping

        /// <summary>
        /// Get Department Reference list for assign category to these reference
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<CCCategoryReferenceListResponseModel> GetCCCategoryReferenceList(CCCategoryLookupModel model)
        {
            try
            {
                CCCategoryReferenceListResponseModel responseList = new CCCategoryReferenceListResponseModel();
                
                List<spODR_GNRT_AssignedCCCategoryReference_Result> objList = _uow.ExeccuteStoreProcedure<spODR_GNRT_AssignedCCCategoryReference_Result>("spODR_GNRT_AssignedCCCategoryReference @DepartmentCode,@CCCategoryCode",
                    new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode},
                    new SqlParameter("CCCategoryCode", SqlDbType.BigInt) { Value = model.CCCategoryCode }).ToList();
                             
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spODR_GNRT_AssignedCCCategoryReference_Result, CCCategoryReferenceListModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Record= mapper.Map(objList, responseList.Record);
                responseList.DptReferenceCode = new List<long>(objList.Where(z=>z.IsAssigned==1).Select(x =>Convert.ToInt64( x.Code)).ToList());
                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<CCCategoryReferenceListResponseModel>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Save references to mapping table for single CCCategory
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<CCCategoryReferenceListResponseModel> SaveCCCategoryMapping(CCCategoryLookupModel model)
        {
            try
            {
                List<tblODR_GNRT_CCCategoryLookup> objList = _uow.GenericRepository<tblODR_GNRT_CCCategoryLookup>().GetAll(filter:x=>x.CCCategoryCode==model.CCCategoryCode).ToList();
                if (objList !=null && objList.Count>0)
                {
                    _uow.GenericRepository<tblODR_GNRT_CCCategoryLookup>().DeleteAllById(objList);
                }

                if ((model.DptReferenceCode != null && model.DptReferenceCode.Count > 0))
                {
                    foreach (var item in model.DptReferenceCode)
                    {
                        if (!string.IsNullOrEmpty(item.ToString()))
                        {
                            tblODR_GNRT_CCCategoryLookup objChild = new tblODR_GNRT_CCCategoryLookup();
                            objChild.CCCategoryCode = model.CCCategoryCode;
                            objChild.DptReferenceCode =item;
                             _uow.GenericRepository<tblODR_GNRT_CCCategoryLookup>().Add(objChild);
                        }
                    }
                    _uow.save();
                }

                return GetCCCategoryReferenceList(model);
            }
            catch (Exception ex)
            {
                return SetResultStatus<CCCategoryReferenceListResponseModel>(null, MessageStatus.Error, false);
            }
            
        }

           
        #endregion
    }
}
