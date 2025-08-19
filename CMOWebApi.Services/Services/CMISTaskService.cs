using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace CMOWebApi.Services.Services
{
   public class CMISTaskService : BaseService, ICMISTaskService
    {
        #region ________Declare Variables_______
        IUnitofWork _uow;
        public readonly Jankalyan_DBEntities _context;
        # endregion

        #region ________Form Constructor_______
        public CMISTaskService(IUnitofWork uow)
        {
            _uow = uow;
        }
        # endregion


        public ServiceResponse<List<CMISTaskViewModel>> GetAllCMISTask(string DepartmentCode, DateTime? sentstartdate=null, DateTime? sentenddate=null)
        {
            ServiceResponse<List<CMISTaskViewModel>> objReturn = new ServiceResponse<List<CMISTaskViewModel>>();

            try
                {
                var data = _uow.ExeccuteStoreProcedure<CMISTaskViewModel>("spCMD_CMISTask @DepartmentCode,@SentStartDate,@SentEndDate",
                                        new SqlParameter("@DepartmentCode", SqlDbType.VarChar) { Value = DepartmentCode },
                                        new SqlParameter("@SentStartDate", SqlDbType.DateTime) { Value  = sentstartdate ?? (object)DBNull.Value},
                                        new SqlParameter("@SentEndDate", SqlDbType.DateTime) { Value = sentenddate ??  (object)DBNull.Value }).ToList();
                objReturn = SetResultStatus(data, MessageStatus.Success, true);
                }
            catch(Exception ex)
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
                return objReturn;
        }


    }
}
