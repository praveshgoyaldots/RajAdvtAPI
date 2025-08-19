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
    public class BeneficiaryCategoryMasterModelService : BaseService, IBeneficiaryCategoryMasterModelService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///

        public BeneficiaryCategoryMasterModelService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get Beneficiary Category List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<BeneficiaryCategoryMasterModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<BeneficiaryCategoryMasterModel> resulData = new PagedData<BeneficiaryCategoryMasterModel>();
                PagedData<tblBeneficiaryCagegory> data = GenericGridCall<tblBeneficiaryCagegory>.ListView(model.PageSize, x => x.cm_ansmtcategoryid, x => x.isDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblBeneficiaryCagegory, BeneficiaryCategoryMasterModel>()
                         .ForMember(des => des.ansmtcategoryinHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ansmtcategoryinHindi) ? x.ansmtcategoryinHindi : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<BeneficiaryCategoryMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<BeneficiaryCategoryMasterModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add Beneficiary Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(BeneficiaryCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<BeneficiaryCategoryMasterModel, tblBeneficiaryCagegory>();
                    //.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    //.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    //.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    //.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblBeneficiaryCagegory data = Mapper.Map<BeneficiaryCategoryMasterModel, tblBeneficiaryCagegory>(model);

                data = await _uow.GenericRepository<tblBeneficiaryCagegory>().AddAsync(data);
                _uow.save();
                
                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Beneficiary Category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(BeneficiaryCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.cm_ansmtcategoryid > 0)
                {
                    tblBeneficiaryCagegory objResult = await _uow.GenericRepository<tblBeneficiaryCagegory>().GetByIdAsync(model.cm_ansmtcategoryid);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<BeneficiaryCategoryMasterModel, tblBeneficiaryCagegory>();
                            //.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            //.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblBeneficiaryCagegory>().UpdateAsync(objResult);
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
        /// Get Beneficiary Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<BeneficiaryCategoryMasterModel> GetById(long id)
        {
            ServiceResponse<BeneficiaryCategoryMasterModel> objReturn = new ServiceResponse<BeneficiaryCategoryMasterModel>();
            try
            {
                tblBeneficiaryCagegory resultData = _uow.GenericRepository<tblBeneficiaryCagegory>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblBeneficiaryCagegory, BeneficiaryCategoryMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblBeneficiaryCagegory, BeneficiaryCategoryMasterModel>(resultData);
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
                    tblBeneficiaryCagegory objResult = _uow.GenericRepository<tblBeneficiaryCagegory>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.isActive = !objResult.isActive;
                        await _uow.GenericRepository<tblBeneficiaryCagegory>().UpdateAsync(objResult);
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
