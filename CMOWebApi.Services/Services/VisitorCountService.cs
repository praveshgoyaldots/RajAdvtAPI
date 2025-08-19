using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
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
    public class VisitorCountService : BaseService, IVisitorCountService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public VisitorCountService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        public ServiceResponse<string> Create(VisitorCountViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<VisitorCountViewModel, tblJankalyanVisitorCount>()
 .ForMember(dest => dest.VisitorDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false));

                });
                tblJankalyanVisitorCount data = Mapper.Map<VisitorCountViewModel, tblJankalyanVisitorCount>(model);

                data = _uow.GenericRepository<tblJankalyanVisitorCount>().Create(data);
                _uow.save();

                objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public async Task<ServiceResponse<string>> Edit(VisitorCountViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJankalyanVisitorCount objResult = await _uow.GenericRepository<tblJankalyanVisitorCount>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<VisitorCountViewModel, tblJankalyanVisitorCount>()

                            .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreateDate.ToString()) ? DateTime.Now : objResult.CreateDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objResult.IsActive))
                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objResult.IsDeleted));

                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJankalyanVisitorCount>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Update, true);
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
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public ServiceResponse<PagedData<VisitorCountViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<VisitorCountViewModel>> objReturn = new ServiceResponse<PagedData<VisitorCountViewModel>>();
            try
            {
                PagedData<VisitorCountViewModel> resulData = new PagedData<VisitorCountViewModel>();
                PagedData<tblJankalyanVisitorCount> data = GenericGridCall<tblJankalyanVisitorCount>.ListView(model.PageSize, x => x.CreateDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblJankalyanVisitorCount, VisitorCountViewModel>();

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<VisitorCountViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<VisitorCountViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<VisitorCountViewModel> GetById(long id)
        {
            ServiceResponse<VisitorCountViewModel> objReturn = new ServiceResponse<VisitorCountViewModel>();
            try
            {
                tblJankalyanVisitorCount resultData = _uow.GenericRepository<tblJankalyanVisitorCount>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJankalyanVisitorCount, VisitorCountViewModel>();

                    });
                    objReturn.Data = Mapper.Map<tblJankalyanVisitorCount, VisitorCountViewModel>(resultData);
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

        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblJankalyanVisitorCount objResult = await _uow.GenericRepository<tblJankalyanVisitorCount>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJankalyanVisitorCount>().UpdateAsync(objResult);
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

        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblJankalyanVisitorCount objResult = await _uow.GenericRepository<tblJankalyanVisitorCount>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsDeleted = !objResult.IsDeleted;
                        await _uow.GenericRepository<tblJankalyanVisitorCount>().UpdateAsync(objResult);
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

        public async Task<ServiceResponse<VisitorCountViewModel>> GetVisitorInfo(string IpAddress = null, string logID = null)
        {
            ServiceResponse<VisitorCountViewModel> objReturn = new ServiceResponse<VisitorCountViewModel>();
            try
            {

                if (string.IsNullOrEmpty(logID))
                {
                    VisitorCountViewModel model = new VisitorCountViewModel();
                    model.VisitorIpAddress = string.IsNullOrEmpty(IpAddress) ? CommonUtility.GetIpAddress() : IpAddress;
                    model.VisitorLogId = Guid.NewGuid().ToString();
                    ServiceResponse<string> result = Create(model);
                    logID = model.VisitorLogId;
                }
                tblJankalyanVisitorCount resultData = _uow.GenericRepository<tblJankalyanVisitorCount>().GetAll(filter: x => x.VisitorLogId == logID).FirstOrDefault();
                if (resultData != null)
                {
                    IMapper mapper = new MapperConfiguration(cfg => cfg.CreateMap<tblJankalyanVisitorCount, VisitorCountViewModel>()).CreateMapper();
                    objReturn.Data = mapper.Map(resultData, objReturn.Data);
                    objReturn.Data.TotalVisitor = _uow.GenericRepository<tblJankalyanVisitorCount>().GetAll().Count();
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    tblJankalyanVisitorCount data = _uow.GenericRepository<tblJankalyanVisitorCount>().GetAll(filter: x => x.IsActive && !x.IsDeleted).OrderByDescending(x => x.Id).FirstOrDefault();

                    IMapper mapper = new MapperConfiguration(cfg => cfg.CreateMap<tblJankalyanVisitorCount, VisitorCountViewModel>()).CreateMapper();
                    objReturn.Data = mapper.Map(data, objReturn.Data);
                    objReturn.Data.TotalVisitor = _uow.GenericRepository<tblJankalyanVisitorCount>().GetAll().Count();
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);

                }
                if (objReturn.Data != null)
                {
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
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }


        /// <summary>
        /// Get Last updated  Date 
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<WebsiteUpdateInfoViewModel> GetLastUpdatedWebsiteInfo()
        {
            ServiceResponse<WebsiteUpdateInfoViewModel> objReturn = new ServiceResponse<WebsiteUpdateInfoViewModel>();
            try
            {
                vw_LastUpdatedWebsiteRecord resultData = _uow.GenericRepository<vw_LastUpdatedWebsiteRecord>().GetAll().OrderByDescending(x => x.LastUpdatedDate).FirstOrDefault();
                if (resultData != null)
                {
                    var mapper = new MapperConfiguration(cfg =>
                              cfg.CreateMap<vw_LastUpdatedWebsiteRecord, WebsiteUpdateInfoViewModel>()
                               .ForMember(dest => dest.LastUpdatedDateHindi, opt => opt.MapFrom(src => src.LastUpdatedDate.ToHindiDate("dd-MMM-yyyy")))).CreateMapper();

                    objReturn.Data = mapper.Map(resultData, objReturn.Data);

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
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }


        public ServiceResponse<string> GetAndSetChiranjeeviVisitorInfo()
        {
            try
            {
                tblChiranjeeviVisitorCount resultData = _uow.GenericRepository<tblChiranjeeviVisitorCount>().GetAll(filter: x => x.IsActive==true && x.IsDeleted==false).FirstOrDefault();
                if (resultData != null)
                {
                    resultData.VisitorCount += 1;
                    resultData.VisitorDate = DateTime.Now;
                     _uow.GenericRepository<tblChiranjeeviVisitorCount>().UpdateAsync(resultData);
                    _uow.save();
                    return SetResultStatus(resultData.VisitorCount.ToString(), MessageStatus.Success, true);
                }
                else
                {
                    tblChiranjeeviVisitorCount obj = new tblChiranjeeviVisitorCount();
                    obj.VisitorCount += 1;
                    obj.VisitorDate = DateTime.Now;
                    obj.IsActive = true;
                    obj.IsDeleted = false;
                    _uow.GenericRepository<tblChiranjeeviVisitorCount>().AddAsync(obj);
                    _uow.save();
                    return SetResultStatus(obj.VisitorCount.ToString(), MessageStatus.Success, true);
                }
            }
            catch (Exception ex)
            {
               return SetResultStatus(string.Empty, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message));
            }
        }


        #endregion
    }
}
