using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
   public  interface ICMISTaskService
    {
        ServiceResponse<List<CMISTaskViewModel>> GetAllCMISTask(string DepartmentCode, DateTime? sentstartdate, DateTime? sentenddate);
    }
}
