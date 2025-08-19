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
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
  public  class RecruitmentStatusService : BaseService, IRecruitmentStatusService
    {


        #region ________Declare Variables_______
        IUnitofWork _uow;
        public readonly Jankalyan_DBEntities _context;
        # endregion

        #region ________Form Constructor_______
        public RecruitmentStatusService(IUnitofWork uow)
        {
            _uow = uow;
        }
        # endregion


        public ServiceResponse<List<RecruitmentStatusViewModel>> GetAllRecruitmentStatus(string DepartmentCode, DateTime? sentstartdate = null, DateTime? sentenddate = null)
        {
            ServiceResponse<List<RecruitmentStatusViewModel>> objReturn = new ServiceResponse<List<RecruitmentStatusViewModel>>();
            try
                { 
            var data = _uow.ExeccuteStoreProcedure<RecruitmentStatusViewModel>("spCMD_RecruitmentStatus @DepartmentCode,@SentStartDate,@SentEndDate",
                                        new SqlParameter("@DepartmentCode", SqlDbType.VarChar) { Value = DepartmentCode },
                                        new SqlParameter("@SentStartDate", SqlDbType.VarChar) { Value = sentstartdate ?? (object)DBNull.Value },
                                        new SqlParameter("@SentEndDate", SqlDbType.VarChar) { Value = sentenddate ?? (object)DBNull.Value }).ToList();
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
