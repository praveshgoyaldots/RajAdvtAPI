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
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class TransferDeptService : BaseService, ITransferDept
    {
        #region ///   variable  //
        private readonly UserManagementService _userManagementService;
        IUnitofWork _uow;
        #endregion

        #region ///   constructor   ///
        public TransferDeptService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
            _uow = uow;
        }
        #endregion

    
        public ServiceResponse<PagedData<TransferDeptModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<TransferDeptModel> resultData = new PagedData<TransferDeptModel>();
                PagedData<RemoveDuplicate> data = GenericGridCall<RemoveDuplicate>.ListView(model.PageSize, x => x.Name, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<RemoveDuplicate, TransferDeptModel>()
                         .ForMember(des => des.Name, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Name) ? x.Name : "N/A"));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<TransferDeptModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<TransferDeptModel>>(null, MessageStatus.Error, false);
            }
        }

       
        public async Task<ServiceResponse<string>> UpdateTransferDeptOLD(TransferDeptModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                string mappingParaStr = string.Empty;

                List<SqlParameter> param = SetSP_UpdateTransferDeptParam(model, out mappingParaStr);

                transferdept_Result Result = _uow.ExeccuteStoreProcedure<transferdept_Result>("transferdeptold " + mappingParaStr, param.ToArray()).FirstOrDefault();
                _uow.save();


                if (Convert.ToInt32(Result.ID) > 0)
                {
                    objReturn.Data = Convert.ToInt32(Result.ID).ToString();
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);

                }
                else

                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);

                }


            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;

        }
        public async Task<ServiceResponse<string>> UpdateTransferDept(TransferDeptModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                string mappingParaStr = string.Empty;

                List<SqlParameter> param = SetSP_UpdateTransferDeptParam(model, out mappingParaStr);

                transferdept_Result Result = _uow.ExeccuteStoreProcedure<transferdept_Result>("transferdept " + mappingParaStr, param.ToArray()).FirstOrDefault();
                _uow.save();


                if (Convert.ToInt32(Result.ID) > 0)
                {
                    objReturn.Data = Convert.ToInt32(Result.ID).ToString();
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);

                }
                else

                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);

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
        /// 
        private List<SqlParameter> SetSP_UpdateTransferDeptParam(TransferDeptModel model, out string mappingParaStr)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            string mapStr = string.Empty;
            try
            {
                mapStr += "@FromDepartmentCode";
                sqlParam.Add(new SqlParameter("FromDepartmentCode", SqlDbType.Int) { Value = model.FromDeptCode }); // list modal parameter  kaise aega

                mapStr += ",@TODepartmentCode";
                sqlParam.Add(new SqlParameter("TODepartmentCode", SqlDbType.Int) { Value = model.TODeptCode ?? (object)DBNull.Value });


            }
            catch
            {
                throw;
            }
            mappingParaStr = mapStr;
            return sqlParam;
        }


    }
}
