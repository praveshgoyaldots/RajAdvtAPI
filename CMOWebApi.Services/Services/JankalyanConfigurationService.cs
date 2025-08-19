using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class JankalyanConfigurationService : BaseService, IJankalyanConfigurationService
    {

		#region /// Variable ///

		IUnitofWork _uow;

        #endregion

        #region /// Constructor  ///

        public JankalyanConfigurationService(IUnitofWork uow)
		{
			_uow = uow;
        }

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Craete Jankalyan Configuration master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(JankalyanConfigurationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
                
                Mapper.Initialize(x =>
				{
					x.CreateMap<JankalyanConfigurationMasterModel, tblJAN_ConfigurationMaster>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblJAN_ConfigurationMaster data = Mapper.Map<JankalyanConfigurationMasterModel, tblJAN_ConfigurationMaster>(model);

				data = await _uow.GenericRepository<tblJAN_ConfigurationMaster>().AddAsync(data);
				_uow.save();

				objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				objReturn.Data = null;
                CreateLogHelper.CreateLogFile("JankalyanConfiguration Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
			}
			return objReturn;
		}

		/// <summary>
		/// Update existing Jankalyan Configuration master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(JankalyanConfigurationMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblJAN_ConfigurationMaster objResult = await _uow.GenericRepository<tblJAN_ConfigurationMaster>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
                        var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<JankalyanConfigurationMasterModel, tblJAN_ConfigurationMaster>()
							 .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							 .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblJAN_ConfigurationMaster>().UpdateAsync(objResult);
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
                CreateLogHelper.CreateLogFile("JankalyanConfiguration Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
			}
			return objReturn;
		}

		/// <summary>
		/// Get all Jankalyan Configuration master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<JankalyanConfigurationMasterModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<JankalyanConfigurationMasterModel>> objReturn = new ServiceResponse<PagedData<JankalyanConfigurationMasterModel>>();
			try
			{
				PagedData<JankalyanConfigurationMasterModel> resulData = new PagedData<JankalyanConfigurationMasterModel>();



                PagedData<tblJAN_ConfigurationMaster> data = GenericGridCall<tblJAN_ConfigurationMaster>.ListView(model.PageSize, x => x.ModifiedBy, x => x.IsDeleted == false , model.Search, model.OrderBy, model.OrderByAsc, model.Page);


                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblJAN_ConfigurationMaster, JankalyanConfigurationMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<JankalyanConfigurationMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<JankalyanConfigurationMasterModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
			}
			return objReturn;
		}

		/// <summary>
		/// Jankalyan Configuration master  by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<JankalyanConfigurationMasterModel> GetById(long id)
		{
			ServiceResponse<JankalyanConfigurationMasterModel> objReturn = new ServiceResponse<JankalyanConfigurationMasterModel>();
			try
			{
				tblJAN_ConfigurationMaster resultData = _uow.GenericRepository<tblJAN_ConfigurationMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
                        x.CreateMap<tblJAN_ConfigurationMaster, JankalyanConfigurationMasterModel>();
					});
					objReturn.Data = Mapper.Map<tblJAN_ConfigurationMaster, JankalyanConfigurationMasterModel>(resultData);
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
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
               
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);


			}
			return objReturn;
		}

		/// <summary>
		/// Update Status(Active/De-Active)
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
					tblJAN_ConfigurationMaster objResult = await _uow.GenericRepository<tblJAN_ConfigurationMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblJAN_ConfigurationMaster>().UpdateAsync(objResult);
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
			catch (Exception ex)
			{
				objReturn.Data = null;
                CreateLogHelper.CreateLogFile("JankalyanConfiguration UpdateActiveStatus ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration UpdateActiveStatus ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration UpdateActiveStatus ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
			return objReturn;
		}

        /// <summary>
		/// Get top record for module Configuration 
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<JankalyanConfigurationMasterModel> GetTopRecordForConfiguration()
        {
            ServiceResponse<JankalyanConfigurationMasterModel> objReturn = new ServiceResponse<JankalyanConfigurationMasterModel>();
            try
            {
                tblJAN_ConfigurationMaster resultData = _uow.GenericRepository<tblJAN_ConfigurationMaster>().GetAll(filter: x => x.IsActive == true && x.IsDeleted==false, orderBy: x => x.OrderByDescending(o=>o.Id)).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_ConfigurationMaster, JankalyanConfigurationMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_ConfigurationMaster, JankalyanConfigurationMasterModel>(resultData);
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
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetTopRecordForConfiguration ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetTopRecordForConfiguration ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("JankalyanConfiguration GetTopRecordForConfiguration ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);


            }
            return objReturn;
        }

        #endregion
    }
}
