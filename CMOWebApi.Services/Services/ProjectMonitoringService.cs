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
   public class ProjectMonitoringService : BaseService, IProjectMonitoringService
    {
        #region ________Declare Variables_______
        IUnitofWork _uow;
        public readonly Jankalyan_DBEntities _context;
        # endregion

        #region ________Form Constructor_______
        public ProjectMonitoringService(IUnitofWork uow)
        {
            _uow = uow;
        }
        # endregion


        public ServiceResponse<List<ProjectMonitoringViewModel>> GetAllProjectMonitoring(string departmentCode, DateTime? startDate, DateTime? endDate)
        {
            ServiceResponse<List<ProjectMonitoringViewModel>> objReturn = new ServiceResponse<List<ProjectMonitoringViewModel>>();
            try
                {
                    var data = _uow.ExeccuteStoreProcedure<ProjectMonitoringViewModel>("spCMD_ProjectMonitoring @DepartmentCode,@StartDate,@EndDate",
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
