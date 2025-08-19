using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class AgileCMISService : BaseService, IAgileCMISService
    {
        #region ///   Variable   ///
        IUnitofWork _uow;
        #endregion

        #region ///   Cunstructor   ///
        public AgileCMISService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        //public async Task<ServiceResponse<string>> GetComplianceExpactedNoOfEntries(AgileCMISModel model, HttpRequestHeaders header = null)
        public async Task<ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel>> GetComplianceExpactedNoOfEntries(AgileCMISModel model)
        {
            ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel> objReturn = new ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel>();
            try
            {
                
                model = (model == null) ? new AgileCMISModel() : model;

                SP_AGILE_ComplianceExpactedNoOfEntries_Result data = _uow.ExeccuteStoreProcedure<SP_AGILE_ComplianceExpactedNoOfEntries_Result>("SP_AGILE_ComplianceExpactedNoOfEntries @TransCoreId,@ModuleID",
                               new SqlParameter("@TransCoreId", SqlDbType.BigInt) { Value = model.TransCoreId },
                               new SqlParameter("@ModuleID", SqlDbType.BigInt) { Value = model.ModuleID }).FirstOrDefault();

                AGILEComplianceExpactedNoOfEntriesModel result = new AGILEComplianceExpactedNoOfEntriesModel();

                var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<SP_AGILE_ComplianceExpactedNoOfEntries_Result, AGILEComplianceExpactedNoOfEntriesModel>();
                    });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(data, result);              
                objReturn = SetResultStatus<AGILEComplianceExpactedNoOfEntriesModel>(result, MessageStatus.Success, true);
            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;

        }
    }
}
