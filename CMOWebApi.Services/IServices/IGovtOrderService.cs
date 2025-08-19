using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
    {
     public interface IGovtOrderService
        {
          ServiceResponse<List<GovtOrderViewModel>> GetAllGovtOrder(string departmentCode, DateTime? startDate, DateTime? endDate);

        }
    }
