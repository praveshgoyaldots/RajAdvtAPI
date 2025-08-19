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
    public class CancellationReasonMasterService : BaseService, ICancellationReasonMasterService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///
        public CancellationReasonMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get All Cancellation Reason using Server side paging
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<CancellationReasonViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<CancellationReasonViewModel> resulData = new PagedData<CancellationReasonViewModel>();
                PagedData<tblODR_CancellationReasonMaster> data = GenericGridCall<tblODR_CancellationReasonMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_CancellationReasonMaster, CancellationReasonViewModel>()
                         .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--")); 
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<CancellationReasonViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

               return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
             return SetResultStatus<PagedData<CancellationReasonViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new Cancellation Reason
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(CancellationReasonMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<CancellationReasonMasterModel, tblODR_CancellationReasonMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblODR_CancellationReasonMaster data = Mapper.Map<CancellationReasonMasterModel, tblODR_CancellationReasonMaster>(model);

                data = await _uow.GenericRepository<tblODR_CancellationReasonMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblODR_CancellationReasonMaster>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
               return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Cancellation Reason
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(CancellationReasonMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblODR_CancellationReasonMaster objResult = await _uow.GenericRepository<tblODR_CancellationReasonMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<CancellationReasonMasterModel, tblODR_CancellationReasonMaster>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); 
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblODR_CancellationReasonMaster>().UpdateAsync(objResult);
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
        /// get Cancellation Reason by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<CancellationReasonMasterModel> GetById(long id)
        {
            ServiceResponse<CancellationReasonMasterModel> objReturn = new ServiceResponse<CancellationReasonMasterModel>();
            try
            {
                tblODR_CancellationReasonMaster resultData = _uow.GenericRepository<tblODR_CancellationReasonMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblODR_CancellationReasonMaster, CancellationReasonMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblODR_CancellationReasonMaster, CancellationReasonMasterModel>(resultData);
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
                    tblODR_CancellationReasonMaster objResult =  _uow.GenericRepository<tblODR_CancellationReasonMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblODR_CancellationReasonMaster>().UpdateAsync(objResult);
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
