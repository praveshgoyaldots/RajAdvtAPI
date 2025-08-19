using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IProjectMonitoringService
    {
        ServiceResponse<List<ProjectMonitoringViewModel>> GetAllProjectMonitoring(string departmentCode, DateTime? startDate, DateTime? endDate);
    }
}
