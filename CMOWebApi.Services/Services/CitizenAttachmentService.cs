//using AutoMapper;
//using CMOWebApi.Core;
//using CMOWebApi.Data;
//using CMOWebApi.Data.UnitOfWork;
//using CMOWebApi.Models.AdminModel.MasterModel;
//using CMOWebApi.Models.GeneralModel;
//using CMOWebApi.Services.IServices;
//using CMOWebApi.Services.ServiceHelper;
//using System;
//using System.Linq;
//using System.Threading.Tasks;

//namespace CMOWebApi.Services.Services
//{
//    public class CitizenAttachmentService : BaseService, ICitizenAttachmentService
//    {
//        #region ///   variable  //
//        IUnitofWork _uow;
//        #endregion

//        #region ///   constructor   ///
//        public CitizenAttachmentService(IUnitofWork uow)
//        {
//            _uow = uow;
//        }
//        #endregion

//        #region ///   Method   ///
//        /// <summary>
//        /// Get All Attachment data in list Format
//        /// </summary>
//        /// <param name="model"> default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
//        /// <returns>PagedData<CitizenAttachmentViewModel></returns>
//        public ServiceResponse<PagedData<CitizenAttachmentViewModel>> GetAll(IndexModel model)
//        {
//            ServiceResponse<PagedData<CitizenAttachmentViewModel>> objReturn = new ServiceResponse<PagedData<CitizenAttachmentViewModel>>();
//            try
//            {
//                PagedData<CitizenAttachmentViewModel> resulData = new PagedData<CitizenAttachmentViewModel>();
//                PagedData<tblCitizenAttachmentMaster> data = GenericGridCall<tblCitizenAttachmentMaster>.ListView(model.PageSize, x => x.Attachment, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
//                var config = new MapperConfiguration(cfg =>
//                {
//                    cfg.CreateMap<tblCitizenAttachmentMaster, CitizenAttachmentViewModel>();
//                });
//                IMapper mapper = config.CreateMapper();
//                resulData.Data = mapper.Map(data.Data, resulData.Data);
//                PagedData<CitizenAttachmentViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

//                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                objReturn = SetResultStatus<PagedData<CitizenAttachmentViewModel>>(null, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Add Attachment 
//        /// </summary>
//        /// <param name="model">CitizenAttachmentViewModel </param>
//        /// <returns>Id</returns>
//        public async Task<ServiceResponse<string>> Add(CitizenAttachmentViewModel model)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                Mapper.Initialize(x =>
//                {
//                    x.CreateMap<CitizenAttachmentViewModel, tblCitizenAttachmentMaster>()
//                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
//                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
//                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false));
//                });
//                tblCitizenAttachmentMaster data = Mapper.Map<CitizenAttachmentViewModel, tblCitizenAttachmentMaster>(model);
//                data = await _uow.GenericRepository<tblCitizenAttachmentMaster>().AddAsync(data);
//                _uow.save();

//                objReturn = SetResultStatus(data.AttachmentCode.ToString(), MessageStatus.Save, true);
//            }
//            catch (Exception ex)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Get Detail of Attachment
//        /// </summary>
//        /// <param name="id">Attachment Code</param>
//        public async Task<ServiceResponse<CitizenAttachmentViewModel>> GetById(long id)
//        {
//            ServiceResponse<CitizenAttachmentViewModel> objReturn = new ServiceResponse<CitizenAttachmentViewModel>();
//            try
//            {
//                tblCitizenAttachmentMaster objMaster = _uow.GenericRepository<tblCitizenAttachmentMaster>().GetAll(filter: x => x.AttachmentCode == id).FirstOrDefault();
//                if (objMaster != null)
//                {
//                    Mapper.Initialize(x =>
//                    {
//                        x.CreateMap<tblCitizenAttachmentMaster, CitizenAttachmentViewModel>();
//                    });
//                    objReturn.Data = Mapper.Map<tblCitizenAttachmentMaster, CitizenAttachmentViewModel>(objMaster);
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                }
//            }
//            catch (Exception ex)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Edit Attachment Detail
//        /// </summary>
//        /// <param name="model">CitizenAttachmentViewModel </param>
//        /// <returns>Attachment Code</returns>
//        public async Task<ServiceResponse<string>> Edit(CitizenAttachmentViewModel model)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                if (model.AttachmentCode > 0)
//                {
//                    tblCitizenAttachmentMaster objMaster = await _uow.GenericRepository<tblCitizenAttachmentMaster>().GetByIdAsync(model.AttachmentCode);
//                    if (objMaster != null)
//                    {
//                        var config = new MapperConfiguration(cfg =>
//                        {
//                            cfg.CreateMap<CitizenAttachmentViewModel, tblCitizenAttachmentMaster>()
//                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objMaster.CreatedBy.ToString()) ? model.CreatedBy : objMaster.CreatedBy))
//                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objMaster.CreatedDate.ToString()) ? DateTime.Now : objMaster.CreatedDate))
//                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
//                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objMaster.IsActive))
//                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objMaster.IsDeleted));
//                        });
//                        IMapper mapper = config.CreateMapper();
//                        objMaster = mapper.Map(model, objMaster);
//                        objMaster = await _uow.GenericRepository<tblCitizenAttachmentMaster>().UpdateAsync(objMaster);
//                        _uow.save();
//                        objReturn = SetResultStatus(objMaster.AttachmentCode.ToString(), MessageStatus.Update, true);
//                    }
//                    else
//                    {
//                        objReturn.Data = null;
//                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                    }
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
//                }
//            }
//            catch (Exception ex)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Update Active Status
//        /// </summary>
//        /// <param name="id">Attachment Code </param>
//        /// <returns>Attachment Code</returns>
//        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                if (id > 0)
//                {
//                    tblCitizenAttachmentMaster objMaster = await _uow.GenericRepository<tblCitizenAttachmentMaster>().GetByIdAsync(id);
//                    if (objMaster != null)
//                    {
//                        objMaster.IsActive = !objMaster.IsActive;
//                        await _uow.GenericRepository<tblCitizenAttachmentMaster>().UpdateAsync(objMaster);
//                        _uow.save();
//                        objReturn = SetResultStatus(objMaster.AttachmentCode.ToString(), MessageStatus.StatusUpdate, true);
//                    }
//                    else
//                    {
//                        objReturn.Data = null;
//                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                    }
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
//                }
//            }
//            catch (Exception)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Update Delete Status
//        /// </summary>
//        /// <param name="id">Attachment Code </param>
//        /// <returns>Attachment Code</returns>
//        public async Task<ServiceResponse<string>> UpdateDeleteStatus(long id)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                if (id > 0)
//                {
//                    tblCitizenAttachmentMaster objMaster = await _uow.GenericRepository<tblCitizenAttachmentMaster>().GetByIdAsync(id);
//                    if (objMaster != null)
//                    {
//                        objMaster.IsDeleted = !objMaster.IsDeleted;
//                        await _uow.GenericRepository<tblCitizenAttachmentMaster>().UpdateAsync(objMaster);
//                        _uow.save();
//                        objReturn = SetResultStatus(objMaster.AttachmentCode.ToString(), MessageStatus.StatusUpdate, true);
//                    }
//                    else
//                    {
//                        objReturn.Data = null;
//                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                    }
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
//                }
//            }
//            catch (Exception)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Check Attachment is Exist or not
//        /// </summary>
//        /// <param name="attachmentName">Attachment</param>
//        /// <returns>Attachment Code </returns>
//        public ServiceResponse<object> IsAttachmentNameExist(string attachmentName)
//        {
//            ServiceResponse<object> objReturn = new ServiceResponse<object>();
//            try
//            {
//                var data = _uow.GenericRepository<tblCitizenAttachmentMaster>().GetAll(filter: x => x.IsDeleted == false && x.Attachment.ToLower() == attachmentName.ToLower()).FirstOrDefault();
//                if (data != null)
//                {
//                    objReturn = SetResultStatus((object)true, MessageStatus.Exist, true);
//                }
//                else
//                {
//                    objReturn = SetResultStatus((object)false, MessageStatus.NotExist, true);
//                }
//            }
//            catch
//            {
//                objReturn.Message = MessageStatus.Error;
//                objReturn.IsSuccess = false;
//            }
//            return objReturn;
//        }
//        #endregion

//    }
//}
