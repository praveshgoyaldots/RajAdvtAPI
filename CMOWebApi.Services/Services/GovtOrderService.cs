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
    public class GovtOrderService :BaseService, IGovtOrderService
        {
        #region ________Declare Variables_______
        IUnitofWork _uow;
        public readonly Jankalyan_DBEntities _context;
        #endregion


        #region ________Form Constructor_______
        public GovtOrderService(IUnitofWork uow)
            {
            _uow = uow;
            }
        #endregion


        public ServiceResponse<List<GovtOrderViewModel>> GetAllGovtOrder(string departmentCode, DateTime? startDate, DateTime? endDate)
            {
            ServiceResponse<List<GovtOrderViewModel>> objReturn = new ServiceResponse<List<GovtOrderViewModel>>();
            try
                {
                var data = _uow.ExeccuteStoreProcedure<GovtOrderViewModel>("spCMD_GovtOrder @DepartmentCode,@StartDate,@EndDate",
                                      new SqlParameter("@DepartmentCode", SqlDbType.NVarChar) { Value = departmentCode },
                                      new SqlParameter("@StartDate", SqlDbType.DateTime) { Value = startDate != null ? startDate : (object)DBNull.Value },
                                      new SqlParameter("@EndDate", SqlDbType.DateTime) { Value = endDate != null ? endDate : (object)DBNull.Value }
                                      ).ToList();
                objReturn = SetResultStatus(data, MessageStatus.Success, true);
                }
            catch (Exception ex)
                {

                }
            return objReturn;
            }


        }
    }
