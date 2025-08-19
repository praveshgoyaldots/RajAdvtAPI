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
    public class SectionMasterService : BaseService, ISectionMasterService
        {
        #region Variable

        IUnitofWork _uow;

        #endregion

        #region Constructor

        public SectionMasterService(IUnitofWork uow)
            {
            _uow = uow;
            }
        #endregion

        #region Method

        /// <summary>
        /// Get all record of section master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<SectionMasterModel>> GetAll(IndexModel model)
            {
            try
                {
                PagedData<SectionMasterModel> responseList = new PagedData<SectionMasterModel>();
                PagedData<tblDept_SectionMaster> data = GenericGridCall<tblDept_SectionMaster>.ListView(model.PageSize, x => x.ModifiedDate, x => x.Isdeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblDept_SectionMaster, SectionMasterModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(data.Data, responseList.Data);

                PagedData<SectionMasterModel>.ReturnCustomizeData(responseList, model.PageSize, data.TotalRecords);

                return SetResultStatus(responseList, MessageStatus.Success, true);
                }
            catch (Exception ex)
                {
                CreateLogHelper.CreateLogFile("section master All ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("section master All ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("section master All ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<SectionMasterModel>>(null, MessageStatus.Error, false);
                }

            }

        /// <summary>
        /// Get record by id of section master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<SectionMasterModel> GetById(long id)
            {
            ServiceResponse<SectionMasterModel> objReturn = new ServiceResponse<SectionMasterModel>();
            try
                {
                tblDept_SectionMaster resultData = _uow.GenericRepository<tblDept_SectionMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                    {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDept_SectionMaster, SectionMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblDept_SectionMaster, SectionMasterModel>(resultData);
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
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("DepartmentSubMenu GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);


                }
            return objReturn;

            }

        /// <summary>
		/// This for create new record in section master.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> Create(SectionMasterModel model)
            {
            try
                {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<SectionMasterModel, tblDept_SectionMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblDept_SectionMaster obj = Mapper.Map<SectionMasterModel, tblDept_SectionMaster>(model);

                await _uow.GenericRepository<tblDept_SectionMaster>().AddAsync(obj);
                _uow.save();


                obj.Code = obj.Id;
                await _uow.GenericRepository<tblDept_SectionMaster>().UpdateAsync(obj);

                _uow.save();

                return SetResultStatus(obj.Id.ToString(), MessageStatus.Create, true);
                }
            catch (Exception ex)
                {
                CreateLogHelper.CreateLogFile("section master Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("section master Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("section master Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
                }
            }

        /// <summary>
        /// this is for edit the record of section master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(SectionMasterModel model)
            {
            try
                {
                tblDept_SectionMaster obj = await _uow.GenericRepository<tblDept_SectionMaster>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SectionMasterModel, tblDept_SectionMaster>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                await _uow.GenericRepository<tblDept_SectionMaster>().UpdateAsync(obj);

                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
                }
            catch (Exception ex)
                {
                CreateLogHelper.CreateLogFile("section master Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("section master Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("section master Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
                }
            }

        /// <summary>
		/// For toggle the status of specific record.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
                {
                if (id > 0)
                    {
                    tblDept_SectionMaster objResult = await _uow.GenericRepository<tblDept_SectionMaster>().GetByIdAsync(id);
                    if (objResult != null)
                        {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblDept_SectionMaster>().UpdateAsync(objResult);
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


        #endregion


        }
    }
